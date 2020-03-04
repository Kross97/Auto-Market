import { createSelector } from 'reselect';
import { IAllStateApplication } from '../Interface_Application';

const getDefaultPropsNormal = (
  state: IAllStateApplication,
) => state.allPropertyDefault.propertyDefaultNormal;

const getDefaultPropsDropdown = (
  state: IAllStateApplication,
) => state.allPropertyDefault.propertyDefaultDropdown;

export const defaultPropsTitles = createSelector(
  getDefaultPropsNormal,
  getDefaultPropsDropdown,
  (propsNormal, propDropdown) => [...propsNormal, ...propDropdown].map((prop) => prop.title),
);

const getFilterPage = (
  { listAllItems }: IAllStateApplication,
) => listAllItems.filteringData.currentPage;

const getQuantity = (
  { listAllItems }: IAllStateApplication,
) => listAllItems.filteringData.quantityItems;

const getGilterTitle = (
  { listAllItems }: IAllStateApplication,
) => listAllItems.filteringData.titleSearch;

const getAllItems = (
  { listAllItems }: IAllStateApplication,
) => listAllItems.allItems;

export const allItemsFiltered = createSelector(
  getFilterPage,
  getQuantity,
  getGilterTitle,
  getAllItems,
  (page, quantity, title, items) => {
    const startIndex = (Number(quantity) * Number(page)) - Number(quantity);
    const endIndex = Number(quantity) * Number(page);
    const chunkItems = items.slice(startIndex, endIndex);
    return chunkItems.filter(
      (item) => item.title.includes(title),
    );
  },
);
