import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { CharacterEdge } from '../../interfaces/character.interface';
import { Media } from '../../interfaces/media.interface';
import { MediaService } from '../../services/media.service';
import { tap } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/services/auth.service';
import { SweetAlertService } from 'src/app/shared/services/sweet-alert.service';

let apiLoaded = false;


@Component({
  selector: 'app-detail-media',
  templateUrl: './detail-media.component.html',
  styleUrls: ['./detail-media.component.css']
})
export class DetailMediaComponent implements OnInit {

  public media!: Media;
  public characters: CharacterEdge[] = [];
  public relations: Media[] = [];
  public suggested: Media[] = [];
  public animation: string[] = [];
  public producers: string[] = [];
  public pageSuggested: number = 0;
  public pageCharacter: number = 0;
  public perPageSuggested: number = 6;
  public perPageCharacter: number = 12;
  public bgCard: string = 'surface-card shadow-none animate__animated animate__fadeIn animate__fast';
  public _isFavorite: boolean = false;

  constructor(
    private mediaService: MediaService,
    private activatedRoute: ActivatedRoute,
    private sweetAlertService: SweetAlertService
  ) { }

  get isFavorite():boolean { 
    const favorites = this.mediaService.favorites;
    const found = !!favorites.find((fav:Media)=> fav.id === this.media.id);
    this._isFavorite = found;
    return this._isFavorite;
  }

  ngOnInit(): void {
    if (!apiLoaded) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      apiLoaded = true;
    }
    this.mediaService.getMediasFavorites().subscribe();
    this.getInfoMedia();
    this.getCharactersMedia();
    setTimeout(() => {
      this.getRelationsMedia();
      this.getSuggestedMedia();
    }, 500);
  }

  public getCharactersMedia(): void {
    this.pageCharacter++;
    this.activatedRoute.params.pipe(
      tap(() => {
        if (this.pageCharacter === 1) {
          this.characters = [];
        }
      }),
      switchMap(({ id }) => this.mediaService.getCharacters(id, this.pageCharacter, this.perPageCharacter))
    ).subscribe(
      characteres => {
        this.characters = [...this.characters, ...characteres];
      }
    );

  }


  private getRelationsMedia(): void {
    this.activatedRoute.params.pipe(
      switchMap(({ id }) => this.mediaService.getRelations(id))
    ).subscribe(
      resp => {
        this.relations = resp;
      }
    );
  }

  private getInfoMedia(): void {
    this.activatedRoute.params.pipe(
      switchMap(({ id }) => this.mediaService.getMedia(id))
    ).subscribe(
      resp => {
        this.media = resp;
        this.loadStudios(resp);
      }
    );
  }


  private loadStudios(resp: Media):void {
    for (let i = 0; i < resp.studios.nodes.length; i++) {
          if (resp.studios.nodes[i].isAnimationStudio) {
            this.animation.push(resp.studios.nodes[i].name);
          }
          else {
            this.producers.push(resp.studios.nodes[i].name);
          }
        }
  }



  public getSuggestedMedia(): void {
    this.pageSuggested++;
    this.activatedRoute.params.pipe(
      tap(() => {
        if (this.pageSuggested === 1) {
          this.suggested = [];
        }
      }),
      switchMap(({ id }) => this.mediaService.getSuggested(id, this.pageSuggested, this.perPageSuggested))
    ).subscribe(
      repeat => {
        repeat.forEach(mediaRepeat => {
          let band: boolean = false;
          this.suggested.forEach(mediaNoRepeat => {
            if (mediaRepeat.id === mediaNoRepeat.id) {
              band = true;
            }
          });
          if (!band) {
            this.suggested.push(mediaRepeat);
          }
        });
      }
    );
  }

  public updateFavorite(idgql:number): void {
    this.mediaService.updateFavorite(idgql).subscribe(
      resp => {
        if (resp.success){
          this.sweetAlertService.successAlertFavorite(`${this.media.title.romaji} ${resp.msg!}`);
        }
        else {
          this.sweetAlertService.infoAlertFavorite(`${this.media.title.romaji} ${resp.msg!}`);
        }
      }
    );
  }

}
