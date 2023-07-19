import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'controlErrorMessage'
})
export class ControlErrorMessagePipe implements PipeTransform {

  transform(error: { key: string, value: any }, ...args: unknown[]): unknown {
    const errorMessages: Record<string, string> = {
      required: 'Este campo es obligatorio',
      email: 'Debe ser un email valido',
      minlength: 'El largo es menor al requerido',
      maxlength: 'El largo es mayor al requerido',      
    };

    return errorMessages[error.key] || 'Campo invalido';
  }

}
