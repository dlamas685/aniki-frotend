import { NgModule } from '@angular/core';
import {AvatarModule} from 'primeng/avatar';
import {AvatarGroupModule} from 'primeng/avatargroup';
import {ButtonModule} from 'primeng/button';
import {CalendarModule} from 'primeng/calendar';
import {CardModule} from 'primeng/card';
import { ChipModule } from 'primeng/chip';
import {CheckboxModule} from 'primeng/checkbox';
import {DialogModule} from 'primeng/dialog';
import {DividerModule} from 'primeng/divider';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';
import {MenuModule} from 'primeng/menu';
import {MultiSelectModule} from 'primeng/multiselect';
import {PaginatorModule} from 'primeng/paginator';
import {PasswordModule} from 'primeng/password';
import {RadioButtonModule} from 'primeng/radiobutton';
import {RippleModule} from 'primeng/ripple';
import {ScrollTopModule} from 'primeng/scrolltop';
import {SelectButtonModule} from 'primeng/selectbutton';
import {SkeletonModule} from 'primeng/skeleton';
import {SlideMenuModule} from 'primeng/slidemenu';
import {StyleClassModule} from 'primeng/styleclass';
import {TabViewModule} from 'primeng/tabview';
import { TagModule } from 'primeng/tag';



@NgModule({
  exports: [
    AvatarModule,
    AvatarGroupModule,
    ButtonModule,
    CalendarModule,
    CardModule,
    ChipModule,
    CheckboxModule,
    DropdownModule,
    DialogModule,
    DividerModule,
    InputTextModule,
    MenuModule,
    MultiSelectModule,
    PaginatorModule,
    PasswordModule,
    RadioButtonModule,
    RippleModule,
    ScrollTopModule, 
    SelectButtonModule,
    SkeletonModule,
    SlideMenuModule,
    StyleClassModule,
    TabViewModule,
    TagModule,
  ]
})
export class PrimeNGModule { }
