import { Component, OnInit } from '@angular/core';
import {AtencionService} from '../services/atencion.service';
import {MatDialog} from '@angular/material';
import {FormComponent} from './form/form.component';
import { faCoffee , faPencilAlt, faMoneyBill, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import {DatePipe, formatDate} from '@angular/common';

@Component({
  selector: 'app-atencion',
  templateUrl: './atencion.component.html',
  styleUrls: ['./atencion.component.scss']
})
export class AtencionComponent implements OnInit {
  icons = {
    faCoffee,
    faPencilAlt,
    faMoneyBill,
    faWindowClose
  };
  dataSource: Array<any>;
  dataLength: number;
  displayedColumns: string[] = ['id','cliente', 'total', 'estado', 'createdAt', 'action'];
  constructor(
    private atencionService: AtencionService,
    private dialog: MatDialog
  ) {
    this.dataSource = [];
    this.dataLength = 0;
  }

  ngOnInit() {
    this.getList();
  }
  getList() {
    this.atencionService.getAll()
      .then((data:any) => {
        this.dataSource = data.rows;
        this.dataLength = data.count;
      })
      .catch(error => console.log(error));
  }

  eliminar(id) {
    this.atencionService.delete(id)
      .then(() => {
        console.log('eliminado');
        this.getList();
      })
      .catch(err => console.error(err));
  }

  print() {
    const doc = new jsPDF();
    const data = this.dataSource.map(item => {
      return {
        id: item.id,
        total: item.total,
        cliente: `${item.cliente.nombre} ${item.cliente.app} ${item.cliente.apm}`,
        createdAt: formatDate(item.createdAt, 'dd-mm-yyyy h:mm a', 'en') };
    });

    const now = formatDate(new Date(), 'dd-mm-yyyy h:mm a', 'en');
    doc.text(`Listado de Atenciones | ${now}`, 14 , 20);
    doc.autoTable({
      columnStyles: { id: { fontStyle: 'bold' , fillColor: [41, 128, 185], textColor: 255} },
      startY: 25,
      head: [
        {id: 'ID', cliente: 'Cliente' ,total: 'Total', createdAt: 'fecha'}],
      body: data,
      // Will override document and global head styles
      headStyles: { fillColor: [231, 76, 60] },
      theme: 'grid'
    });

    doc.save('table.pdf');
  }

  editar(id) {
    const dialogRef = this.dialog.open(FormComponent , {
      minWidth: '800px',
      width: '900px',
      maxHeight : '600px',
      data: {
        action : 'editar',
        atencionId: id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed: desde Editar', result);
      this.getList();

    });
  }
  pagar(id) {
    const dialogRef = this.dialog.open(FormComponent , {
      minWidth: '800px',
      width: '900px',
      maxHeight : '600px',
      data: {
        action : 'pagar',
        atencionId: id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed: desde Pagar', result);
      this.getList();

    });
  }
  newForm() {
    const dialogRef = this.dialog.open(FormComponent , {
      minWidth: '800px',
      width: '900px',
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
}
