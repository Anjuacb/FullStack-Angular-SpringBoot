import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Product } from '../../common/product';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../common/cart-item';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule,RouterModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit{

  product!:Product;
  

  constructor(private productService:ProductService,private route:ActivatedRoute,private cartService:CartService){}

  ngOnInit(){
    this.handleProductDetails();
  }

  handleProductDetails(){
    const theProductId:number=+this.route.snapshot.paramMap.get('id')!;
    this.productService.getProduct(theProductId).subscribe(
      data=>{
        this.product=data;
      }
    )
  }

  addToCart(){
    console.log(`Adding to cart:${this.product.name},${this.product.unitPrice}`);
    const theCartItem=new CartItem(this.product);
    this.cartService.addToCart(theCartItem);
  }

}
