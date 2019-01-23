import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Row, Col, Divider } from 'antd';

export class CardsPage2 extends Component {
  componentDidMount() {
    this.getDetailInfo(this.props.detailId)
  }

  getDetailInfo = (id) => {
    console.log(id);
    this.props.dispatch({
      type: 'details/getDetail',
      payload: id,
    })
  };

  render() {
    const { detailId } = this.props;
    console.log(detailId);
    //this.getDetailInfo(detailId);

    return (
      <div style={{padding: '30px'}}>
        <Row gutter={16}>
          <Col span={8}>
            <Card
              hoverable
              key={1}
              title={this.props.detail.title}
              cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
              style={{ width: 220, marginBottom: '16px' }}
            >介绍内容</Card>
          </Col>
        </Row>

        <div>
          <Divider type="horizontal" orientation="left">详细信息</Divider>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo.
          </p>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log('state');
  console.log(state.details.detail);
  return {
    detail: state.details.detail,
  };
}

export default connect(mapStateToProps)(CardsPage2);

// TODO replace antd Card with own Card.
