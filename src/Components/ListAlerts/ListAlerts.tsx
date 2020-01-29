import React from 'react';
import { connect } from 'react-redux';
import { Alert } from './Alert';
import { alerts } from '../../reducers';
import { IPropsListAlerts } from './InterfaceListAlerts';

const actionCreators = {
  removeAlert: alerts.actions.removeAlert,
};

class Alerts extends React.Component<IPropsListAlerts, {}> {
  public removeCurrentAlert = (id: string) => () => {
    const { removeAlert } = this.props;
    removeAlert({ id });
  }

  public render() {
    const { allAlerts } = this.props;
    return (
      <ul>
        {allAlerts.map((alert) => {
          let text;
          switch (alert.type) {
            case 'mainPropsEmpty':
              text = 'Обязательные поля не заполнены!';
              break;
            case 'priceNotString':
              text = 'Цена указанна неверно!';
              break;
            case 'succesAddItem':
              text = 'Товар успешно добавлен на страницу!';
              break;
            case 'succesEditItem':
              text = 'Товар успешно отредактирован!';
              break;
            case 'limitItems':
              text = 'На этой странице превышен лимит записей. Перейдите на следующую';
              break;
            case 'mainPropsLength':
              text = 'Длинна названия или цены некоректны!';
              break;
            case 'erorTitle':
              text = 'Имя отсутсвует или свойство с данным именем уже создано. Введите другое имя!';
              break;
            case 'erorType':
              text = 'Не задан тип свойства!';
              break;
            case 'successProp':
              text = 'Свойство успешно создано!';
              break;
            case 'deleteItem':
              text = 'Товар успешно удален!';
              break;
            case 'deleteProp':
              text = 'Свойство успешно удалено!';
              break;
            case 'addBasket':
              text = 'Товар добавлен в корзину!';
              break;
            case 'addItemsSucces':
              text = 'Товары загружены на страницу!';
              break;
            case 'addItemsFailed':
              text = 'Товар не загружены на страницу!';
              break;
            case 'addPropsSucces':
              text = 'Проперти загружены на страницу!';
              break;
            case 'addPropsFailed':
              text = 'Проперти не загружены на страницу!';
              break;
            default:
              text = 'Дополнительные свойства заполнены некоректно!';
          }
          return (
            <Alert
              key={alert.id}
              text={text}
              alertClass={alert.type}
              onClick={this.removeCurrentAlert(alert.id)}
            />
          );
        })}
      </ul>
    );
  }
}

export const ListAlerts = connect(null, actionCreators)(Alerts);
