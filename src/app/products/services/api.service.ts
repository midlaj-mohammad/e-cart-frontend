import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // to hold serach term as a behavior sub
  searchTerm = new BehaviorSubject('')
  // to hold cart total count
  cartItemCount = new BehaviorSubject(0)
  

  // BASE_URL = 'http://localhost:3000'
  BASE_URL = 'https://ecart-w4mm.onrender.com'

  constructor(private http:HttpClient) {
    this.cartCount()
   }

  getAllProduct(){
    return this.http.get(`${this.BASE_URL}/products/get-all-products`)
  }

  viewAproduct(id:any){
     return this.http.get(`${this.BASE_URL}/products/${id}`)

   }
   //add-to-wishlist
   addtowishlist(product:any){
    const body={
      id:product.id,
      title:product.title,
      price:product.price,
      image:product.image
    }
    // api call
    return this.http.post(`${this.BASE_URL}/products/add-to-wishlist`,body)
   }

  //  get all Items from wshlists

  getWishlistItems(){
    return this.http.get(`${this.BASE_URL}/wishlist/get-all-items`)

  }
// removing wishlist items
  removeWishlistItem(id:any){
    return this.http.delete(`${this.BASE_URL}/wishlist/remove-item/${id}`)

  }

  // addto Cart
  addToCart(product:any){
    const body ={
      id:product.id,
      title:product.title,
      price:product.price,
      image:product.image,
      quantity:product.quantity
    }
     // api call
     return this.http.post(`${this.BASE_URL}/products/add-to-cart`,body)
    
 
  }

  // getCart
  getCart(){
    // api call
    return this.http.get(`${this.BASE_URL}/cart/get-all-items`)
  }
  // cartCount
  cartCount(){
    this.http.get(`${this.BASE_URL}/cart/get-all-items`).subscribe(
      (result:any)=>{
        this.cartItemCount.next(result.length)
      }
    )
  }

  // remove cart item api
  removeCartItem(id:any){
    return this.http.delete(`${this.BASE_URL}/cart/item/${id}`)


  }

  //increment cart items
  incrCartItem(id:any)  {
    // api call
    return this.http.get(`${this.BASE_URL}/cart/increment-item/${id}`)

  }

  //
  
  // decrement cart items
  decrCartItem(id:any)  {
    // api call
    return this.http.get(`${this.BASE_URL}/cart/decrement-item/${id}`)

  }

  // emptyCart
  emptyCart(){
    return this.http.delete(`${this.BASE_URL}/cart/empty-cart`)

  }

}
