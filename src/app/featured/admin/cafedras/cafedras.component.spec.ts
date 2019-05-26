import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CafedrasComponent } from './cafedras.component';

describe('CafedrasComponent', () => {
  let component: CafedrasComponent;
  let fixture: ComponentFixture<CafedrasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CafedrasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CafedrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
