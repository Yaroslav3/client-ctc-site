import {User} from '../shared/model/User.model';
import {Trainers} from '../shared/model/Trainers.model';
import {PhotoHeaderModel} from '../shared/model/PhotoHeader.model';
import {Trainings} from '../shared/model/Trainings.model';
import {Inscriptions} from '../shared/model/Inscriptions.model';
import {Webinars} from '../shared/model/Webinars.model';
import {WebinarInscription} from '../shared/model/WebinarInscription.model';

export interface AppState {
  stateStartApplication: {
    footerInfo: User,
    photoHeader: PhotoHeaderModel,
    inscriptions: Inscriptions;
  };
  stateTrainers: {
    trainers: Trainers,
  };
  stateTrainings: {
    trainings: Trainings,
  };
  stateWebinars: {
    webinars: Webinars,
    webinarsInscription: WebinarInscription
  }
}


