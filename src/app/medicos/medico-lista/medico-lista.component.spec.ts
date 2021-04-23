import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicoListaComponent } from './medico-lista.component';

describe('MedicoListaComponent', () => {
  let component: MedicoListaComponent;
  let fixture: ComponentFixture<MedicoListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicoListaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicoListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
