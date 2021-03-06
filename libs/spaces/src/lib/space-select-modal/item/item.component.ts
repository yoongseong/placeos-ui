import { Component, OnInit, Input } from '@angular/core';
import { Space } from '../../space.class';

@Component({
    selector: 'a-space-select-item',
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.scss']
})
export class SpaceSelectItemComponent implements OnInit {
    /** Space to display details for */
    @Input() public space: Space;
    /** Type of  */
    @Input() public type: 'available' | 'selected';

    @Input() public multiple: boolean;

    constructor() {}

    public ngOnInit(): void {}
}
