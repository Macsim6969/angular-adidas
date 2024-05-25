import { Component } from '@angular/core';
import { ScanService } from '../../services/scan.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {

  constructor(private scanService: ScanService,
    private router: Router
  ) { }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      console.log('Selected File:', file); // Лог выбранного файла
      this.scanService.startScan(file).subscribe(result => {
        if (result) {
          this.scanService._id = result.scan_id
          this.router.navigate(['/admin/added/result']).then()
        }
      }, error => {
        console.error('Error analyzing file:', error);
      });
    }
  }
}
