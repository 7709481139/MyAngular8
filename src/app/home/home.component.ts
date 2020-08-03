import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
registerMode = false;
userinrole = localStorage.getItem('userinrole');
constructor(private http: HttpClient) {}
  ngOnInit() {
  }

  registerToggle() {
    this.registerMode = !this.registerMode;
  }


  cancelRegisterMode(registerMode: boolean) {
    this.registerMode = registerMode;
      }

}
