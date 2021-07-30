import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratePLaningComponent } from './generate-planing.component';

describe('GeneratePLaningComponent', () => {
  let component: GeneratePLaningComponent;
  let fixture: ComponentFixture<GeneratePLaningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneratePLaningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneratePLaningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
