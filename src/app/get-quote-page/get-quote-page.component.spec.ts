import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetQuotePageComponent } from './get-quote-page.component';

describe('GetQuotePageComponent', () => {
  let component: GetQuotePageComponent;
  let fixture: ComponentFixture<GetQuotePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GetQuotePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetQuotePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
