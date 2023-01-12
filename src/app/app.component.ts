import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Route, Router} from "@angular/router";
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'frontend';
  route!: string;
  showHeaderAndFooter = true;

  constructor(location: Location, router: Router) {
    router.events.subscribe(() => {
      this.showHeaderAndFooter = !location.path().endsWith('404' || 'unknown');
    });
  }

  ngOnInit() {
  }
}
