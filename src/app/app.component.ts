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
    this.http.post('https://ec2-15-207-14-9.ap-south-1.compute.amazonaws.com:3000/api/batch/pdf', form, {

    }).subscribe((data) => {
      console.log(data);
    })
  }
}
