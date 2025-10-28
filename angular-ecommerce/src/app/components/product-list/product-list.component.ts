import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common/product';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { CartItem } from '../../common/cart-item';
import { CartService } from '../../services/cart.service';

@Component({
  standalone: true,
  selector: 'app-product-list',
  imports: [CommonModule, RouterModule, NgbPaginationModule],
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {


  products: Product[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  currentCategoryName: string = "";
  searchMode: boolean = false;
  previousKeyword:string="";

  //new properties for pagination
  thePageNumber: number = 1;
  thePageSize: number = 5;
  theTotalElements: number = 0;



  constructor(private productService: ProductService, private route: ActivatedRoute,private cartService: CartService) {
    console.log("ProductListComponent constructor called");
  }

  ngOnInit() {
    console.log("ProductListComponent ngOnInit called");
    this.route.paramMap.subscribe(() => {
      console.log("Product list loaded")
      this.listProducts();
    });
  }

   listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if (this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }
  }

  handleSearchProducts() {
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;

    //if we have a different keyword than previous
    //then set thePageNumber to 1

    if(this.previousKeyword!=theKeyword){
      this.thePageNumber=1;
    }
    this.previousKeyword=theKeyword;
    console.log(`keyword=${theKeyword},thePageNumber=${this.thePageNumber}`)

    //now search for products using keyword
    // this.productService.searchProducts(theKeyword).subscribe(
    //   data => {
    //     this.products = data;
    //   }
    // );

    this.productService.searchProductsPaginate(this.thePageNumber-1,this.thePageSize,
                                                theKeyword).subscribe(this.processResult());
  }

  handleListProducts() {
    //check if "id" parameter is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      //get the "id" param string.Convert string into number using "+" operator
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
      this.currentCategoryName = this.route.snapshot.paramMap.get('name')!;
    }
    else {
      this.currentCategoryId = 1;
      //this.currentCategoryName="Books";
    }

    //check if we have a different category than previous
    //note:Angular will reuse a component if it is currently being viewed

    //if we have a different than previous
    //then set thePageNumber back to 1

    if (this.previousCategoryId != this.currentCategoryId) {
      this.thePageNumber = 1;
    }
    this.previousCategoryId = this.currentCategoryId;
    console.log(`currentCategoryId=${this.currentCategoryId},thePageNumber=${this.thePageNumber}`)

    this.productService.getProductListPaginate(this.thePageNumber - 1,
      this.thePageSize,
      this.currentCategoryId)
      .subscribe(this.processResult());
    // this.productService.getProductList(this.currentCategoryId).subscribe(
    //   data=>{
    //     this.products=data;
    //   }
    // )
  }
  updatePageSize(pageSize: string) {
    this.thePageSize=+pageSize;
    this.thePageNumber=1;
    this.listProducts();
  }
  processResult(){
    return(data:any)=>{
      this.products=data._embedded.products;
      this.thePageNumber=data.page.number+1;
      this.thePageSize=data.page.size;
      this.theTotalElements=data.page.totalElements;
    };
  }
  addToCart(theProduct:Product){
    console.log(`Adding to cart: ${theProduct.name}, ${theProduct.id}`)
    const theCartItem=new CartItem(theProduct);
    this.cartService.addToCart(theCartItem);
  }
}

