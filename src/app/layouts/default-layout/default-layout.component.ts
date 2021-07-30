import { Component, HostBinding, HostListener, Inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { SettingsService } from '@app/settings/settings.service';
import { NavigationService } from '@gaxon/components';
import { Subscription } from 'rxjs/Subscription';
import { DOCUMENT } from '@angular/common';
import { LayoutConfig } from './layout.config';

import { NavigationModel } from './navigation/navigation.model';
import { FormService } from '@app/content/forms/services/forms.service';

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DefaultLayoutComponent implements OnInit, OnDestroy {
  @HostBinding('class') classNames = 'dt-root__inner';

  settings: any;
  themes = ['light', 'semidark', 'dark'];
  modes = ['framed', 'full-width', 'boxed'];
  currentTheme = '';
  currentThemeColor = 'style-8';

  onSettingChanged: Subscription;

  constructor(private navService: NavigationService,
    formservice: FormService,
    private settingService: SettingsService,

    @Inject(DOCUMENT) private document: any) {
    this.settingService.setSettings(new LayoutConfig().configs);

    this.onSettingChanged = this.settingService.onSettingChanged.subscribe(
      (newSettings) => {
        this.settings = newSettings;
        this.updateLayout();
        this.document.body.classList.add('dt-layout--' + this.settings.layout);
      }
    );

    // Set the navigation model
    this.navService.getMenu().then(data => {
      console.log('entra a la dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', data)
      this.navService.setNavigationModel(new NavigationModel(data.navigation));

    });

  }

  @HostListener('window:resize')
  onResize() {
    this.updateLayout();
  }

  ngOnInit() {

  }

  getmenu() {



  }

  /**
   * On click overlay
   */
  onClickOverlay() {
    this.settings.activeNavDrawer = false;
    this.settingService.setSettings(this.settings);
  }

  /**
   * Update layout
   */
  updateLayout() {
    if (this.settings.navigationFixed && window.innerWidth >= 992) {
      this.document.body.classList.add('dt-sidebar--fixed');
    } else {
      this.document.body.classList.remove('dt-sidebar--fixed');
    }

    if (this.settings.headerFixed) {
      this.document.body.classList.add('dt-header--fixed');
    } else {
      this.document.body.classList.remove('dt-header--fixed');
    }

    if (this.settings.navigationStyle === 'folded' && window.innerWidth >= 992) {
      this.document.body.classList.add('dt-sidebar--folded');
    } else {
      this.document.body.classList.remove('dt-sidebar--folded');
    }

    if (this.currentTheme !== this.settings.theme || this.currentThemeColor !== this.settings.themeColor) {
      this.applyTheme(this.settings.theme);
    }

    this.applyNewLayoutMode(this.settings.mode);
  }

  /**
   * Apply New Theme
   * @param newTheme
   */
  applyTheme(newTheme) {
    this.currentTheme = newTheme;
    this.currentThemeColor = this.settings.themeColor;

    this.themes.map((theme) => {
      if (newTheme === theme) {
        this.document.body.classList.add('theme-' + theme);
      } else {
        this.document.body.classList.remove('theme-' + theme);
      }
    });

    const colorStyle = this.currentThemeColor && this.currentTheme !== 'dark' ? '-' + this.currentThemeColor : '';

    const styleEleRef = this.document.createElement('link');
    styleEleRef.rel = 'stylesheet';
    styleEleRef.className = 'gx-theme-style';
    styleEleRef.href = 'assets/css/' + this.settings.layout + '/theme-' + newTheme + colorStyle + '.min.css';
    document.body.appendChild(styleEleRef);

    setTimeout(() => {
      const children = this.document.getElementsByClassName('gx-theme-style');

      if (children.length > 1) {
        for (let index = 0; index < children.length; index++) {
          if ((index + 1) < children.length) {
            const child = children[index];
            child.parentNode.removeChild(child);
          }
        }
      }
    }, 1000);
  }

  /**
   * Apply New Mode
   * @param newLayoutMode
   */
  applyNewLayoutMode(newLayoutMode) {
    this.modes.map((layoutMode) => {
      if (newLayoutMode === layoutMode) {
        this.document.body.classList.add('dt-layout--' + layoutMode);
      } else {
        this.document.body.classList.remove('dt-layout--' + layoutMode);
      }
    });
  }

  ngOnDestroy() {
    this.onSettingChanged.unsubscribe();
  }
}


