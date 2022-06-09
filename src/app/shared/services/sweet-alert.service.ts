import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetAlertService {

  constructor(
    private router:Router
    ) { }

  public successAlertLogin(message: string){
    Swal.fire({
      icon: 'success',
      title: 'Genial!',
      text:message,
      showConfirmButton: false,
      timer: 2000
    }).then(() => {
      this.router.navigateByUrl('/media');
    });
  }

  public errorAlertLogin(message: string){
    Swal.fire({
      icon: 'error',
      title: 'Oops..!',
      text:message,
      showConfirmButton: false,
      timer: 2000
    });
  }

  public successAlertFavorite(message: string){
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: 'success',
      title: message
    });
  }

  public infoAlertFavorite(message: string){
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: 'info',
      title: message
    });
  }


}
