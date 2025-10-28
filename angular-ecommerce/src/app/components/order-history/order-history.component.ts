import { Component, OnInit } from '@angular/core';
import { OrderHistoryService } from '../../services/order-history.service';
import { OrderHistory } from '../../common/order-history';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-order-history',
  imports: [CommonModule],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.css'
})
export class OrderHistoryComponent implements OnInit{

  constructor(private orderHistoryService:OrderHistoryService){}

  storage:Storage=sessionStorage;
  orderHistoryList:OrderHistory[]=[];


  ngOnInit(): void {
    this.handleOrderHistory();
  }

  handleOrderHistory(){

    //read the user's email address from browser storage
    const theEmail=JSON.parse(this.storage.getItem('userEmail')!);

    //retrive data from the service
    this.orderHistoryService.getOrderHistory(theEmail).subscribe(
      (data:any)=>{
        this.orderHistoryList=data._embedded.orders;
      }
    );
    
  }
}


