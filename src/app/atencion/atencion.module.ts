import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AtencionRoutingModule } from './atencion-routing.module';
import { FormComponent } from './form/form.component';
import { AtencionComponent } from './atencion.component';
import {ReactiveFormsModule} from '@angular/forms';
import { ViewComponent } from './view/view.component';
import { MaterialModule } from '../material.module';


@NgModule({
  declarations: [
    FormComponent,
    AtencionComponent,
    ViewComponent
  ],
  entryComponents: [
    FormComponent
  ],
  imports: [
    CommonModule,
    AtencionRoutingModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class AtencionModule { }
