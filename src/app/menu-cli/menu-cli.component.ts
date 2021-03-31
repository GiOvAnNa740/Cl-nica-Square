import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-menu-cli',
  templateUrl: './menu-cli.component.html',
  styleUrls: ['./menu-cli.component.css']
})
export class MenuCliComponent implements OnInit {
  @Input() pessoa: any;
  constructor() { }

  ngOnInit(): void {
  }

}
