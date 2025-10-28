import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart-status',
  imports: [CommonModule,RouterModule],
  templateUrl: './cart-status.component.html',
  styleUrl: './cart-status.component.css'
})
export class CartStatusComponent implements OnInit{
  
  totalPrice:number=0.00;
  totalQuantity:number=0;

  constructor(private cartService:CartService){}

  ngOnInit(): void {
    this.updateCartStatus();
  }

  updateCartStatus(){

    //subscribe to cart total Price
    this.cartService.totalPrice.subscribe(
      data=>{
        this.totalPrice=data
      }
    );

    //subscribe to cart total quantity
    this.cartService.totalQuantity.subscribe(
      data=>this.totalQuantity=data
    );
  }

}
