import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SweetAlertService } from 'src/app/shared/services/sweet-alert.service';
import { ValidateEmailService } from 'src/app/shared/services/validate-email.service';
import { ValidatorService } from 'src/app/shared/services/validator.service';
import { ValidateUserService } from '../../../shared/services/validate-user.service';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styles: [
  ]
})
export class SigninComponent implements OnInit {

  public miFormulario:FormGroup = this.fb.group({
    username: [
      '',
      [Validators.required, Validators.pattern(this.validatorSvc.usernamePattern), Validators.minLength(5), Validators.maxLength(12)],
      [this.validatorUser]
    ],
    name: [
      '',
      [Validators.required]
    ],
    email: [
      '',
      [Validators.required, Validators.pattern(this.validatorSvc.emailPattern)],
      [this.validatorEmail]
    ],
    password: [
      '',[Validators.required, Validators.minLength(6)]
    ],
    repeatPass: [
      '',
      [Validators.required, Validators.minLength(6)]
    ],
    conditions: [
      false,
      [Validators.requiredTrue]
    ],
  }, {validators:this.validatorSvc.equalFields('password', 'repeatPass')});

  public displayModal!: boolean; 

  get usernameErrorMsg(): string {
    const errors = this.miFormulario.get('username')?.errors;
    if (errors?.['required']){
      return 'Por favor, ingrese un nombre de usuario.'
    }
    else if (errors?.['minlength']){
      return 'El nombre de usuario debe tener como mínimo 5 cáracteres.'
    }
    else if (errors?.['maxlength']){
      return 'El nombre de usuario no puede tener más de 12 cáracteres.'
    }
    else if (errors?.['pattern']){
      return 'El nombre de usuario debe tener el formato especificado.'
    }
    else if (errors?.['userExist']) {
      return 'El nombre de usuario ya se encuentra en uso.'
    }
    return '';
  }

  get nameErrorMsg(): string {
    const errors = this.miFormulario.get('name')?.errors;
    if (errors?.['required']){
      return 'Por favor, ingrese su nombre completo.'
    }
    else if (errors?.['pattern']){
      return 'El nombre debe tener el formato especificado.'
    }
    return '';
  }

  get emailErrorMsg(): string {
    const errors = this.miFormulario.get('email')?.errors;
    if (errors?.['required']){
      return 'Por favor, ingrese su email.'
    }
    else if (errors?.['pattern']){
      return 'El email debe tener el formato especificado.'
    }
    else if (errors?.['emailExist']){
      return 'Ya existe un usuario con el correo electronico ingresado.';
    }
    return '';
  }

  get passwordErrorMsg(): string {
    const errors = this.miFormulario.get('password')?.errors;
    if (errors?.['required']){
      return 'Por favor, ingrese una contraseña para el usuario.'
    }
    else if (errors?.['minlength']){
      return 'La contraseña debe tener como mínimo 6 cáracteres.'
    }
    return '';
  }

  constructor(
    private fb: FormBuilder,
    private validatorSvc: ValidatorService,
    private validatorUser: ValidateUserService,
    private validatorEmail: ValidateEmailService,
    private authSvc:AuthService, 
    private sweetAlertSvc: SweetAlertService
    ) { }

  ngOnInit(): void {
  }

  public showModalDialog() {
    this.displayModal = true;

  }

  public createUser(): void {
    this.authSvc.createUser(this.miFormulario.value).subscribe(
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

  public inputInvalid(input:string): boolean {
    return this.miFormulario.get(input)?.invalid && this.miFormulario.get(input)?.touched || false;
  }
}
