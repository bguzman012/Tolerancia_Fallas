import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TraRisksComponent } from './tra-risks.component';

describe('TraRisksComponent', () => {
  let component: TraRisksComponent;
  let fixture: ComponentFixture<TraRisksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TraRisksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraRisksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
