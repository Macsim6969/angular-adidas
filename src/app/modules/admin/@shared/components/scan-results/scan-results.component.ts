import { Component, OnInit } from '@angular/core';
import { ScanService } from '../../services/scan.service';

@Component({
  selector: 'app-scan-results',
  templateUrl: './scan-results.component.html',
  styleUrls: ['./scan-results.component.scss']
})
export class ScanResultsComponent implements OnInit {
  public reports: any[] = [];
  public reportsTitle: string[];
  public fileId: string;

  constructor(
    private scanService: ScanService
  ) { }

  ngOnInit() {
    this.scanService._id$.subscribe(params => {
      this.fileId = params;
      if (this.fileId) {
        this.loadReports(this.fileId);
      }
    });
  }

  private loadReports(fileId: string) {
    this.scanService.getScanResults(fileId).subscribe(
      data => {
        console.log('Scans:', data.scans);
        this.reports = data.scans;
        this.reportsTitle = Object.keys(data.scans);
      },
      error => {
        console.error('Error loading reports:', error);
        // Обработка ошибок, если необходимо
      }
    );
  }
}
