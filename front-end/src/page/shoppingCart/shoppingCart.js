import React, {Component} from 'react';
import {connect} from 'dva';
import {Table, Divider, InputNumber, Button, message, Modal} from 'antd';

export class ShoppingCartContent extends Component {

  state = {
    countList: [],
    deleteConfirmVisible: false,
    buyConfirmVisible: false,
    currentProduct:{},
  };

  componentDidMount() {
    this.queryContent();
    /*var shoppingCartContent = this.props.shoppingCartContent;
    var counts=[];
    for (var i=0; i<shoppingCartContent.length; i++){
      counts[shoppingCartContent[i].id] = shoppingCartContent[i].count;
    }
    console.log(counts);
    this.setState({
      countList: counts,
    });*/
  }

  queryContent = () => {
    this.props.dispatch({
      type: 'shoppingCartList/getContent',
    });
  };

  onChange = (value, record) => {
    var data={};
    data.id=record.id;
    data.count=value;

    this.props.dispatch({
      type: 'shoppingCartList/changeProductNumInshoppingCart',
      payload: data,
    }).then((res) => {
      if (res.code === 200) {
        message.success('更改数量成功');
        //this.props.handleShowBill();
      } else {
        message.error('更改数量失败');
      }
    });

  };

  buy = () => {
    this.props.dispatch({
      type: 'shoppingCartList/buy',
    }).then((res) => {
      // console.log(res);
      if (res.code === 200) {
        //给出购买成功的提示
        message.success('购买成功');
        //关闭购买确认提示框
        this.setState({
          buyConfirmVisible: false,
        });
        //跳转到账单页面
        this.props.handleShowBill();
      } else {
        message.error('购买失败');
      }
    });

  };

  deleteProduct=(record)=>{
    console.log(record);
    this.setState({
      currentProduct: record,
      deleteConfirmVisible: true,
    })
  };

  handleCancel=()=>{
    this.setState({
      deleteConfirmVisible: false,
    });
  };

  clickToBuy=()=>{
    this.setState({
      buyConfirmVisible: true,
    })
  };

  handleBuyCancel=()=>{
    this.setState({
      buyConfirmVisible: false,
    });
  };

  handleBuyOk=()=>{
    this.buy();

  };

  handleDeleteOk=()=>{
    // console.log(this.state.currentProduct);
    this.props.dispatch({
      type: 'shoppingCartList/deleteProductFromShoppingCart',
      payload: this.state.currentProduct.id,
    }).then((res) => {
      // console.log(res);
      if (res.code === 200) {
        message.success('从购物车中删除商品成功！');
        this.queryContent();
      } else {
        message.error('从购物车中删除商品失败');
      }
      this.setState({
        deleteConfirmVisible: false,
      });
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
      render: (text, record) =>
        <InputNumber
          min={1}
          max={10}
          onChange={(value)=>{this.onChange(value,record)}}
          defaultValue={text}
        />
    },
    {
      title: '购买单价',
      dataIndex: 'price',
    },
    {
      title: '总价格',
      dataIndex: 'totalPrice'
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <a href="javascript:void(0);" onClick={()=>{this.deleteProduct(record)}}>Delete</a>
        </span>
      ),
    }
  ];

  render() {
    const {shoppingCartContent = []} = this.props;
    // console.log('shoppingCartContent');
    // console.log(shoppingCartContent);
    var totalCost = 0;
    //计算总价格
    for (var i = 0; i < shoppingCartContent.length; i++) {
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
          footer={() => '总计:¥' + totalCost}
        />

        <Button type={"primary"} onClick={this.clickToBuy}>购买</Button>

        <Modal
          title="提示"
          visible={this.state.deleteConfirmVisible}
          onOk={this.handleDeleteOk}
          onCancel={this.handleCancel}
          width={300}
        >
          <p>确认删除此商品吗？</p>
          <p><b>{this.state.currentProduct.title}</b></p>
        </Modal>

        <Modal
          title="提示"
          visible={this.state.buyConfirmVisible}
          onOk={this.handleBuyOk}
          onCancel={this.handleBuyCancel}
          width={300}
        >
          <p>确认购买购物车中的商品吗？</p>
        </Modal>

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
