import React, {Component} from 'react';
import {connect} from 'dva';
import {Form, Radio, Button, Upload, Icon, Row, Col, Divider, Input, Card, message, Spin} from 'antd';

const RadioGroup = Radio.Group;
const {TextArea} = Input;

export class EditProduct extends React.Component {
  state = {
    uploadMethod: 1,
    pictureUrl: "",
    loading: false,
  };

  componentWillMount() {
    // console.log(this.props.detailId);
    //console.log("详情组件里的登录状态"+this.props.loginStatus);
    this.getDetailInfo(this.props.detailId)
  }

  getDetailInfo = (id) => {
    console.log(id);
    this.props.dispatch({
      type: 'details/getDetail',
      payload: id,
    })
  };

  inputPictureUrl = (e) => {
    console.log(e.target.value);
    this.setState({
      pictureUrl: e.target.value,
    });
  };

  onChange = (e) => {
    console.log('radio checked', e.target.value);
    this.setState({
      uploadMethod: e.target.value,
    });
  };


  handleSave = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values.id = this.props.detailId;
        console.log('Received values of form: ', values);
        this.setState({loading: true});

        //如果是通过远程url方式上传
        if (this.state.uploadMethod == 1) {
          console.log(values);
          this.props.dispatch({
            type: 'release/saveModifiedProductByImgUrl',
            payload: values,
          }).then((res) => {

            this.setState({loading: false});

            if (res.code == 200) {
              message.success("修改商品信息成功");
              this.props.handleShowDetail(this.props.detailId);
            } else {
              message.error(res.message);
            }

          });

        }

        //如果是通过点击上传本地图片的方式
        if (this.state.uploadMethod == 2) {

          this.props.dispatch({
            type: 'release/saveModifiedProduct',
            payload: values,
          }).then((res) => {
            this.setState({loading: false});
            if (res.code == 200) {
              message.success("修改商品信息成功");
              this.props.handleShowDetail(this.props.detailId);
            } else {
              message.error(res.message);
            }
          });
        }


      }
    });


  };

  normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  render() {

    const {getFieldDecorator} = this.props.form;
    const formItemLayout = {
      labelCol: {span: 6},
      wrapperCol: {span: 14},
    };

    const { detail={} } = this.props;
    // console.log(detail);

    return (
      <div style={{padding: '30px'}}>

        <div>
          <Divider type="horizontal" orientation="left">内容编辑</Divider>
        </div>
        <Spin spinning={this.state.loading}>

          <Form onSubmit={this.handleSave}>

            <Form.Item
              {...formItemLayout}
              label="标题"
            >
              {getFieldDecorator('title', {
                rules: [{required: true, message: '请输入标题!'}],
                initialValue: detail.title,
              })(<Input placeholder="2-80个字符"/>)}
            </Form.Item>

            <Form.Item
              {...formItemLayout}
              label="摘要"
            >
              {getFieldDecorator('summary', {
                rules: [{required: true, message: '请输入摘要!'}],
                initialValue: detail.summary,
              })(<Input placeholder="2-140个字符"/>)}
            </Form.Item>

            <Form.Item
              {...formItemLayout}
              label="图片"
            >
              <RadioGroup name="uploadType" defaultValue={1} onChange={this.onChange}>
                <Radio value={1}>图片地址</Radio>
                <Radio value={2}>本地上传</Radio>
              </RadioGroup>
            </Form.Item>

            {
              this.state.uploadMethod === 2 &&
              <Form.Item
                {...formItemLayout}
                label="Upload"
                extra="上传图片"
              >
                {getFieldDecorator('upload', {
                  valuePropName: 'fileList',
                  getValueFromEvent: this.normFile,
                  rules: [{required: true, message: '请上传图片!'}]
                })(
                  <Upload name="logo" action="/upload.do" listType="picture" accept=".png,.gif,.jpg,.jpeg">
                    <Button>
                      <Icon type="upload"/> Click to upload
                    </Button>
                  </Upload>
                )}
              </Form.Item>
            }
            {
              this.state.uploadMethod === 1 &&
              <Form.Item
                {...formItemLayout}
                label="图片地址"
              >
                {getFieldDecorator('picUrl', {
                  rules: [{required: true, message: '请输入图片地址!'}],
                })(
                  <Input placeholder="图片地址" onChange={this.inputPictureUrl}/>
                )}
              </Form.Item>
            }
            {
              this.state.uploadMethod === 1 &&
              <Form.Item
                {...formItemLayout}
                label="图片预览"
              >
                <Card
                  hoverable
                  style={{width: 100, height: 100}}
                  cover={<img alt="图片预览" src={this.state.pictureUrl}/>}
                >
                </Card>

              </Form.Item>
            }

            <Form.Item
              {...formItemLayout}
              label="正文"
            >
              {getFieldDecorator('text', {
                rules: [{required: true, message: '请输入正文!'}],
                initialValue: detail.text,
              })(<TextArea rows={4} placeholder="2-500个字符"/>)}
            </Form.Item>

            <Form.Item
              {...formItemLayout}
              label="价格"
            >
              {getFieldDecorator('price', {
                rules: [{required: true, message: '请输入价格!'}],
                initialValue: detail.price,
              })(<Input placeholder="数字" style={{width: '30%'}}/>)}元
            </Form.Item>

            <Form.Item
              wrapperCol={{span: 12, offset: 6}}
            >
              <Button type="primary" htmlType="submit">保存</Button>
            </Form.Item>
          </Form>

        </Spin>

        <Row gutter={16}>
          <Col span={8}>

          </Col>
        </Row>


      </div>
    );
  }
}

function mapStateToProps(state) {
  // console.log('state');
  // console.log(state.details.data);
  return {
    detail: state.details.data,
  };
}

export default connect(mapStateToProps)(Form.create()(EditProduct));

// TODO replace antd Card with own Card.

