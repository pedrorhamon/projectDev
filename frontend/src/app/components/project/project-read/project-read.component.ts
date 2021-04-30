import { Project } from './../project.model';
import { ProjectService } from './../project.service';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-project-read',
  templateUrl: './project-read.component.html',
  styleUrls: ['./project-read.component.css']
})
export class ProjectReadComponent implements OnInit {
 
  projects = new BehaviorSubject<Project[]>([])
  displayedColumns = ['id','nome', 'situacao', 'viabilidade','dataInicio','dataFinal', "action"]

  constructor(private projectService: ProjectService) { }
  
  
  ngOnInit(): void {
    this.projectService.read().subscribe(projects => {
      this.projects.next(projects);
      console.log(this.projects);
    })
  }
}
