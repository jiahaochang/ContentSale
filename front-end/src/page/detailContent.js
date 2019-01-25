import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Row, Col, Divider, InputNumber } from 'antd';

export class CardsPage2 extends Component {
  componentDidMount() {
    // console.log(this.props.detailId);
    // this.getDetailInfo(this.props.detailId)
  }

  componentWillMount() {
    console.log(this.props.detailId);
    this.getDetailInfo(this.props.detailId)
  }

  getDetailInfo = (id) => {
    console.log(id);
    this.props.dispatch({
      type: 'details/getDetail',
      payload: id,
    })
  };

  onChange = (value) => {
    console.log('changed', value);
  };

  render() {
    const { detail={} } = this.props;

    return (
      <div style={{padding: '30px'}}>
        <Row gutter={16}>
          <Col span={8}>
            <Card
              hoverable
              key={1}
              title={detail.title}
              cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
              style={{ width: 220, marginBottom: '16px' }}
            >{detail.content}</Card>
          </Col>
          <Col span={8}>
            <div style={{padding: '30px', margin: 'auto'}}>
              <h3>{detail.title}</h3>
              <h3>¥:{detail.price}</h3>
              <h3>购买数量:<InputNumber min={1} max={10} onChange={this.onChange} /></h3>
            </div>
          </Col>
        </Row>

        <div>
          <Divider type="horizontal" orientation="left">详细信息</Divider>
          <p>
            {detail.intro}
          </p>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log('state');
  console.log(state.details.data);
  return {
    detail: state.details.data,
  };
}

export default connect(mapStateToProps)(CardsPage2);

// TODO replace antd Card with own Card.
