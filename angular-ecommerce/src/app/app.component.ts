 import { Component } from '@angular/core';
 import { RouterModule, RouterOutlet } from '@angular/router';
import { ProductCategoryMenuComponent } from "./components/product-category-menu/product-category-menu.component";
import { SearchComponent } from "./components/search/search.component";
import { CartStatusComponent } from "./components/cart-status/cart-status.component";
import { LoginStatusComponent } from "./components/login-status/login-status.component";
import { environment } from '../environments/environment.development';


@Component({
selector: 'app-root',
 imports: [RouterOutlet, RouterModule, ProductCategoryMenuComponent, SearchComponent, CartStatusComponent, LoginStatusComponent],
templateUrl: './app.component.html',
 styleUrl: './app.component.css'
})
export class AppComponent {
   constructor(){
     console.log(environment.production); //logs false for development environment
   }
   title = 'angular-ecommerce';
 }






