import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ListRiskTraComponent } from './listRiskTra.component';



describe('ListRiskTraComponent', () => {
  let component: ListRiskTraComponent;
  let fixture: ComponentFixture<ListRiskTraComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListRiskTraComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRiskTraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
