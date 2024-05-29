import { Component } from '@angular/core';
import { Quotes } from '../../interfaces/quotes';
import { CurrencyService } from '../../services/currency.service';
import { OrderByPipe } from '../../pipes/order-by.pipe';

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

  currencyNames: { [key: string]: string } = {
    ADA: 'Cardano (Criptomoneda)',
    AED: 'Dirham de los Emiratos Árabes Unidos',
    AFN: 'AfgAni (Afganistán)',
    ALL: 'Lek (Albania)',
    AMD: 'Dram Armenio',
    AOA: 'Kwanza (Angola)',
    ARS: 'Peso Argentino',
    AUD: 'Dólar Australiano',
    AWG: 'Florín Arubeño',
    AZN: 'Manat Azerbaiyano',
    BAM: 'Marco Convertible (Bosnia y Herzegovina)',
    BBD: 'Dólar de Barbados',
    BCH: 'Bitcoin Cash (Criptomoneda)',
    BDT: 'Taka (Bangladesh)',
    BGN: 'Lev Búlgaro',
    BHD: 'Dinar de Bahréin',
    BIF: 'Franco Burundés',
    BMD: 'Dólar Bermudeño',
    BNB: 'Binance Coin (Criptomoneda)',
    BND: 'Dólar de Brunéi',
    BOB: 'Boliviano',
    BRL: 'Real Brasileño',
    BSD: 'Dólar de las Bahamas',
    BTC: 'Bitcoin (Criptomoneda)',
    BTN: 'Ngultrum (Bután)',
    BWP: 'Pula (Botswana)',
    BYN: 'Rublo Bielorruso',
    BZD: 'Dólar de Belice',
    CAD: 'Dólar Canadiense',
    CDF: 'Franco Congoleño',
    CHF: 'Franco Suizo',
    CLF: 'Unidad de Fomento (Chile, unidad de cuenta)',
    CLP: 'Peso Chileno (Chile)',
    CNH: 'Yuan Chino Offshore (China)',
    CNY: 'Yuan Chino (China)',
    CRO: 'Cronos (Criptomoneda)',
    CUC: 'Peso Convertible Cubano (Cuba)',
    CUP: 'Peso Cubano (Cuba)',
    CVE: 'Escudo Caboverdiano',
    CZK: 'Corona Checa',
    CRC: 'Colón Costarricense',
    DAI: 'Dai (Criptomoneda)',
    DASH: 'Dash (Criptomoneda)',
    DJF: 'Franco Yibutiano',
    DKK: 'Corona Danesa',
    DOGE: 'Dogecoin (Criptomoneda)',
    DOP: 'Peso Dominicano',
    DOT: 'Polkadot (Criptomoneda)',
    DVPN: 'Sentinel (Criptomoneda)',
    DZD: 'Dinar Argelino',
    EGP: 'Libra Egipcia',
    EOS: 'EOS.IO (Criptomoneda)',
    ERN: 'Nakfa (Eritrea)',
    ETB: 'Birr Etíope',
    ETH: 'Ethereum (Criptomoneda)',
    EUR: 'Euro',
    FJD: 'Dólar Fiyiano',
    FKP: 'Libra Malvinense',
    GEL: 'Lari (Georgia)',
    GGP: 'Libra de Guernsey',
    GHC: 'Cedi de Ghana',
    GIP: 'Libra de Gibraltar',
    GMD: 'Dalasi (Gambia)',
    GTQ: 'Quetzal (Guatemala)',
    GYD: 'Dólar Guyanés',
    HKD: 'Dólar de Hong Kong',
    HNL: 'Lempira Hondureño',
    HTG: 'Gourde Haitiano',
    IDR: 'Rupia Indonesia',
    ILS: 'Nuevo Shekel Israelí',
    IMP: 'Libra de la Isla de Man',
    INR: 'Rupia India',
    IQD: 'Dinar Iraquí',
    IRR: 'Rial Iraní',
    ISK: 'Corona Islandesa',
    JEP: 'Libra de Jersey',
    JMD: 'Dólar Jamaicano',
    JOD: 'Dinar Jordano',
    JPY: 'Yen Japonés',
    KES: 'Chelín Keniano',
    KGS: 'Som Kirguís',
    KHR: 'Riel Camboyano',
    KMF: 'Franco Comorense',
    KPW: 'Won Norcoreano',
    KRW: 'Won Surcoreano',
    KWD: 'Dinar Kuwaití',
    KYD: 'Dólar de las Islas Caimán',
    KZT: 'Tenge Kazajo',
    LAK: 'Kip Laosiano',
    LBP: 'Libra Libanesa',
    LINK: 'Chainlink (Criptomoneda)',
    LKR: 'Rupia de Sri Lanka',
    LRD: 'Dólar Liberiano',
    LSL: 'Loti Lesotense',
    LTC: 'Litecoin (Criptomoneda)',
    LUNA: 'Terra (Criptomoneda)',
    LYD: 'Dinar Libio',
    MAD: 'Dírham Marroquí',
    MDL: 'Leu Moldavo',
    MGA: 'Ariary Malgache (Madagascar)',
    MKD: 'Denar Macedonio',
    MMK: 'Kyat Birmano (Myanmar)',
    MNT: 'Tugrik Mongol',
    MOP: 'Pataca Macanesa',
    MRU: 'Ouguiya Mauritana',
    MUR: 'Rupia de Mauricio',
    MVR: 'Rufiyaa Maldivo',
    MWK: 'Kwacha Malauí',
    MXN: 'Peso Mexicano',
    MYR: 'Ringgit Malayo',
    MZN: 'Metical Mozambicano',
    NGN: 'Naira Nigeriano',
    NIO: 'Córdoba Nicaragüense',
    NOK: 'Corona Noruega',
    NPR: 'Rupia Nepalí',
    NZD: 'Dólar Neozelandés',
    OMR: 'Rial Omaní',
    PAB: 'Balboa Panameño',
    PEN: 'Sol Peruano',
    PGK: 'Kina (Papúa Nueva Guinea)',
    PHP: 'Peso Filipino',
    PKR: 'Rupia Pakistaní',
    PLN: 'Zloty Polaco',
    PYG: 'Guaraní Paraguayo',
    QAR: 'Riyal Catarí',
    QTUM: 'Qtum (Criptomoneda)',
    RON: 'Leu Rumano',
    RSD: 'Dinar Serbio',
    RUB: 'Rublo Ruso',
    RUNE: 'Thorchain (Criptomoneda)',
    RWF: 'Franco Ruandés',
    SAR: 'Riyal Saudí',
    SBD: 'Dólar de las Islas Salomón',
    SCR: 'Rupia de Seychelles',
    SDD: 'Dinar Sudanés',
    SDG: 'Libra Sudanesa',
    SEK: 'Corona Sueca',
    SGD: 'Dólar de Singapur',
    SHP: 'Libra de Santa Elena',
    SLE: 'Leone de Sierra Leona',
    SOS: 'Chelín Somalí',
    SPL: 'Luigino de Seborga (Seborga, moneda no oficial)',
    SRD: 'Dólar de Surinam',
    SSP: 'Libra de Sudán del Sur',
    STN: 'Dobra de Santo Tomé y Príncipe',
    SVC: 'Colón Salvadoreño',
    SYP: 'Libra Siria',
    SZL: 'Lilangeni Suazi',
    THB: 'Baht Tailandés',
    TJS: 'Somoni Tayiko',
    TMT: 'Manat Turcomano',
    TND: 'Dinar Tunecino',
    TOP: 'Paʻanga (Tonga)',
    TRY: 'Lira Turca',
    TTD: 'Dólar de Trinidad y Tobago',
    TVD: 'Dólar Tuvaluano (Tuvalu, moneda no oficial, utiliza AUD)',
    TWD: 'Nuevo Dólar Taiwanés',
    TZS: 'Chelín Tanzano',
    UAH: 'Grivna (Ucrania)',
    UGX: 'Chelín Ugandés',
    UNI: 'Uniswap (Criptomoneda)',
    USD: 'Dólar Estadounidense',
    USDT: 'Tether (Criptomoneda)',
    UYU: 'Peso Uruguayo',
    UZS: 'Som Uzbeco',
    VES: 'Bolívar Venezolano (Venezuela)',
    VND: 'Dong Vietnamita',
    VUV: 'Vatu (Vanuatu)',
    WAVES: 'Waves (Criptomoneda)',
    WST: 'Tala Samoano',
    XAF: 'Franco CFA de África Central',
    XAG: 'Plata (metal precioso)',
    XAU: 'Oro (metal precioso)',
    XBT: 'Bitcoin',
    XCD: 'Dólar del Caribe Oriental',
    XDR: 'Derechos Especiales de Giro (Fondo Monetario Internacional)',
    XLM: 'Stellar Lumens (Criptomoneda)',
    XOF: 'Franco CFA de África Occidental',
    XPD: 'Paladio (metal precioso)',
    XPF: 'Franco CFP',
    XPRT: 'Persistence (Criptomoneda)',
    XPT: 'Platino (metal precioso)',
    XRP: 'Ripple (Criptomoneda)',
    YER: 'Rial Yemení',
    ZAR: 'Rand Sudafricano',
    ZEC: 'Zcash (Criptomoneda)',
    ZMW: 'Kwacha Zambiano',
    ZWL: 'Dólar Zimbabuense',
    NAD: 'Namibian Dollar',
    HUF: 'Hungarian Forint',
    GNF: 'Guinean Franc',
    GHS: 'Ghanaian Cedi',
    ANG: 'Netherlands Antillean Guilder',
    GBP: 'British Pound Sterling',
    // Agrega más códigos y nombres de moneda aquí según sea necesario
    COP: 'Peso Colombiano',
  };

  constructor(private currencyService: CurrencyService) {}

  ngOnInit(): void {
    //debugger;
    this.currencyService.getCurrency().subscribe((data) => {
      this.quotes = data.result.conversion.map(
        (conversion: { to: string | number }) => ({
          ...conversion,
          to: this.currencyNames[conversion.to] || conversion.to,
        })
      );
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
