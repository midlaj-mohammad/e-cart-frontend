import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {

  allProducts: any = []
  searchkey: string = " "

  constructor(private api: ApiService) {


  }
  ngOnInit(): void {
    this.api.getAllProduct().subscribe(
      (result: any) => {
        console.log(result);
        this.allProducts = result

      },
      (result: any) => {
        console.log(result.error);

      }
    )
    // get behaviuor sub
    this.api.searchTerm.subscribe((result: any) => {
      console.log(result);
      this.searchkey = result
    })

  }

  // addToCart
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
          alert(result)
        },
        (result: any) => {
          alert(result.error)
        }
      )

  }

}
