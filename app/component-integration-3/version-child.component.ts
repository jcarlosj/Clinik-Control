import { Component, Input, OnChanges, SimpleChange } from '@angular/core';
@Component({
  selector: 'version-child',
  template: `
    <h3>{{appVersion}}: {{major}}.{{minor}}</h3>
    <h4>Change log:</h4>
    <ol>
      <li *ngFor="let change of changeLog">{{change}}</li>
    </ol>
  `
})
export class VersionChildComponent implements OnChanges {
  @Input() major: number;
  @Input() minor: number;
  @Input() appVersion: string;
  changeLog: string[] = [];

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    let log: string[] = [];
    
      console .log( 'changes (Obj): ' + Object.keys( changes ) );

    for (let propName in changes) {
        console .log( 'propName: ' + propName );
      let changedProp = changes[propName];
        console .log( ' > changes[propName]: ' + changes[propName] + '\n > changedProp: ' + changedProp );
        console .log( ' -> changes[propName]: ' + Object.keys( changes[propName] ) );
        console .log( ' --> changedProp.previousValue: ' + changedProp.previousValue );
        console .log( ' --> changedProp.currentValue: ' + changedProp.currentValue );

      let from = JSON.stringify(changedProp.previousValue);
      let to =   JSON.stringify(changedProp.currentValue);
      
      log.push( `${propName} cambió de: ${from} a: ${to}`);
    }

    this.changeLog.push(log.join(', '));
  }
}
