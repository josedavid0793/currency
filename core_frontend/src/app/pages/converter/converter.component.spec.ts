import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ConverterComponent } from './converter.component';
import { CurrencyService } from '../../services/currency.service';
import { of } from 'rxjs';

describe('ConverterComponent', () => {
  let component: ConverterComponent;
  let fixture: ComponentFixture<ConverterComponent>;
  let currencyService: CurrencyService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConverterComponent],
      imports: [HttpClientTestingModule],
      providers: [CurrencyService]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConverterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConverterComponent);
    component = fixture.componentInstance;
    currencyService = TestBed.inject(CurrencyService);
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize exchange rates on init', () => {
    const mockExchangeRates = { USD: 1, EUR: 0.9 };
    spyOn(currencyService, 'getCurrency').and.returnValue(of({ conversion_rates: mockExchangeRates }));
    
    component.ngOnInit();

    expect(component.exchangeRates).toEqual(mockExchangeRates);
  });

  it('should validate input correctly', () => {
    const validEvent = { target: { value: '123' } };
    const invalidEvent = { target: { value: '123abc' } };

    component.validateInput(validEvent);
    expect(component.showErrorMessage).toBeFalse();

    component.validateInput(invalidEvent);
    expect(component.showErrorMessage).toBeTrue();
  });

  it('should get exchange rate', () => {
    const mockResponse = { conversion_result: 1.1 };
    spyOn(currencyService, 'getExchangeRate').and.returnValue(of(mockResponse));
    
    component.base_code = 'USD';
    component.target_code = 'EUR';
    component.amount = 100;
    
    component.getExchangeRate();

    expect(component.conversionResult).toEqual(1.1);
  });

  it('should update selected conversion correctly', () => {
    component.quotes = [
      { from: 'USD', conversion: [{ to: 'EUR', rate: 0.9 }] }
    ];
    component.selectedFromCurrency = 'USD';

    component.updateSelectedConversion();

    expect(component.selectedConversion).toEqual([{ to: 'EUR', rate: 0.9 }]);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
