import { Component, OnDestroy, OnInit } from '@angular/core';
import { ScanResult, ScanService } from '../../services/scan.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit, OnDestroy {

  public isPopup: boolean;
  private scanSubscription: Subscription;
  private getScanResultsSubscription: Subscription;
  private file: File;
  public isScanFalse: boolean;
  //scan result
  public reports: any[] = [];
  public reportsTitle: string[];
  public fileId: ScanResult;
  public fileName: string;
  public detectedCount: number = 0;
  public notDetectedCount: number = 0;

  constructor(
    private scanService: ScanService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initializeResultScaneData();
  }

  private initializeResultScaneData() {
    this.scanSubscription = this.scanService._id$.subscribe(params => {
      this.fileName = this.scanService._fileName$.getValue();
      this.fileId = params;
      if (this.fileId) {
        this.loadReports(this.fileId.scan_id);
      }
    });
  }

  private loadReports(fileId: string) {
    this.getScanResultsSubscription = this.scanService.getScanResults(fileId).subscribe((data: ScanResult) => {
      if (data.scans) {
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
      } else {
        data.response_code === -2 ? this.isScanFalse = true : null;
      }

    },
      error => {
        throw new Error(`VirusTotal API error: ${error.message}`);
      }
    );
  }

  public onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.file = file;
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

  private updateProgressBar(progress: number) {
    const progressBar = document.getElementById('progress-bar') as HTMLElement;
    progressBar.style.width = progress + '%';
  }

  public removeFile() {
    this.isPopup = false;

    setTimeout(() => {
      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      input ? input.value = '' : null;
    }, 1000);
  }

  public confirmFile() {
    const fileReader = new FileReader();

    fileReader.onload = (e) => {
      try {
        const jsonContent = JSON.parse(fileReader.result as string);
        console.log(jsonContent);
        this.scanService._fileContent = jsonContent;
        this.router.navigate(['/admin/added/result']).then();
        // Proceed with your existing logic, e.g., sending the file to the server
        const formData = new FormData();
        formData.append('file', this.file);

        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:3000/admin/scan', true);
        xhr.send(formData);
      } catch (error) {
        console.error('Error parsing JSON file:', error);
      }
    };

    // Read the file as text
    fileReader.readAsText(this.file);
  }


  ngOnDestroy(): void {
    this.scanSubscription.unsubscribe();
    this.getScanResultsSubscription ? this.getScanResultsSubscription.unsubscribe() : null;
  }
}
