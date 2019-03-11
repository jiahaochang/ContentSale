import React, { Component } from 'react';
import { connect } from 'dva';
import { Table, Divider, InputNumber, Button, message } from 'antd';

export class ShoppingCartContent extends Component {
  componentDidMount() {
    this.queryContent();
  }

  queryContent = () => {
    this.props.dispatch({
      type: 'shoppingCartList/getContent',
    });
  };

  onChange = (value) => {
    console.log('changed', value);
  };

  buy = () => {
    this.props.dispatch({
      type: 'shoppingCartList/buy',
    }).then((res) => {
      // console.log(res);
      if (res.code===200){
        message.success('购买成功');
        this.props.handleShowBill();
      }else {
        message.error('购买失败');
      }
    });

  };

  columns = [
    {
      title: '内容名称',
      dataIndex: 'title',
    },
    {
      title: '购买数量',
      dataIndex: 'count',
      render: (text,record) => <InputNumber min={1} onChange={this.onChange} value={record.count} />
    },
    {
      title: '购买单价',
      dataIndex: 'price',
    },
    {
      title: '总价格',
      dataIndex: 'totalPrice'
    },
  ];

  render() {
    const { shoppingCartContent = [], total=0 } = this.props;
    // console.log('shoppingCartContent');
    // console.log(shoppingCartContent);
    var totalCost = 0;
    //计算总价格
    for ( var i = 0; i <shoppingCartContent.length; i++){
      shoppingCartContent[i].totalPrice = shoppingCartContent[i].count * shoppingCartContent[i].price;
      totalCost += shoppingCartContent[i].totalPrice;
    }

    return (
      <div>
        <Divider orientation="left">已经添加到购物车的内容</Divider>
        <Table
          columns={this.columns}
          dataSource={shoppingCartContent}
          rowKey="id"
          pagination={false}
          footer={() => '总计:¥'+totalCost}
        />

        <Button type={"primary"} onClick={this.buy}>购买</Button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  // console.log('state');
  // console.log(state);
  return {
    shoppingCartContent: state.shoppingCartList.shoppingCartContent,
  };
}

export default connect(mapStateToProps)(ShoppingCartContent);

// TODO replace antd Card with own Card.
