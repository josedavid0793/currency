import { Component } from '@angular/core';
import { coinsName } from '../../interfaces/coins';

@Component({
  selector: 'app-coins',
  templateUrl: './coins.component.html',
  styleUrl: './coins.component.css'
})
export class CoinsComponent {
  coinsName =coinsName;
  currentPage: number = 1;
  itemsPerPage: number = 20;
// Para convertir el objeto en una lista para iterar en la plantilla
get coinsList() {
  return Object.entries(this.coinsName).map(([code, details]) => ({ code, ...details }));
}
get paginatedCoinsList() {
  const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  const endIndex = startIndex + this.itemsPerPage;
  return this.coinsList.slice(startIndex, endIndex);
}

get totalPages() {
  return Math.ceil(this.coinsList.length / this.itemsPerPage);
}

changePage(page: number) {
  if (page > 0 && page <= this.totalPages) {
    this.currentPage = page;
  }
}
}
