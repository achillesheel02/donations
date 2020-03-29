import {Component, EventEmitter, HostBinding, Input, OnInit, Output} from '@angular/core';
import {I18n, NavigationItem} from 'carbon-components-angular';

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
  @HostBinding('style.height.%') height = 100;

  @Input() ariaLabel: string;

  /**
   * Creates the header navigation items and menu items through a list of navigation item objects.
   * In order for the navigation items to move to the side navigation when window size is less than 1056px,
   * navigation items need to be passed into both ibm-header-navigation and ibm-sidenav.
   */
  @Input() navigationItems: NavigationItem[];

  constructor() { }

  public doClick() {
    this.selected.emit(this.active);
  }
  ngOnInit() {
  }

}
