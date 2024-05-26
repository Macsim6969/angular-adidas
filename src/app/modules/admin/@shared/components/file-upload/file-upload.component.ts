import { Component, OnInit } from '@angular/core';
import { ScanResult, ScanService } from '../../services/scan.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  public isPopup: boolean;

  //scan result
  public reports: any[] = [];
  public reportsTitle: string[];
  public fileId: ScanResult;
  public fileName: string;
  public detectedCount: number = 0;
  public notDetectedCount: number = 0;

  constructor(
    private scanService: ScanService
  ) { }

  ngOnInit(): void {
    this.initializeResultScaneData();
  }

  private initializeResultScaneData() {
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
      if (data) {
        console.log('Scans:', data);
        this.reports = data.scans;
        this.reportsTitle = Object.keys(data.scans);


        for (let key of Object.keys(this.reports)) {
          if (this.reports[key].detected) {
            this.detectedCount++;
            console.log(this.detectedCount);
          } else {
            this.notDetectedCount++;
          }
        }

      }

    },
      error => {
        throw new Error(`VirusTotal API error: ${error.message}`);
      }
    );
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.isPopup = true;

    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      const xhr = new XMLHttpRequest();
      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          const percentComplete = (e.loaded / e.total) * 100;
          this.updateProgressBar(percentComplete);
        }
      }, false);

      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
            const result = JSON.parse(xhr.responseText);
            this.scanService._id = result;
            this.scanService._fileName = file.name;
            //this.router.navigate(['/admin/added/result']).then();
          } else {
            console.error('Error analyzing file:', xhr.responseText);
          }
        }
      };

      xhr.open('POST', 'http://localhost:3000/admin/scan', true);
      xhr.send(formData);
    }
  }

  updateProgressBar(progress: number) {
    const progressBar = document.getElementById('progress-bar') as HTMLElement;
    progressBar.style.width = progress + '%';
  }
}
