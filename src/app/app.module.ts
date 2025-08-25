import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list'; // Import MatListModule
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; // Import MatProgressSpinnerModule
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { SettingsComponent } from './settings/settings.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { EditComponent } from './edit/edit.component';
import { DeleteComponent } from './delete/delete.component';
import { MatMenuModule } from '@angular/material/menu';
import { AddEditDialogComponent } from './add-edit-dialog/add-edit-dialog.component';
import { NationalAccountComponent } from './national-account/national-account.component'; // Import MatMenuModule
import { MatDialogModule } from '@angular/material/dialog';
import { AddEditUserDialogComponent } from './add-edit-user-dialog/add-edit-user-dialog.component';
import { FleetComponent } from './fleet/fleet.component';
import { AddEditFleetDialogComponent } from './add-edit-fleet-dialog/add-edit-fleet-dialog.component';  // Import MatDialogModule
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { AccessoriesComponent } from './accessories/accessories.component';
import { AddEditAccessoriesDialogComponent } from './add-edit-accessories-dialog/add-edit-accessories-dialog.component';
import { AccessoriesImportComponent } from './accessories-import/accessories-import.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select'; // ✅ Import this

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UsersComponent,
    SettingsComponent,
    LoginComponent,
    ListComponent,
    AddComponent,
    FileUploadComponent,
    EditComponent,
    DeleteComponent,    
    AddEditDialogComponent,
    NationalAccountComponent,
    AddEditUserDialogComponent,
    FleetComponent,
    AddEditFleetDialogComponent,
    ProgressBarComponent,
    AccessoriesComponent,
    AddEditAccessoriesDialogComponent,
    AccessoriesImportComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    ReactiveFormsModule, // Include ReactiveFormsModule here
    MatSidenavModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatListModule, 
    MatDialogModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatSelectModule, // ✅ Ensure this is imported
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
