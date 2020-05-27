import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualordersComponent } from './manualorders.component';

describe('ManualordersComponent', () => {
  let component: ManualordersComponent;
  let fixture: ComponentFixture<ManualordersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManualordersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManualordersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
