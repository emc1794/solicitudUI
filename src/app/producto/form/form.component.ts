import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ProductoService } from 'src/app/services/producto.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  productoForm:FormGroup;
  productoId:number;
  constructor(
    private fb:FormBuilder,
    private productoService: ProductoService,
    public dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.productoForm = this.fb.group({
      nombre:['', Validators.required],
      tipo:['', Validators.required],
      precio:['', Validators.required],
      precio1:['', [Validators.required]]
    })

    if(this.data.action === 'editar') {
      const producto = this.data.producto;
      this.productoId = producto.id;

      this.productoForm.setValue({
        nombre: producto.nombre,
        tipo: producto.tipo,
        precio: producto.precio,
        precio1: producto.precio1
      })
    }

  }

  onSubmit() {
    const producto = Object.assign({}, this.productoForm.value);

    switch (this.data.action) {
      case 'registrar':
        this.registrar(producto)
        break;
      case 'editar':
        this.editar(producto)
      default:
        break;
    }

  }

  registrar(producto:any) {
    this.productoService.create(producto)
      .then((data) => {
        console.log("Creado correctamente...!", data);
        this.dialogRef.close();
      })
      .catch(err => console.error(err))

  }

  editar(producto: any) {
    this.productoService.update(this.productoId, producto)
      .then(data => {
        console.log("Actualizado...", data)
        this.dialogRef.close();
      })
      .catch(err => console.error(err))
  }

}
