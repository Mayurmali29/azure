import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
/* Changes start here. */
// Import MSAL and MSAL browser libraries.
import {
  MsalGuard,
  MsalInterceptor,
  MsalModule,
  MsalRedirectComponent,
} from '@azure/msal-angular';
import { InteractionType, PublicClientApplication } from '@azure/msal-browser';

// Import the Azure AD B2C configuration
import { msalConfig, protectedResources } from './auth-config';

// Import the Angular HTTP interceptor.
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { WebapiComponent } from './webapi/webapi.component';

// Add the essential Angular materials.
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

import { EditprofileComponent } from './editprofile/editprofile.component';
import { EmployeeComponent } from './employee/employee.component';
import { ConfirmComponent } from './dialogs/confirm/confirm.component';
import { ConfirmdeleteComponent } from './dialogs/confirmdelete/confirmdelete.component';
import { MasterformComponent } from './masterform/masterform.component';
/* Changes end here. */

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    HomeComponent,
    WebapiComponent,
    EditprofileComponent,
    EmployeeComponent,
    ConfirmComponent,
    ConfirmdeleteComponent,
    MasterformComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    /* Changes start here. */
    // Import the following Angular materials.
    MatButtonModule,
    MatToolbarModule,
    MatListModule,
    MatTableModule,
    // Import the HTTP client.
    HttpClientModule,

    // Initiate the MSAL library with the MSAL configuration object
    MsalModule.forRoot(
      new PublicClientApplication(msalConfig),
      {
        // The routing guard configuration.
        interactionType: InteractionType.Redirect,
        authRequest: {
          scopes: protectedResources.todoListApi.scopes,
        },
      },
      {
        // MSAL interceptor configuration.
        // The protected resource mapping maps your web API with the corresponding app scopes. If your code needs to call another web API, add the URI mapping here.
        interactionType: InteractionType.Redirect,
        protectedResourceMap: new Map([
          [
            protectedResources.todoListApi.endpoint,
            protectedResources.todoListApi.scopes,
          ],
        ]),
      }
    ),
    MatInputModule,
    MatPaginatorModule,
    MatIconModule,
    ToastrModule.forRoot(),
    MatProgressSpinnerModule,
    MatDialogModule,
    MatSelectModule,
    FormsModule,

    /* Changes end here. */
  ],
  providers: [
    /* Changes start here. */
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true,
    },
    MsalGuard,
    /* Changes end here. */
  ],
  bootstrap: [
    AppComponent,
    /* Changes start here. */
    MsalRedirectComponent,
    /* Changes end here. */
  ],
})
export class AppModule {}
