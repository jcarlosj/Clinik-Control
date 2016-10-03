import { Component, Input,  OnInit, OnDestroy } from '@angular/core';
import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';

import { Hero } from './hero';

@Component({
  selector: 'hero-child',
  template: `
    <h3>{{hero.name}} says:</h3>
    <p>I, {{hero.name}}, am at your service, {{masterName}}.</p>
    <hr />
    <tercero-search></tercero-search>
  `
})
export class HeroChildComponent {
    @Input() hero: Hero;
    @Input('master') masterName: string;
}