import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  public usernamePattern: string = '^([a-z]+[0-9]{0,3})';
  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  public namePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';


  constructor() { }

  public equalFields(password:string, repeatPass:string) {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const pass1 = formGroup.get(password)?.value;
      const pass2 = formGroup.get(repeatPass)?.value;

      if(pass1 !== pass2){
        formGroup.get(repeatPass)?.setErrors(
          {
            equalFields: true
          }
          );
        return {
          equalFields: true
        }
      }
      formGroup.get(repeatPass)?.setErrors(null);
      return null;
    }
  }
}
