import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContadoriaVaraGrafico1Component } from './contadoria-vara-grafico1.component';

describe('ContadoriaVaraGrafico1Component', () => {
  let component: ContadoriaVaraGrafico1Component;
  let fixture: ComponentFixture<ContadoriaVaraGrafico1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContadoriaVaraGrafico1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContadoriaVaraGrafico1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
