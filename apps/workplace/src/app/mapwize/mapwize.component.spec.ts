import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapwizeComponent } from './mapwize.component';

describe('MapwizeComponent', () => {
  let component: MapwizeComponent;
  let fixture: ComponentFixture<MapwizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapwizeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapwizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
