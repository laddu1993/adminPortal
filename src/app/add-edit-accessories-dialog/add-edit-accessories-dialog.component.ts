import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-add-edit-accessories-dialog',
  templateUrl: './add-edit-accessories-dialog.component.html',
  styleUrls: ['./add-edit-accessories-dialog.component.scss']
})
export class AddEditAccessoriesDialogComponent {
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddEditAccessoriesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      id: [data.id || ''],
      sku: [data.sku || '', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(9)]],
      type: [data.type || '', [Validators.required, Validators.minLength(3)]]
    });
  }

  onSave(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
