import { FormGroup } from "@angular/forms";
import { Book } from "../model/guest-book";

export interface IBookFormComponent {
    booking?: Book;
    bookingGroup: FormGroup;
    onSubmitReservation(): void;
    onFormReset(): void;
}