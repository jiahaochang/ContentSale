import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Row, Col, Divider, InputNumber, Button, Modal, message } from 'antd';

export class CardsPage2 extends Component {

  state = {
    visible: false,
    count: 1,
  };

  componentDidMount() {

  }

  componentWillMount() {
    this.getDetailInfo(this.props.detailId);
  }

  getDetailInfo = (id) => {
    // console.log(id);
    this.props.dispatch({
      type: 'details/getDetail',
      payload: id,
    }).then((res) => {
      console.log(res);
    });

    /*this.props.dispatch({
      type: 'details/getOriginPrice',
      payload: id,
    }).then((res) => {

    });*/

  };

  onChange = (value) => {
    console.log('changed', value);
    this.setState({
      count: value
    });
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = (e) => {
    // console.log(e);

    var data = {};
    data.id = this.props.detailId;
    data.count = this.state.count;

    this.props.dispatch({
      type: 'details/addToShoppingCart',
      payload:  data,
    }).then((res) => {
      // console.log(res);
      if (res.code===200){
        //提示登录成功
        message.success('添加购物车成功');
        this.props.handleShowShoppingCart();
      }else {
        message.error('添加购物车失败');
      }

    });

    this.setState({
      visible: false,
    });
  };

  handleCancel = (e) => {
    //console.log(e);
    this.setState({
      visible: false,
    });
  };

  render() {
    const { product={}, loginStatus,originPrice } = this.props;
    //console.log(detail);

    return (
      <div style={{padding: '30px'}}>
        <Row gutter={16}>
          <Col span={8}>
            <Card
              hoverable
              key={1}
              title={product.title}
              cover={<img alt="example" src={product.imgUrl} />}
              style={{ width: 220, marginBottom: '16px' }}
            >{product.summary}</Card>
          </Col>
          <Col span={8}>
            <div style={{padding: '30px', margin: 'auto'}}>
              <h3>{product.title}</h3>
              <h3>¥:{product.price}</h3>
              {
                loginStatus == 'userLogged' && product.saleStatus === 'notYetSold' &&
                <h3>购买数量:<InputNumber min={1} max={10} onChange={this.onChange} value={this.state.count}/></h3>
              }
              {
                loginStatus != 'notLoggedIn' &&
                <h3>
                  {
                    loginStatus == 'sellerLoggedIn' &&
                    <Button type={"primary"} onClick={this.props.handleEditProductPage}>编辑</Button>
                  }
                  {
                    loginStatus == 'userLogged' && product.saleStatus === 'notYetSold' &&
                    <Button type={"primary"} onClick={this.showModal}>加入购物车</Button>
                  }
                  {
                    loginStatus == 'userLogged' && product.saleStatus === 'alreadySold' &&
                    <div>
                      <Button type={"primary"} disabled={true}>已购买</Button>
                      <p>当时购买的价格:¥{originPrice}</p>
                    </div>
                  }
                </h3>
              }

            </div>
          </Col>
        </Row>

        <div>
          <Divider type="horizontal" orientation="left">详细信息</Divider>
          <p>
            {product.text}
          </p>
        </div>

        <Modal
          title="提示"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width={300}
        >
          <p>确认加入购物车吗？</p>
          <p><b>加入购物车的数量：{this.state.count}个</b></p>
          <p><b>加入购物车的商品：{product.title}</b></p>
        </Modal>

      </div>
    );
  }
}

function mapStateToProps(state) {
  // console.log('state');
  // console.log(state);
  return {
    product: state.details.product,
    originPrice: state.details.originPrice,
  };
}

export default connect(mapStateToProps)(CardsPage2);

// TODO replace antd Card with own Card.
