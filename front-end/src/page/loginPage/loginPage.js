import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Icon, Input, Button, Row, Col } from 'antd';

export class NormalLoginForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Row type="flex" justify="space-around" align="middle">
        <Col span={8}></Col>
        <Col span={8}>
          <Form>
            <Form.Item>
              {getFieldDecorator('userName', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
              )}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button" onClick={this.handleSubmit}>
                登录
              </Button>
            </Form.Item>
          </Form>
        </Col>
        <Col span={8}></Col>
      </Row>

    );
  }
}


function mapStateToProps(state) {
  // console.log('state');
  // console.log(state);
  return {
    //cardsList: state.unpurchased.cardsList,
  };
}

export default connect(mapStateToProps)(Form.create()(NormalLoginForm));
