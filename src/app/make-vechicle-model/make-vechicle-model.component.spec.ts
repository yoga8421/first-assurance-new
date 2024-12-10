import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeVechicleModelComponent } from './make-vechicle-model.component';

describe('MakeVechicleModelComponent', () => {
  let component: MakeVechicleModelComponent;
  let fixture: ComponentFixture<MakeVechicleModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MakeVechicleModelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MakeVechicleModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
