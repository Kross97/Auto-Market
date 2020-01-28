import React from 'react';
import addItem from '../../styles/AddItem.css';

export const MainData = (props) => {
  const {
    changeTitle,
    changePrice,
    getImgUrl,
    changeDescription,
    imgName,
    state,
  } = props;

  const {
    title,
    price,
    imgSrc,
    description,
  } = state;
  return (
    <>
      <label htmlFor>
   Название товара
   (не более 30 символов)
        <span>*</span>
        <input onChange={changeTitle} type="text" value={title} />
      </label>
      <label htmlFor>
   Стоимость товара
   (не более 15 символов)
        <span>*</span>
        <input onChange={changePrice} type="text" value={price} />
      </label>
      <label htmlFor>
   Изображение
        <span>*</span>
        <input onChange={getImgUrl} type="file" accept="image/*" />
        <div className={addItem.customInput}>{imgName}</div>
        <img className={addItem.customImg} src="../src/img/download-arrow.png" alt="download" />
      </label>
      { imgSrc !== '' ? <img className={addItem.img} src={imgSrc} alt="img-auto" /> : null }
      <label htmlFor>
   Описание товара
        <textarea onChange={changeDescription} value={description} />
      </label>
    </>
  );
};
