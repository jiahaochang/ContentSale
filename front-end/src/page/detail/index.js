import React from 'react';
import { Button, Form, Input, Card, Row, Col, Divider } from 'antd';
import { connect } from 'dva';

class Detail extends React.Component {
  state = {

  };

  componentDidMount() {
    this.getDetailInfo(1);
  }

  getDetailInfo = (id) => {
    this.props.dispatch({
      type: 'details/getDetail',
      payload: id,
    })
  };

  render() {
    const { visible, statisticVisible, id } = this.state;
    const { detail } = this.props;

    return (
      <div style={{padding: '30px'}}>
        <Row gutter={16}>
          <Col span={8}>
            <Card
              hoverable
              key={1}
              title={"goods"}
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
  const detail = state.details;
  return {
    detail,
  };
}

export default connect(mapStateToProps)(Form.create()(Detail));
