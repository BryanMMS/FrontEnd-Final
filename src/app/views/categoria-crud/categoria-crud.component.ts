import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categoria-crud',
  templateUrl: './categoria-crud.component.html',
  styleUrls: ['./categoria-crud.component.css']
})
export class CategoriaCrudComponent implements OnInit{

  constructor(private router: Router){}
  ngOnInit(): void {
    
  }

  navigateToCategoriaCreate(): void{
    this.router.navigate(['/categorias/create'])
  }
}
