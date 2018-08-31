import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContadoriaJefGraficoComponent } from './contadoria-jef-grafico.component';

describe('ContadoriaJefGraficoComponent', () => {
  let component: ContadoriaJefGraficoComponent;
  let fixture: ComponentFixture<ContadoriaJefGraficoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContadoriaJefGraficoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContadoriaJefGraficoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
