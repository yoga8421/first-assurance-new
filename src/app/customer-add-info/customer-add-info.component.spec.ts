import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerAddInfoComponent } from './customer-add-info.component';

describe('CustomerAddInfoComponent', () => {
  let component: CustomerAddInfoComponent;
  let fixture: ComponentFixture<CustomerAddInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerAddInfoComponent]
    });
    fixture = TestBed.createComponent(CustomerAddInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
