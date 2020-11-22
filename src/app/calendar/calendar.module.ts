import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarComponent } from './calendar.component';
import {MatIconModule} from '@angular/material/icon';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatGridListModule} from '@angular/material/grid-list';
import { EditTaskComponent } from './edit-task/edit-task.component';
import {MatInputModule} from '@angular/material/input';
import {OwlDateTimeIntl, OwlDateTimeModule} from 'ng-pick-datetime';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatButtonModule} from "@angular/material/button";
import { AddTaskComponent } from './add-task/add-task.component';
import {MatDialogModule} from "@angular/material/dialog";
import {ReactiveFormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import { EditDayComponent } from './edit-day/edit-day.component';

export class DefaultIntl extends OwlDateTimeIntl {
  /** A label for the cancel button */
  cancelBtnLabel = 'Zamknij';

  /** A label for the set button */
  setBtnLabel = 'Ustaw';
}

@NgModule({
  declarations: [CalendarComponent, EditTaskComponent, AddTaskComponent, EditDayComponent],
    imports: [
        CommonModule,
        CalendarRoutingModule,
        MatIconModule,
        FlexLayoutModule,
        MatGridListModule,
        MatInputModule,
        OwlDateTimeModule,
        MatDatepickerModule,
        MatButtonModule,
        MatDialogModule,
        ReactiveFormsModule,
        MatSelectModule
    ],
  providers: [{provide: OwlDateTimeIntl, useClass: DefaultIntl}]
})
export class CalendarModule { }
