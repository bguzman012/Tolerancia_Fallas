import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalisisImpactoComponent } from './analisis-impacto.component';

describe('AnalisisImpactoComponent', () => {
  let component: AnalisisImpactoComponent;
  let fixture: ComponentFixture<AnalisisImpactoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnalisisImpactoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalisisImpactoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
