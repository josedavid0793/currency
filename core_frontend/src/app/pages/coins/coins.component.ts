import { Component } from '@angular/core';
import { coinsName } from '../../interfaces/coins';

@Component({
  selector: 'app-coins',
  templateUrl: './coins.component.html',
  styleUrl: './coins.component.css'
})
export class CoinsComponent {
  coinsName =coinsName;
// Para convertir el objeto en una lista para iterar en la plantilla
get coinsList() {
  return Object.entries(this.coinsName).map(([code, details]) => ({ code, ...details }));
}
}
