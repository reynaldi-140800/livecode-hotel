import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Book } from '../model/guest-book';
import { HotelService } from '../service/1.service';

@Component({
  selector: 'app-bookedform',
  templateUrl: './bookedform.component.html',
  styleUrls: ['./bookedform.component.scss'],
})
export class BookedFormComponent implements OnInit {
  books!: Book; ////// MAU MEMASUKKAN DATA DARI PARENT / TODO.TS
  // @Output() todoChange: EventEmitter<Todo> = new EventEmitter<Todo>()
  // @Output() saveTodo: EventEmitter<Todo> = new EventEmitter<Todo>()  //// SAVE ////

  constructor(
    private readonly hotelService: HotelService,
    private readonly route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (params:Params) => {
        // console.log(params['id']);
        const { id } = params
        ///// +id ini menjadikan yang string -> number
        ///// berlaku untuk bilangan bulat
        this.hotelService.get(+id).subscribe({
          next: (buking: Book)=>{
            this.books =  buking
            this.setFormValue(this.books)
          }
        })
      },
    });
  }

  /////////// EDIT /////////////
  ngOnChanges(): void {
    this.setFormValue(this.books)
  }

  /////////// ADD //////////
  bookForm: FormGroup = new FormGroup({
    id: new FormControl(),
    status: new FormControl('', [Validators.required]),
    roomNumber: new FormControl('', [Validators.required]),
    duration: new FormControl('', [Validators.required]),
    guestCount: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required])
  });

  ////////// TOMBOL SUBMIT /////////////
  onSubmit(): void {
    const { id, status, roomNumber, duration, guestCount, name, email, phone } = this.bookForm.value 
    this.hotelService.save({
      id,
      status,
      roomNumber,
      duration,
      guestCount,
      reservee:
      {
        id: id,
        name: name,
        email: email,
        phone: phone
      }
    }).subscribe()
    this.formReset()
    this.router.navigateByUrl('guest-book')
  }  
  formReset(){
    this.bookForm.reset
  }

  /////////// SET VALUE //////////////
  setFormValue(booking: Book): void {
    if (booking) {
      this.bookForm.controls['id']?.setValue(booking.id)
      this.bookForm.controls['status']?.setValue(booking.status)
      this.bookForm.controls['roomNumber']?.setValue(booking.roomNumber)
      this.bookForm.controls['duration']?.setValue(booking.duration)
      this.bookForm.controls['guestCount']?.setValue(booking.guestCount)
      this.bookForm.controls['name']?.setValue(booking.reservee.name)
      this.bookForm.controls['email']?.setValue(booking.reservee.email)
      this.bookForm.controls['phone']?.setValue(booking.reservee.phone)
    }
  }

  get name() {
    return this.bookForm.get('name')!;
  }

  isFormValid(bookField: string): string {
    const control: AbstractControl = this.bookForm.get(
      bookField
    ) as AbstractControl
    let className = ''
    if (control && control.invalid && (control.dirty || control.touched)) {
      className = 'is-invalid'
    } else if (control && control.valid && (control.dirty || control.touched)) {
      className = 'is-valid'
    }
    return className
  }
  
}
