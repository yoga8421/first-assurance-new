import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteBasicInfoContinueComponent } from './quote-basic-info-continue.component';

describe('QuoteBasicInfoContinueComponent', () => {
  let component: QuoteBasicInfoContinueComponent;
  let fixture: ComponentFixture<QuoteBasicInfoContinueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuoteBasicInfoContinueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuoteBasicInfoContinueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
