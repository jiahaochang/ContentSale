import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Icon, Input, Button, Row, Col, message } from 'antd';
import md5 from 'md5'

export class NormalLoginForm extends Component {

  componentWillUnmount(){
    this.setState = (state,callback)=>{
      return;
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      values.password = md5(values.password);
      if (!err) {
        // console.log('Received values of form: ', values);

        this.props.dispatch({
          type: 'loginStatus/loginIn',
          payload:  values,
        }).then((res) => {
          // console.log(res.code);

          if (res.code===200){
            //提示登录成功
            message.success('登录成功！');
            //检查登录状态
            this.props.checkLoginStatus();
            //不显示登录页面
            //this.props.doNotShowLoginPage();
            //返回主页
            this.props.handleShowIndexPage();
          }else {
            message.error('账号或密码错误，登录失败！');
          }

        });


      }
    });
  };

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
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="seller或buyer" />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="relles或reyub" />
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
  // console.log('loginPage state');
  // console.log(state);
  return {

  };
}

export default connect(mapStateToProps)(Form.create()(NormalLoginForm));
