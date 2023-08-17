import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormBuilder } from '@angular/forms';
// import paypal
import { IPayPalConfig,ICreateOrderRequest} from 'ngx-paypal';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  // paypal property
  public payPalConfig ? : IPayPalConfig;



  cartItems: any = []
  cartTotalPrice: number = 0
  offerStatus: boolean = false
  finalAmount: number = 0
  offerTagStatus: boolean = true
  paymentBtn: boolean = false
  makepaymentStatus:boolean =false
  

  adressForm = this.fb.group({
    username: [''],
    addr1: [''],
    addr2: [''],
    state: ['']
  })

  showSuccess:boolean = false
  showCancel:boolean = false
  showError:boolean = false
  constructor(private api: ApiService, private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.getCart()
    // paypal  this.initConfig();
    this.initConfig();

  }
  getCart() {
    this.api.getCart().subscribe(
      (result: any) => {
        console.log(result);
        this.cartItems = result
        // call cart price
        this.getCartTotalPrice()

      },
      (result: any) => {
        console.log(result.error);

      }
    )
  }

  // get cartTotal Price
  getCartTotalPrice() {
    let total = 0
    this.cartItems.forEach((item: any) => {
      total += item.grandTotal
      this.cartTotalPrice = Math.ceil(total)
      this.finalAmount = this.cartTotalPrice
    })
  }


  // remove cart item
  removeCartItem(id: any) {
    this.api.removeCartItem(id).subscribe(
      (result: any) => {
        this.cartItems = result
        // price
        this.getCartTotalPrice()
        this.api.cartCount()
      },
      (result: any) => {
        alert(result.error)

      }
    )

  }
  //  incrCartItem
  incrCartItem(id: any) {
    this.api.incrCartItem(id).subscribe(
      (result: any) => {
        this.cartItems = result
        //all cart price
        this.getCartTotalPrice()
        this.api.cartCount()

      },
      (result: any) => {
        alert(result.error)

      }
    )
  }

  decrCartItem(id: any) {
    this.api.decrCartItem(id).subscribe(
      (result: any) => {
        this.cartItems = result
        //all cart price
        this.getCartTotalPrice()
        this.api.cartCount()

      },
      (result: any) => {
        alert(result.error)

      }
    )
  }
  emptyCart() {
    this.api.emptyCart().subscribe(
      // 200
      (result: any) => {
        this.cartItems = []
        this.getCartTotalPrice()
        this.api.cartCount()

      },
      (result: any) => {
        alert(result.error)

      }
    )
  }

  viewOffers() {
    this.offerStatus = true
  }
  // discount10()
  discount10() {
    let discount = this.cartTotalPrice * 10 / 100
    this.finalAmount = this.cartTotalPrice - discount
    this.offerStatus = false
    this.offerTagStatus = false
  }


  discount50() {
    let discount = this.cartTotalPrice * 50 / 100
    this.finalAmount = this.cartTotalPrice - discount
    this.offerStatus = false
    this.offerTagStatus = false
  }
  discount75() {
    let discount = this.cartTotalPrice * 75 / 100
    this.finalAmount = this.cartTotalPrice - discount
    this.offerStatus = false
    this.offerTagStatus = false
  }

  // submit()
  submit() {
    if (this.adressForm.valid) {
      this.paymentBtn = true

    } else {
      alert("Invalid Form ")
    }
  }

  // make Payment Status
  makepayment(){
    this.makepaymentStatus=true
  }
  //paypal function 

  private initConfig(): void {
    this.payPalConfig = {
        currency: 'EUR',
        clientId: 'sb',
        createOrderOnClient: (data) => < ICreateOrderRequest > {
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'EUR',
                    value: '9.99',
                    breakdown: {
                        item_total: {
                            currency_code: 'EUR',
                            value: '9.99'
                        }
                    }
                },
                items: [{
                    name: 'Enterprise Subscription',
                    quantity: '1',
                    category: 'DIGITAL_GOODS',
                    unit_amount: {
                        currency_code: 'EUR',
                        value: '9.99',
                    },
                }]
            }]
        },
        advanced: {
            commit: 'true'
        },
        style: {
            label: 'paypal',
            layout: 'vertical'
        },
        onApprove: (data, actions) => {
            console.log('onApprove - transaction was approved, but not authorized', data, actions);
            actions.order.get().then((details:any) => {
                console.log('onApprove - you can get full order details inside onApprove: ', details);
            });

        },
        onClientAuthorization: (data) => {
            console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
            this.showSuccess = true;
            // alert("Payment Successfully Completed....... Your Order is Confirmed.")
            // cart empty
            this.emptyCart()
            this.makepaymentStatus=false
            this.paymentBtn = false
            
        },
        onCancel: (data, actions) => {
            console.log('OnCancel', data, actions);
            this.showCancel = true;
            this.makepaymentStatus=false

        },
        onError: err => {
            console.log('OnError', err);
            this.showError = true;
            this.makepaymentStatus=false
        },
        onClick: (data, actions) => {
            console.log('onClick', data, actions);
            //this.resetStatus();
            // this.makepaymentStatus=false
        }
    };
}

//medel closing
modelClose(){
this.adressForm.reset()
this.paymentBtn=false
this.makepaymentStatus=false
this.showCancel=false
this.showError=false
this.showSuccess=false
}

}

