import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/services/auth.service';
import { SweetAlertService } from 'src/app/shared/services/sweet-alert.service';
import { Media } from '../../interfaces/media.interface';
import { MediaService } from '../../services/media.service';

@Component({
  selector: 'app-favorite-media',
  templateUrl: './favorite-media.component.html',
  styleUrls: ['./favorite-media.component.css']
})
export class FavoriteMediaComponent implements OnInit {



  get mediasFavorites():Media[] {
    return this.mediaService.favorites;
  }

  constructor(
    private mediaService: MediaService,
    private sweetAlertService: SweetAlertService,
  ) { }

  ngOnInit(): void {
    // this.authService.getMediasFavorites().pipe(
    //   switchMap(({favorites}) => this.mediaService.getMediasFavoritesFull(favorites!))
    // ).subscribe(
    //   medias => {
    //     this._mediasFavorites = medias;
    //   }
    // );
  }

  public updateFavorite(media:Media): void {
    this.mediaService.updateFavorite(media.id).subscribe(
      resp => {
        if (resp.success){
          this.sweetAlertService.successAlertFavorite(`${media.title.romaji} ${resp.msg!}`);

        }
        else {
          this.sweetAlertService.infoAlertFavorite(`${media.title.romaji} ${resp.msg!}`);
        }
      }
    );
  }

}
