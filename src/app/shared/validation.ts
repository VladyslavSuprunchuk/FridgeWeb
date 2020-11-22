import { AbstractControl } from '@angular/forms';

export function notZeroValidator(control: AbstractControl) {
    if (control.value == 0) {
        return { valid: true };
    }
    return null;
}


export function numberOnlyValidation(control: AbstractControl){
    // Number only validation 
    let val = control.value;

    if (val === null || val === '') return null;

    if (!val.toString().match(/^[0-9]+(\.?[0-9]+)?$/)) return { 'invalidNumber': true };

    return null;

}