import { Router } from '@angular/router';
import { OnInit, Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { BaseForm2 } from './../../../shared/utils/base-form copy';

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

  constructor(
    private fb: FormBuilder,
    public baseForm: BaseForm2,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onLogin() {
    console.log('Inicio sesión...');
    localStorage.setItem('usuario', this.loginForm.value.username!);
    this.router.navigate(['/home']);
  }
}
