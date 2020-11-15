import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'user-interfaces-mapwize',
  templateUrl: './mapwize.component.html',
  styleUrls: ['./mapwize.component.scss']
})
export class MapwizeComponent implements OnInit {
  /** Whether to show the overlay menu */
  public show_menu: boolean;
  
  constructor() { }

  ngOnInit(): void {
  }

}
