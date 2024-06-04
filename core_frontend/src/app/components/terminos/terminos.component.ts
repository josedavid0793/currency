import { Component } from '@angular/core';

@Component({
  selector: 'app-terminos',
  templateUrl: './terminos.component.html',
  styleUrl: './terminos.component.css'
})
export class TerminosComponent {
  accepted: boolean = false;

  ngOnInit(): void {
    this.checkAcceptedTerms();
  }

  acceptTerms(): void {
    localStorage.setItem('acceptedTerms', 'true');
    this.accepted = true;
  }

  checkAcceptedTerms(): void {
    const accepted = localStorage.getItem('acceptedTerms');
    if (accepted === 'true') {
      this.accepted = true;
    }
  }
}
