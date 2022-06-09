import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { combineLatest, Observable, of } from 'rxjs';
import { filter, pluck, map, tap, catchError } from 'rxjs/operators';
import { AuthResponse } from 'src/app/auth/interfaces/auth.interface';
import { AuthService } from 'src/app/auth/services/auth.service';
import { environment } from 'src/environments/environment';
import { CharacterConnection, CharacterEdge } from '../interfaces/character.interface';
import { Filter } from '../interfaces/filters.interface';
import { MediaFormat, MediaSort, MediaType } from '../interfaces/media.enum';
import { Media, Data, Recommendation, MediaEdge, Tag } from '../interfaces/media.interface';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  private _baseUrl: string = environment.baseUrl;

  private _filters: Filter = {
    search: null,
    genres: null,
    tags: null,
    year: null,
    format: MediaFormat.Tv,
    type: MediaType.Anime,
    sort: [MediaSort.Popularity_Desc],
  };

  private _favorites: Media [] = [];

  get favorites():Media[] {
    return [...this._favorites];
  }
  

  set filters(value: Filter) {
    this._filters = value;
  }

  get filters(): Filter {
    return { ...this._filters };
  }

  constructor(
    private apollo: Apollo,
    private http:HttpClient
    ) { }


  public gendersCollection():Observable<string[]> {
    let QUERY = gql`
      query {
        GenreCollection
      }
    `;
    return this.apollo.watchQuery<Data>({
      query: QUERY
    }).valueChanges.pipe(
      pluck('data','GenreCollection'),
    )
  }

  public tagsCollection():Observable<Tag[]> {
    let QUERY = gql`
      query {
        MediaTagCollection {
          id
          name
        }
      }
    `;
    return this.apollo.watchQuery<Data>({
      query: QUERY
    }).valueChanges.pipe(
      pluck('data','MediaTagCollection'),
    )
  }

  public getMediaFilters(page: number, perPage: number): Observable<Media[]> {
    let QUERY = gql`
    query ($page: Int, $perPage: Int, $search: String, $genre_in: [String], $tag_in: [String], $seasonYear: Int, $format:MediaFormat, $type: MediaType, , $sort: [MediaSort]) {
      Page (page: $page, perPage: $perPage) {
        pageInfo {
          total
          currentPage
          lastPage
          hasNextPage
          perPage
        }
        media (search: $search, genre_in: $genre_in, tag_in:$tag_in, seasonYear: $seasonYear, format: $format, type: $type, sort:$sort) {
          id
          title {
            romaji
          }
          coverImage{
            extraLarge
            large
            medium
          }
        }
      }
    }  
    `;
    let VARIABLES = {
      page: page,
      perPage: perPage,
      search: this._filters.search,
      genre_in: this._filters.genres,
      tag_in: this._filters.tags,
      seasonYear: this._filters.year,
      format: this._filters.format,
      type: this._filters.type,
      sort: this._filters.sort
    };
    return this.apollo.watchQuery<Data>({
      query: QUERY,
      variables: VARIABLES
    }).valueChanges.pipe(
      pluck('data', 'Page', 'media')
    );
  }

  public getMedia(idMedia: number): Observable<Media> {
    let QUERY = gql`
    query($id: Int){
      Media (id:$id) {
          id
          title {
              romaji
              userPreferred
              english
              native
          }
          description
          source
          season
          genres
          seasonYear
          episodes 
          duration
          startDate {
              day,
              month,
              year
          }
          endDate {
              day
              month
              year
          }
          bannerImage
          coverImage {
              extraLarge
              large
              medium
              color
          }
          countryOfOrigin
          format
          tags{
              id
              name
          }
          status
          popularity
          isAdult
          type
          trailer{
              id
          }
          averageScore
          meanScore
          favourites
          studios {
              nodes {
                  name
                  isAnimationStudio
              }
          }
      }
  }`;

    let VARIABLES = {
      id: idMedia
    };

    return this.apollo.watchQuery<Data>({
      query: QUERY,
      variables: VARIABLES
    }).valueChanges.pipe(
      pluck('data', 'Media')
    );
  }

  public getCharacters(idMedia: number, pageMedia: number, perPageMedia: number): Observable<CharacterEdge[]> {
    let QUERY = gql`
    query($page:Int, $perPage:Int $id: Int){
      Media (id:$id) {
        id
        characters(page: $page, perPage: $perPage, sort:ID) {
          edges {
            id
            node {
              id
              name {
                full
              }
              image {
                  large
                  medium
              }
            }
            role
            voiceActors (language: JAPANESE) {
              id
              name {
                full
              }
              image {
                large
                medium
              }
              languageV2
            }
          }
          pageInfo {
            perPage
            hasNextPage
          }
        }
      }
    }
    `;

    let VARIABLES = {
      id: idMedia,
      page: pageMedia,
      perPage: perPageMedia
    }

    return this.apollo.watchQuery<Data>({
      query: QUERY,
      variables: VARIABLES
    }).valueChanges.pipe(
      pluck('data', 'Media', 'characters', 'edges')
    );

  }

  public getRelations(idMedia: number): Observable<Media[]> {
    let QUERY = gql`
    query($id: Int){
      Media (id:$id) {
        id
        relations {
          edges {
            id
            node {
                id
                title {
                    romaji
                }
                coverImage {
                    extraLarge
                    large
                }
                type
                }
            }
          }
        }
      }
    `;
    let VARIABLES = {
      id: idMedia,
    }
    return this.apollo.watchQuery<Data>({
      query: QUERY,
      variables: VARIABLES
    }).valueChanges.pipe(
      pluck('data', 'Media', 'relations', 'edges'),
      map(edges => {
        let medias:Media[] = [];
        edges.forEach(element => medias.push(element.node));
        return medias;
      }),
      map(medias => medias.filter(media => media.type !== MediaType.Manga))
    );
  }

  public getSuggested(idMedia: number, pageSuggested: number, perPageSuggested: number): Observable<Media[]> {
    let QUERY = gql`
    query($id: Int, $page:Int, $perPage: Int){
      Media (id:$id) {
        id
        recommendations (page:$page, perPage:$perPage, sort:[RATING_DESC]){
            nodes {
                id
                mediaRecommendation {
                    id
                    title {
                        romaji
                    }
                    coverImage {
                        extraLarge
                        large
                    }
                    type
                }
            }
        }
      }
    }
    `;
    let VARIABLES = {
      id: idMedia,
      page: pageSuggested,
      perPage: perPageSuggested
    }
    return this.apollo.watchQuery<Data>({
      query: QUERY,
      variables: VARIABLES
    }).valueChanges.pipe(
      pluck('data', 'Media', 'recommendations', 'nodes'),
      map(nodes => {
        let medias:Media[] = [];
        nodes.forEach(element => medias.push(element.mediaRecommendation));
        return medias;
      }),
      map(medias => medias.filter(media => media.type !== MediaType.Manga))
    );
  }

  public mediasFullData(favorites:number[]):Observable<Media[]>{
    if (favorites.length === 0) {
      return of([]);
    }

    const peticiones:Observable<Media>[] = [];

    favorites.forEach(idgql => {
      const peticion = this.getMedia(idgql);
      peticiones.push(peticion);
    });
    return combineLatest(peticiones);
  }

  
  public getMediasFavorites():Observable<AuthResponse>{
    const url = `${this._baseUrl}/favorites`;
    const headers = new HttpHeaders().set('x-token', sessionStorage.getItem('token') || '');
    return this.http.get<AuthResponse>(url, {headers}).pipe(
      tap(({success, favorites}) => {
        if (success){
          this.mediasFullData(favorites!).subscribe(
            medias => {
              this._favorites = medias;
            }
          );
        }
      }),
      map(resp => ({success: resp.success, msg: resp.msg, favorites: resp.favorites})),
      catchError(err => of(err.error))
    );
  }

  public updateFavorite(idgql: number): Observable<AuthResponse> {
    const url = `${this._baseUrl}/favorites/update`;
    const body = {idgql};
    const headers = new HttpHeaders().set('x-token', sessionStorage.getItem('token') || '');
    return this.http.post<AuthResponse>(url,body, {headers}).pipe(
      tap(({favorites}) => {
        this.mediasFullData(favorites!).subscribe(
          medias => {
            this._favorites = medias;
          }
        );
      }),
      map(resp => ({success: resp.success, msg: resp.msg})),
      catchError(err => of(err.error))
    );
  }


}
