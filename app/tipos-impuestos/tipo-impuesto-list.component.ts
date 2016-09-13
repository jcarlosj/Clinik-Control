// Imports del core de Angular 2 necesarios para este componente
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } 			from '@angular/router';

// Imports personalizados necesarios para este componente
import { TipoImpuestoService }   from './tipo-impuesto.service';
import { TipoImpuesto } 				 from './tipo-impuesto';

// Decorator
@Component({
	templateUrl: '../app/tipos-impuestos/tipo-impuesto-list.component.html',
})

// Class
export class TipoImpuestoListComponent implements OnInit, OnDestroy {

	// Atributes
	arrObj : TipoImpuesto[];
	obj		 : TipoImpuesto;
	error  : any;

	private selectedId : string;
	private sub        : any;

	// Constructor
	constructor(
		private service : TipoImpuestoService,
  	private route		: ActivatedRoute,
  	private router  : Router
	) {

	}

	// Implements de Angular 2
	ngOnInit() {
    	this.sub = this.route
      	.params
      	.subscribe(params => {
        	this.selectedId = params['codigo'];
        	this.service.getTiposImpuestos()
        	.then(obj => this.arrObj = obj);
		});
  	}

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

	// Methods
  isSelected(obj: TipoImpuesto) { return obj.codigo === this.selectedId; }

  onSelect(obj: TipoImpuesto) {
    this.router.navigate(['/tipos_impuesto', obj.codigo]);
  }
  add(){
	  let fp: TipoImpuesto;
		this.obj = new TipoImpuesto();
	  this.router.navigate(['/tipos_impuesto', fp]);
  }


	delete(obj: TipoImpuesto, event: any) {
    event.stopPropagation();

    this.service
        .delete(obj)
        .then(res => {
          this.arrObj = this.arrObj.filter(h => h !== obj);
          if (this.obj === obj) { this.obj = null; }
        })
        .catch(error => this.error = error);
  }

}
