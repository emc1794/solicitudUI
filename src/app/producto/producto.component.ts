import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../services/producto.service';
import { MatDialog } from '@angular/material';
import { FormComponent } from './form/form.component';
import { faPencilAlt, faWindowClose } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.scss']
})
export class ProductoComponent implements OnInit {

  page:number = 1;
  pageSize:number = 10;
  dataSource:any = [];
  dataLength:number = 0;
  displayedColumns: string[] = ['id','nombre', 'tipo', 'precio', 'precio1', 'createdAt', 'action'];
  icons = {
    faPencilAlt,
    faWindowClose
  };
  constructor(
    private productoService: ProductoService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getList()
  }

  paginate(event){
    this.page =event.pageIndex +1;
    this.pageSize = event.pageSize
    this.getList();
  }

  getList() {
    const option = {
      'page':this.page,
      'pageSize':this.pageSize
    };

    this.productoService.getAll(option)
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

  editarForm(producto) {
    const dialogRef = this.dialog.open(FormComponent , {
      minWidth: '500px',
      width: '500px',
      maxHeight : '600px',
      data: {
        action : 'editar',
        producto
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed: desde Editar', result);
      this.getList();

    });

  }

  eliminar(productoId) {
    this.productoService.delete(productoId)
      .then(() => {
        console.log(`eliminado producto con id : ${productoId}`);
        this.getList();
      })
      .catch(err => console.error(err));
  }

}
