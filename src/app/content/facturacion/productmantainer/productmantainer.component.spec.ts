import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductmantainerComponent } from './productmantainer.component';

describe('ProductmantainerComponent', () => {
  let component: ProductmantainerComponent;
  let fixture: ComponentFixture<ProductmantainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductmantainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductmantainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
