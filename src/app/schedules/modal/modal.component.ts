import {Component, Input} from '@angular/core';
import { MzBaseModal } from 'ngx-materialize';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent extends MzBaseModal {

  // @Input() scheduleID: string;

  public modalOptions: Materialize.ModalOptions = {
    dismissible: false,
    opacity: 0.5,
    startingTop: '30%',
    endingTop: '20%',
    /*inDuration: 300, // Transition in duration
    outDuration: 200, // Transition out duration
    startingTop: '100%', // Starting top style attribute
    endingTop: '10%', // Ending top style attribute*/
    /*ready: (modal, trigger) => { // Callback for Modal open. Modal and trigger parameters available.
      alert('Ready');
      console.log(modal, trigger);
    },
    complete: () => { alert('Closed'); } // Callback for Modal close*/
  };

  /*setValueModal(value) {
    console.log(value);
  }*/

  // delete(scheduleId) { console.log(scheduleId); }

  public agreed: boolean;
  public inputValue: string;
  public inputLabel: string;
  public scheduleID: string;

  setModalAgreementValue(value: boolean, id?) {
    this.agreed = value;
    this.scheduleID = id;
  }


}
