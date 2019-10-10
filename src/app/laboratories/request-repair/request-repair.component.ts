import { Component, OnInit } from '@angular/core';
import { LaboratoriesService } from '../laboratories.service';
import {AppService} from '../../app.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MzToastService} from 'ngx-materialize';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-request-repair',
  templateUrl: './request-repair.component.html',
  styleUrls: ['./request-repair.component.scss']
})
export class RequestRepairComponent implements OnInit {

  repairForm: FormGroup;

  showSpinner: boolean;

  showComment: boolean;

  laboratoryID;

  uuid;

  agree: boolean;

  errorMessageResources = {
    comment: {
      required: 'Comment is required.',
      minlength: 'Cannot be less than 50 characters.',
      maxlength: 'It can not be longer than 100 characters.'
    },
    agree: {
      required: 'Is required.',
    }
  };

  constructor(
    private laboratoriesService: LaboratoriesService,
    private appService: AppService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastService: MzToastService,
    private formBuilder: FormBuilder,

  ) { console.log('RepairComponent'); }

  ngOnInit() {
    this.buildForm();
    this.laboratoryID = this.activatedRoute.snapshot.params.id;
    this.showSpinner = false;
    this.showComment = false;
  }

  buildForm() {
    this.repairForm = this.formBuilder.group({
      comment: [null, Validators.compose([
        Validators.required,
        Validators.minLength(50),
        Validators.maxLength(100)
      ])],
      agree: [this.agree]
    });
  }

  scanSuccess(uuid) {
    this.showComment = !this.showComment;
    this.uuid = uuid;
  }

  onSubmit() {
    this.showSpinner = !this.showSpinner;
    const comment = this.repairForm.value;
    this.laboratoriesService
      .repairComputer(`${this.laboratoryID}`, `${this.uuid}`, `${comment}`)
      .then(res => {
        if (res) {
          this.showSpinner = !this.showSpinner;
          this.router.navigate(['home']).catch(err => err.message);
          this.toastService.show('Open call successfully.', 5000, 'green white-text center');
        } else {
          this.router.navigate(['laboratories/laboratory-list']).catch(err => err.message);
          this.showSpinner = !this.showSpinner;
          this.toastService.show('The document does not exist or is already in maintenance.', 5000, 'red darken-3 white-text center');
        }
      })
      .catch(err => err.message);
  }
}
