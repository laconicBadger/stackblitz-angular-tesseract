import { Component } from '@angular/core';
import { createWorker } from 'tesseract.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  //template: `
  //  Hello!
  //`,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Tesseract Angular';
  ocrResult = 'Recognizing...';
  constructor() {
    this.doOCR();
  }
  async doOCR() {
    const worker = createWorker({
      logger: (m) => console.log(m),
    });
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    debugger;
    const {
      data: { text },
    } = await worker.recognize(
      'https://tesseract.projectnaptha.com/img/eng_bw.png'
    );
    this.ocrResult = text;
    console.log(text);
    await worker.terminate();
  }
}
