import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path:'atencion', loadChildren: () => import('./atencion/atencion.module').then(m => m.AtencionModule)
  },
  {
    path:'producto', loadChildren: () => import('./producto/producto.module').then(m => m.ProductoModule)
  },
  {
    path:'cliente', loadChildren: () => import('./cliente/cliente.module').then(m => m.ClienteModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
