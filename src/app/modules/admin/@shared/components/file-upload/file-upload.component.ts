import { Component } from '@angular/core';
import { ScanService } from '../../services/scan.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {

  constructor(private scanService: ScanService) {}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      console.log('Selected File:', file); // Лог выбранного файла
      this.scanService.startScan(file).subscribe(result => {
        console.log('Analysis Result:', result);
        this.scanService._id = result.scan_id
      }, error => {
        console.error('Error analyzing file:', error);
      });
    }
  }
}
