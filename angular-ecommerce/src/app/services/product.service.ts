import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../common/product';
import { HttpClient } from '@angular/common/http';
import { ProductCategory } from '../common/product-category';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl=environment.luv2shopApiUrl+'/products'

  private categoryBaseUrl=environment.luv2shopApiUrl+'/product-category'

  
  constructor(private httpClient: HttpClient) { }

  getProductListPaginate(thePage:number,thePageSize:number,
                          theCategoryId:number): Observable<GetResponseProducts>{
    //need to build url based on category id,page and size
    const Url=`${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`
                      +`&page=${thePage}&size=${thePageSize}`;

    console.log(`Getting products from - ${Url}`)
    return this.httpClient.get<GetResponseProducts>(Url);
  }

  getProductList(theCategoryId:number): Observable<Product[]>{
    //need to build url based on category id
    const searchUrl=`${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;
    return this.getProducts(searchUrl);
  }

  getProductCategories():Observable<ProductCategory[]>{
    return this.httpClient.get<GetResponseProductCategory>(this.categoryBaseUrl).pipe(
      map(response =>response._embedded.ProductCategory)
    );
  }

  searchProducts(theKeyword:string):Observable<Product[]>{
    //need to build url based on keyword
    const searchUrl=`${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;
    return this.getProducts(searchUrl);
  }

  searchProductsPaginate(thePage:number,thePageSize:number,
                          theKeyword:string): Observable<GetResponseProducts>{
    //need to build url based on keyword,page and size
    const Url=`${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`
                      +`&page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<GetResponseProducts>(Url);
  }

  getProduct(theProductId:number):Observable<Product>{
    //need to build url based on Productid
    const ProductURl=`${this.baseUrl}/${theProductId}`;
    return this.httpClient.get<Product>(ProductURl);
  }
   
  //method related to product.service
  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }

}

interface GetResponseProducts{
  _embedded:{
    products: Product[];
  },
  page:{
    size:number,
    totalElements:number,
    totalPages:number,
    number:number
  }
}

interface GetResponseProductCategory{
  _embedded:{
    ProductCategory: ProductCategory[];
  }
}
