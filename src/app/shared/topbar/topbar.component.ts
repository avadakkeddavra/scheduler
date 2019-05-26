import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {
  @Output() letStart: EventEmitter<{}> = new EventEmitter();
  @Input() large: boolean;
  constructor() { }

  ngOnInit() {
  }

}
