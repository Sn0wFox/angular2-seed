import {Component} from '@angular/core';
import {OnInit} from '@angular/core';

import * as Lib from '../../../lib/lib-test';

@Component({
  selector: 'about',
  styleUrls: ['./about.component.css'],
  templateUrl: './about.component.html'
})
export class AboutComponent implements OnInit {

  protected info: string;
  
  ngOnInit(): void {
    Lib
      .myFunction()
      .then((info: string) => {
        this.info = info;
      });
  }
}
