import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthResponse } from '../models/auth.interface';
import { environment } from 'src/environments/environment';

const helper = new JwtHelperService;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token= new BehaviorSubject<string>("");
  private tokenData= new BehaviorSubject<any>("");

  constructor(private http:HttpClient,private router:Router, private snackBar:MatSnackBar) { }

  get token$(): Observable<string> {
    return this.token.asObservable();
  }

  get tokenData$(): Observable<any> {
      return this.tokenData.asObservable();
  }

  /**
   * Método para el maneno de errorres desplegados en el SnackBar
   * @param error Error enviado al método
   * @returns Lanza error en caso que el mensaje no esté nulo o vacío
   */
  handleError(error:any):Observable<never>{
    let message = "Ha ocurrido un error";


    if (error) {
      message = `${error.error.message}`;
    }
    console.log('Handle Error ' + message);


    this.snackBar.open(message, '', {
      duration: 5*1000,
      panelClass: ['error-snackbar'],
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
    return throwError(message);
  }

  saveLocalStorage(token:string){
    localStorage.setItem('token', token);
  }

  logout(){
    localStorage.removeItem('token');
    this.token.next("");//Notofica a suscirptores que es vacio
    this.tokenData.next(null); //Notifica a los suscriptores.
    this.router.navigate(['/']);
  }

  /**
   * Cada vez que se realice una petición verifica que Token
   */
  checkToken() {
    let token = localStorage.getItem("token");


    if(token) {
      //Checa expiración de token traido del BackEnd
      const isExpired = helper.isTokenExpired(token);


      if(isExpired) {
        this.logout(); //Cierra sesión
      } else {
        this.token.next(token); //Notifica token a suscriptores


        //Decodifica token JWT Encriptado
        const {iat, exp, ...data} = helper.decodeToken(token);
        this.tokenData.next(data);//Notifica token a suscriptores
      }
    } else {
      this.logout();
    }
  }

  /**
   * Hace la petición  al BackEnd
   * @param loginData Usuario y Contraseña de usuario
   * @returns
   */
  login(loginData:any):Observable<AuthResponse|void> {


    return this.http.post<AuthResponse>(`${environment.API_URL}/`,loginData)
      .pipe(map((data:AuthResponse) => {


        if(data.token) { //No hay errores y contiene información
          this.saveLocalStorage(data.token);
          this.token.next(data.token); //Notifica a suscriptores
          this.router.navigate(['/home']);


          this.checkToken();
        }
        return data;
      }),
      catchError((error) => this.handleError(error)));
  }


}
