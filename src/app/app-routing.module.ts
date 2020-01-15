import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './components-page/home/home.component';
import {TrainingsComponent} from './components-page/trainings/trainings.component';
import {WebinarsComponent} from './components-page/webinars/webinars.component';
import {MainLayoutComponent} from './main-layout/main-layout.component';
import {TrainingShowComponent} from './components-page/trainings/training-show/training-show.component';
import {OrderComponent} from './components-page/order/order.component';
import {ShowCouchResumeComponent} from './components-page/coach/show-couch-resume/show-couch-resume.component';
import {CoachComponent} from './components-page/coach/coach.component';
import {WebinarShowComponent} from './components-page/webinars/webinar-show/webinar-show.component';
import {OrderFormWebinarComponent} from './components-page/webinars/webinar-show/order-form-webinar/order-form-webinar.component';
import {OrderStatusComponent} from './components-page/webinars/webinar-show/order-form-webinar/order-status/order-status.component';
import {ScheduleComponent} from './components-page/schedule/schedule.component';
import {RoomRentalComponent} from './components-page/room-rental/room-rental.component';
import {ShowRoomInfoComponent} from './components-page/room-rental/show-room-info/show-room-info.component';
import {OrderRoomComponent} from './components-page/room-rental/order-room/order-room.component';
import {RecommendationsComponent} from './components-page/recommendations/recommendations.component';


const routes: Routes = [
    {
      path: '', component: MainLayoutComponent, children: [
        {path: '', redirectTo: '/home', pathMatch: 'full'},
        {path: 'home', component: HomeComponent},
        {path: 'trainings', component: TrainingsComponent},
        {path: 'trainings/training-show/:id', component: TrainingShowComponent},
        {path: 'trainings-order/:id', component: OrderComponent},
        {path: 'trainings/coach', component: CoachComponent},
        {path: 'trainings/coach/resume/:id', component: ShowCouchResumeComponent},
        {path: 'webinars', component: WebinarsComponent},
        {path: 'webinars/webinar-show/:id', component: WebinarShowComponent},
        {path: 'webinars/webinar-order-form', component: OrderFormWebinarComponent},
        {path: 'webinars/webinar-order/status/:id', component: OrderStatusComponent},
        {path: 'room-rental', component: RoomRentalComponent},
        {path: 'room-rental/show/:id', component: ShowRoomInfoComponent},
        {path: 'room/order/:id', component: OrderRoomComponent},
        {path: 'schedule', component: ScheduleComponent},
        {path: 'recommendations', component: RecommendationsComponent},
      ]
    },
    {path: '**', redirectTo: '/home'}
  ]
;

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'top'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
