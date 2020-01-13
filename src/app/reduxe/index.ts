import {User} from '../shared/model/User.model';
import {Trainers} from '../shared/model/Trainers.model';
import {PhotoHeaderModel} from '../shared/model/PhotoHeader.model';
import {Trainings} from '../shared/model/Trainings.model';

export interface AppState {
  stateStartApplication: {
    footerInfo: User,
    photoHeader: PhotoHeaderModel,
  };
  stateTrainers: {
    trainers: Trainers,
  };
  stateTrainings: {
    trainings: Trainings,
  };

}


