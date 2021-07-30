import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QryRiskListComponent } from './qry-risk-list.component';

describe('QryRiskListComponent', () => {
  let component: QryRiskListComponent;
  let fixture: ComponentFixture<QryRiskListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QryRiskListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QryRiskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
