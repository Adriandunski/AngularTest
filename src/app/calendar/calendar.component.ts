import { Component, OnInit } from '@angular/core';
import {MediaChange, MediaObserver} from '@angular/flex-layout';
import {filter, map} from 'rxjs/operators';
import {CalendarService} from './service/calendar.service';
import {MatDialog} from '@angular/material/dialog';
import {EditTaskComponent} from './edit-task/edit-task.component';

@Component({
  selector: 'aga-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  date: Date;
  pc: boolean;
  spaces: Array<number>;
  days: any;
  dayNames = ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela'];
  nameOfMonth: string;

  constructor(private mediaObserver: MediaObserver, private calendarService: CalendarService, private dialog: MatDialog) {
    mediaObserver.asObservable().pipe(
      filter((changes: MediaChange[]) => changes.length > 0),
      map((change: MediaChange[]) => change[0]),
      map(mc => {
        if (mc.mqAlias === 'xs' || mc.mqAlias === 'sm') {
          return false;
        } else {
          return true;
        }
      })).subscribe(value => {
      this.pc = value;
    });
  }

  ngOnInit(): void {
    this.date = new Date();
    this.loadMonth();
  }

  private loadMonth(): void {
    this.calendarService.getMonthWithDays(this.date.getFullYear(), this.date.getMonth()).subscribe(month => {
      this.spaces = Array(month.spaces).fill(0).map((x, i) => i);
      console.log(month.days);
      this.days = month.days;
      this.nameOfMonth = month.nameOfMonth;
    });
  }

  previousMonth(): void {
    this.date.setMonth(this.date.getMonth() - 1);
    console.log(this.date);
    this.loadMonth();
  }
  nextMonth(): void{
    this.date.setMonth(this.date.getMonth() + 1);
    this.loadMonth();
  }

  routerTo(day: any): void {
    const refDialogEdit = this.dialog.open(EditTaskComponent, {data: day});

    refDialogEdit.afterClosed().subscribe(c => {
      this.loadMonth();
    });
  }
}
