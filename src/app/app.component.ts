import { Component, ViewChild, ElementRef } from '@angular/core';
import { SpreadsheetComponent } from '@syncfusion/ej2-angular-spreadsheet';
import { enableRipple } from '@syncfusion/ej2-base';
import { dataSource } from '../datasource';


import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';

enableRipple(true);

@Component({
selector: 'app-root',
template: `
<!-- navbar -->

<nav class="navbar navbar-expand-lg navbar-dark bg-dark" >
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Angular Project</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <!-- <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul class="navbar-nav">
      <li class="nav-item">
          <a class="nav-link active" href="#" (click)="clearAll()"><i class="fas fa-solid fa-trash"></i></a>
      </li>
      </ul>
    </div> -->
  </div>
</nav>

<div id= "download" #download>

<button class="btn btn-primary navChange" [style]="{'margin': '3rem'}" (click)="showNav()">{{buttonText}}</button>

<ejs-spreadsheet #spreadsheet (created)="created()" [showFormulaBar]="false" [showRibbon]=response >
            <e-sheets >
              <e-sheet name="Price Details" [showGridLines]="false" >
                <e-ranges>
                  <e-range [dataSource]="data" ></e-range>
                </e-ranges>
                <e-columns>
                  <e-column [width]=150></e-column>
                  <e-column [width]=110></e-column>
                  <e-column [width]=110></e-column>
                  <e-column [width]=85></e-column>
                  <e-column [width]=85></e-column>
                  <e-column [width]=85></e-column>
                  <e-column [width]=85></e-column>
                  <e-column [width]=85></e-column>
                </e-columns>
              </e-sheet>
            </e-sheets>
          </ejs-spreadsheet>

          <button class="downloadBtn btn btn-primary" (click)="exportHtmlToPDF()" [style]="{'margin':'3rem'}">Download PDF</button>
 
</div>
          `
})
export class AppComponent {
@ViewChild('spreadsheet')
spreadsheetObj!: SpreadsheetComponent;

@ViewChild('download')
download!: ElementRef;



data: object[] = dataSource;
response:boolean = false;
buttonText:string = "Show table navbar";



public exportHtmlToPDF(){

  let download = this.download.nativeElement;
  
    
    html2canvas(download).then(canvas => {
        
        let docWidth = 208;
        let docHeight = canvas.height * docWidth / canvas.width;
        
        const contentDataURL = canvas.toDataURL('image/png')
        let doc = new jsPDF('p', 'mm', 'a4');
        let position = 0;
        doc.addImage(contentDataURL, 'PNG', 0, position, docWidth, docHeight)
        
        doc.save('exportedPdf.pdf');
    });
}
created() {
    
    this.spreadsheetObj.cellFormat({ fontWeight: 'bold', textAlign: 'center' }, 'A1:H1');
    this.spreadsheetObj.cellFormat({ textAlign: 'center' }, 'D2:H11');

  
    this.spreadsheetObj.insertSheet([{
        index: 1,
        name: 'Inserted Sheet',
        ranges: [{ dataSource: this.data }],
        columns: [{ width: 150 }, { width: 110 }, { width: 110 }, { width: 85 }, { width: 85 }, { width: 85 }, { width: 85 },
            { width: 85 }]
    }]);
 
    this.spreadsheetObj.setBorder({ border: '1px solid #e0e0e0' }, 'A1:H11');
}

public showNav()
{
 
  if(this.response)
  {
    this.buttonText = `Hide table navbar`;
    this.response= false;
  }
  else
  {
    this.buttonText = `Show table navbar`;
    this.response = true;

  }

 }


}