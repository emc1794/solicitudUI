import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductoRoutingModule } from './producto-routing.module';
import { ProductoComponent } from './producto.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './form/form.component';


@NgModule({
  declarations: [ProductoComponent, FormComponent],
  entryComponents: [FormComponent],
  imports: [
    CommonModule,
    ProductoRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class ProductoModule { }
