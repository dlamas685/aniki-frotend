import { Component, OnInit } from '@angular/core';
import { Filter, MultiSelectMedia, SelectMedia } from '../../interfaces/filters.interface';
import { MediaFormat, MediaSort, MediaType } from '../../interfaces/media.enum';
import { Media} from '../../interfaces/media.interface';
import { MediaService } from '../../services/media.service';

@Component({
  selector: 'app-catalog-media',
  templateUrl: './catalog-media.component.html',
  styleUrls: ['./catalog-media.component.css']
})
export class CatalogMediaComponent implements OnInit {
  
  public medias:Media [] = [];
  public genders:MultiSelectMedia[] = [];
  public tags:MultiSelectMedia [] = [];
  public years:SelectMedia[] = [];
  public formats:SelectMedia[] = [];
  public perPage:number = 8;
  public page:number = 1;

  
  get tags_view() {
    const tags_view = {
      search: this.mediaService.filters.search,
      genders:this.mediaService.filters.genres,
      tags: this.mediaService.filters.tags,
      year:this.mediaService.filters.year,
      format: this.mediaService.filters.format?.toString()
    }
    return tags_view;
  }

  get filters():Filter {
    return this.mediaService.filters;
  }

  constructor(
    private mediaService: MediaService
    ) {
    this.loadGenres();
    this.loadTags();
    this.loadYears();
    this.loadFormats();
  }

  ngOnInit(): void {
    this.mediaService.getMediaFilters(this.page, this.perPage).subscribe(
      resp => {
        resp.forEach(media => this.medias.push(media));
      }
    );
  }

  private loadGenres(): void {
    this.mediaService.gendersCollection().subscribe(genders =>{
      genders.forEach(gender => {
        const g:MultiSelectMedia = {
          name:gender,
          code:gender
        };
        this.genders.push(g);
      });
    });
  }

  private loadTags(): void {
    this.mediaService.tagsCollection().subscribe(tags =>{
      tags.forEach(tag => {
        const t:MultiSelectMedia = {
          name:tag.name,
          code:tag.id
        };
        this.tags.push(t);
      });
    });
  }

  private loadYears(): void {
    let year:number = new Date().getFullYear();
    for(let i:number=year;i>=1940;i--){
      let item: SelectMedia = {
        name: i.toString(),
        code: i.toString()
      }
      this.years.push(item);
    }
  }

  private loadFormats(): void {
    this.formats = [
      {name:'TV', code:'TV'},
      {name:'Movie', code:'MOVIE'},
      {name:'TV Short', code:'TV_SHORT'},
      {name:'Special', code:'SPECIAL'},
      {name:'OVA', code:'OVA'},
      {name:'ONA', code:'ONA'},
      {name:'Music', code:'MUSIC'}
    ];
  }

  public filterMediaSearch(search:string): void {
    this.medias = [];
    this.page = 1;
    let filters = this.mediaService.filters;
    if(search.trim().length === 0) {
      filters.search = null;
    } 
    else {
      filters.search = search;
    }
    this.mediaService.filters = filters;
    this.mediaService.getMediaFilters(this.page, this.perPage).subscribe(
      resp => {
        resp.forEach(media => this.medias.push(media));  
      }
    );
  }

  public filterMediaGenres(genres:string[]): void{
    this.medias = [];
    this.page = 1;
    let filters = this.mediaService.filters;
    if(genres.length === 0) {
      filters.genres = null;
    } 
    else {
      filters.genres = genres;
    }
    this.mediaService.filters = filters;
    this.mediaService.getMediaFilters(this.page, this.perPage).subscribe(
      resp => {
        resp.forEach(media => this.medias.push(media));
      }
    );
  }

  public filterMediaTags(tags:string[]): void{
    this.medias = [];
    this.page = 1;
    let filters = this.mediaService.filters;
    if(tags.length === 0) {
      filters.tags = null;
    } 
    else {
      filters.tags = tags;
    }
    this.mediaService.filters = filters;
    this.mediaService.getMediaFilters(this.page, this.perPage).subscribe(
      resp => {
        resp.forEach(media => this.medias.push(media));
      }
    );
  }

  public filterMediaSeasonYear(year:number): void{
    this.medias = [];
    this.page = 1;
    let filters = this.mediaService.filters;
    filters.year = year;
    this.mediaService.filters = filters;
    this.mediaService.getMediaFilters(this.page, this.perPage).subscribe(
      resp => {
        resp.forEach(media => this.medias.push(media));
      }
    );
  }

  public filterMediaFormat(format:MediaFormat): void{
    this.medias = [];
    this.page = 1;
    let filters = this.mediaService.filters;
    filters.format = format;
    this.mediaService.filters = filters;
    this.mediaService.getMediaFilters(this.page, this.perPage).subscribe(
      resp => {
        resp.forEach(media => this.medias.push(media));
      }
    );
  }

  public orderMedia(sort:MediaSort[]): void {
    this.medias = [];
    this.page = 1;
    let filters = this.mediaService.filters;
    filters.sort = sort;
    this.mediaService.filters = filters;
    this.mediaService.getMediaFilters(this.page, this.perPage).subscribe(
      resp => {
        resp.forEach(media => this.medias.push(media));
      }
    );
  }

  public filterOnScroll(): void {
    this.page++;
    this.mediaService.getMediaFilters(this.page, this.perPage).subscribe(
      resp => {
        resp.forEach(media => this.medias.push(media));
      }
    );
  }

}
