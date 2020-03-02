import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  clienteForm:FormGroup;
  clienteId:number;
  constructor(
    private fb:FormBuilder,
    private clienteService: ClienteService,
    public dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.clienteForm = this.fb.group({
      nombre:['', Validators.required],
      app:['', Validators.required],
      apm:['', Validators.required],
      telefono:['', [Validators.required, Validators.pattern('[0-9]*')]],
      email:['', [Validators.required, Validators.email]],
      direccion:['', Validators.required]
    })

    if(this.data.action === 'editar') {
      const cliente = this.data.cliente;
      this.clienteId = cliente.id;

      this.clienteForm.setValue({
        nombre: cliente.nombre,
        app: cliente.app,
        apm: cliente.apm,
        telefono: cliente.telefono,
        email: cliente.email,
        direccion: cliente.direccion
      })
    }

  }

  onSubmit() {
    const cliente = Object.assign({}, this.clienteForm.value);

    switch (this.data.action) {
      case 'registrar':
        this.registrar(cliente)
        break;
      case 'editar':
        this.editar(cliente)
      default:
        break;
    }

  }

  registrar(cliente:any) {
    this.clienteService.create(cliente)
      .then((data) => {
        console.log("Creado correctamente...!", data);
        this.dialogRef.close();
      })
      .catch(err => console.error(err))

  }

  editar(cliente: any) {
    this.clienteService.update(this.clienteId, cliente)
      .then(data => {
        console.log("Actualizado...", data)
        this.dialogRef.close();
      })
      .catch(err => console.error(err))
  }
}
