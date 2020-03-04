import React, { useEffect } from 'react';
import { useDispatch, shallowEqual, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { CardAdditionalProps } from './CardAdditionalProps';
import { ListAlerts } from '../ListAlerts/ListAlerts';
import itemCard from '../../styles/ItemCard.css';
import { alerts } from '../../reducers';
import * as actions from '../../actions';
import { IPropsItemCard, IAuto } from './InterfaceCard';
import { IAllStateApplication, IAlert } from '../../Interface_Application';

const actionCreators = {
  addAllItems: actions.addAllItems,
  addNewAlert: alerts.actions.addNewAlert,
};

const CardUndefined = () => (
  <div className={itemCard.undefinedContainer}>
    <div className={itemCard.undefinedContent}>
      <h2>Товар не найден!</h2>
      <Link to="/"><button type="button">вернуться</button></Link>
    </div>
  </div>
);

export const ItemCard = (props: IPropsItemCard) => {
  const dispatch = useDispatch();
  const { addAllItems, addNewAlert } = bindActionCreators(actionCreators, dispatch);

  const { allItems } = useSelector(
    ({ listAllItems }: IAllStateApplication) => listAllItems, shallowEqual,
  );

  const { allAlertsFiltered } = useSelector(
    ({ alerts: { allAlerts } }: IAllStateApplication) => ({ allAlertsFiltered: allAlerts.filter((alert: IAlert) => alert.component === 'itemCard') }), shallowEqual,
  );

  const { match } = props;
  const id: string = match.params.id.slice(1);

  useEffect(() => {
    addAllItems();
  }, [id]);

  const addBasket = ({ title, price }: IAuto) => () => {
    const auto: IAuto = { title, price };
    axios.post('http://localhost:3000/basket', auto).then(() => {
      addNewAlert({ alert: { id: _.uniqueId(), type: 'addBasket', component: 'itemCard' } });
    });
  };

  const card = allItems.find((item) => item.id === Number(id));
  if (card == undefined) {
    return <CardUndefined />;
  }

  return (
    <div className={itemCard.container}>
      <main className={itemCard.content}>
        <Link to="/">вернуться</Link>
        <div className={itemCard.line} />
        <div className={itemCard.defaultProps}>
          <img className={itemCard.img} src={card.imgSrc} alt="img-card" />
          <div className={itemCard.description}>
            <h3>{card.title}</h3>
            <p>{card.description}</p>
          </div>
        </div>
        <CardAdditionalProps card={card} />
        <p>{`Цена : ${card.price}`}</p>
        <button onClick={addBasket(card)} className={itemCard.addBasket} type="button">Беру!!!</button>
        {allAlertsFiltered.length !== 0 && <ListAlerts allAlerts={allAlertsFiltered} />}
      </main>
    </div>
  );
};
