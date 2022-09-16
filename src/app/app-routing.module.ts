import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { HomeComponent } from './home/home.component';
import { MasterformComponent } from './masterform/masterform.component';
import { ProfileComponent } from './profile/profile.component';
import { WebapiComponent } from './webapi/webapi.component';

const routes: Routes = [
  /* Changes start here. */
  {
    path: 'profile',
    component: ProfileComponent,
    // The profile component is protected with MSAL Guard.
    canActivate: [MsalGuard],
  },
  {
    path: 'webapi',
    component: WebapiComponent,
    // The profile component is protected with MSAL Guard.

    canActivate: [MsalGuard],
  },
  {
    // The home component allows anonymous access
    path: '',
    component: HomeComponent,
  },
  // {
  //   path: 'editprofile',
  //   component: EditprofileComponent,
  //   // The profile component is protected with MSAL Guard.
  //  canActivate: [MsalGuard],
  // },
  /* Changes end here. */

  {
    path: 'masterform',
    component: MasterformComponent,

    canActivate: [MsalGuard],
  },
];

@NgModule({
  /* Changes start here. */
  // Replace the following line with the next one
  //imports: [RouterModule.forRoot(routes)],
  imports: [RouterModule.forRoot(routes)],
  /* Changes end here. */
  exports: [RouterModule],
})
export class AppRoutingModule {}
