import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnaRisksComponent } from './ana-risks.component';

describe('AnaRisksComponent', () => {
  let component: AnaRisksComponent;
  let fixture: ComponentFixture<AnaRisksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnaRisksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnaRisksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
