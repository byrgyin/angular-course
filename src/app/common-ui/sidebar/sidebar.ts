import {Component, inject} from '@angular/core';
import {SvgIcon} from '../svg-icon/svg-icon';
import {SubscriberCard} from './subscriber-card/subscriber-card';
import {RouterLink} from '@angular/router';
import {ProfileService} from '../../data/sevices/profile.service';
import {AsyncPipe, JsonPipe} from '@angular/common';
import {firstValueFrom} from 'rxjs';
import {ImgUrlPipe} from '../../helpers/pipes/img-url';

@Component({
  selector: 'app-sidebar',
  imports: [
    SvgIcon,
    SubscriberCard,
    RouterLink,
    AsyncPipe,
    JsonPipe,
    ImgUrlPipe
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {

  profileService = inject(ProfileService);
  subscribers$ = this.profileService.getSubscribeShortList();

  me = this.profileService.me

  menuItems = [
    {
      label: 'Моя страница',
      icon: 'home',
      link: ''
    },
    {
      label: 'Чаты',
      icon: 'chats',
      link: 'chats'
    },
    {
      label: 'Поиск',
      icon: 'search',
      link: 'search'
    },
  ]
  ngOnInit(): void {
    firstValueFrom(this.profileService.getMe())
  }

}
