import { Project } from './../project.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from './../project.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-project-update',
  templateUrl: './project-update.component.html',
  styleUrls: ['./project-update.component.css']
})
export class ProjectUpdateComponent implements OnInit {
project: Project

  constructor(
    private projectService: ProjectService, 
    private router: Router, 
    private route: ActivatedRoute) { }

  ngOnInit(): void {
   const id = this.route.snapshot.paramMap.get('id')
   this.projectService.readById("id").subscribe((project) =>{
    this.project = project
   });
  }

  updateProject(): void{
    this.projectService.update(this.project).subscribe(()=>{
      this.projectService.showMessage("Projeto atualizado com sucesso!")
      this.router.navigate(["/projects"]);
    })
    

  }

  cancelProject(): void{
    this.router.navigate(['/projects']);
  }

}
