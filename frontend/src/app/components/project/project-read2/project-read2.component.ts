import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { BehaviorSubject } from 'rxjs';
import { Project } from '../project.model';
import { ProjectRead2DataSource, ProjectRead2Item } from './project-read2-datasource';

@Component({
  selector: 'app-project-read2',
  templateUrl: './project-read2.component.html',
  styleUrls: ['./project-read2.component.css']
})
export class ProjectRead2Component implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ProjectRead2Item>;
  dataSource: ProjectRead2DataSource;

  projects = new BehaviorSubject<Project[]>([])
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id','nome', 'situacao', 'viabilidade','dataInicio','dataFinal', "action"];

  ngOnInit() {
    this.dataSource = new ProjectRead2DataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
