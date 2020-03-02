import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {FormBuilder, FormArray, Validators, FormGroup} from '@angular/forms';
import {ClienteService} from '../../services/cliente.service';
import {AtencionService} from '../../services/atencion.service';
import {ProductoService} from '../../services/producto.service';
import {DetalleAtencionService} from '../../services/detalle-atencion.service';
import {faCoffee, faMoneyBill, faPencilAlt, faWindowClose} from '@fortawesome/free-solid-svg-icons';
import {catchError} from 'rxjs/operators';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  icons = {
    faWindowClose
  };
  mensajes: any = {
    success: {
      status : false,
      mensaje: '',
    },
    warning: {
      status : false,
      mensaje: '',
    },
    danger: {
      status : false,
      mensaje: '',
    }};
  clientes: any = []; // autocomplete cliente
  step = 0;
  atencion: any = {
    cliente: {
      nombre: '',
      app: '',
      apm: ''
    },
    detalles: []
    }; // atencion registrada
  productosSinFiltrar: any = []; // autocomplete producto
  action = 'registrar';
  atencionForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private atencionService: AtencionService,
    private productoService: ProductoService,
    private detalleAtencionService: DetalleAtencionService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  ngOnInit() {
    this.inicializeForm();
    switch (this.data.action) {
      case 'editar':
        this.atencion.id = this.data.atencionId;
        this.processToEdit();
        break;
      case 'registrar':
        this.atencion = {detalles: []};
        break;
      case 'pagar':
        this.atencion.id = this.data.atencionId;
        this.processToEdit();
        this.step = 1;
        break;
    }
  }
  inicializeForm() {
    this.atencionForm = this.fb.group({
      cliente: ['', Validators.required],
      detalles: this.fb.array([], Validators.required)
    });

    this.atencionForm.controls.cliente.valueChanges
      .subscribe((search: string) => {
        if (!search) {
          return;
        }
        if (search.length > 2) {
          this.clienteService.getAll({search})
            .then((dataReceived: any) => {
              this.clientes = dataReceived.rows;
            });
        }
      });
  }
  processToEdit() {
    return this.getAtencion(true);
  }
  displayFn(cliente?: any): string | undefined {
    return cliente ? `${cliente.nombre} ${cliente.app} ${cliente.apm}` : undefined;
  }
  displayFnProducto(producto?: any): string | undefined {
    return producto ? producto.nombre : undefined;
  }
  get detalles() {
    return this.atencionForm.get('detalles') as FormArray;
  }
  get productos() {
    const productosAsignados = this.detalles.value
      .filter(detalle => detalle.producto && detalle.producto.hasOwnProperty('id'))
      .map(detalle => detalle.producto.id);
    return this.productosSinFiltrar
      .filter(producto => productosAsignados.indexOf(producto.id) === -1);
  }
  addDetalle() {
    this.detalles.push(this.fb.group({
      cantidad: [1 , [Validators.required, Validators.min(0)]],
      producto: ['', Validators.required]
    }));
    this.setAutoCompleteProducto(this.detalles.length - 1 );
  }
  deleteDetalle(i) {
    this.detalles.removeAt(i);
  }
  setForm() {
    const detalles = this.atencion.detalles.map(detalle => {
      return {
        producto: detalle.producto,
        cantidad: detalle.cantidad
      };
    });
    this.atencion.detalles.forEach(() => this.addDetalle());
    const formValue = {
      cliente: this.atencion.cliente,
      detalles
    };
    this.atencionForm.setValue(formValue);
  }
  getAtencion(set?: boolean) {
    return this.atencionService.getById(this.atencion.id)
      .then(data => {
        this.atencion = data;
        if (set) {
          this.setForm();
        }
      });
  }

  setMensaje(tipo, mensaje) {
    this.mensajes[tipo].mensaje = mensaje;
    this.mensajes[tipo].status = true;
    setTimeout(()=> {//espera por 4 segundos para desabilitar el mensaje
      this.mensajes[tipo].status = false
    },4000);
  }
  setAutoCompleteProducto(index) {
    this.detalles.at(index).get('producto').valueChanges
      .subscribe((search: string) => {
        if (!search) {
          return;
        }
        if (search.length > 2) {
          this.productoService.getAll({search})
            .then((dataReceived: any) => {
              this.productosSinFiltrar = dataReceived.rows;
            });
        }
      });
  }
  registerDetalle(atencionId: number) {
    let detalles = this.detalles.value;
    detalles = detalles
      .filter(detalle => {
        const value = this.atencion.detalles
          .find(detalleExistentes => detalleExistentes.productoId === detalle.producto.id);
        return value === undefined;
      })
      .map(detalle => {
      detalle.productoId = detalle.producto.id;
      detalle.atencionId = atencionId;
      detalle.precio = detalle.producto.precio;
      detalle.total = detalle.precio * detalle.cantidad;
      delete detalle.producto;

      return detalle;
    });
    return this.detalleAtencionService.create(detalles)
      .then(() => {
        return this.getAtencion();
      });
  }
  removeDetalles() {
    const detalles = this.detalles.value;
    const detallesRemovidos = this.atencion.detalles
      .filter(detalle => {
        const value = detalles
          .find(formDetalle => formDetalle.producto.id === detalle.productoId);
        return value === undefined;
    });
    if (detallesRemovidos.length < 1) {
      return Promise.resolve();
    }
    const operations = [];
    detallesRemovidos.forEach(det => {
      operations.push(this.detalleAtencionService.delete(det.id));
    });

    return Promise.all(operations)
      .then(() => {
        return this.getAtencion(false);
      });
  }

  updateDetalles() {
    const detalles = this.detalles.value;
    const detallesCambiados = detalles.filter(detalle => {
      const value = this.atencion.detalles
        .find(guardados => guardados.producto.id === detalle.producto.id && guardados.cantidad === detalle.cantidad);
      return value === undefined;
    });

    if (detallesCambiados.length < 1) {
      return Promise.resolve();
    }
    console.log("detalles",detallesCambiados)
    const operations = [];
    detallesCambiados.forEach(det => {
      const cambios = {
        cantidad: det.cantidad,
        total: det.cantidad*det.producto.precio,
        precio: det.producto.precio
      }
      operations.push(this.detalleAtencionService.update(this.atencion.id ,det.producto.id, cambios));
    });

    return Promise.all(operations)
      .then(() => {
        return this.getAtencion(false);
      });
  }
  onSubmit() {
    switch (this.data.action) {
      case 'registrar':
        this.register()
          .then(() => {
            this.setMensaje('success','Se registro exitosamente.');
            this.data.action = 'editar';
            this.inicializeForm();
            this.processToEdit().then(() => console.log('processToEdit'));
          })
          .catch((err)=> {
            console.log(err);
            this.setMensaje('danger','Error al registrar.');
          });
        break;
      case 'pagar':
      case 'editar' :
        this.edit()
          .then(() => {
            this.setMensaje('success','Se actualizo exitosamente.');
            this.inicializeForm();
            this.processToEdit().then(() => console.log('processToEdit'));
          })
          .catch((err)=> {
            console.log(err);
            this.setMensaje('danger','Error al actualizar.');
          });
        break;
    }
  }
  register() {

    const atencion = Object.assign({}, this.atencionForm.value);
    atencion.clienteId = atencion.cliente.id;
    delete atencion.detalles;
    delete atencion.cliente;
    return this.atencionService.create(atencion)
      .then((newAtencion:any) => {
        this.atencion = Object.assign(this.atencion, newAtencion);
        return this.registerDetalle(newAtencion.id);
      })
      .then(() => {
        return this.updateTotalAtencion();
      })
      .catch(err => console.error("eorr",err));
  }
  edit() {
    const clienteId = this.atencionForm.value.cliente.id;
    let atencion = {};
    if (clienteId !== this.atencion.cliente.id) {
      atencion = { clienteId };
    }

    return this.atencionService.update(this.atencion.id, atencion)
      .then(() => {
        this.atencion.cliente = this.atencionForm.value.cliente;
      })
      .then(() => {
        return this.removeDetalles();
      }).then( () => {
        return this.updateDetalles();
      })
      .then(() => {
        return this.registerDetalle(this.atencion.id);
      })
      .then(() => {
        return this.updateTotalAtencion();
      });
  }
  updateTotalAtencion() {
    return this.atencionService.updateTotal(this.atencion.id);
  }
  pagado() {
    this.getAtencion()
      .then(() => console.log('actualiza atencion despues de pagar'))
      .catch(err => console.error(err));
  }

}
