import {
  AbstractControl,
  FormControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export function noFantasyValidator(): ValidatorFn {

  return (control: AbstractControl): ValidationErrors | null => {
    if (control instanceof FormControl) {
      if (
        typeof control.value === 'string' &&
        control.value?.toLowerCase().includes('rick, morty')
      ) {
        return {
          noFantasy: true,
        };
      }
    }

    return null;
  };
}
