import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription, timeout} from "rxjs";

@Component({
  selector: 'main-component',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  public showTip: boolean = false;
  private observable:Observable<boolean>;
  private subscribe: Subscription | null = null;

  constructor() {
    this.observable=new Observable<boolean>(observer=>{
      const timeout=setTimeout(()=>{
        observer.next(true);
      },10000);
      return{
        unsubscribe:() => {
          clearTimeout(timeout);
        }
      }
      });
  }

  ngOnInit(): void {
    // @ts-ignore
    declare var $: any;
    $('#accordion').accordion({
      icons: {"header": "arrow-down", "activeHeader": "arrow-up"},
      collapsible: true,
    });
    $('.acc-closed').click();
    this.subscribe = this.observable.subscribe((param:boolean)=>{
      this.showTip=param;
    })
  }
  ngOnDestroy(): void {
    this.subscribe?.unsubscribe();
  }

}
