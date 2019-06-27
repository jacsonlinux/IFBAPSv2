import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'angular-calendar';
import { CalendarHeaderComponent } from './calendar-header.component';
import { MzButtonModule, MzIconMdiModule, MzNavbarModule } from 'ngx-materialize';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, FormsModule, CalendarModule, MzButtonModule, MzIconMdiModule, MzNavbarModule, RouterModule],
  declarations: [CalendarHeaderComponent],
  exports: [CalendarHeaderComponent]
})
export class UtilsModule {}
