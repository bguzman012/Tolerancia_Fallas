import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SegRisksComponent } from './seg-risks.component';

describe('SegRisksComponent', () => {
  let component: SegRisksComponent;
  let fixture: ComponentFixture<SegRisksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SegRisksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SegRisksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
