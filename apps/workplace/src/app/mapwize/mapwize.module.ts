import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Route } from '@angular/router';

import { MapwizeComponent } from './mapwize.component';
import { SharedContentModule } from '../ui/shared.module';

const ROUTES: Route[] = [
    { path: '', component: MapwizeComponent }
];

@NgModule({
    declarations: [MapwizeComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(ROUTES),
        SharedContentModule
    ]
})
export class MapwizeModule {}
