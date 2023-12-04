import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearFiestaComponent } from './crear-fiesta.component';

describe('CrearFiestaComponent', () => {
  let component: CrearFiestaComponent;
  let fixture: ComponentFixture<CrearFiestaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearFiestaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearFiestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
