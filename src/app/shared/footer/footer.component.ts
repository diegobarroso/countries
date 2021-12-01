import { Component, OnInit } from '@angular/core';
import { FloatingActionButton } from "materialize-css";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styles: []
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    let elems = document.querySelectorAll('.fixed-action-btn');
    FloatingActionButton.init(elems, {
      toolbarEnabled: true
    });

  }

}
