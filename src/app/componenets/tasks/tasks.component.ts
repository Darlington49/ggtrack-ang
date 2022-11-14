import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/model/Task';
import { RestApiService } from 'src/app/services/rest-api.service';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {


  tasks: Task[] = [];

  constructor(private restApiService: RestApiService) { }

  ngOnInit(): void {
    // this.restApiService.getTasks().subscribe((tasks) => {
    //   this.tasks = tasks;
    //   console.log(tasks)
    // });
  }


}


