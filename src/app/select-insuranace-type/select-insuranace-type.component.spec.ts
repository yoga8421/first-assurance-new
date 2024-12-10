import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectInsuranaceTypeComponent } from './select-insuranace-type.component';

describe('SelectInsuranaceTypeComponent', () => {
  let component: SelectInsuranaceTypeComponent;
  let fixture: ComponentFixture<SelectInsuranaceTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectInsuranaceTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectInsuranaceTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
