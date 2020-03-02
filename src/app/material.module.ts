import { NgModule } from '@angular/core';

import {MatButtonModule} from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { MatPaginatorModule } from '@angular/material';
import {MatChipsModule} from '@angular/material/chips';

const MODULOS = [
  MatToolbarModule,
  MatDividerModule,
  MatTableModule,
  MatButtonModule,
  MatDialogModule,
  MatFormFieldModule,
  MatAutocompleteModule,
  MatInputModule,
  MatStepperModule,
  FontAwesomeModule,
  MatPaginatorModule,
  MatChipsModule
]

@NgModule({
  imports: MODULOS,
  exports: MODULOS
})
export class MaterialModule { }
