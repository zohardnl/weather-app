import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatMenuModule } from "@angular/material/menu";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material/dialog";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { WeatherInfoComponent } from "./weather-info/weather-info.component";
import { FavoritesComponent } from "./favorites/favorites.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AkitaNgDevtools } from "@datorama/akita-ngdevtools";
import { NG_ENTITY_SERVICE_CONFIG } from "@datorama/akita-ng-entity-service";
import { AddonComponent } from "./addon/addon.component";

@NgModule({
	declarations: [
		AppComponent,
		NavbarComponent,
		WeatherInfoComponent,
		FavoritesComponent,
		AddonComponent
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
		AkitaNgDevtools.forRoot({ maxAge: 25 })
	],
	entryComponents: [],
	providers: [
		{
			provide: NG_ENTITY_SERVICE_CONFIG,
			useValue: {
				baseUrl: "https://jsonplaceholder.typicode.com"
			}
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
