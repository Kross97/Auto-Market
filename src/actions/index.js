import axios from 'axios';
import { listAllItems, allPropertyDefault } from '../reducers';

/* ITEMS */
export const addAllItems = () => async (dispatch) => {
  dispatch(listAllItems.actions.loadingPositionsRequest());
  try {
    const arrItems = await axios.get('http://localhost:3000/goods');
    dispatch(listAllItems.actions.loadingPositionsSucces({ items: arrItems.data }));
  } catch (e) {
    dispatch(listAllItems.actions.loadingPositionsFailed());
  }
};

/* PROPERTIES */
export const addAllProperties = () => async (dispatch) => {
  dispatch(allPropertyDefault.actions.loadingPropertiesRequest());
  try {
    const arrProps = await axios.get('http://localhost:3000/props');
    dispatch(
      allPropertyDefault.actions.loadingPropertiesSucces({ properties: arrProps.data }),
    );
  } catch (e) {
    dispatch(allPropertyDefault.actions.loadingPropertiesFailed());
  }
};
