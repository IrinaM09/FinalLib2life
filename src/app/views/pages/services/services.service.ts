import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  private baseUrl: string = "http://localhost:8080/";

  constructor(private http: HttpClient) { }

  /* SAVE button - editor */
  public sendEditedDoc(data: string, name: string) {
    console.log("sending to " + this.baseUrl + "saveEditedDoc");

    let doc = { content: data, bookName: name };
    return this.http.post(this.baseUrl + "saveEditedDoc", doc, { responseType: 'text' });
  }

  /* SEND button - container */
  public sendFormData(testData: FormData) {
    console.log("sending to " + this.baseUrl + "uploadFile  the data from the form")
    return this.http.post(this.baseUrl + "uploadFile", testData, { responseType: 'text' });
  }

  /* Extract Table of Content */
  public getTableOfContent() {
    console.log("sending to " + this.baseUrl + "getToc")
    return this.http.get(this.baseUrl + "getToc", { responseType: 'text' });
  }

  /* Extract Images */
  public getImages() {
    console.log("sending to " + this.baseUrl + "getImages")
    return this.http.get(this.baseUrl + "getImages", { responseType: 'text' });
  }

  /* Extract Footnotes */
  public getFootnotes() {
    console.log("sending to " + this.baseUrl + "getFootnotes")
    return this.http.get(this.baseUrl + "getFootnotes", { responseType: 'text' });
  }

  /* Extract Tables */
  public getTables() {
    console.log("sending to " + this.baseUrl + "getTables")
    return this.http.get(this.baseUrl + "getTables", { responseType: 'text' });
  }

    /* Get the HTML file */
    public getHtml() {
      console.log("sending to " + this.baseUrl + "getHtml")
      return this.http.get(this.baseUrl + "getHtml", { responseType: 'text' });
    }
}
