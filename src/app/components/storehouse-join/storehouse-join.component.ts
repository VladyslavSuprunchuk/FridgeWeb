import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,FormBuilder ,Validators } from '@angular/forms';

@Component({
  selector: 'app-storehouse-join',
  templateUrl: './storehouse-join.component.html',
  styleUrls: ['./storehouse-join.component.css']
})
export class StorehouseJoinComponent implements OnInit {

  public storehouseJoinForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.storehouseJoinForm = new FormGroup({
      name: new FormControl(),
      email: new FormControl(),
      password: new FormControl()
    });
  }

}
