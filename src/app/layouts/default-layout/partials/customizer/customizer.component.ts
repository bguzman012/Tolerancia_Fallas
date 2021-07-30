import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {Location} from '@angular/common';
import {SwalComponent} from '@sweetalert2/ngx-sweetalert2';
import {SettingsService} from '@app/settings/settings.service';

@Component({
  selector: 'app-customizer',
  templateUrl: './customizer.component.html',
  styleUrls: ['./customizer.component.scss']
})
export class CustomizerComponent implements OnInit, OnDestroy {
  isOpen = false;
  settings: any;
  onSettingChanged: Subscription;

  themes = [
    {
      name: 'Light',
      slug: 'light',
      thumb: 'assets/images/customizer-icons/theme-light.png'
    },
    {
      name: 'Semi Dark',
      slug: 'semidark',
      thumb: 'assets/images/customizer-icons/theme-normal.png'
    },
    {
      name: 'Dark',
      slug: 'dark',
      thumb: 'assets/images/customizer-icons/theme-dark.png'
    }
  ];

  colors = ['', 'style-2', 'style-3', 'style-4', 'style-5', 'style-6', 'style-7', 'style-8', 'style-9', 'style-10'];

  sidebarLayouts = [
    {
      name: 'Folded',
      slug: 'folded',
      thumb: 'assets/images/customizer-icons/folded.png'
    },
    {
      name: 'Default',
      slug: 'default',
      thumb: 'assets/images/customizer-icons/default.png'
    },
    {
      name: 'Drawer',
      slug: 'drawer',
      thumb: 'assets/images/customizer-icons/drawer.png'
    }
  ];

  layoutModes = [
    {
      name: 'Framed',
      slug: 'framed',
      thumb: 'assets/images/customizer-icons/framed.png'
    },
    {
      name: 'Full Width',
      slug: 'full-width',
      thumb: 'assets/images/customizer-icons/full-width.png'
    },
    {
      name: 'Boxed',
      slug: 'boxed',
      thumb: 'assets/images/customizer-icons/boxed.png'
    }
  ];

  navStyles = [
    {
      name: 'Default',
      slug: 'default',
      thumb: 'assets/images/customizer-icons/layout-default.png'
    },
    {
      name: 'SAAS',
      slug: 'saas',
      thumb: 'assets/images/customizer-icons/layout-saas.png'
    },
    {
      name: 'Listing',
      slug: 'listing',
      thumb: 'assets/images/customizer-icons/layout-listing.png'
    },
    {
      name: 'Intranet',
      slug: 'intranet',
      thumb: 'assets/images/customizer-icons/layout-intranet.png'
    },
    {
      name: 'Back Office',
      slug: 'back-office',
      thumb: 'assets/images/customizer-icons/layout-back-office.png'
    },
    {
      name: 'Back Office Minimal',
      slug: 'back-office-mini',
      thumb: 'assets/images/customizer-icons/layout-back-office-mini.png'
    },
    {
      name: 'Modern',
      slug: 'modern',
      thumb: 'assets/images/customizer-icons/layout-modern.png'
    },
    {
      name: 'CRM',
      slug: 'crm',
      thumb: 'assets/images/customizer-icons/layout-crm.png'
    }
  ];

  @ViewChild('updateSwal') private updateSwal: SwalComponent;

  constructor(private settingService: SettingsService, private location: Location) {
  }

  ngOnInit() {
    this.onSettingChanged = this.settingService.onSettingChanged.subscribe((settings) => {
      this.settings = settings;
    });
  }

  /**
   * Toggle drawer
   * @param event
   */
  toggleDrawer(event) {
    event.preventDefault();
    this.isOpen = !this.isOpen;
  }

  /**
   * On change theme
   * @param theme
   * @param event
   */
  onChangeTheme(theme, event) {
    event.preventDefault();

    this.settings.theme = theme;
    if (theme === 'dark') {
      this.settings.themeColor = '';
    }

    this.settingService.setSettings(this.settings);
    this.updateSwal.fire();
  }

  /**
   * On option change
   */
  onStyleChange(style) {
    this.settings[style] = !this.settings[style];
    if (this.settings.navigationFixed && this.settings.navigationStyle === 'drawer') {
      this.settings.navigationStyle = 'default';
    }
    this.settingService.setSettings(this.settings);
    this.updateSwal.fire();
  }

  /**
   * Change sidebar style
   * @param style
   * @param event
   */
  onSidebarLayoutChange(style, event) {
    event.preventDefault();

    this.settings.navigationStyle = style;

    if (style === 'drawer') {
      this.settings.navigationFixed = false;
    }

    this.settingService.setSettings(this.settings);
    this.updateSwal.fire();
  }

  /**
   * On change Layout Mode
   * @param newLayoutMode
   * @param event
   */
  onLayoutModeChange(newLayoutMode, event) {
    event.preventDefault();

    this.settings.mode = newLayoutMode;
    this.settingService.setSettings(this.settings);
    this.updateSwal.fire();
  }

  /**
   * On change theme color
   * @param newColor
   * @param event
   */
  onColorChange(newColor, event) {
    event.preventDefault();

    this.settings.themeColor = newColor;
    this.settingService.setSettings(this.settings);
    this.updateSwal.fire();
  }

  /**
   * Get layout URL
   * @param layout
   */
  getLayoutUrl(layout) {
    return this.location.path().replace(this.settings.layout + '/', layout + '/');
  }

  ngOnDestroy() {
    this.onSettingChanged.unsubscribe();
  }

}
