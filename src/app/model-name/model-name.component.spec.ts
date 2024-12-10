import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelNameComponent } from './model-name.component';

describe('ModelNameComponent', () => {
  let component: ModelNameComponent;
  let fixture: ComponentFixture<ModelNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModelNameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModelNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
