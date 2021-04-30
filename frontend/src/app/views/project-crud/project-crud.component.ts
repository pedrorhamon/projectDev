import { HeaderService } from './../../components/template/header/header.service';
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'

@Component({
  selector: 'app-project-crud',
  templateUrl: './project-crud.component.html',
  styleUrls: ['./project-crud.component.css']
})
export class ProjectCrudComponent implements OnInit {

  constructor(private router: Router, private headerService: HeaderService) { 
    headerService.headerData = {
      title: 'Cadastro de Projetos',
      icon: 'work',
      routeUrl: '/projects'
    }
  }

  ngOnInit(): void {
  }
  
  navigateToProjectCreate(): void{
    this.router.navigate(['/projects/create'])

  }
  }


