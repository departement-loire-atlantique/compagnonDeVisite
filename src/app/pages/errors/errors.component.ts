import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.scss']
})
export class ErrorsComponent implements OnInit {

  errorCode: string = '';

  constructor(private _route: ActivatedRoute) { }

  ngOnInit(): void {
    let idError = this._route.snapshot.paramMap.get('id');
    if (idError) {
      this.errorCode = idError;
    }
  }

}
