import { Component, OnInit } from '@angular/core';
import { ScanService } from '../../services/scan.service';

@Component({
  selector: 'app-scan-results',
  templateUrl: './scan-results.component.html',
  styleUrls: ['./scan-results.component.scss']
})
export class ScanResultsComponent implements OnInit {
  public reports: any[] = [];

  constructor(private scanService: ScanService) { }

  ngOnInit() {
    this.loadReports();
  }

  private loadReports() {
    this.scanService.getScanResults().subscribe(data => {
      console.log(data)
      this.reports = data;
    });
  }
}
