import { AbstractControl } from '@angular/forms';

export function notZeroValidator(control: AbstractControl) {
    console.log(control.value);
    if (control.value == 0) {
        return { valid: true };
    }
    return null;
}