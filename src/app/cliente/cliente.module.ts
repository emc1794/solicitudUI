import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClienteRoutingModule } from './cliente-routing.module';
import { ClienteComponent } from './cliente.component';
import { MaterialModule } from '../material.module';
import { FormComponent } from './form/form.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ClienteComponent, FormComponent],
  entryComponents: [FormComponent],
  imports: [
    CommonModule,
    ClienteRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class ClienteModule { }
