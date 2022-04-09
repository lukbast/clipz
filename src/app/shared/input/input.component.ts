import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { inputType } from '../types';


@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {


  @Input() control:FormControl = new FormControl()
  @Input() type:inputType = 'text'
  @Input() placeholder:string = ''
  @Input() label:string = ""
  @Input() format = ''
  @Input() prefix_ = ''

  constructor() { }

  ngOnInit(): void {
  }

}
