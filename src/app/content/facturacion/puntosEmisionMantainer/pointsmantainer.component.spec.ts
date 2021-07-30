import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointsmantainerComponent } from './pointsmantainer.component';

describe('PointsmantainerComponent', () => {
  let component: PointsmantainerComponent;
  let fixture: ComponentFixture<PointsmantainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PointsmantainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PointsmantainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
