import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessoriesImportComponent } from './accessories-import.component';

describe('AccessoriesImportComponent', () => {
  let component: AccessoriesImportComponent;
  let fixture: ComponentFixture<AccessoriesImportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccessoriesImportComponent]
    });
    fixture = TestBed.createComponent(AccessoriesImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
