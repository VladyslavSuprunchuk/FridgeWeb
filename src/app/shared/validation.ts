import { AbstractControl } from '@angular/forms';

export function notZeroValidator(control: AbstractControl) {
    if (control.value == 0) {
        return { valid: true };
    }
    return null;
}
