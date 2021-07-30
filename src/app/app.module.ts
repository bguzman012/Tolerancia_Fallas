import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgProgressModule} from 'ngx-progressbar';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ToastNoAnimationModule, ToastrModule} from 'ngx-toastr';
import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';

import {SharedModule} from '@gaxon/modules';
import {AppRoutingModule} from '@app/app-routing.module';

import {AppService} from '@app/app.service';
import {AuthService} from '@app/layouts/auth-layout/auth.service';
import {DbdataService} from '@app/data-db/dbdata.service';
import {SettingsService} from '@app/settings/settings.service';
import {NavigationService} from '@gaxon/components/navigation/navigation.service';

import {AppComponent} from './app.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { JwtInterceptor } from 'jwt.interceptor';
import { ErrorInterceptor } from 'error.interceptor';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from 'src/environments/environment';
import { LocationService } from './location.service';
import { MessageService } from 'primeng/api';
// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, 'assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ToastNoAnimationModule,
    ToastrModule.forRoot(),
    AppRoutingModule,
    SharedModule,
    NgProgressModule,
    NgxFileDropModule,
    HttpClientInMemoryWebApiModule.forRoot(DbdataService, {dataEncapsulation: false, passThruUnknownUrl: true}),
    NgbModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule
  ],
  providers: [
    LocationService,
    SettingsService,
    NavigationService,
    AuthService,
    AppService,
    MessageService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
