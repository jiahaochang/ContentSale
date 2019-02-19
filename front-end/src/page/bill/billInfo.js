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
      render: (text, record) => <img src={text} width={60} onClick={()=>this.props.handleShowDetail(record.id)}/>//这里放后台返回的图片的路径或者整个<img/>
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
      title: '购买单价',
      dataIndex: 'price',
    },
  ];

  render() {
    const { billList = [], total=0 } = this.props;
    console.log('billList');
    console.log(billList);

    return (
      <div>
        <Table
          columns={this.columns}
          dataSource={billList}
          rowKey={'id'}
          footer={() => '总计:¥'+total}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log('state');
  console.log(state);
  return {
    billList: state.bills.billList,
  };
}

export default connect(mapStateToProps)(Bills);

// TODO replace antd Card with own Card.
