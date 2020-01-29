/* eslint-disable */
import React from 'react';
import alert from '../../styles/Alert.css';
import { IPropsAlert } from './InterfaceListAlerts';

export const Alert: React.FC<IPropsAlert> = (props: IPropsAlert) => {
  const { text, alertClass, onClick } = props;
  return (
    <div onClick={onClick} className={`${alert.alert}  ${alert[alertClass]}`} role="button">
      <p>{text}</p>
    </div>

  );
};
