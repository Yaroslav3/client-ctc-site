import {Photo} from './Photo.model';
import {Contacts} from './Contacts.model';
import {TrainerTrainings} from './TrainerTrainings.model';

export class Trainers {
  id: number;
  name: string;
  surname: string;
  photo: Photo;
  heading: string;
  description: string;
  scope: string;
  trainerTrainings: TrainerTrainings;
  contacts: Contacts;
}
