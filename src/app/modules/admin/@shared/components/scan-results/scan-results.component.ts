import { Component, OnDestroy, OnInit } from '@angular/core';
import { ScanService } from '../../services/scan.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-scan-results',
  templateUrl: './scan-results.component.html',
  styleUrls: ['./scan-results.component.scss']
})
export class ScanResultsComponent implements OnInit, OnDestroy {
  public contentGoods: any;
  public errorImages: boolean[] = [];

  private fileContentSubscription: Subscription;

  constructor(
    private scanService: ScanService,
    private router: Router
  ) { }

  ngOnInit() {
    this.initializeContentFileData();
  }

  private initializeContentFileData() {
    this.fileContentSubscription = this.scanService._fileContent$.subscribe((data) => {
      data ? this.contentGoods = data : this.router.navigate(['/admin/added/scan'], { queryParamsHandling: 'merge' }).then();
    })
  }

  public handleImageError(index: number) {
    this.errorImages[index] = true;
  }

  ngOnDestroy(): void {
    this.fileContentSubscription.unsubscribe();
  }
}
