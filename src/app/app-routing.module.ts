import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { SettingsComponent } from './settings/settings.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard'; // Add an authentication guard if needed
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';
import { DeleteComponent } from './delete/delete.component';
import { AddComponent } from './add/add.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { NationalAccountComponent } from './national-account/national-account.component';
import { FleetComponent } from './fleet/fleet.component';
import { AccessoriesComponent } from './accessories/accessories.component';
import { AccessoriesImportComponent } from './accessories-import/accessories-import.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'auth',
    canActivate: [AuthGuard], // Ensure only logged-in users can access
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'list', component: ListComponent },
      { path: 'add', component: AddComponent },
      { path: 'fleet/import', component: FileUploadComponent },
      { path: 'accessories/import', component: AccessoriesImportComponent },
      { path: 'edit/:id', component: EditComponent },
      { path: 'delete/:id', component: DeleteComponent },
      { path: 'users', component: UsersComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'national-account', component: NationalAccountComponent },
      { path: 'fleet', component: FleetComponent },
      { path: 'accessories', component: AccessoriesComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' } // Default route for admin
    ]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' } // Default route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }]
})
export class AppRoutingModule { }
