import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {CalendarService} from '../service/calendar.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'aga-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {
  taskForm: FormGroup;
  correct = false;
  currentDate: Date;
  constructor(@Inject(MAT_DIALOG_DATA) public day: any, private fb: FormBuilder,
              private matSnackBar: MatSnackBar, private calendarService: CalendarService) {
    this.taskForm = fb.group({
      name: [, Validators.required],
      status: [, Validators.required],
      event: [, Validators.required],
      start: [, Validators.required],
      end: [, Validators.required]
    });
    this.currentDate = new Date();
    this.currentDate.setDate(this.day.dayOfMonth);
    this.currentDate.setFullYear(this.day.year);
    this.currentDate.setMonth(this.day.month);
    this.currentDate.setMilliseconds(0);
    this.currentDate.setSeconds(0);
    console.log(this.currentDate);
  }

  ngOnInit(): void {
  }

  checkData(): void {
    if (this.taskForm.valid) {
      console.log('Valid');
    }
  }

  inputStart(): void {
    const newStart = new Date();
    newStart.setFullYear(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate());
    newStart.setHours(this.taskForm.controls.start.value.getHours(), this.taskForm.controls.start.value.getMinutes());
    this.taskForm.controls.start.setValue(newStart);

    if (!this.checkCorrect()) {
      this.taskForm.controls.start.setValue(null);
      console.log('Blad');
    }
  }

  inputEnd(): void {
    const newEnd = new Date();
    newEnd.setFullYear(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate());
    newEnd.setHours(this.taskForm.controls.end.value.getHours(), this.taskForm.controls.end.value.getMinutes());
    this.taskForm.controls.end.setValue(newEnd);

    if (!this.checkCorrect()) {
      this.taskForm.controls.end.setValue(null);
      console.log('Blad');
    }
  }

  private checkCorrect(): boolean {
    if (this.taskForm.controls.start.value !== null && this.taskForm.controls.end.value !== null) {

      this.calendarService.checkCorrectTime(this.taskForm.value).subscribe(r => {
        if (r !== null) {
          console.log(r);
          const dateS = new Date(r.start);
          const dateE = new Date(r.end);

          this.correct = false;
          this.openSnackBar('Od ' + dateS.getHours() + ':' + dateS.getMinutes() +
            ' do ' + dateE.getHours() + ':' + dateE.getMinutes() + ' jest już wydarzenie');
        }
      });

      if (this.taskForm.controls.start.value > this.taskForm.controls.end.value) {
        this.correct = false;
        this.openWarnSnackBar('Data zakończenia nie może być wcześniejsza niż rozpoczęcia.');
        return false;
      } else {
        this.correct = true;
      }
    }

    return true;
  }

  private openWarnSnackBar(message: string): void {
    this.matSnackBar.open(message, 'zamknij', {duration: 10000,
      panelClass: ['mat-toolbar', 'mat-warn']});
  }

  private openSnackBar(message: string): void {
    this.matSnackBar.open(message, 'zamknij', {duration: 4000});
  }
}
