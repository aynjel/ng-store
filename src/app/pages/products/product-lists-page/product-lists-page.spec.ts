import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListsPage } from './product-lists-page';

describe('ProductListsPage', () => {
  let component: ProductListsPage;
  let fixture: ComponentFixture<ProductListsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductListsPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductListsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
