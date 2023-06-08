import {Injectable} from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({ providedIn: 'root'})
export class BaseForm2{

  constructor(){

  }

  isValidField(form:AbstractControl){
    let flag = false;
    if(form != null){
      flag = form.touched || form.dirty && !form.valid
    }
    return flag;
  }

  getErrorMessage(form: AbstractControl|null){
    let message="";
    if(form){
      const {errors} = form;
      if(errors){
        const messages: any={
          required:"Campo requerido",
          email: "Formato inválido",
          pattern: "Formato inválido",
          minError: "El rango no es correcto",
          minLength: "El rango no es correcto",
          maxLength : "El rango no es correcto"
        }

        const errorKey= Object.keys(errors).find(Boolean);
        if(errorKey){
          message = messages[errorKey];
        }
      }
    }
    return message;
  }


}
