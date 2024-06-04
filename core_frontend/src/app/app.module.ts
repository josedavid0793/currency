import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConverterComponent } from './pages/converter/converter.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { OrderByPipe } from './pipes/order-by.pipe';
import { CoinsComponent } from './pages/coins/coins.component';
import { TerminosComponent } from './components/terminos/terminos.component';
@NgModule({
  declarations: [
    AppComponent,
    ConverterComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    OrderByPipe,
    CoinsComponent,
    TerminosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
