import jsPDF from 'jspdf';
import {
  Component,
  ViewChild,
  ElementRef,
  OnInit,
  AfterViewInit,
  OnChanges,
  DoCheck,
  AfterViewChecked, ViewChildren, QueryList
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatCardModule } from "@angular/material/card";
import { MatTableModule } from "@angular/material/table";

import html2canvas from 'html2canvas';
import {HttpClient} from "@angular/common/http";
import {MatButton} from "@angular/material/button";
export interface PeriodicElement {
  setPoints: string;
  deviation: string;
  uncertainty: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {setPoints: '+60 °C', deviation: '.5 °C', uncertainty: '±0.2 °C'},
  {setPoints: '+25 °C', deviation: '.5 °C', uncertainty: '±0.2 °C'},
  {setPoints: '0 °C', deviation: '.5 °C', uncertainty: '±0.2 °C'},
  {setPoints: '-10 °C', deviation: '.5 °C', uncertainty: '±0.2 °C'},
  {setPoints: '-30 °C', deviation: '.5 °C', uncertainty: '±0.2 °C'},
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatCardModule, MatTableModule, MatButton],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit {
  instrumentName: string = 'Test Instrument';
  title = 'lisaline';
  displayedColumns: string[] = ['setPoints', 'deviation', 'uncertainty'];
  dataSource = ELEMENT_DATA;
  names: any[] = [
    {name: 'Test Instrument 1', id: 1},
    {name: 'Test Instrument 2', id: Math.random() * 12},
    {name: 'Test Instrument 3', id: Math.random() * 12},
    {name: 'Test Instrument 4', id: Math.random() * 12},
    {name: 'Test Instrument 5', id: Math.random() * 12},
    {name: 'Test Instrument 6', id: Math.random() * 12},
    {name: 'Test Instrument 7', id: Math.random() * 12},
    {name: 'Test Instrument 8', id: Math.random() * 12},
    {name: 'Test Instrument 9', id: Math.random() * 12},
    {name: 'Test Instrument 10', id: Math.random() * 12},
    {name: 'Test Instrument 11', id: Math.random() * 12},
    {name: 'Test Instrument 12', id: Math.random() * 12},
    {name: 'Test Instrument 13', id: Math.random() * 12},
    {name: 'Test Instrument 14', id: Math.random() * 12},
    {name: 'Test Instrument 15', id: Math.random() * 12},
    {name: 'Test Instrument 16', id: Math.random() * 12},
    {name: 'Test Instrument 17', id: Math.random() * 12},
    {name: 'Test Instrument 18', id: Math.random() * 12},
    {name: 'Test Instrument 19', id: Math.random() * 12},
    {name: 'Test Instrument 20', id: Math.random() * 12},
    {name: 'Test Instrument 21', id: Math.random() * 12},
    {name: 'Test Instrument 22', id: Math.random() * 12},
    {name: 'Test Instrument 23', id: Math.random() * 12},
    {name: 'Test Instrument 24', id: Math.random() * 12},
    {name: 'Test Instrument 25', id: Math.random() * 12},
    {name: 'Test Instrument 26', id: Math.random() * 12},
    {name: 'Test Instrument 27', id: Math.random() * 12},
    {name: 'Test Instrument 28', id: Math.random() * 12},
    {name: 'Test Instrument 29', id: Math.random() * 12},
    {name: 'Test Instrument 30', id: Math.random() * 12},
    {name: 'Test Instrument 31', id: Math.random() * 12},
    {name: 'Test Instrument 32', id: Math.random() * 12},
    {name: 'Test Instrument 33', id: Math.random() * 12},
    {name: 'Test Instrument 34', id: Math.random() * 12},
    {name: 'Test Instrument 35', id: Math.random() * 12},
    {name: 'Test Instrument 36', id: Math.random() * 12},
    {name: 'Test Instrument 37', id: Math.random() * 12},
    {name: 'Test Instrument 38', id: Math.random() * 12},
    {name: 'Test Instrument 39', id: Math.random() * 12},
    {name: 'Test Instrument 40', id: Math.random() * 12},
    {name: 'Test Instrument 41', id: Math.random() * 12},
    {name: 'Test Instrument 42', id: Math.random() * 12},
    {name: 'Test Instrument 43', id: Math.random() * 12},
    {name: 'Test Instrument 44', id: Math.random() * 12},
    {name: 'Test Instrument 45', id: Math.random() * 12},
    {name: 'Test Instrument 46', id: Math.random() * 12},
    {name: 'Test Instrument 47', id: Math.random() * 12},
    {name: 'Test Instrument 48', id: Math.random() * 12},
    {name: 'Test Instrument 49', id: Math.random() * 12},
    {name: 'Test Instrument 50', id: Math.random() * 12},
    {name: 'Test Instrument 51', id: Math.random() * 12},
    {name: 'Test Instrument 52', id: Math.random() * 12},
    {name: 'Test Instrument 53', id: Math.random() * 12},
    {name: 'Test Instrument 54', id: Math.random() * 12},
    {name: 'Test Instrument 55', id: Math.random() * 12},
    {name: 'Test Instrument 56', id: Math.random() * 12},
    {name: 'Test Instrument 57', id: Math.random() * 12},
    {name: 'Test Instrument 58', id: Math.random() * 12},
    {name: 'Test Instrument 59', id: Math.random() * 12},

    {name: 'Test Instrument 100', id: Math.random() * 12},


  ];
  testNativeElements: ElementRef[] = [];
  @ViewChildren('dataToExport') dataToExport: QueryList<any> = new QueryList<any>();
  @ViewChild('dataToExport') dataToExportElement: ElementRef = new ElementRef(null);

  constructor(private http: HttpClient) { }

  ngAfterViewInit() {
    this.dataToExport.forEach((element: ElementRef) => {
      this.testNativeElements.push(element);
    })
  }

  public async generateCertificate() {


    // for (const element of this.testNativeElements) {
    //   const canvas = await html2canvas(element.nativeElement, {scale: 0.5})
    //   const pdf = new jsPDF('p', 'mm', 'a4');
    //   let width = pdf.internal.pageSize.getWidth();
    //   let height = pdf.internal.pageSize.getHeight();
    //   canvas.toDataURL('image/jpeg');
    //   let result = pdf.addImage(canvas, 'JPEG', 0, 0, width, height);
    //   // let output = pdf.output("blob");
    //   // console.log(output);
    //   // result.save('test.pdf');
    // }

        // html2canvas(this.testNativeElements[i].nativeElement as HTMLElement, {scale: 1}).then((canvas) => {
        //   const pdf = new jsPDF('p', 'mm', 'a4');
        //   let width = pdf.internal.pageSize.getWidth();
        //   let height = pdf.internal.pageSize.getHeight();
        //   const imgData = canvas.toDataURL('image/jpeg');
        //   let result = pdf.addImage(imgData, 'JPEG', 0, 0, width, height);
        //   let output = pdf.output('blob');
        //   console.log(output);
        //   result.save('test.pdf');
        // })


    this.testNativeElements.forEach((element: ElementRef) => {
      html2canvas(element.nativeElement as HTMLElement, {scale: 0.5}).then((canvas) => {
        const pdf = new jsPDF('p', 'mm', 'a4');
        let width = pdf.internal.pageSize.getWidth();
        let height = pdf.internal.pageSize.getHeight();
        const imgData = canvas.toDataURL('image/jpeg');
        let result = pdf.addImage(imgData, 'JPEG', 0, 0, width, height);
        let output = pdf.output('blob');
        console.log(output);
        result.save('test.pdf');
      })


      // html2canvas(element.nativeElement as HTMLElement, {scale: 1}).then((canvas) => {
      //   const pdf = new jsPDF('p', 'mm', 'a4');
      //   let width = pdf.internal.pageSize.getWidth();
      //   let height = pdf.internal.pageSize.getHeight();
      //   const imgData = canvas.toDataURL('image/jpeg');
      //   let result = pdf.addImage(imgData, 'JPEG', 0, 0, width, height);
      //   let output = pdf.output('blob');
      //   console.log(output);
      //   result.save('test.pdf');
      // })
    });

  }



  uploadFiles(event: any) {
    const file: File = event.target?.files[0];
    console.log(file);


    let form = new FormData();
    form.append(`master_certificate`, file);
    console.log(form);
    this.http.post('http://localhost:3000/api/batch/pdf', form, {

    }).subscribe((data) => {
      console.log(data);
    })
  }
}
