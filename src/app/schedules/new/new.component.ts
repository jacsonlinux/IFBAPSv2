import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MzToastService} from 'ngx-materialize';
import {SchedulesService} from '../schedules.service';
import {Schedule} from '../../class/Schedule';
import {AuthenticationService} from '../../authentication/authentication.service';
import {Location} from '@angular/common';
import {Subscription} from 'rxjs-compat/Subscription';
import {InvalidPeriod} from '../../_helpers/InvalidPeriod';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit, OnDestroy {

  selectItem;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;

  classes;
  courses;
  subjects;
  items;

  schedule = new Schedule();

  errorMessageResources = {
    start: {
      required: 'Start time is required',
      invalidPeriod: 'Start must be greater than current time'
    },
    end: {
      required: 'End time is required',
      invalidPeriod: 'End must be greater than start time'
    },
    title: {
      required: 'Title is required',
      maxlength: 'It can not be longer than 40 characters.',
    },
    course: {
      required: 'Course is required',
    },
    class: {
      required: 'Class is required',
    },
    nstudent: {
      required: 'Number of students required',
    },
    nteam: {
      required: 'Number of students required',
    },
    subject: {
      required: 'Subject required',
    },
    item: {
      required: 'Item required',
    },
    firstCtrl: {
      required: 'Class data required',
    },
    secondCtrl: {
      required: 'Material required',
    },
    thirdCtrl: {
      required: 'Equipment required',
    },
    fourthCtrl: {
      required: 'Reagents required',
    },
    activity: {
      maxlength: 'It can not be longer than 48 characters.',
      required: 'Activity is required.',
    }
  };

  scheduleForm: FormGroup;

  showForm: boolean;

  dateSchedule;

  subscription: Subscription;

  autocompleteMaterial;
  autocompleteReagents;

  hasMaterial = false;

  arrMaterial = [];

  public timePickerOptions: Pickadate.TimeOptions = {
    default: 'now',
    fromnow: 0,
    twelvehour: false,
    donetext: 'OK',
    cleartext: 'CLEAR',
    canceltext: 'CLOSE',
    autoclose: false,
    ampmclickable: true
  };

  constructor(
    private scheduleService: SchedulesService,
    private formBuilder: FormBuilder,
    private toastService: MzToastService,
    private authenticationService: AuthenticationService,
    private location: Location,
    private activatedRoute: ActivatedRoute,
  ) {
    console.log('NewComponent');
  }

  validatePeriod(periodForCheck, periods): boolean {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < periods.length; i++) {
      const period = periods[i];
      if (period.start < periodForCheck.start && period.end > periodForCheck.start) {
        return false;
      }
      if (period.start > periodForCheck.start && period.start < periodForCheck.end) {
        return false;
      }
    }
    return true;
  }

  newSchedule(schedule): void {
    this.showForm = false;
    this.subscription.unsubscribe();
    this.scheduleService
      .newSchedule(schedule)
      .then(res => {
        if (res === true) {
          this.showForm = false;
          this.location.back();
          this.toastService.show('Registered schedule!', 3000, 'green white-text');

        } else {
          this.toastService.show(`${res}`, 5000, 'red white-text');
          this.showForm = true;
          this.scheduleForm.reset();
        }
      })
      .catch(err => err.message);
  }

  onSubmit() {
    const data = this.scheduleForm.value;
    const start = new Date(this.dateSchedule + ' ' + data.start + ':00');
    const end = new Date(this.dateSchedule + ' ' + data.end + ':00');
    if (start >= end) {
      this.toastService.show('Start can not be greater than or equal to end', 5000, 'red white-text');
      this.scheduleForm.reset();
    } else {
      this.showForm = false;
      this.schedule.start = start;
      this.schedule.end = end;
      this.schedule.title = data.activityTitle.text;
      const schedule = {
        end: this.schedule.end,
        place: this.schedule.place,
        start: this.schedule.start,
        user: this.schedule.user,
        title: this.schedule.title
      };
      this.subscription = this.scheduleService.validateSchedule(schedule)
        .subscribe(schedules => {
          if (schedules.length === 0) {
            this.newSchedule(schedule);
          } else {
            const periods = [];
            for (const entry of schedules) {
              periods.push({
                start: entry.data.start.toDate(),
                end: entry.data.end.toDate()
              });
            }
            const periodForCheck = {
              start: schedule.start,
              end: schedule.end
            };
            const valid = this.validatePeriod(periodForCheck, periods);
            if (valid) {
              this.newSchedule(schedule);
            } else {
              this.subscription.unsubscribe();
              this.toastService.show('Invalid period schedule!', 5000, 'red white-text');
              this.scheduleForm.reset();
              this.showForm = true;
            }
          }
        });
    }
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }

  buildForm() {
    /*this.scheduleForm = this.formBuilder.group({
        firstCtrl: ['', Validators.required],
        secondCtrl: ['', Validators.required],
        thirdCtrl: ['', Validators.required],
        fourthCtrl: ['', Validators.required],
        start: [null, Validators.compose([
          Validators.required
        ])],
        end: [null, Validators.compose([
          Validators.required
        ])],
        activity: [null, Validators.compose( [
          Validators.required,
          Validators.maxLength(64)
        ])],
        course: [null, Validators.compose([
          Validators.required
        ])],
        class: [null, Validators.compose([
          Validators.required
        ])],
        nteam: [null, Validators.compose([
          Validators.required
        ])],
        nstudent: [null, Validators.compose([
          Validators.required
        ])],
        subject: [null, Validators.compose([
          Validators.required
        ])]
      },
      {
        validator: InvalidPeriod(
          'start',
          'end',
          `${this.dateSchedule}`
        )
      }
    );*/
    this.firstFormGroup = this.formBuilder.group({
      start: ['', Validators.required],
      end: ['', Validators.required],
      activity: ['', Validators.required],
      course: ['', Validators.required],
      class: ['', Validators.required],
      nteam: ['', Validators.required],
      nstudent: ['', Validators.required],
      subject: ['', Validators.required]
    }, {
      validator: InvalidPeriod(
        'start',
        'end',
        `${this.dateSchedule}`
      )
    });

    this.secondFormGroup = this.formBuilder.group({
      item: ['', Validators.required],
      hasMaterial: [this.hasMaterial]
    });

    this.thirdFormGroup = this.formBuilder.group({
      thirdCtrl: ['', Validators.required]
    });
    this.fourthFormGroup = this.formBuilder.group({
      fourthCtrl: ['', Validators.required]
    });

    this.secondFormGroup
      .get('hasMaterial')
      .valueChanges.subscribe((checked: boolean) => {
      if (!checked) {
        this.arrMaterial = [];
      }
    });

  }

  addItem(item) {
    const index = this.arrMaterial.indexOf(item);
    if (index > -1) {
      this.toastService.show('Not added', 2000, 'orange darken-4 white-text center');
    } else {
      this.arrMaterial.push(item);
      this.secondFormGroup.controls.item.reset();
      this.toastService.show('Item added', 2000, 'green darken-4 white-text center');
    }
  }

  delItem(item) {
    const index = this.arrMaterial.indexOf(item);
    if (index !== -1) {
      this.arrMaterial.splice(index, 1);
      this.toastService.show('Item removed', 2000, 'red darken-4 white-text center');
    }
  }

  ngOnInit() {
    this.showForm = true;
    this.scheduleService.currentDate.subscribe(date => {
      if (date === null) {
        this.location.back();
      } else {
        this.dateSchedule = date;
        this.dateSchedule = new Date(
          this.dateSchedule.getFullYear(),
          this.dateSchedule.getMonth(),
          this.dateSchedule.getDate()
        ).toDateString();
      }
    });
    this.authenticationService.user.subscribe(user => this.schedule.user = user.uid);
    this.schedule.place = this.activatedRoute.snapshot.paramMap.get('id');
    this.scheduleService.getCourses().subscribe(courses => {
      this.courses = courses;
    });
    this.scheduleService.getClasses().subscribe(classes => {
      this.classes = classes;
    });
    this.scheduleService.getSubjects().subscribe(subjects => {
      this.subjects = subjects;
    });
    this.scheduleService.getItems().subscribe(items => {
      this.items = items;
      /*const data = {};
      for (const entry of items) {
        data[entry.data.description] = null;
      }
      this.autocompleteMaterial = {data};*/
    });
    this.scheduleService.getReagents().subscribe(reagents => {
      const data = {};
      for (const entry of reagents) {
        data[entry.data.reagent] = null;
      }
      this.autocompleteReagents = { data };
    });
    this.buildForm();
  }

}

