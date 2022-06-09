import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { User } from 'src/app/auth/interfaces/auth.interface';
import { AuthService } from 'src/app/auth/services/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  items!: MenuItem[];
  itemsResponsive!: MenuItem[];

  get user():User {
    return this.authService.user;
  }

  constructor(
    private authService: AuthService,
    private router:Router
    ) {
    this.items = [
      {
        label: 'Favoritos', icon: 'fa-solid fa-heart', routerLink: '/media/favorite'
      },
      { separator: true },
      { label: 'Cerrar sesión', icon: 'fa-solid fa-right-from-bracket', command:()=>{
        this.authService.logoutUser();
        this.router.navigateByUrl('/auth');
      }}
    ];

    this.itemsResponsive = [
      {
        label: 'Inicio',
        icon: 'fa-solid fa-house',
        routerLink:'/media/catalog'
      },
      {
        label: 'Daniel Lamas',
        icon: 'fa-solid fa-user',
        items: [
          {
            label: 'Favoritos',
            icon: 'fa-solid fa-heart',
            routerLink: '/media/favorite'
          },
          {
            label: 'Cerrar sesión',
            icon: 'fa-solid fa-right-from-bracket',
            command:()=>{
              this.authService.logoutUser();
              this.router.navigateByUrl('/auth');
            }
          }
        ]
      }
    ];
  }

  ngOnInit(): void {

  }

}
