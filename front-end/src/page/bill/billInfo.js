import React, { Component } from 'react';
import { connect } from 'dva';
import { Table } from 'antd';
import moment from "moment";

export class Bills extends Component {
  componentDidMount() {
    this.queryBillList();
  }

  queryBillList = () => {
    this.props.dispatch({
      type: 'bills/getBillList',
    });
  };

  showDetailByImageName=(imgName)=>{
    this.props.dispatch({
      type: 'bills/getIdByImageName',
      payload:  imgName,
    }).then((res) => {
      if (res.code===200){
        //console.log(res.result);
        this.props.handleShowDetail(res.result.id);
      }else {

      }

    });
  };

  showDetailByCommodityId=(record)=>{
    this.props.handleShowDetail(record.commodityId);
  };

  columns = [
    {
      title: '内容图片',
      dataIndex: 'imageName',
      render: (text, record) => <img src={text} height="60" width="60" onClick={()=>this.showDetailByCommodityId(record)}/>//这里放后台返回的图片的路径或者整个<img/>
    },
    {
      title: '内容名称',
      dataIndex: 'title',
    },
    {
      title: '购买时间',
      dataIndex: 'buyTime',
      render: (value) => <span>{moment(value).format('YYYY-MM-DD HH:mm:ss')}</span>,
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
    const { billList = []} = this.props;
    // console.log('billList');
    // console.log(billList);
    var total = 0;
    //计算总价格
    for ( var i = 0; i <billList.length; i++){
      // billList[i].totalPrice = billList[i].count * billList[i].price;
      total += billList[i].totalPrice;
    }

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
  // console.log('state');
  //  console.log(state);
  return {
    billList: state.bills.billList,
  };
}

export default connect(mapStateToProps)(Bills);

// TODO replace antd Card with own Card.
