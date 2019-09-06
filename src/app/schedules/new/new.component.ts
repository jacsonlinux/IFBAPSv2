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
  selectReagent;
  selectEquipment;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;

  classes;
  courses;
  subjects;
  items;
  equipments;
  reagents;

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
    reagent: {
      required: 'Reagent required',
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

  autocompleteItems;
  autocompleteReagents;
  autocompleteEquipments;

  /*needMaterial;
  needReagent;
  needEquipment;*/

  arrItems = [];
  arrReagents = [];
  arrEquipments = [];

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

  public modalOptions: Materialize.ModalOptions = {
    dismissible: false,
    opacity: .5,
    inDuration: 100,
    outDuration: 100
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
      needMaterial: [false],
      item: [''],
      quantity: [''],
    });
    this.thirdFormGroup = this.formBuilder.group({
      reagent: ['', Validators.required],
      needReagent: [false]
    });
    this.fourthFormGroup = this.formBuilder.group({
      equipment: ['', Validators.required],
      needEquipment: [false]

    });

    this.secondFormGroup
      .get('needMaterial')
      .valueChanges.subscribe((checked: boolean) => {
      if (!checked) {
        this.arrItems = [];
      }
    });

    this.thirdFormGroup
      .get('needReagent')
      .valueChanges.subscribe((checked: boolean) => {
      if (!checked) {
        this.arrReagents = [];
      }
    });

    this.fourthFormGroup
      .get('needEquipment')
      .valueChanges.subscribe((checked: boolean) => {
      if (!checked) {
        this.arrEquipments = [];
      }
    });

  }

  findKey(obj: object, value: string) {
    for (const key in obj) {
      if (key === value) {
        return true;
      }
    }
    return false;
  }

  addItem(item: {description, quantity}) {
    console.log(item);
    if (this.findKey(this.autocompleteItems.data, item.description)) {
      const index = this.arrItems
        .findIndex(res => {
          return res.description === item.description;
        });
      if (index > -1) {
        this.secondFormGroup.controls.item.reset();
        this.secondFormGroup.controls.quantity.reset();
        this.toastService.show(
          'Already added',
          2000,
          'orange darken-4 white-text center');
      } else {
        this.arrItems.push(item);
        this.secondFormGroup.controls.item.reset();
        this.secondFormGroup.controls.quantity.reset();
        this.toastService.show(
          'Item added',
          2000,
          'green darken-4 white-text center');
      }
    } else {
      this.secondFormGroup.controls.item.reset();
      this.toastService.show(
        'This does not exist database',
        2000,
        'red darken-4 white-text center');
    }
  }

  delItem(item) {
    const index = this.arrItems.indexOf(item);
    if (index !== -1) {
      this.arrItems.splice(index, 1);
      this.toastService.show('Item removed', 2000, 'red darken-4 white-text center');
    }
  }

  addReagent(reagent) {
    if (this.findKey(this.autocompleteReagents.data, reagent.description)) {
      const index = this.arrReagents
        .findIndex(res => {
          return res.description === reagent.description;
        });
      if (index > -1) {
        this.toastService.show(
          'Already added',
          2000,
          'orange darken-4 white-text center');
      } else {
        this.arrReagents.push(reagent);
        this.thirdFormGroup.controls.concentration.reset();
        this.thirdFormGroup.controls.reagent.reset();
        this.toastService.show(
          'Reagent added',
          2000,
          'green darken-4 white-text center');
      }
    } else {
      this.thirdFormGroup.controls.reagent.reset();
      this.toastService.show(
        'This does not exist database',
        2000,
        'red darken-4 white-text center');
      return false;
    }

  }

  delReagent(reagent) {
    const index = this.arrReagents.indexOf(reagent);
    if (index !== -1) {
      this.arrReagents.splice(index, 1);
      this.toastService.show('Item removed', 2000, 'red darken-4 white-text center');
    }
  }

  addEquipment(equipment) {
    if (this.findKey(
      this.autocompleteEquipments.data,
      equipment.description)) {
      const index = this.arrEquipments
        .findIndex(res => {
          return res.description === equipment.description;
        });
      if (index > -1) {
        this.toastService.show(
          'Already added',
          2000,
          'orange darken-4 white-text center');
      } else {
        this.arrEquipments.push(equipment);
        this.fourthFormGroup.controls.equipment.reset();
        this.toastService.show(
          'Equipment added',
          2000,
          'green darken-4 white-text center');
      }
    } else {
      this.fourthFormGroup.controls.equipment.reset();
      this.toastService.show(
        'This does not exist database',
        2000,
        'red darken-4 white-text center');
    }
  }

  delEquipment(equipment) {
    const index = this.arrEquipments.indexOf(equipment);
    if (index !== -1) {
      this.arrEquipments.splice(index, 1);
      this.toastService.show('Equipment removed', 2000, 'red darken-4 white-text center');
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
      const data = {};
      for (const entry of items) {
        data[entry.data.description.toUpperCase()] = null;
      }
      this.autocompleteItems = { data, limit: 10};
    });
    this.scheduleService.getReagents().subscribe(reagents => {
      this.reagents = reagents;
      const data = {};
      for (const entry of reagents) {
        data[entry.data.description.toUpperCase()] = null;
      }
      this.autocompleteReagents = { data, limit: 10 };
    });
    this.scheduleService.getEquipaments().subscribe(res => {
      this.equipments = res;
      const data = {};
      for (const entry of this.equipments) {
        data[entry.data.description.toUpperCase()] = null;
      }
      this.autocompleteEquipments = { data, limit: 10};
    });
    this.buildForm();
  }

}
