import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../common/cart-item';

@Component({
  selector: 'app-cart-details',
  imports: [CommonModule,RouterModule],
  templateUrl: './cart-details.component.html',
  styleUrl: './cart-details.component.css'
})
export class CartDetailsComponent implements OnInit{

  cartItems:CartItem[]=[];
  totalPrice:number=0;
  totalQuanity:number=0;

  constructor(private cartService:CartService){}

  ngOnInit(): void {
    this.listCartDetails();
  }
  listCartDetails() {
    //get a handle to the cart items
    this.cartItems=this.cartService.cartItems;
    //subscribe to the cart totalPrice
    this.cartService.totalPrice.subscribe(
      data=>this.totalPrice=data
    );
    //subscribe to the cart totalQuantiy
    this.cartService.totalQuantity.subscribe(
      data=>this.totalQuanity=data
    );
    //compute cart total price and quantity
    this.cartService.computeCartTotals();
  }
  
  incrementQuantity(theCartItem:CartItem){
    this.cartService.addToCart(theCartItem);
  }

  decrementQuantity(theCartItem:CartItem){
    this.cartService.decrementQuantity(theCartItem);
  }

  removeItem(removeItem: CartItem) {
    this.cartService.remove(removeItem);
  }

}
