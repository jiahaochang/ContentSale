import React, {Component} from 'react';
import {connect} from 'dva';
// import Link from 'umi/link';
import {Card, Icon, message, Row, Col, Spin} from 'antd';

const {Meta} = Card;

export class CardsPage extends Component {

  state = {
    loading: false,
  };

  componentDidMount() {
    this.queryList();
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
    const {cardsList = [], loginStatus} = this.props;
    // console.log('cardsList');
    // console.log(cardsList);

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
                  cover={<img alt="example" src={v.imgUrl} height="220" width="220"/>}
                  style={{width: 220, marginBottom: '16px'}}
                  extra={<Icon type={'delete'} onClick={() => this.deleteOne(v.id)}/>}
                  onClick={() => this.props.handleShowDetail(v.id)}
                >{v.summary}
                  {
                    v.saleStatus === 'alreadySold' &&
                    <Meta
                      description="已出售"
                      title={"¥:" + v.price}
                    />
                  }
                  {
                    //未出售状态
                    v.saleStatus === 'notYetSold' &&
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
