import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicoInserirComponent } from './medico-inserir.component';

describe('MedicoInserirComponent', () => {
  let component: MedicoInserirComponent;
  let fixture: ComponentFixture<MedicoInserirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicoInserirComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicoInserirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
