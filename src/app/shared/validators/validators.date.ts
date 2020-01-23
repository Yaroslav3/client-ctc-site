import {AbstractControl} from '@angular/forms';
import * as moment from 'moment';

export class DateValidator {
  static dateValid(AC: AbstractControl) {
    if (AC && AC.value && !moment(AC.value, 'YYYY-MM-DD', true).isValid()) {
      return {dateValid: true};
    }
    return null;
  }
}
