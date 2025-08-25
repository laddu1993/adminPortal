import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NationalAccountComponent } from './national-account.component';

describe('NationalAccountComponent', () => {
  let component: NationalAccountComponent;
  let fixture: ComponentFixture<NationalAccountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NationalAccountComponent]
    });
    fixture = TestBed.createComponent(NationalAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
