import { Router } from '@angular/router';
import { ProjectService } from './../project.service';
import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { Project } from '../project.model';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.css']
})
export class ProjectCreateComponent implements OnInit {

  project: Project = {
    nome:'',
    situacao: '',
    viabilidade:0,
    dataInicio: '',
    dataFinal: ''
  }

  constructor(private projectService: ProjectService, 
    private router: Router) { }

  ngOnInit(): void {
  }

  createProject(): void{
    this.projectService.create(this.project).subscribe(() =>{
      this.projectService.showMessage('Cadastro Realizado Com Sucesso!!')
      this.router.navigate(['/projects'])
    })
  }

  cancelProject(): void{
    this.router.navigate(['/projects'])
  }

}
