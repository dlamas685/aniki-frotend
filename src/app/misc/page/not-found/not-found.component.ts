import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styles: [
  ]
})
export class NotFoundComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.router.navigateByUrl('/auth');
    },5000)
  }

}
