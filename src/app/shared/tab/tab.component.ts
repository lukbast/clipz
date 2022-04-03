import { Component, Input, OnInit, AfterContentInit } from '@angular/core';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnInit {

  @Input() tabTitle:string = ""
  @Input() isActive:boolean = false 
  @Input() classes = {}

  constructor() { }

  ngOnInit(): void {
  }

}
