import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiaAnaComponent } from './dia-ana.component';

describe('DiaAnaComponent', () => {
  let component: DiaAnaComponent;
  let fixture: ComponentFixture<DiaAnaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiaAnaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiaAnaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
