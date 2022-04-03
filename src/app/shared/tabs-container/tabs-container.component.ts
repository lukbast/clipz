import { Component, OnInit, ContentChildren, AfterContentInit, QueryList } from '@angular/core';
import { TabComponent } from '../tab/tab.component';

@Component({
  selector: 'app-tabs-container',
  templateUrl: './tabs-container.component.html',
  styleUrls: ['./tabs-container.component.scss']
})
export class TabsContainerComponent implements AfterContentInit {

  @ContentChildren(TabComponent) tabs: QueryList<TabComponent> = new QueryList()

  constructor() { }


  public ngAfterContentInit(): void {
    const activeTabs = this.tabs?.filter(tab => tab.isActive)

    if (!activeTabs || activeTabs.length === 0){
      this.selectTab(this.tabs!.first)
    }
  }

  public selectTab(tab: TabComponent){
    this.tabs.forEach(tab => {tab.isActive = false})

    tab.isActive = true
  }

  public getClasses(isActive : boolean){
    return {
      'hover:text-indigo-400': !isActive,
      'hover:text-white text-white bg-indigo-600' : isActive
    } 
  }
}
