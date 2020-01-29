/* eslint-disable */
import React from 'react';
import alert from '../../styles/Alert.css';
import { IProps } from './InterfaceListAlerts';

export const Alert: React.FC<IProps> = (props: IProps) => {
  const { text, alertClass, onClick } = props;
  return (
    <div onClick={onClick} className={`${alert.alert}  ${alert[alertClass]}`} role="button">
      <p>{text}</p>
    </div>

  );
};
