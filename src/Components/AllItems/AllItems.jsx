import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { ItemsFooter } from './ItemsFooter';
import { ItemsMain } from './ItemsMain';
import { ItemsSortNavigation } from './ItemsSortNavigation';
import items from '../../styles/AllItems.css';
import * as actions from '../../actions';
import { listAllItems } from '../../reducers';

const mapStateToProps = ({ listAllItems: { countItems } }) => ({ countItems });

const actionCreators = {
  addAllItems: actions.addAllItems,
  addAllProperties: actions.addAllProperties,
  addFilterPage: listAllItems.actions.addFilterPage,
  addFilterTitle: listAllItems.actions.addFilterTitle,
  addFilterQuantity: listAllItems.actions.addFilterQuantity,
};

class Items extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentQuantity: '10',
      currentPage: '1',
      typeSort: '',
      titleSearch: '',
      titleData: '',
    };
  }

  componentDidMount() {
    const {
      addAllItems,
      addFilterPage,
      addFilterTitle,
      addFilterQuantity,
    } = this.props;
    addAllItems();
    addFilterTitle({ title: '' });
    const { currentQuantity, currentPage } = this.state;
    addFilterPage({ page: currentPage });
    addFilterQuantity({ quantity: currentQuantity });
  }

  changeCurrentQuantity = ({ target }) => {
    const { addFilterQuantity } = this.props;
    this.setState({ currentQuantity: target.value });
    addFilterQuantity({ quantity: target.value });
  }

  changeCurrentPage = ({ target }) => {
    const { addFilterPage } = this.props;
    this.setState({ currentPage: target.value });
    addFilterPage({ page: target.value });
  }

 currentSort = (type) => () => {
   const { typeSort } = this.state;
   if (type === typeSort) {
     this.setState({ typeSort: `Desc${type}` });
   } else {
     this.setState({ typeSort: type });
   }
 }

  addSearchTitle = () => {
    const { titleData } = this.state;
    const { addFilterTitle } = this.props;
    this.setState({ titleSearch: titleData });
    addFilterTitle({ title: titleData });
  }

  changeTitleData = ({ target }) => {
    this.setState({ titleData: target.value });
  };

  render() {
    const {
      titleData,
      titleSearch,
      typeSort,
      currentQuantity,
      currentPage,
    } = this.state;
    const { countItems } = this.props;
    const quantityPages = Math.ceil(countItems / currentQuantity);
    const userIsLogin = localStorage.getItem('isLogin');
    return (
      <div className={items.content}>
        <div className={items.btns}>
          <div>
            <input onChange={this.changeTitleData} type="text" placeholder="поиск" value={titleData} />
            <button onClick={this.addSearchTitle} type="button" aria-label="search" />
          </div>
          <Link to={`${userIsLogin === null ? '/login' : '/addItem'}`}><button type="button" className={items.btn}>Добавить товар</button></Link>
        </div>
        <ItemsSortNavigation
          currentSort={this.currentSort}
          typeSort={typeSort}
        />
        <ItemsMain
          titleSearch={titleSearch}
          typeSort={typeSort}
          currentQuantity={currentQuantity}
          currentPage={currentPage}
        />
        <ItemsFooter
          currentPage={currentPage}
          currentQuantity={currentQuantity}
          changeCurrentQuantity={this.changeCurrentQuantity}
          changeCurrentPage={this.changeCurrentPage}
          quantityPages={quantityPages}
        />
      </div>
    );
  }
}

export const AllItems = connect(mapStateToProps, actionCreators)(Items);
