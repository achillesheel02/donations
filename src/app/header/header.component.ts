import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {I18n} from 'carbon-components-angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() active = false;

  /**
   * `EventEmitter` to notify parent components of menu click events.
   */
    // tslint:disable-next-line:ban-types
  @Output() selected: EventEmitter<Object> = new EventEmitter<Object>();


  constructor() { }

  public doClick() {
    this.selected.emit(this.active);
  }
  ngOnInit() {
  }

}
