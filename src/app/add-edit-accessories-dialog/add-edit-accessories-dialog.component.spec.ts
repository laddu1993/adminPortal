import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditAccessoriesDialogComponent } from './add-edit-accessories-dialog.component';

describe('AddEditAccessoriesDialogComponent', () => {
  let component: AddEditAccessoriesDialogComponent;
  let fixture: ComponentFixture<AddEditAccessoriesDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditAccessoriesDialogComponent]
    });
    fixture = TestBed.createComponent(AddEditAccessoriesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
