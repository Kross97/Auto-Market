import React from 'react';
import addItem from '../../styles/AddItem.css';
import { IPropsMainData } from './InterfaceAddItem';

export const MainData = (props: IPropsMainData) => {
  const {
    changeTitle,
    changePrice,
    getImgUrl,
    changeDescription,
    imgName,
    title,
    price,
    imgSrc,
    description,
  } = props;

  return (
    <>
      <label>
   Название товара
   (не более 30 символов)
        <span>*</span>
        <input onChange={changeTitle} type="text" value={title} />
      </label>
      <label>
   Стоимость товара
   (не более 15 символов)
        <span>*</span>
        <input onChange={changePrice} type="text" value={price} />
      </label>
      <label>
   Изображение
        <span>*</span>
        <input onChange={getImgUrl} type="file" accept="image/*" />
        <div className={addItem.customInput}>{imgName}</div>
        <img className={addItem.customImg} src="../src/img/download-arrow.png" alt="download" />
      </label>
      { imgSrc !== '' ? <img className={addItem.img} src={imgSrc} alt="img-auto" /> : null }
      <label>
   Описание товара
        <textarea onChange={changeDescription} value={description} />
      </label>
    </>
  );
};
