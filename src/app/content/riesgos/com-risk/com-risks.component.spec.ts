import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComRisksComponent } from './com-risks.component';

describe('AnaRisksComponent', () => {
  let component: ComRisksComponent;
  let fixture: ComponentFixture<ComRisksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComRisksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComRisksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
