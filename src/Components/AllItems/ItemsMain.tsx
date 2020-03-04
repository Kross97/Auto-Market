import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { ListAlerts } from '../ListAlerts/ListAlerts';
import { alerts } from '../../reducers';
import items from '../../styles/AllItems.css';
import { allItemsFiltered } from '../../selectors';
import * as actions from '../../actions';
import { ListItems } from './ListItems';
import { IPropsMainContent, IAllTypesSorting } from './InterfaceAllItems';
import { IAllStateApplication, IAlert, IItem } from '../../Interface_Application';

const actionCreators = {
  deleteItem: actions.deleteItem,
  completeRemovalFromComponent: alerts.actions.completeRemovalFromComponent,
};

export const ItemsMain = (props: IPropsMainContent) => {
  const dispatch = useDispatch();
  const {
    completeRemovalFromComponent,
    deleteItem,
  } = bindActionCreators(actionCreators, dispatch);

  const allItems = useSelector((state: IAllStateApplication) => allItemsFiltered(state));

  const { allAlertsFiltered } = useSelector(
    ({ alerts: { allAlerts } }: IAllStateApplication) => (
      { allAlertsFiltered: allAlerts.filter((alert: IAlert) => alert.component === 'allItems') }
    ), shallowEqual,
  );

  useEffect(() => () => {
    completeRemovalFromComponent({ component: 'allItems' });
  }, []);

  const removeItem = (id: number) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    deleteItem(id);
  };

  const sorting = (itemsAfterFilters: IItem[], typeSort: string) => {
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
      Data: (tasks: IItem[]): IItem[] => tasks.sort(
        (a: IItem, b: IItem) => Date.parse(a.dateSort) - Date.parse(b.dateSort),
      ),
      DescData: (tasks: IItem[]): IItem[] => tasks.sort(
        (a: IItem, b: IItem) => Date.parse(b.dateSort) - Date.parse(a.dateSort),
      ),
      Title: (tasks: IItem[]) => tasks.sort(
        (a: IItem, b: IItem): number => Number(a.title > b.title),
      ),
      DescTitle: (tasks: IItem[]) => tasks.sort(
        (a: IItem, b: IItem): number => Number(a.title < b.title),
      ),
    };
    return allTypesSorting[typeSort](newSliceItems);
  };

  const {
    currentQuantity,
    typeSort,
  } = props;
  const itemsAfterFilterAndSort: IItem[] = sorting(allItems, typeSort);
  return (
    <main className={items.list}>
      <ListItems
        removeItem={removeItem}
        currentQuantity={currentQuantity}
        itemsAfterFilterAndSort={itemsAfterFilterAndSort}
      />
      {allAlertsFiltered.length !== 0 && <ListAlerts allAlerts={allAlertsFiltered} />}
    </main>
  );
};
