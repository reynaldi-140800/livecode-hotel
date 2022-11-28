import { CommonModule } from '@angular/common';
import { BookingComponent} from './booking.component';
import { BookedListComponent } from './BookedList/bookedlist.component';
import { BookedFormComponent } from './BookedForm/bookedform.component';
import { NgModule } from '@angular/core';
import { TodoRoutingModule } from './booking-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { HotelService } from './service/1.service';

@NgModule({
  declarations: [BookingComponent, BookedListComponent, BookedFormComponent],
  imports: [
    CommonModule,
    TodoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [],
  providers: [HotelService],
})
export class BookingModule {}
