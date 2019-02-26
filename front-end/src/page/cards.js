import React, { Component } from 'react';
import { connect } from 'dva';
// import Link from 'umi/link';
import { Card, Icon, message, Row, Col } from 'antd';

const { Meta } = Card;

export class CardsPage extends Component {
  componentDidMount() {
    this.queryList();
  }

  queryList = () => {
    this.props.dispatch({
      type: 'cards/queryList',
    });
  };

  deleteOne = (id) => {
    this.props.dispatch({
      type: 'cards/deleteOne',
      payload: id,
    }).then(() => {
      message.success('delete success, refresh');
      this.queryList();
    });
  };

  getDetailInfo = (id) => {
    console.log(id);
    this.props.dispatch({
      type: 'details/getDetail',
      payload: id,
    })
  };

  render() {
    const { cardsList = [] } = this.props;
    // console.log('cardsList');
    // console.log(cardsList);

    return (
      <div>
        <Row gutter={24}>
        {cardsList.map(v =>
          <Col span={8} key={v.id}>
            <Card
              hoverable
              key={v.id}
              title={v.name}
              cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
              style={{ width: 220, marginBottom: '16px' }}
              extra={<Icon type={'delete'} onClick={() => this.deleteOne(v.id)}/>}
              onClick={()=>this.props.handleShowDetail(v.id)}
            >{v.desc}
              {
                v.purchaseStatus === 'alreadyPurchased' &&
                <Meta
                  description="已购买"
                />
              }
              {
                v.purchaseStatus === 'alreadySold' &&
                <Meta
                  description="已出售"
                />
              }

              </Card>
          </Col>
        )}
        </Row>
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
