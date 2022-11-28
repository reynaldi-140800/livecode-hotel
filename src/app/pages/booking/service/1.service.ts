import { Injectable } from "@angular/core";
import { Observable, Observer } from "rxjs";
import { Book, HOTEL, Guest } from "../model/guest-book";

@Injectable()
export class HotelService {
  bookings: Book[] =[]
  private storage: Storage = sessionStorage
  constructor(){}

  list(): Observable<Book[]> {
    return new Observable<Book[]>((observer: Observer<Book[]>)=>{
      const sessionBook: string = this.storage.getItem(HOTEL) as string
      try {
        const bookings: Book[] = sessionBook ? JSON.parse(sessionBook): [
        {
          id:1,
          status: "reserved",
          roomNumber: '123',
          duration: 2,
          guestCount:2,
          reservee: {
            id:1,
            name:'Amanda Raules',
            email:'abc@mail.com',
            phone:'21311'
          }
        },
        {
          id:2,
          status:"reserved",
          roomNumber:'124',
          duration: 1,
          guestCount: 1,
          reservee: {
            id:2,
            name:'Nazar',
            email:'12@mail.com',
            phone:'121222'
          }
        }]
        this.bookings = bookings
        this.storage.setItem(HOTEL, JSON.stringify(this.bookings))
        this.setToStorage()
        observer.next(this.bookings)
        
      } catch (err: any) {
        observer.error(err.message)
      }
    })
  }
  private setToStorage(): void {
    this.storage.setItem(HOTEL, JSON.stringify(this.bookings))
  }

  get(bookingId: number): Observable<Book> {
    return new Observable<Book>((observer: Observer<Book>)=>{
      observer.next (this.bookings.find((t)=> t.id === bookingId) as Book)
    })
  }

  save(booking: Book): Observable<void> {
    return new Observable<void>((observer: Observer<void>)=>{
      try {
        if(booking.id){
          this.bookings = this.bookings.map((t)=>{
            if (t.id === booking.id) t = booking
            return t
          })
        }else{
          booking.id = this.bookings.length + 1
          this.bookings.push(booking)
          observer.next()
        }
        this.setToStorage()
      } catch (err: any) {
        observer.error(err.message)
      }
    })
  }
  checkIn(bookingId: Book): Observable<void> {
    return new Observable<void>((observer: Observer<void>)=>{
        bookingId.status = 'checked-in'
        this.save(bookingId)
        observer.next()
    })
  }
  checkOut(bookingId: Book): Observable<void> {
    return new Observable<void> ((observer: Observer<void>)=>{
      bookingId.status = 'checked-out'
      this.save(bookingId)
      observer.next()
    })
  };
  remove(bookingId: Book): Observable<void> {
    return new Observable<void>((observer: Observer<void>)=>{
      try {
        for (let index = 0; index < this.bookings.length; index++) {
          if (this.bookings[index].id === bookingId.id){
            if(this.bookings[index].status !== 'checked-out'){
              alert(`Data pemesanan tidak dapat di hapus karena tamu ${this.bookings[index].reservee.name} belum Check Out.`)
            }else{
              this.bookings.splice(index,1)
            }this.setToStorage()
            observer.next
          }
        }
      } catch (err: any) {
        observer.error(err.message)
      }
    })
  }
}