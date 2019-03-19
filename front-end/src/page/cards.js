import React, {Component} from 'react';
import {connect} from 'dva';
// import Link from 'umi/link';
import {Card, Icon, message, Row, Col, Spin, Modal} from 'antd';

const {Meta} = Card;

export class CardsPage extends Component {

  state = {
    loading: false,
    visible: false,
    deleteProductId: 0,
  };

  componentWillMount() {
    this.queryList();
  }

  componentWillUnmount(){
    this.setState = (state,callback)=>{
      return;
    };
  }

  queryList = () => {
    this.props.dispatch({
      type: 'cards/queryList',
    }).then((res) => {
      if (res.code == 200) {
        this.setState({loading: false});
      }
    });
  };

  deleteOne = () => {
    var id = this.state.deleteProductId;
    this.props.dispatch({
      type: 'cards/deleteOne',
      payload: id,
    }).then((res) => {
      if (res.code==200){
        message.success('商品删除成功');
        this.setState({
          visible: false,
        });
      }
      this.queryList();
    });
  };

  /*getDetailInfo = (id) => {
    console.log(id);
    this.props.dispatch({
      type: 'details/getDetail',
      payload: id,
    })
  };*/

  showModal = (id) => {
    this.setState({
      visible: true,
      deleteProductId: id,
    });
  };

  handleCancel = (e) => {
    //console.log(e);
    this.setState({
      visible: false,
    });
  };

  render() {
    const {cardsList = [], loginStatus} = this.props;
    // console.log('cardsList');
    // console.log(loginStatus);

    return (
      <div>
        <Spin spinning={this.state.loading} delay={5000}>
          <Row gutter={24}>
            {cardsList.map(v =>
              <Col span={8} key={v.id}>
                <Card
                  hoverable={true}
                  key={v.id}
                  title={v.title}
                  cover={<img alt="example" src={v.imgUrl} height="220" width="220" onClick={() => this.props.handleShowDetail(v.id)}/>}
                  style={{width: 220, marginBottom: '16px'}}
                  extra={(v.saleStatus === 'notYetSold' && loginStatus === 'sellerLoggedIn')?<Icon type={'delete'} onClick={() => this.showModal(v.id)}/>:''}

                >{v.summary}
                  {
                    v.saleStatus === 'alreadySold' && loginStatus === 'sellerLoggedIn' &&
                    <Meta
                      description={"已出售"+v.count+"件"}
                      title={"¥:" + v.price}
                    />
                  }
                  {
                    //如果是普通用户登录，并且是已经出售状态，则显示已经购买

                    v.saleStatus === 'alreadySold' && loginStatus === 'userLogged' &&
                    <Meta
                    description="已购买"
                    title={"¥:" + v.price}
                    />
                  }
                  {
                    //未出售状态
                    v.saleStatus === 'notYetSold' && (loginStatus === 'userLogged'||loginStatus === 'sellerLoggedIn') &&
                    <Meta
                      description="."
                      title={"¥:" + v.price}
                    />
                  }
                  {
                    loginStatus === 'notLoggedIn' &&
                    <Meta
                      description="."
                      title={"¥:" + v.price}
                    />
                  }
                </Card>
              </Col>
            )}
          </Row>
        </Spin>

        <Modal
          title="提示"
          visible={this.state.visible}
          onOk={this.deleteOne}
          onCancel={this.handleCancel}
          width={300}
        >
          <p>确认删除此商品？</p>
        </Modal>

      </div>
    );
  }
}

function mapStateToProps(state) {
  // console.log('state');
  // console.log(state);
  return {
    cardsList: state.cards.cardsList,
  };
}

export default connect(mapStateToProps)(CardsPage);

// TODO replace antd Card with own Card.
