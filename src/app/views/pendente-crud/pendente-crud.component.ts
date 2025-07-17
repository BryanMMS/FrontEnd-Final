import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pendente-crud',
  templateUrl: './pendente-crud.component.html',
  styleUrls: ['./pendente-crud.component.css']
})
export class PendenteCrudComponent implements OnInit{

  constructor(private router: Router){}
ngOnInit(): void {

}
}
