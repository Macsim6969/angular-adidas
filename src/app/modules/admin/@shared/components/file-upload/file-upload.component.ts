import { Component } from '@angular/core';
import { ScanService } from '../../services/scan.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {

  constructor(
    private scanService: ScanService,
    private router: Router
  ) { }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      console.log('Selected File:', file); // Лог выбранного файла

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
            this.scanService._id = result.scan_id;
            this.router.navigate(['/admin/added/result']).then();
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
