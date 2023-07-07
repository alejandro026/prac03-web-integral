import { ReCaptchaV3Service } from 'ng-recaptcha';
import { Router } from '@angular/router';
import { OnInit, Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { BaseForm2 } from './../../../shared/utils/base-form copy';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(3)]],
  });
  tokenVisible: boolean = false;
  reCAPTCHAToken:string = '';

  constructor(
    private fb: FormBuilder,
    public baseForm: BaseForm2,
    private router: Router,
    private reCaptchaV3Service: ReCaptchaV3Service,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  // onLogin() {
  //   this.reCaptchaV3Service.execute('importantAction').subscribe((token: string)=>{
  //     this.tokenVisible= true;
  //     this.reCAPTCHAToken= `Token [${token}] generated`

  //     console.log(this.reCAPTCHAToken);
  //     // localStorage.setItem('usuario', this.loginForm.value.username!);
  //     // this.router.navigate(['/home']);
  //   })
  // }

  onLogin(){
    console.log(this.loginForm.value);
    this.authService.login(this.loginForm.value).subscribe({next:data=>{
      console.log(data);
    }, error(err) {

    },})
  }
}
