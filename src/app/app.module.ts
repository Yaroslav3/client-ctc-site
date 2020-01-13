import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {StoreModule} from '@ngrx/store';
import {NgxSpinnerModule} from 'ngx-spinner';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './components-page/home/home.component';
import {OrderComponent} from './components-page/order/order.component';
import {RecommendationsComponent} from './components-page/recommendations/recommendations.component';
import {RoomRentalComponent} from './components-page/room-rental/room-rental.component';
import {ScheduleComponent} from './components-page/schedule/schedule.component';
import {WebinarsComponent} from './components-page/webinars/webinars.component';
import {TrainingsComponent} from './components-page/trainings/trainings.component';
import {HeaderComponent} from './global-components/header/header.component';
import {FooterComponent} from './global-components/footer/footer.component';
import {MenuComponent} from './global-components/menu/menu.component';
import {LoaderComponent} from './global-components/loader/loader.component';
import {MainLayoutComponent} from './main-layout/main-layout.component';
import {TrainingShowComponent} from './components-page/trainings/training-show/training-show.component';
import {CoachComponent} from './components-page/coach/coach.component';
import {ShowCouchResumeComponent} from './components-page/coach/show-couch-resume/show-couch-resume.component';
import {WebinarShowComponent} from './components-page/webinars/webinar-show/webinar-show.component';
import {OrderFormWebinarComponent} from './components-page/webinars/webinar-show/order-form-webinar/order-form-webinar.component';
import {OrderStatusComponent} from './components-page/webinars/webinar-show/order-form-webinar/order-status/order-status.component';
import {OrderRoomComponent} from './components-page/room-rental/order-room/order-room.component';
import {ShowRoomInfoComponent} from './components-page/room-rental/show-room-info/show-room-info.component';
import {HttpClientModule} from '@angular/common/http';
import {AngularEditorModule} from '@kolkov/angular-editor';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HiddenHeaderDirective} from './shared/directives/hidden-header.directive';
import {startApplicationReducer} from './reduxe/startApplication/startApplication.reducer';
import {loadingTrainersReducer} from './reduxe/trainers/trainers.reducer';
import {loadingTrainingsReducer} from './reduxe/trainings/trainings.reducer';
import {ScrollDirective} from './shared/directives/scroll.directive';
import {DelayDirective} from './shared/directives/delay.directive';
import {NgbAlertModule, NgbModule, NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';

// import { ScrollDirective } from './shared/directives/scroll.directive';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    OrderComponent,
    RecommendationsComponent,
    RoomRentalComponent,
    ScheduleComponent,
    WebinarsComponent,
    TrainingsComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    LoaderComponent,
    MainLayoutComponent,
    TrainingShowComponent,
    CoachComponent,
    ShowCouchResumeComponent,
    WebinarShowComponent,
    OrderFormWebinarComponent,
    OrderStatusComponent,
    OrderRoomComponent,
    ShowRoomInfoComponent,
    HiddenHeaderDirective,
    ScrollDirective,
    DelayDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    AngularEditorModule,
    StoreModule.forRoot(
      {
        stateStartApplication: startApplicationReducer,
        stateTrainers: loadingTrainersReducer,
        stateTrainings: loadingTrainingsReducer
      }),
    NgxSpinnerModule,
    BrowserAnimationsModule,
    NgbModule,
    NgbPaginationModule,
    NgbAlertModule,
    ReactiveFormsModule
  ],
  providers: [LoaderComponent, HeaderComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
