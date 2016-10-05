//our root app component
import {Component, Input, OnInit} from '@angular/core'

@Component({
    moduleId    : module.id,
    selector: 'rd-calendar',
    template: `
        <p><span class="boldspan">Fecha selecionada: </span> {{ getDate() }}</p>
        <!--<p><span class="boldspan">Model data:</span> {{dataModel}}</p>  -->
        <button (click)="fnClick()">Recupera fecha</button>
        <div class="calendar">
            <form #yearForm="ngForm" id="year" name="year">
                <label>Año</label>
                <rd-year-input name="year"
                        [(ngModel)]="my_year"
                        (blur)="blurYear($event)"
                        (change)="changeYear($event)">
                </rd-year-input>
            </form>
            <form #monthForm="ngForm">
                <label>Mes</label>
                <rd-month-input name="month"
                        [(ngModel)]="my_month"
                        (blur)="blurMonth($event)"
                        (change)="changeMonth($event)">
                </rd-month-input>
            </form>
            <form #dayForm="ngForm">
                <label>Dia</label>
                <rd-day-input name="day"
                        [(ngModel)]="my_day"
                        (blur)="blurDay($event)"
                        [(changeMonth)]="my_month">
                </rd-day-input>
            </form>
        </div>`,
    styleUrls: ['rd-calendar.component.css']
})
export class RdCalendarComponent implements OnInit {
    @Input() my_year: Number;
    
    @Input() my_day: Number;
    @Input() my_month: Number;
    @Input() countDays: Number = 31; 
    dataModel: string = '';
    private date:string;
    
    getDate() {
        return this .my_year + '-' + this .my_month + '-' + this .my_day;  
    }

    //my_date = this.my_year + '/' + this.my_month + '/' + this.my_day;
    fnClick(){
        //console.log('-->' + this.my_date + ' año=' + this.year.value );
        console.log(this.my_year);
    }  
    blurYear(){
        console.log( '> PARENT: RDCalendarComponent -> blurYear(): ' + this.my_year );
    }
    blurMonth(){
        console.log( '> PARENT: RDCalendarComponent -> blurMonth(): ' + this.my_month );
    }
    blurDay(){
        console.log( '> PARENT: RDCalendarComponent -> blurDay(): ' + this.my_day );
    }

    changeMonth(){
        if(this.my_month !== undefined){
            console.log('> PARENT: RDCalendarComponent -> changeMonth(): ' + this.my_month);
            this.refreshListDays(this.my_month.valueOf());
        }
    }
    
    changeYear(){
        console.log('> PARENT: RDCalendarComponent -> changeYear(): ' + this.my_year);
    }

    refreshListDays(month: number){

    }
    // Constructor
  constructor(    
  ) {}
  ngOnInit() {
    let data = new Date();
    this.my_year = data.getFullYear();
    this.my_month = data.getMonth();
    this.my_day = data.getDay();
  }
}