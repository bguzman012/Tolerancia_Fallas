import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ListRiskAnaComponent } from './listRiskAna.component';



describe('ListRiskAnaComponent', () => {
  let component: ListRiskAnaComponent;
  let fixture: ComponentFixture<ListRiskAnaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListRiskAnaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRiskAnaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
