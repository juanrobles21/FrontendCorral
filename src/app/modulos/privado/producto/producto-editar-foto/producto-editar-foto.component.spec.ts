import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoEditarFotoComponent } from './producto-editar-foto.component';

describe('ProductoEditarFotoComponent', () => {
  let component: ProductoEditarFotoComponent;
  let fixture: ComponentFixture<ProductoEditarFotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductoEditarFotoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductoEditarFotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
