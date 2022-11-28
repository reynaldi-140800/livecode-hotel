import { Component, OnInit } from '@angular/core';
import id from 'date-fns/locale/id';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit{
  today: Date = new Date()
  locale: Locale = id
  constructor(){}

  ngOnInit(): void {
  }
}