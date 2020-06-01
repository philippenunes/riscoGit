import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEmployeeListComponent } from './modal-employee-list.component';

describe('ModalEmployeeListComponent', () => {
  let component: ModalEmployeeListComponent;
  let fixture: ComponentFixture<ModalEmployeeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEmployeeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEmployeeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
