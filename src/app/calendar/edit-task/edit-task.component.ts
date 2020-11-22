import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {AddTaskComponent} from '../add-task/add-task.component';
import {CalendarService} from '../service/calendar.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {EditDayComponent} from "../edit-day/edit-day.component";

@Component({
  selector: 'aga-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})

export class EditTaskComponent implements OnInit {
  tasks: Array<any>;
  sizeOfTasks: number;
  constructor(@Inject(MAT_DIALOG_DATA) public day: any, private dialog: MatDialog,
              private calendarService: CalendarService, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.findTask();
  }

  findTask(): void {
    this.calendarService.getOneDay(this.day.year, this.day.month, this.day.dayOfMonth).subscribe(tasks => {
      this.sizeOfTasks = tasks.length;
      this.tasks = tasks;
    });
  }

  addTask(): void {
    const refAddTask = this.dialog.open(AddTaskComponent, {data: this.day});
    refAddTask.updatePosition({right: '100px'});

    refAddTask.afterClosed().subscribe(form => {
      if (form === false) {
        console.log('Zamkniecie addTask');
      } else {
        this.openSnackBar('Dodano zadanie do kalendarza.');
        console.log(form);
        this.calendarService.addTask(form).subscribe(result => {
          this.findTask();
        });
      }
    });
  }

  deleteTask(task: any): void {
    this.calendarService.deleteTaskById(task.taskId).subscribe(close => {
      this.findTask();
    }, error => {},
      () => {
        this.openSnackBar('Usunięto wydarzenie');
      });
  }

  public openSnackBar(message: string): void {
    this.snackBar.open(message, 'zamknij', {duration: 4000});
  }

  editTask(task: any): void {
    const refEditTask = this.dialog.open(EditDayComponent, {data: task});
    refEditTask.updatePosition({right: '100px'});
  }
}
