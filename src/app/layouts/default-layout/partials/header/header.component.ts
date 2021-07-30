import {Component, HostBinding, HostListener, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {SettingsService} from '@app/settings/settings.service';
import {AuthService} from '@app/layouts/auth-layout/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  @HostBinding('class') classNames = 'dt-header';
  settings: any;
  isNavFolded = false;
  languages = [
    {
      id: 'en',
      title: 'English',
      flag: 'flag-icon-us'
    },
    {
      id: 'es',
      title: 'Spanish',
      flag: 'flag-icon-es' 
    }
  ];
  currentLanguage: any;
  currentUser: any = {
    name: 'Bob Hyden',
    thumb: 'https://via.placeholder.com/150x150',
    position: 'Administrator'
  };

  logoImageUrl = 'https://firebasestorage.googleapis.com/v0/b/skillsoft-ea998.appspot.com/o/logoskill.jpeg?alt=media&token=a2fe3e5f-749e-4da9-bdfd-2be684578447';

  onSettingChanged: Subscription;
  onLanguageChanged: Subscription;

  constructor(private settingService: SettingsService,
              public translate: TranslateService,
              private authService: AuthService,
              private router: Router) {
    this.setActiveLang(this.translate.currentLang);
    this.onLanguageChanged = this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.setActiveLang(event.lang);
    });

    this.onSettingChanged = this.settingService.onSettingChanged.subscribe((settings) => {
      this.settings = settings;
      this.isNavFolded = this.settings.navigationStyle === 'folded' && window.innerWidth >= 992;

      if (settings.theme === 'light') {
        this.logoImageUrl = 'https://firebasestorage.googleapis.com/v0/b/skillsoft-ea998.appspot.com/o/logoskill.jpeg?alt=media&token=a2fe3e5f-749e-4da9-bdfd-2be684578447';
      } else {
        this.logoImageUrl = 'https://firebasestorage.googleapis.com/v0/b/skillsoft-ea998.appspot.com/o/logoskill.jpeg?alt=media&token=a2fe3e5f-749e-4da9-bdfd-2be684578447';
      }
    });
  }

  @HostListener('window:resize')
  onResize() {
    this.isNavFolded = this.settings.navigationStyle === 'folded' && window.innerWidth >= 992;
  }

  ngOnInit() {
    var datauser=JSON.parse(localStorage.getItem('currentUserData')).detailUsers[0]
    console.log('//////////////////////////////////////////////la data del  usuario esss::::::++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++',datauser);

    this.currentUser = {
      name: datauser.fullName,
      thumb: datauser.photo,
      position: 'Administrator'
    };
  

  }

  toggleNavigation() {
    if (this.settings.navigationStyle === 'drawer' || window.innerWidth < 992) {
      this.settings.activeNavDrawer = !this.settings.activeNavDrawer;
    } else if (this.settings.navigationStyle === 'folded') {
      this.settings.navigationStyle = 'default';
    } else {
      this.settings.navigationStyle = 'folded';
    }

    this.settingService.setSettings(this.settings);
  }

  setActiveLang(lang: string) {
    this.languages.forEach((language) => {
      if(language.id === lang) {
        this.currentLanguage = language;
      }
    });
  }

  switchLanguage(lang) {
    this.translate.use(lang.id);
    localStorage.setItem('language', lang.id);
  }

  /**
   * Logout user
   * @param event
   */
  onLogout(event) {
    event.preventDefault();

    this.authService.logout();
  }
  toChangePass(){
    this.router.navigate(['/default/forms/change-pass'])
  }
  ngOnDestroy() {
    this.onSettingChanged.unsubscribe();
    this.onLanguageChanged.unsubscribe();
  }

}
