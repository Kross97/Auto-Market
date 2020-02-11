import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { CardAdditionalProps } from './CardAdditionalProps';
import { ListAlerts } from '../ListAlerts/ListAlerts';
import itemCard from '../../styles/ItemCard.css';
import { alerts } from '../../reducers';
import * as actions from '../../actions';
import { IPropsItemCard, IAuto } from './InterfaceCard';
import { IAllStateApplication, IAlert, IItem } from '../../Interface_Application';

const mapStateToProps = (
  { listAllItems: { allItems }, alerts: { allAlerts } }: IAllStateApplication,
) => {
  const props = {
    allItems,
    allAlerts: allAlerts.filter((alert: IAlert) => alert.component === 'itemCard'),
  };
  return props;
};

const actionCreators = {
  addAllItems: actions.addAllItems,
  addNewAlert: alerts.actions.addNewAlert,
};

const CardUndefined: React.FC = () => (
  <div className={itemCard.undefinedContainer}>
    <div className={itemCard.undefinedContent}>
      <h2>Товар не найден!</h2>
      <Link to="/"><button type="button">вернуться</button></Link>
    </div>
  </div>
);

class Card extends React.Component<IPropsItemCard, {}> {
  public componentDidMount() {
    const { addAllItems } = this.props;
    addAllItems();
  }

  public addBasket = ({ title, price }: IAuto) => () => {
    const { addNewAlert } = this.props;
    const auto: IAuto = { title, price };
    axios.post('http://localhost:3000/basket', auto).then(() => {
      addNewAlert({ alert: { id: _.uniqueId(), type: 'addBasket', component: 'itemCard' } });
    });
  };

  public render() {
    const { match, allItems, allAlerts } = this.props;
    const id: string = match.params.id.slice(1);
    const card = allItems.find((item) => (item as IItem).id === Number(id));
    if (card == undefined) {
      return <CardUndefined />;
    }
    return (
      <div className={itemCard.container}>
        <main className={itemCard.content}>
          <Link to="/">вернуться</Link>
          <hr />
          <div className={itemCard.defaultProps}>
            <img className={itemCard.img} src={card.imgSrc} alt="img-card" />
            <div className={itemCard.description}>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </div>
          </div>
          <CardAdditionalProps card={card as IItem} />
          <p>{`Цена : ${card.price}`}</p>
          <button onClick={this.addBasket(card)} className={itemCard.addBasket} type="button">Беру!!!</button>
          {allAlerts.length !== 0 && <ListAlerts allAlerts={allAlerts} />}
        </main>
      </div>
    );
  }
}

export const ItemCard = connect(mapStateToProps, actionCreators)(Card);
