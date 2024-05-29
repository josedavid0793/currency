import { Component } from '@angular/core';
import { Quotes } from '../../interfaces/quotes';
import { CurrencyService } from '../../services/currency.service';
import { OrderByPipe } from '../../pipes/order-by.pipe';
import { currencyNames } from '../../interfaces/currencyNames';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrl: './converter.component.css',
})
export class ConverterComponent {
  showErrorMessage: boolean = false;
  data: any;
  quotes: any[] = [];
  conversion: any[] = [];
  selectedFromCurrency: string = '';
  selectedToCurrency: string = '';
  selectedConversion: any[] = [];
  currencyNames = currencyNames; // Asigna el mapeo a una propiedad del componente
  exchangeRates: { [key: string]: number } = {};

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.currencyService.getCurrency().subscribe((data) => {
      this.exchangeRates = data.conversion_rates;
      console.log(this.exchangeRates);
    });
    //debugger;
    /*this.currencyService.getCurrency().subscribe((data) => {
      this.quotes = data.result.conversion.map(
        (conversion: { to: string | number }) => ({
          ...conversion,
          to: this.currencyNames[conversion.to] || conversion.to,
        })
      );
      console.log(this.quotes);
    });*/
  }

  getKeys(obj: any): string[] {
    return Object.keys(obj);
    
  }

  // Función para actualizar el array de conversiones cuando se cambia la selección del 'from'
  updateSelectedConversion(): void {
    const selectedQuote = this.quotes.find(
      (quote: { from: string }) => quote.from === this.selectedFromCurrency
    );
    if (selectedQuote) {
      this.selectedConversion = selectedQuote.conversion;
    } else {
      this.selectedConversion = [];
    }
  }

  validateInput(event: any) {
    const inputValue: string = event.target.value;
    const onlyNumbers: RegExp = /^[0-9\.' ,]*$/; // Expresión regular que acepta solo números

    if (!onlyNumbers.test(inputValue)) {
      this.showErrorMessage = true;
    } else {
      this.showErrorMessage = false;
    }
  }
}
