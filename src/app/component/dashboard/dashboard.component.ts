import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/model/task';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  taskObj: Task = new Task();
  taskArr: Task[] = [];
  addTaskValue: string = '';
  editTaskValue: string = '';

  constructor(private crudService: CrudService) { }

  ngOnInit(): void {
    this.editTaskValue = '';
    this.addTaskValue = '';
    this.taskObj = new Task();
    this.taskArr = [];
    this.getAllTasks();
  }

  getAllTasks() {
    this.crudService.getAllTasks().subscribe({
      next: (res) => this.taskArr = res, 
      error: (err) => alert('Unable to get list of tasks')
    });
  }

  addTask() {
    this.taskObj.taskName = this.addTaskValue;
    this.crudService.addTask(this.taskObj).subscribe({
      next: (res) => {
        this.ngOnInit();
        this.addTaskValue = '';
      }, 
      error: (err) => alert('Unable to get list of tasks')
    });
  }

  editTask() {
    this.taskObj.taskName = this.editTaskValue;
    this.crudService.editTask(this.taskObj).subscribe({
      next: (res) => this.ngOnInit(),
      error: (err) => alert('Failed to update task')
    });
  }

  deleteTask(task: Task) {
    this.crudService.deleteTask(task).subscribe({
      next: (res) => this.ngOnInit(),
      error: (err) => alert('Failed to delete task')
    });
  }

  call(task: Task) {
    this.taskObj = task;
    this.editTaskValue = task.taskName;
  }

}
