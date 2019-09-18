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
import { StoreModule } from "@ngrx/store";
import { weatherReducer } from "./weather-info/store/weather.reducer";

@NgModule({
	declarations: [AppComponent, NavbarComponent, WeatherInfoComponent, FavoritesComponent],
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
		StoreModule.forRoot({ weather: weatherReducer })
	],
	entryComponents: [],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {}
