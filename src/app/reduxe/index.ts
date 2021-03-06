import {User} from '../shared/model/User.model';
import {Trainers} from '../shared/model/Trainers.model';
import {PhotoHeaderModel} from '../shared/model/PhotoHeader.model';
import {Trainings} from '../shared/model/Trainings.model';
import {Inscriptions} from '../shared/model/Inscriptions.model';
import {Webinars} from '../shared/model/Webinars.model';
import {WebinarInscription} from '../shared/model/WebinarInscription.model';
import {OrderTrainingsForm} from '../shared/model/OrderTrainings.model';
import {WebinarOrderForm} from '../shared/model/WebinarOrderForm.model';
import {CalendarTrainings} from '../shared/model/CalendarTrainings.model';
import {Room} from '../shared/model/Room.model';
import {RoomOrderForm} from '../shared/model/room/RoomOrderForm.model';

export interface AppState {
  stateStartApplication: {
    footerInfo: User,
    photoHeader: PhotoHeaderModel,
    inscriptions: Inscriptions,
    dataCalendar: CalendarTrainings,
  };
  stateTrainers: {
    trainers: Trainers,
  };
  stateTrainings: {
    trainings: Trainings,
    trainingOrder: OrderTrainingsForm,
  };
  stateWebinars: {
    webinars: Webinars,
    webinarsInscription: WebinarInscription,
    orderWebinarForm: WebinarOrderForm,
  };
  stateRoom: {
    roomRental: Room;
    dataHourlyOrder: [],
    dataChoiceOfDays: [],
    orderFormRoom: RoomOrderForm;
  };
}


