import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoSearchOneComponent } from './producto-search-one.component';

describe('ProductoSearchOneComponent', () => {
  let component: ProductoSearchOneComponent;
  let fixture: ComponentFixture<ProductoSearchOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductoSearchOneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductoSearchOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
