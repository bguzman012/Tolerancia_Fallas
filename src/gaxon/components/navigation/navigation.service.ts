import { HttpClient } from '@angular/common/http';
import {EventEmitter, Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import { environment } from 'src/environments/environment';
import {NavigationModelInterface} from './navigation.model';

@Injectable()
export class NavigationService {
  onNavCollapseToggle = new EventEmitter<any>();
  onNavCollapseToggled = new EventEmitter<any>();

  navigationModel: NavigationModelInterface;
  headerMenu: NavigationModelInterface;

  onNavigationChanged: BehaviorSubject<any> = new BehaviorSubject({});
  onHeaderMenuChanged: BehaviorSubject<any> = new BehaviorSubject({});

  constructor(public http:HttpClient) {
  }

  /**
   * Set the navigations items
   *
   * @param navModel
   */
  setNavigationModel(navModel) {
    this.navigationModel = navModel;
    this.onNavigationChanged.next(this.navigationModel.navigation);
  }

  /**
   * Set the header menu items
   *
   * @param navModel
   */
  setHeaderMenu(navModel) {
    this.headerMenu = navModel;
    this.onHeaderMenuChanged.next(this.headerMenu.navigation);
  }

  getMenu() {
    let url = `${environment.server}/boards/menu-web`;

    return this.http.get<any>(url).toPromise()
        .then(res => {
            return res;
        })

}
getMenuRisks() {
  let url = `${environment.server}/boards/menu-risks`;

  return this.http.get<any>(url).toPromise()
      .then(res => {
          return res;
      })

}
}
