import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlumnosComponent } from './alumnos.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserFormDialogComponent } from './components/user-form-dialog/user-form-dialog.component';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { AlumnosService } from './alumnos.service';


@NgModule({
  declarations: [
    AlumnosComponent,
    UserFormDialogComponent,
    UsersTableComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    AlumnosComponent
  ],
  providers: [
   AlumnosService
  ]
})
export class AlumnosModule { }
