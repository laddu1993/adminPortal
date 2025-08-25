import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditFleetDialogComponent } from './add-edit-fleet-dialog.component';

describe('AddEditFleetDialogComponent', () => {
  let component: AddEditFleetDialogComponent;
  let fixture: ComponentFixture<AddEditFleetDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditFleetDialogComponent]
    });
    fixture = TestBed.createComponent(AddEditFleetDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
