import { Component, OnInit } from '@angular/core';
import { AtencionService } from 'src/app/services/atencion.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  dataSource:Array<any>;
  dataLength:number;
  displayedColumns: string[] = ['id', 'total', 'estado', 'createdAt'];
  constructor(
    private atencionService:AtencionService
  ) {
    this.dataSource = [];
    this.dataLength = 0;
   }

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.atencionService.getAll()
    .then(data => {
      this.dataSource = data.rows;
      this.dataLength = data.count;
    })
    .catch(error => console.log(error))
  }

}
