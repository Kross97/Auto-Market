import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import axios from 'axios';
import { ListAlerts } from '../ListAlerts/ListAlerts';
import { listAllItems, alerts } from '../../reducers';
import items from '../../styles/AllItems.css';
import { allItemsFiltered } from '../../selectors';
import { ListItems } from './ListItems';

const mapStateToProps = (state) => {
  const props = {
    allItems: allItemsFiltered(state),
    allAlerts: state.alerts.allAlerts.filter((alert) => alert.component === 'allItems'),
  };
  return props;
};

const actionCreators = {
  deleteItem: listAllItems.actions.deleteItem,
  addNewAlert: alerts.actions.addNewAlert,
  completeRemovalFromComponent: alerts.actions.completeRemovalFromComponent,
};

class MainContent extends React.Component {
  componentWillUnmount() {
    const { completeRemovalFromComponent } = this.props;
    completeRemovalFromComponent({ component: 'allItems' });
  }

  removeItem = (id) => (e) => {
    e.preventDefault();
    const { deleteItem, addNewAlert } = this.props;
    addNewAlert({ alert: { id: _.uniqueId(), type: 'deleteItem', component: 'allItems' } });
    deleteItem({ id });
    axios.delete(`http://localhost:3000/goods/${id}`);
  }

  sorting(itemsAfterFilters, typeSort) {
    if (typeSort === '') {
      return itemsAfterFilters;
    }

    const newSliceTasks = itemsAfterFilters.slice();
    const allTypesSorting = {
      Price: (tasks) => tasks.sort((a, b) => {
        const indexLastSymbolA = a.price.length - 2;
        const indexLastSymbolB = b.price.length - 2;
        return (
          Number(a.price.slice(0, indexLastSymbolA)) - Number(b.price.slice(0, indexLastSymbolB))
        );
      }),
      DescPrice: (tasks) => tasks.sort((a, b) => {
        const indexLastSymbolA = a.price.length - 2;
        const indexLastSymbolB = b.price.length - 2;
        return (
          Number(b.price.slice(0, indexLastSymbolB)) - Number(a.price.slice(0, indexLastSymbolA))
        );
      }),
      Data: (tasks) => tasks.sort((a, b) => Date.parse(a.dateSort) - Date.parse(b.dateSort)),
      DescData: (tasks) => tasks.sort((a, b) => Date.parse(b.dateSort) - Date.parse(a.dateSort)),
      Title: (tasks) => tasks.sort((a, b) => a.title > b.title),
      DescTitle: (tasks) => tasks.sort((a, b) => a.title < b.title),
    };
    return allTypesSorting[typeSort](newSliceTasks);
  }

  render() {
    const {
      allAlerts,
      allItems,
      currentQuantity,
      typeSort,
    } = this.props;
    const itemsAfterFilterAndSort = this.sorting(allItems, typeSort);
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
