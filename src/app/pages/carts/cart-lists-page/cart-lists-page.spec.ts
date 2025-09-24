import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartListsPage } from './cart-lists-page';

describe('CartListsPage', () => {
  let component: CartListsPage;
  let fixture: ComponentFixture<CartListsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartListsPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartListsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
