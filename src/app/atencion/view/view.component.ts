import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PagoService} from '../../services/pago.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit , OnChanges {
  @Input() atencion: any;
  @Output() pagado = new EventEmitter();
  efectivo = 0;
  cambio = 0;
  pago: FormGroup;
  constructor(
    private fb: FormBuilder,
    private pagoService: PagoService) { }

  ngOnInit() {
  }

  ngOnChanges() {

    const total = this.atencion.total;
    if (this.atencion.pago) {
      this.cambio = this.atencion.pago.cambio;
    }
    this.pago = this.fb.group({
      efectivo: [this.efectivo, [Validators.min(total), Validators.required]]
    });

    this.pago.controls.efectivo.valueChanges
      .subscribe((cantidad) => {
        if (!cantidad) {
          return;
        }
        this.cambio = cantidad - total;
      });
  }
  onSubmitPago() {
    const pago = {
      atencionId: this.atencion.id,
      cambio: this.cambio,
      total: this.atencion.total,
    };
    this.pagoService.create(pago)
      .then(newData => {
        console.log(newData);
        this.pagado.emit();
      })
      .catch(err => console.error(err));
  }
}
