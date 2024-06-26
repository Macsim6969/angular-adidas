import {Injectable} from "@angular/core";
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";


@Injectable()

export class MatIconService {
  constructor(private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon('adidas-logo', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/images/adidas/header/adidas-logo.svg'))
    this.matIconRegistry.addSvgIcon('unlike', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/images/adidas/header/unlike.svg'))
    this.matIconRegistry.addSvgIcon('search', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/images/adidas/header/search.svg'))
    this.matIconRegistry.addSvgIcon('like', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/images/adidas/header/like.svg'))
    this.matIconRegistry.addSvgIcon('shop', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/images/adidas/header/shop.svg'))
    this.matIconRegistry.addSvgIcon('user', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/images/adidas/header/user.svg'))
    this.matIconRegistry.addSvgIcon('en', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/images/adidas/languages/en.svg'))
    this.matIconRegistry.addSvgIcon('es', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/images/adidas/languages/es.svg'))
    this.matIconRegistry.addSvgIcon('close', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/images/adidas/choice-lang/close.svg'))
    this.matIconRegistry.addSvgIcon('back-arrow', this.domSanitizer.bypassSecurityTrustResourceUrl('./assets/images/adidas/main/back-arrow.svg'))
  }

}
