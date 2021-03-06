import { FormControl, NG_VALIDATORS } from '@angular/forms';
import { Directive } from '@angular/core';

export function validateMobile(c: FormControl) {
    let MOBILE_REGEXP = /^1[34578][0-9]{9,9}$/;
    return MOBILE_REGEXP.test(c.value) ? null : {
        validateMobile: {valid: false}
    }
}

@Directive({
    selector: '[validateMobile][ngModel]',
    providers: [
        { provide: NG_VALIDATORS, useValue: validateMobile, multi: true }
    ]
})
export class MobileValidator {}