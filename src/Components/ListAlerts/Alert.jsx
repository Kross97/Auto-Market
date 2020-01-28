/* eslint-disable */
import React from 'react';
import alert from '../../styles/Alert.css';

export const Alert = (props) => {
  const { text, alertClass, onClick } = props;
  return (
    <div onClick={onClick} className={`${alert.alert}  ${alert[alertClass]}`} role="button">
      <p>{text}</p>
    </div>

  );
};
