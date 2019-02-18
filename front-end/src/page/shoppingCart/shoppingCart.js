import React, { Component } from 'react';
import { connect } from 'dva';
import { Table, Divider, InputNumber, Button } from 'antd';

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

  columns = [
    {
      title: '内容名称',
      dataIndex: 'name',
    },
    {
      title: '购买数量',
      dataIndex: 'count',
      render: (text) => <InputNumber min={1} onChange={this.onChange} defaultValue={text} />
    },
    {
      title: '购买单价',
      dataIndex: 'unitPrice',
    },
  ];

  render() {
    const { shoppingCartContent = [] } = this.props;
    console.log('shoppingCartContent');
    console.log(shoppingCartContent);

    return (
      <div>
        <Divider orientation="left">已经添加到购物车的内容</Divider>
        <Table columns={this.columns} dataSource={shoppingCartContent}  rowKey="id" />
        <Button type={"primary"}>购买</Button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log('state');
  console.log(state);
  return {
    shoppingCartContent: state.shoppingCartList.shoppingCartContent,
  };
}

export default connect(mapStateToProps)(ShoppingCartContent);

// TODO replace antd Card with own Card.
