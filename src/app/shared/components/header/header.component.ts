import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{

  data: any = {};//Datos del usuario

  constructor(private router:Router,
    private authService:AuthService){ }


  ngOnInit(): void {
    this.authService.tokenData$.subscribe((data:any)=>{
      this.data = data;
    })
  }

  //Cerrar sesion
  onLogout(){
    this.authService.logout();
    this.data= null;
  }

}
