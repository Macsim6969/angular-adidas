import { Component, OnInit } from '@angular/core';
import { ScanResult, ScanService } from '../../services/scan.service';

@Component({
  selector: 'app-scan-results',
  templateUrl: './scan-results.component.html',
  styleUrls: ['./scan-results.component.scss']
})
export class ScanResultsComponent implements OnInit {
  public reports: any[] = [];
  public reportsTitle: string[];
  public fileId: ScanResult;
  public fileName: string;

  constructor(
    private scanService: ScanService
  ) { }

  ngOnInit() {
    this.scanService._id$.subscribe(params => {
      this.fileName = this.scanService._fileName$.getValue();
      this.fileId = params;
      if (this.fileId) {
        this.loadReports(this.fileId.scan_id);
      }
    });
  }

  private loadReports(fileId: string) {
    this.scanService.getScanResults(fileId).subscribe((data: ScanResult) => {
      if(data){
        console.log('Scans:', data);
        this.reports = data.scans;
        this.reportsTitle = Object.keys(data.scans);
      }
        
      },
      error => {
        throw new Error(`VirusTotal API error: ${error.message}`);
      }
    );
  }
}
