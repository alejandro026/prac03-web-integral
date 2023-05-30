import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  usuario:string = localStorage.getItem('usuario')!;

  constructor(private router:Router){
    this.usuario = localStorage.getItem('usuario')!;
  }


  logout(){
    localStorage.clear();
    this.usuario="";
    this.router.navigate(['/login']);
  }

}
