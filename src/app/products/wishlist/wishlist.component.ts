import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent  implements OnInit{

  wishlistItems:any = []

  constructor (private api:ApiService){

  }
  ngOnInit(): void {
    this.api.getWishlistItems().subscribe(
      (result:any)=>{
        console.log(result);
        this.wishlistItems =result
      },
      (result:any)=>{
        alert(result.error);
        
      }
    )
  }
  // remove wishlists items
  removeWishlistItem(id:any){
    this.api.removeWishlistItem(id).subscribe(
      (result:any)=>{
        this.wishlistItems = result
      },
      (result:any)=>{
        console.log(result.error);
        
      }
    )
  }


  // add to cart
  addTocart(product: any) {
    // add quantity key to product object as 1
    Object.assign(product, { quantity: 1 })

    console.log(product);

    // call api
    this.api.addToCart(product)
      .subscribe(
        (result: any) => {
            // call cartCount
            this.api.cartCount()
            //  to remove item from wishlist
            this.removeWishlistItem(product.id)
          alert(result)
        },
        (result: any) => {
          alert(result.error)
        }
      )

  }

}
