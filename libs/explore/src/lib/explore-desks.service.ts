import { Injectable } from '@angular/core';
import { getModule, listen } from '@placeos/ts-client';
import { BehaviorSubject, combineLatest } from 'rxjs';

import { BaseClass, HashMap, SettingsService } from '@user-interfaces/common';

import { ExploreStateService } from './explore-state.service';
import { DEFAULT_COLOURS } from './explore-spaces.service';
import { BuildingLevel, OrganisationService } from '@user-interfaces/organisation';

export interface DesksStats {
    free: number;
    occupied: number;
    total: number;
}

@Injectable()
export class ExploreDesksService extends BaseClass {
    private _level: BuildingLevel = null;
    private _in_use = new BehaviorSubject<string[]>([]);
    private _desks = new BehaviorSubject<string[]>([]);
    private _reserved = new BehaviorSubject<string[]>([]);
    private _statuses: HashMap<string> = {};
    private _bindings: any[] = [];
    private _stats = new BehaviorSubject<DesksStats>({ free: 0, occupied: 0, total: 0 });

    constructor(private _state: ExploreStateService, private _org: OrganisationService, private _settings: SettingsService) {
        super();
        this.subscription(
            'spaces',
            this._state.level.subscribe((level) => {
                this.clearBindings();
                this._level = level;
                this.bindToDesks();
            })
        );
        this.subscription('changes', combineLatest([this._desks, this._in_use, this._reserved]).subscribe((details) => {
            const [desks, in_use, reserved] = details;
            this._statuses = {};
            for (const id of desks) {
                const is_used = in_use.some(i => id === i);
                const is_reserved = reserved.some(i => id === i);
                this._statuses[id] = is_used ? 'free' : is_reserved ? 'reserved' : 'busy';
            }
            this.timeout('update', () => this.updateStatus(), 100);
        }));
    }

    public ngOnDestroy() {
        this.clearBindings();
    }

    public clearBindings() {
        const bindings = ['desks_in_use', 'desk_list', 'desks_reserved', 'desks_occupied', 'desks_free'];
        for (const id of bindings) { this.unsub(id); }
        this._bindings.forEach(b => b.unbind());
        this._bindings = [];
        this._statuses = {};
    }

    public bindToDesks() {
        if (!this._level) return;
        const building = this._org.buildings.find(bld => bld.id === this._level.parent_id);
        if (!building) { return; }
        const system_id = this._org.organisation.bindings.desk_management;
        if (!system_id) { return; }
        let binding = getModule(system_id, 'DeskManagement').binding(this._level.id);
        this.subscription(
            `desks_in_use`,
            binding.listen().subscribe((d) => this._in_use.next(d))
        );
        binding.bind();
        this._bindings.push(binding);
        binding = getModule(system_id, 'DeskManagement').binding(`${this._level.id}:desk_ids`);
        this.subscription(
            `desks_list`,
            binding.listen().subscribe((d) => this._desks.next(d))
        );
        binding.bind();
        this._bindings.push(binding);
        binding = getModule(system_id, 'DeskManagement').binding(`${this._level.id}:reserved`);
        this.subscription(
            `desks_reserved`,
            binding.listen().subscribe((d) => this._reserved.next(d))
        );
        binding.bind();
        this._bindings.push(binding);
        binding = getModule(system_id, 'DeskManagement').binding(`${this._level.id}:occupied_count`);
        this.subscription(
            `desks_occupied`,
            binding.listen().subscribe((d) => this._stats.next({ ...this._stats.getValue(), occupied: d }))
        );
        binding.bind();
        this._bindings.push(binding);
        binding = getModule(system_id, 'DeskManagement').binding(`${this._level.id}:free_count`);
        this.subscription(
            `desks_free`,
            binding.listen().subscribe((d) => this._stats.next({ ...this._stats.getValue(), free: d }))
        );
        binding.bind();
        this._bindings.push(binding);
    }

    private updateStatus() {
        const style_map = {};
        const colours = this._settings.get('app.explore.colors') || DEFAULT_COLOURS;
        for (const desk_id in this._statuses) {
            style_map[`#${desk_id}`] = {
                fill: colours[`desk-${this._statuses[desk_id]}`] || colours[`${this._statuses[desk_id]}`],
                opacity: 0.6,
            };
        }
        this._state.setStyles('desks', style_map);
    }
}
