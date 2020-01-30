import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import axios from 'axios';
import { ListAlerts } from '../ListAlerts/ListAlerts';
import { listAllItems, alerts } from '../../reducers';
import items from '../../styles/AllItems.css';
import { allItemsFiltered } from '../../selectors';
import { ListItems } from './ListItems';
import { IPropsMainContent, IAllTypesSorting } from './InterfaceAllItems';
import { IAllStateApplication, IAlert, IItem } from '../../Interface_Application';

const mapStateToProps = (state: IAllStateApplication) => {
  const props = {
    allItems: allItemsFiltered(state),
    allAlerts: state.alerts.allAlerts.filter((alert: IAlert) => alert.component === 'allItems'),
  };
  return props;
};

const actionCreators = {
  deleteItem: listAllItems.actions.deleteItem,
  addNewAlert: alerts.actions.addNewAlert,
  completeRemovalFromComponent: alerts.actions.completeRemovalFromComponent,
};

class MainContent extends React.Component<IPropsMainContent, {}> {
  public componentWillUnmount() {
    const { completeRemovalFromComponent } = this.props;
    completeRemovalFromComponent({ component: 'allItems' });
  }

  public removeItem = (id: number) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const { deleteItem, addNewAlert } = this.props;
    addNewAlert({ alert: { id: _.uniqueId(), type: 'deleteItem', component: 'allItems' } });
    deleteItem({ id });
    axios.delete(`http://localhost:3000/goods/${id}`);
  }

  public sorting(itemsAfterFilters: IItem[], typeSort: string) {
    if (typeSort === '') {
      return itemsAfterFilters;
    }

    const newSliceItems = itemsAfterFilters.slice();
    const allTypesSorting: IAllTypesSorting = {
      Price: (tasks: IItem[]): IItem[] => tasks.sort((a: IItem, b: IItem) => {
        const indexLastSymbolA = a.price.length - 2;
        const indexLastSymbolB = b.price.length - 2;
        return (
          Number(a.price.slice(0, indexLastSymbolA)) - Number(b.price.slice(0, indexLastSymbolB))
        );
      }),
      DescPrice: (tasks: IItem[]): IItem[] => tasks.sort((a: IItem, b: IItem) => {
        const indexLastSymbolA = a.price.length - 2;
        const indexLastSymbolB = b.price.length - 2;
        return (
          Number(b.price.slice(0, indexLastSymbolB)) - Number(a.price.slice(0, indexLastSymbolA))
        );
      }),
      Data: (tasks: IItem[]): IItem[] => tasks.sort((a: IItem, b: IItem) => Date.parse(a.dateSort) - Date.parse(b.dateSort)),
      DescData: (tasks: IItem[]): IItem[] => tasks.sort((a: IItem, b: IItem) => Date.parse(b.dateSort) - Date.parse(a.dateSort)),
      Title: (tasks: IItem[]) => tasks.sort((a: IItem, b: IItem): number => Number(a.title > b.title)),
      DescTitle: (tasks: IItem[]) => tasks.sort((a: IItem, b: IItem): number => Number(a.title < b.title)),
    };
    return allTypesSorting[typeSort](newSliceItems);
  }

  public render() {
    const {
      allAlerts,
      allItems,
      currentQuantity,
      typeSort,
    } = this.props;
    const itemsAfterFilterAndSort: IItem[] = this.sorting(allItems, typeSort);
    return (
      <main className={items.list}>
        <ListItems
          removeItem={this.removeItem}
          currentQuantity={currentQuantity}
          itemsAfterFilterAndSort={itemsAfterFilterAndSort}
        />
        {allAlerts.length !== 0 && <ListAlerts allAlerts={allAlerts} />}
      </main>
    );
  }
}

export const ItemsMain = connect(mapStateToProps, actionCreators)(MainContent);
