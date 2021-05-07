import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Title } from '@angular/platform-browser';
import { NGXLogger } from 'ngx-logger';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent implements OnInit {
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
      this.titleService.setTitle('Bills - GWI Customer Portal');
    }
  }
}
