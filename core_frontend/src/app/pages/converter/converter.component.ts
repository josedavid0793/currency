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
  base_code: string = '';
  target_code: string = '';
  amount: number = 1;
  conversionResult: number | null = null;
  formattedResult: string | null = null;
  

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.currencyService.getCurrency().subscribe((data) => {
      this.exchangeRates = data.conversion_rates;
      console.log(this.exchangeRates);
    });
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

  getExchangeRate() {
    this.currencyService.getExchangeRate(this.base_code, this.target_code, this.amount)
      .subscribe(response => {
        if (response!=null) {
          this.conversionResult = response.conversion_result;
        }else{
          this.conversionResult = response.result;
        }
         // Formatear el resultado
         this.formattedResult = this.formatCurrency(this.amount, this.conversionResult);
        
      });
  }
  formatCurrency(audAmount: number, copAmount: number | null): string | null {
    if (copAmount === null) {
      return null;
    }
    // Convertir a entero y formatear con separadores de miles
    let formattedCopAmount = Math.floor(copAmount).toLocaleString('de-DE'); // 'de-DE' usa punto como separador de miles
    return `${audAmount} ${this.base_code} = ${formattedCopAmount} ${this.target_code}`;
  }

}
