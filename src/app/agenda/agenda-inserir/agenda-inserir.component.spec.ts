import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaInserirComponent } from './agenda-inserir.component';

describe('AgendaInserirComponent', () => {
  let component: AgendaInserirComponent;
  let fixture: ComponentFixture<AgendaInserirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgendaInserirComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgendaInserirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
