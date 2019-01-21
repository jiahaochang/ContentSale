import React from 'react';
import { Button, Form, Input, Card, Row, Col, Divider } from 'antd';
import { connect } from 'dva';
import {CardsPage} from "../cards";

export class Details extends React.Component {
  state = {

  };

  getDetailInfo = (id) => {
    this.props.dispatch({
      type: 'details/getDetail',
      payload: id,
    })
  };

  componentDidMount() {
    //this.getDetailInfo(this.props.id);
  }

  render() {
    const { id } = this.props;
    const { detail } = this.props;
    this.getDetailInfo(id);

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


// export default connect(mapStateToProps)(Detail);

function mapStateToProps(state) {
  console.log('state');
  console.log(state);
  return {
    cardsList: state.detail,
  };
}

export default connect(mapStateToProps)(Details);
