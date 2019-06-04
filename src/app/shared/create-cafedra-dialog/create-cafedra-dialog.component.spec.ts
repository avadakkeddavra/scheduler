import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCafedraDialogComponent } from './create-cafedra-dialog.component';

describe('CreateCafedraDialogComponent', () => {
  let component: CreateCafedraDialogComponent;
  let fixture: ComponentFixture<CreateCafedraDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCafedraDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCafedraDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
