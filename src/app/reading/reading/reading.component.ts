import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Title } from '@angular/platform-browser';
import { NGXLogger } from 'ngx-logger';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reading',
  templateUrl: './reading.component.html',
  styleUrls: ['./reading.component.css']
})
export class ReadingComponent implements OnInit {
  currentUser: any;

  constructor(private notificationService: NotificationService,
    private authService: AuthenticationService,
    private titleService: Title,
    private logger: NGXLogger,
    private router: Router
    ) {
  }

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();

    if(this.currentUser.currentUser === null){
      this.router.navigate(['/auth/login'])
    }
    else{
      this.titleService.setTitle('Meter Readings - GWI Customer Portal');
    }
  }
}
