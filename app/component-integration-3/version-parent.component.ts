import { Component } from '@angular/core';
@Component({
  selector: 'version-parent',
  template: `
    <h2>Source code version</h2>
    <button (click)="aumentaMenor()">New minor version</button>
    <button (click)="aumentaMayor()">New major version</button>
    <version-child [major]="mayor" [minor]="menor" [appVersion]="version" ></version-child>
  `
})
export class VersionParentComponent {
  mayor: number = 1;
  menor: number = 23;
  version: string = "Version actual";

  aumentaMenor() {
    this.menor++;
  }

  aumentaMayor() {
    this.mayor++;
    this.menor = 0;
  }

}
