import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiaRisksComponent } from './dia-risks.component';

describe('AnaRisksComponent', () => {
  let component: DiaRisksComponent;
  let fixture: ComponentFixture<DiaRisksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiaRisksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiaRisksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
