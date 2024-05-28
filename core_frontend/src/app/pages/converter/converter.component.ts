import { Component } from '@angular/core';
import { Quotes } from '../../interfaces/quotes';
import { CurrencyService } from '../../services/currency.service';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrl: './converter.component.css',
})
export class ConverterComponent {
  showErrorMessage: boolean = false;
  data: any;
  //quotes:Quotes[]=[];
  quotes: any[] = [];
  conversion: any[] = [];
  selectedFromCurrency: string = '';
  selectedToCurrency: string = '';
  selectedConversion: any[] = [];

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {
    //debugger;
    this.currencyService.getCurrency().subscribe((data) => {
      this.quotes = data.result.conversion;
      console.log(this.quotes);
    });
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