/*import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MzToastService } from 'ngx-materialize';
import { SchedulesService } from '../schedules.service';
import { Schedule } from '../../class/Schedule';
import { AuthenticationService } from '../../authentication/authentication.service';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs-compat/Subscription';
import { InvalidPeriod } from '../../_helpers/InvalidPeriod';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit, OnDestroy {

  selectItem;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;

  classes;
  courses;
  subjects;
  items;

  schedule = new Schedule();

  errorMessageResources = {
    start: {
      required: 'Start time is required',
      invalidPeriod: 'Start must be greater than current time'
    },
    end: {
      required: 'End time is required',
      invalidPeriod: 'End must be greater than start time'
    },
    title: {
      required: 'Title is required',
      maxlength: 'It can not be longer than 40 characters.',
    },
    course: {
      required: 'Course is required',
    },
    class: {
      required: 'Class is required',
    },
    nstudent: {
      required: 'Number of students required',
    },
    nteam: {
      required: 'Number of students required',
    },
    subject: {
      required: 'Subject required',
    },
    item: {
      required: 'Item required',
    },
    firstCtrl: {
      required: 'Class data required',
    },
    secondCtrl: {
      required: 'Material required',
    },
    thirdCtrl: {
      required: 'Equipment required',
    },
    fourthCtrl: {
      required: 'Reagents required',
    },
    activity: {
      maxlength: 'It can not be longer than 48 characters.',
      required: 'Activity is required.',
    },
    quantityMaterial: {
      required: 'Required',
    },
  };

  scheduleForm: FormGroup;

  showForm: boolean;

  dateSchedule;

  subscription: Subscription;

  autocompleteMaterial;
  autocompleteReagents;

  hasMaterial = false;

  arrMaterial = [];

  public timePickerOptions: Pickadate.TimeOptions = {
    default: 'now',
    fromnow: 0,
    twelvehour: false,
    donetext: 'OK',
    cleartext: 'CLEAR',
    canceltext: 'CLOSE',
    autoclose: false,
    ampmclickable: true
  };

  constructor(
    private scheduleService: SchedulesService,
    private formBuilder: FormBuilder,
    private toastService: MzToastService,
    private authenticationService: AuthenticationService,
    private location: Location,
    private activatedRoute: ActivatedRoute,
  ) {
    console.log('NewComponent');
  }

  validatePeriod(periodForCheck, periods): boolean {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < periods.length; i++) {
      const period = periods[i];
      if (period.start < periodForCheck.start && period.end > periodForCheck.start) {
        return false;
      }
      if (period.start > periodForCheck.start && period.start < periodForCheck.end) {
        return false;
      }
    }
    return true;
  }

  newSchedule(schedule): void {
    this.showForm = false;
    this.subscription.unsubscribe();
    this.scheduleService
      .newSchedule(schedule)
      .then(res => {
        if (res === true) {
          this.showForm = false;
          this.location.back();
          this.toastService.show('Registered schedule!', 3000, 'green white-text');

        } else {
          this.toastService.show(`${res}`, 5000, 'red white-text');
          this.showForm = true;
          this.scheduleForm.reset();
        }
      })
      .catch(err => err.message);
  }

  onSubmit() {
    const data = this.scheduleForm.value;
    const start = new Date(this.dateSchedule + ' ' + data.start + ':00');
    const end = new Date(this.dateSchedule + ' ' + data.end + ':00');
    if (start >= end) {
      this.toastService.show('Start can not be greater than or equal to end', 5000, 'red white-text');
      this.scheduleForm.reset();
    } else {
      this.showForm = false;
      this.schedule.start = start;
      this.schedule.end = end;
      this.schedule.title = data.activityTitle.text;
      const schedule = {
        end: this.schedule.end,
        place: this.schedule.place,
        start: this.schedule.start,
        user: this.schedule.user,
        title: this.schedule.title
      };
      this.subscription = this.scheduleService.validateSchedule(schedule)
        .subscribe(schedules => {
          if (schedules.length === 0) {
            this.newSchedule(schedule);
          } else {
            const periods = [];
            for (const entry of schedules) {
              periods.push({
                start: entry.data.start.toDate(),
                end: entry.data.end.toDate()
              });
            }
            const periodForCheck = {
              start: schedule.start,
              end: schedule.end
            };
            const valid = this.validatePeriod(periodForCheck, periods);
            if (valid) {
              this.newSchedule(schedule);
            } else {
              this.subscription.unsubscribe();
              this.toastService.show('Invalid period schedule!', 5000, 'red white-text');
              this.scheduleForm.reset();
              this.showForm = true;
            }
          }
        });
    }
  }

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }

  buildForm() {
    /!*this.scheduleForm = this.formBuilder.group({
        firstCtrl: ['', Validators.required],
        secondCtrl: ['', Validators.required],
        thirdCtrl: ['', Validators.required],
        fourthCtrl: ['', Validators.required],
        start: [null, Validators.compose([
          Validators.required
        ])],
        end: [null, Validators.compose([
          Validators.required
        ])],
        activity: [null, Validators.compose( [
          Validators.required,
          Validators.maxLength(64)
        ])],
        course: [null, Validators.compose([
          Validators.required
        ])],
        class: [null, Validators.compose([
          Validators.required
        ])],
        nteam: [null, Validators.compose([
          Validators.required
        ])],
        nstudent: [null, Validators.compose([
          Validators.required
        ])],
        subject: [null, Validators.compose([
          Validators.required
        ])]
      },
      {
        validator: InvalidPeriod(
          'start',
          'end',
          `${this.dateSchedule}`
        )
      }
    );*!/
    this.firstFormGroup = this.formBuilder.group({
      start: ['', Validators.required],
      end: ['', Validators.required],
      activity: ['', Validators.required],
      course: ['', Validators.required],
      class: ['', Validators.required],
      nteam: ['', Validators.required],
      nstudent: ['', Validators.required],
      subject: ['', Validators.required]
    }, {
      validator: InvalidPeriod(
        'start',
        'end',
        `${this.dateSchedule}`
      )
    });
    this.secondFormGroup = this.formBuilder.group({
      // secondCtrl: ['', Validators.required],
      // quantityMaterial: ['', Validators.required],
      item: ['', Validators.required],
      hasMaterial: [this.hasMaterial]
    });
    this.thirdFormGroup = this.formBuilder.group({
      thirdCtrl: ['', Validators.required]
    });
    this.fourthFormGroup = this.formBuilder.group({
      fourthCtrl: ['', Validators.required]
    });
  }

  addItem(item: object) {
    console.log('ITEM ADD:', item);
    this.arrMaterial.push(item);
    this.secondFormGroup.controls.item.reset();
  }

  clearArr() {
    this.arrMaterial = [];
  }

  delItem(item: object) {
    console.log('ITEM DEL:', item);
  }

  ngOnInit() {
    this.showForm = true;
    this.scheduleService.currentDate.subscribe(date => {
      if (date === null) {
        this.location.back();
      } else {
        this.dateSchedule = date;
        this.dateSchedule = new Date(
          this.dateSchedule.getFullYear(),
          this.dateSchedule.getMonth(),
          this.dateSchedule.getDate()
        ).toDateString();
      }
    });
    this.authenticationService.user.subscribe(user => this.schedule.user = user.uid);
    this.schedule.place = this.activatedRoute.snapshot.paramMap.get('id');
    this.scheduleService.getCourses().subscribe(courses => {
      this.courses = courses;
    });
    this.scheduleService.getClasses().subscribe(classes => {
      this.classes = classes;
    });
    this.scheduleService.getSubjects().subscribe(subjects => {
      this.subjects = subjects;
    });
    this.scheduleService.getItems().subscribe(items => {
      this.items = items;
      /!*const data = {};
      for (const entry of items) {
        data[entry.data.description] = null;
      }
      this.autocompleteMaterial = {data};*!/
    });
    this.scheduleService.getReagents().subscribe(reagents => {
      const data = {};
      for (const entry of reagents) {
        data[entry.data.reagent] = null;
      }
      this.autocompleteReagents = { data };
    });
    this.buildForm();
  }

}*/
