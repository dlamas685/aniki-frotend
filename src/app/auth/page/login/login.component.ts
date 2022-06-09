import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SweetAlertService } from 'src/app/shared/services/sweet-alert.service';
import { ValidatorService } from 'src/app/shared/services/validator.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  public miFormulario:FormGroup = this.fb.group({
    username:[
      '',
      [Validators.required]
    ],
    password:[
      '',
      [Validators.required]
    ]
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private sweetAlertSvc: SweetAlertService
  ) { }

  ngOnInit(): void {
  }

  public loginUser(): void {
    this.authService.loginUser(this.miFormulario.value).subscribe(
      resp => {
        if (resp.success){
          this.sweetAlertSvc.successAlertLogin(resp.msg!);
        }
        else {
          this.sweetAlertSvc.errorAlertLogin(resp.msg!);
        }
      }
    );
  }

  public invalidInput(input:string): boolean {
    return this.miFormulario.get(input)?.invalid && this.miFormulario.get(input)?.touched || false;
  }

}
