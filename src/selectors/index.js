import { createSelector } from 'reselect';

const getDefaultProps = (state) => state.allPropertyDefault.propertyDefault;

export const defaultPropsTitles = createSelector(
  getDefaultProps,
  (props) => props.map((prop) => prop.title),
);

const getFilterPage = ({ listAllItems }) => listAllItems.filteringData.currentPage;

const getQuantity = ({ listAllItems }) => listAllItems.filteringData.quantityItems;

const getGilterTitle = ({ listAllItems }) => listAllItems.filteringData.titleSearch;

const getAllItems = ({ listAllItems }) => listAllItems.allItems;

export const allItemsFiltered = createSelector(
  getFilterPage,
  getQuantity,
  getGilterTitle,
  getAllItems,
  (page, quantity, title, items) => {
    const startIndex = (quantity * page) - quantity;
    const endIndex = quantity * page;
    const chunkItems = items.slice(startIndex, endIndex);
    return chunkItems.filter(
      (item) => item.title.includes(title),
    );
  },
);
