import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicoReceitaComponent } from './medico-receita.component';

describe('MedicoReceitaComponent', () => {
  let component: MedicoReceitaComponent;
  let fixture: ComponentFixture<MedicoReceitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicoReceitaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicoReceitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
