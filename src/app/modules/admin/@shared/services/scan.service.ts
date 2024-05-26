import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface ScanResult {
  md5: string
  permalink: string
  positives: number
  resource: string
  response_code: number
  scan_date: string
  scan_id: string
  scans: any[]
  sha1: string
  sha256: string
  total: number
  verbose_msg: string
}

@Injectable({
  providedIn: 'root'
})
export class ScanService {
  private baseUrl = 'http://localhost:3000/admin';

  private idSubject: BehaviorSubject<ScanResult> = new BehaviorSubject<ScanResult>(null);
  private fileNameSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(private http: HttpClient) { }

  // Метод для отправки файла на сканирование
  startScan(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post<any>(`${this.baseUrl}/scan`, formData)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Метод для получения результатов сканирования
  getScanResults(resourceId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/results/${resourceId}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Метод для отметки файла как ложноположительного
  markAsFalsePositive(resultId: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/markAsFalsePositive`, { resultId })
      .pipe(
        catchError(this.handleError)
      );
  }

  // Обработка ошибок
  private handleError(error: any) {
    console.error('API Error:', error);
    return throwError('Something bad happened; please try again later.');
  }

  get _id$() {
    return this.idSubject;
  }

  set _id(value: ScanResult) {
    this.idSubject.next(value);
  }

  get _fileName$() {
    return this.fileNameSubject;
  }

  set _fileName(value: string) {
    this.fileNameSubject.next(value);
  }
}
