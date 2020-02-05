import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AtencionRoutingModule } from './atencion-routing.module';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { AtencionComponent } from './atencion.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatDividerModule} from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [ListComponent, FormComponent, AtencionComponent],
  imports: [
    CommonModule,
    AtencionRoutingModule,
    MatToolbarModule,
    MatDividerModule,
    MatTableModule,
    MatButtonModule
  ]
})
export class AtencionModule { }
