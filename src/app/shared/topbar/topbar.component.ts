import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AuthService} from '../../core/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {
  @Output() letStart: EventEmitter<{}> = new EventEmitter();
  @Input() large: boolean;
  User;
  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.auth.getUser().subscribe((data) => {
     this.User = data;
    });
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/admin/auth/login']);
  }
 }
