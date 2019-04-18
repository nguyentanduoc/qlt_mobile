import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Form, Input, Icon, List} from "antd";
import {search, searchProductOfBranch, setBranch} from '../../redux/actions/searchAction'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {library} from '@fortawesome/fontawesome-svg-core'
import {faStroopwafel, faMotorcycle} from '@fortawesome/free-solid-svg-icons'

library.add(faStroopwafel, faMotorcycle);

class SearchComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    }
  }

  onChange = (e) => {
    const value = e.target.value;
    this.props.onSearch(value);
    this.setState({isLoading: true})
  };
  onClickProduct = (product) => {
    this.props.onSearchProductOfBranch({
      product,
      coordinate: this.props.currentCoordinateReducer.currentCoordinate
    });
  };
  gotoMap = async (branch) => {
    await this.props.onSetBranch(branch);
    this.props.history.push("/map");
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {branches} = this.props.searchReducer;
    if (branches.length > 0 && this.state.isLoading) {
      this.setState({isLoading: false});
    }
  }

  render() {
    const {products, branches} = this.props.searchReducer;
    return (
      <Form>
        <Input
          placeholder="Nhập tên thuốc"
          suffix={<Icon type={this.state.isLoading ? 'loading' : 'search'} style={{color: 'rgba(0,0,0,.45)'}}/>}
          onChange={this.onChange}
        />
        <div className={'idea-search'} style={{display: products.length < 0 || !this.state.isLoading ? 'none': 'block'}}>
          {products.length > 0 && products.map((product, key) => {
            return (
              <div key={key} onClick={this.onClickProduct.bind(this, product)}>
                {product.label}
              </div>
            )
          })}
        </div>
        <div style={{display: branches.length < 0 ? 'none' : 'block', paddingLeft: 5, paddingRight: 5}}>
          {branches.length > 0 &&
          (<List
            itemLayout="horizontal"
            dataSource={branches}
            renderItem={item => (
              <List.Item
                onClick={this.gotoMap.bind(this, item)}
                actions={[<div>{item.distance}{' km '}<FontAwesomeIcon icon="motorcycle"/></div>]}>
                <List.Item.Meta
                  title={item.shop.nameShop}
                  description={'Chi Nhánh: ' + item.name}
                />
                Địa chỉ: {item.address}
              </List.Item>
            )}
          />)}
        </div>
      </Form>
    );
  }
}

function mapStateToProps(state) {
  return {
    searchReducer: state.searchReducer,
    currentCoordinateReducer: state.currentCoordinateReducer
  };
}

const dispatchToProp = (dispatch) => ({
  onSearch: (value) => dispatch(search(value)),
  onSearchProductOfBranch: (productAndCurrentLocation) => dispatch(searchProductOfBranch(productAndCurrentLocation)),
  onSetBranch: (branch) => dispatch(setBranch(branch))
});

const FormSearch = Form.create()(SearchComponent);
export default connect(
  mapStateToProps, dispatchToProp
)(FormSearch);