import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Title } from '@angular/platform-browser';
import { NGXLogger } from 'ngx-logger';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  currentUser: any;

  constructor(private notificationService: NotificationService,
    private authService: AuthenticationService,
    private titleService: Title,
    private logger: NGXLogger,
    private router: Router
    ) {
  }

  ngOnInit() {
    this.currentUser = JSON.parse(this.authService.getCurrentUser().currentUser).account_info[0];

    if(this.currentUser.currentUser === null){
      this.router.navigate(['/auth/login'])
    }
    else{
      this.titleService.setTitle('Account - GWI Customer Portal');
      console.log(this.currentUser);
    }
  }
}
