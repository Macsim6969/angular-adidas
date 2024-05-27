import { Component, OnDestroy, OnInit } from '@angular/core';
import { ScanService } from '../../services/scan.service';

@Component({
  selector: 'app-scan-results',
  templateUrl: './scan-results.component.html',
  styleUrls: ['./scan-results.component.scss']
})
export class ScanResultsComponent implements OnInit, OnDestroy {
  public contentGoods: any;
  public errorImages: boolean[] = [];

  constructor(
    private scanService: ScanService
  ) { }

  ngOnInit() {
    this.scanService._fileContent$.subscribe((data) => {
      this.contentGoods = data;
    })

  }

  public handleImageError(index: number) {
    this.errorImages[index] = true;
  }

  ngOnDestroy(): void {

  }
}
