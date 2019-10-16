import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { WeatherInfoComponent } from "./weather-info/weather-info.component";
import { FavoritesComponent } from "./favorites/favorites.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AkitaNgDevtools } from "@datorama/akita-ngdevtools";
import { NG_ENTITY_SERVICE_CONFIG } from "@datorama/akita-ng-entity-service";
import { LoginComponent } from "./auth/login/login.component";
import { SigupComponent } from "./auth/sigup/sigup.component";
import {
	MatCardModule,
	MatToolbarModule,
	MatSlideToggleModule,
	MatProgressSpinnerModule,
	MatDialogModule,
	MatMenuModule,
	MatSnackBarModule,
	MatFormFieldModule,
	MatIconModule,
	MatInputModule,
	MatButtonModule
} from "@angular/material";
import { AuthInterceptor } from "./auth/auth-interceptor";

@NgModule({
	declarations: [
		AppComponent,
		NavbarComponent,
		WeatherInfoComponent,
		FavoritesComponent,
		LoginComponent,
		SigupComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		MatButtonModule,
		MatInputModule,
		MatIconModule,
		MatFormFieldModule,
		FlexLayoutModule,
		MatSnackBarModule,
		MatMenuModule,
		FormsModule,
		ReactiveFormsModule,
		MatDialogModule,
		MatProgressSpinnerModule,
		BrowserAnimationsModule,
		MatSlideToggleModule,
		MatCardModule,
		MatToolbarModule,
		AkitaNgDevtools.forRoot({ maxAge: 25 })
	],
	entryComponents: [],
	providers: [
		{
			provide: NG_ENTITY_SERVICE_CONFIG,
			useValue: {
				baseUrl: "https://jsonplaceholder.typicode.com"
			}
		},
		{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
