import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../services/cliente.service';
import { MatDialog } from '@angular/material';
import { FormComponent } from './form/form.component';
import { faPencilAlt, faWindowClose } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent implements OnInit {

  dataSource:any = [];
  page:number = 1;
  pageSize:number = 10;
  dataLength: number = 0;
  displayedColumns: string[] = ['id','nombre', 'app', 'apm', 'email', 'createdAt', 'action'];
  icons = {
    faPencilAlt,
    faWindowClose
  };
  constructor(
    private clienteService: ClienteService,
    private dialog:MatDialog
  ) { }

  ngOnInit() {
    this.getList();
  }
  paginate(event){
    this.page =event.pageIndex +1;
    this.pageSize = event.pageSize
    this.getList();
  }
  getList() {
    this.clienteService.getAll({page: this.page, pageSize: this.pageSize})
      .then((data:any) => {
        this.dataSource = data.rows;
        this.dataLength = data.count;
      })
      .catch(error => console.log(error));
  }

  newForm() {
    const dialogRef = this.dialog.open(FormComponent , {
      minWidth: '500px',
      width: '500px',
      maxHeight : '600px',
      data: {
        action : 'registrar'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed: desde Registrar', result);
      this.getList();

    });

  }

  editarForm(cliente) {
    const dialogRef = this.dialog.open(FormComponent , {
      minWidth: '500px',
      width: '500px',
      maxHeight : '600px',
      data: {
        action : 'editar',
        cliente
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed: desde Editar', result);
      this.getList();

    });

  }

  eliminar(clienteId) {
    this.clienteService.delete(clienteId)
      .then(() => {
        console.log(`eliminado cliente con id : ${clienteId}`);
        this.getList();
      })
      .catch(err => console.error(err));
  }

}
