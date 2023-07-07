import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  data: any = {};//Datos del usuario

  constructor(private authService:AuthService){ }

  ngOnInit(): void {
    this.authService.tokenData$.subscribe((data:any)=>{
      this.data = data;
    })
  }

}
