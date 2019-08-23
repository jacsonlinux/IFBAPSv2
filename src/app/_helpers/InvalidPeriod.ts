import { FormGroup } from '@angular/forms';

export function InvalidPeriod(
  start: string,
  end: string,
  dateSchedule: any
) {

  const date = new Date();

  const now = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    0
  );

  let start1 = null;
  let end1 = null;

  return (formGroup: FormGroup) => {

    const controlStart = formGroup.controls[start];
    const controlEnd = formGroup.controls[end];

    if (controlStart.value !== null) {
      start1 = new Date(dateSchedule + ' ' + controlStart.value + ':00');
    }

    if (controlEnd.value !== null) {
      end1 = new Date(dateSchedule + ' ' + controlEnd.value + ':00');
    }

    if (start1 > now) {
      controlStart.setErrors(null);
    } else {
      controlStart.setErrors({ invalidPeriod: true });
    }

    if (end1 > start1) {
      controlEnd.setErrors(null);
    } else {
      controlEnd.setErrors({ invalidPeriod: true });
    }

  };
}
