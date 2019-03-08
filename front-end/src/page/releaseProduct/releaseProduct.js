import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Select, Radio, Button, Upload, Icon, Row, Col, Divider, Input, Card, message } from 'antd';

const RadioGroup = Radio.Group;
const { TextArea } = Input;

export class ReleaseProduct extends Component {
  state = {
    uploadMethod: 1,
    pictureUrl:""
  };

  inputPictureUrl=(e)=>{
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

  componentDidMount() {
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);

        this.props.dispatch({
          type: 'release/releaseProduct',
          payload:  values,
        }).then((res) => {
          if(res.code==200){
            message.success("发布商品成功");
            this.props.handleShowIndexPage();
          }else {
            message.error(res.message);
          }
        });

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

    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    return (
      <div style={{padding: '30px'}}>

        <div>
          <Divider type="horizontal" orientation="left">内容发布</Divider>
        </div>

        <Form onSubmit={this.handleSubmit}>

          <Form.Item
            {...formItemLayout}
            label="标题"
          >
            {getFieldDecorator('title', {
              rules: [{ required: true, message: '请输入标题!'}],
            })(<Input placeholder="2-80个字符"/>)}
          </Form.Item>

          <Form.Item
            {...formItemLayout}
            label="摘要"
          >
            {getFieldDecorator('summary', {
              rules: [{ required: true, message: '请输入摘要!'}],
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
              })(
                <Upload name="logo" action="/upload.do" listType="picture" accept=".png,.gif,.jpg,.jpeg">
                  <Button>
                    <Icon type="upload" /> Click to upload
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
                rules: [{ required: true, message: '请输入图片地址!'}],
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
                style={{ width: 100 ,height:100}}
                cover={<img alt="example" src={this.state.pictureUrl} />}
              >
              </Card>

            </Form.Item>
          }

          <Form.Item
            {...formItemLayout}
            label="正文"
          >
            {getFieldDecorator('text', {
              rules: [{ required: true, message: '请输入正文!'}],
            })(<TextArea rows={4} placeholder="2-500个字符"/>)}
          </Form.Item>

          <Form.Item
            {...formItemLayout}
            label="价格"
          >
            {getFieldDecorator('price', {
              rules: [{ required: true, message: '请输入价格!'}],
            })(<Input placeholder="数字" style={{ width: '30%' }}/>)}元
          </Form.Item>

          <Form.Item
            wrapperCol={{ span: 12, offset: 6 }}
          >
            <Button type="primary" htmlType="submit">Submit</Button>
          </Form.Item>
        </Form>



        <Row gutter={16}>
          <Col span={8}>

          </Col>
        </Row>


      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log('state');
  console.log(state);
  return {
    // details: state.detail,
  };
}

export default connect(mapStateToProps)(Form.create()(ReleaseProduct));

// TODO replace antd Card with own Card.

