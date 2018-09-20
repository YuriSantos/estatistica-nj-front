import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistribuicaoVaraGrafico3Component } from './distribuicao-vara-grafico3.component';

describe('DistribuicaoVaraGrafico3Component', () => {
  let component: DistribuicaoVaraGrafico3Component;
  let fixture: ComponentFixture<DistribuicaoVaraGrafico3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistribuicaoVaraGrafico3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistribuicaoVaraGrafico3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
