import { ThisReceiver } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Book, Guest } from '../model/guest-book';
import { HotelService } from '../service/1.service';

@Component({
  selector: 'app-bookedlist',
  templateUrl: './bookedlist.component.html',
  styleUrls: ['./bookedlist.component.scss']
})
export class BookedListComponent implements OnInit{
  bookings: Book[]=[]
  isLoading: boolean = true
  constructor(private readonly hotelService: HotelService){}

  ngOnInit(): void {    
    this.onLoadBook()
  }
  onLoadBook(): void {
    this.isLoading = false
    this.hotelService.list().subscribe({
      next: (bookings: Book[])=>{
        this.bookings = bookings
        console.log(this.bookings);
        
      }
    })  
  }

  /////////////// CHECK //////////////////
  onCheckIn(check_In: Book): void {
    this.hotelService.checkIn(check_In).subscribe()
  }

  onCheckOut(check_Out: Book): void {
    this.hotelService.checkOut(check_Out).subscribe()
  }
  /////////////// DELETE ////////////////////
  ondelete(Delete: Book): void{
    this.hotelService.remove(Delete).subscribe()
  }
}
