import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCateComponent } from './delete-cate.component';

describe('DeleteCateComponent', () => {
  let component: DeleteCateComponent;
  let fixture: ComponentFixture<DeleteCateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteCateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteCateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
