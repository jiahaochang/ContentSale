import React, { Component } from 'react';
import { connect } from 'dva';
import { Table } from 'antd';

export class Bills extends Component {
  componentDidMount() {
    this.queryBillList();
  }

  queryBillList = () => {
    this.props.dispatch({
      type: 'bills/getBillList',
    });
  };

  columns = [
    {
      title: '内容图片',
      dataIndex: 'contentPicture',
    },
    {
      title: '内容名称',
      dataIndex: 'name',
    },
    {
      title: '购买时间',
      dataIndex: 'buyTime',
    },
    {
      title: '购买数量',
      dataIndex: 'count',
    },
    {
      title: '购买价格',
      dataIndex: 'price',
    },
  ];

  render() {
    const { billList = [] } = this.props;
    console.log('billList');
    console.log(billList);

    return (
      <div>
        <Table columns={this.columns} dataSource={billList}  rowKey="id" />
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log('state');
  console.log(state);
  return {
    billList: state.bills.billList,
    // billLoading: state.loading.effects['bills/getBillList'],
  };
}

export default connect(mapStateToProps)(Bills);

// TODO replace antd Card with own Card.
