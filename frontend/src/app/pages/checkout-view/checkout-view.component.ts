import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';
import { OrderService } from 'src/app/services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout-view',
  templateUrl: './checkout-view.component.html',
  styleUrls: ['./checkout-view.component.css']
})
export class CheckoutViewComponent implements OnInit {
  total!: number
  isEditable: boolean = false
  user: any = null
  cartAddress: string = ''
  cartList: Array<any> = []

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private orderService: OrderService,
    private router: Router
  ){
    this.user = this.authService.currentUser
    this.cartAddress = JSON.parse(sessionStorage.getItem('cartAddress')!)
    this.cartList = JSON.parse(localStorage.getItem('cart')!)
  }

  ngOnInit(){
    this.total = this.cartService.getTotal()
  }

  handleClickChange = () => {
    console.log(this.user)
    sessionStorage.setItem('cartAddress', this.cartAddress)
    //event.target.attributes['contenteditable'].value = true
  }

  handleClickOrder = () => {
    const sendData = {
      delivery_address: this.cartAddress,
      items: this.cartList,
      user_id: this.user._id
    }
    if (this.cartAddress && this.cartList.length > 0) {
      this.orderService.createOrder(sendData).subscribe((res: any) => {
        console.log(res)
      })
      this.router.navigate(['history'])
    }
  }
}
