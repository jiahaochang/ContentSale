import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Select, Radio, Button, Upload, Icon, Row, Col, Divider, Input } from 'antd';

const { Option } = Select;

export class ReleaseProduct extends Component {
  state = {
    uploadMethod: 1,
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
      }
    });
  }

  normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }

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
            {getFieldDecorator('标题', {
              rules: [{ required: true, message: '请输入标题!'}],
            })(<Input placeholder="2-80个字符"/>)}
          </Form.Item>

          <Form.Item
            {...formItemLayout}
            label="摘要"
          >
            {getFieldDecorator('摘要', {
              rules: [{ required: true, message: '请输入摘要!'}],
            })(<Input placeholder="2-140个字符"/>)}
          </Form.Item>

          <Form.Item
            {...formItemLayout}
            label="Radio.Group"
          >
            {getFieldDecorator('radio-group')(
              <Radio.Group onChange={this.onChange} defaultValue={1}>
                <Radio value={1}>图片地址</Radio>
                <Radio value={2}>本地上传</Radio>
              </Radio.Group>
            )}
          </Form.Item>

          {
            this.state.uploadMethod === 2 &&
            <Form.Item
              {...formItemLayout}
              label="Upload"
              extra="longgggggggggggggggggggggggggggggggggg"
            >
              {getFieldDecorator('upload', {
                valuePropName: 'fileList',
                getValueFromEvent: this.normFile,
              })(
                <Upload name="logo" action="/upload.do" listType="picture">
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
              {getFieldDecorator('图片地址', {
                rules: [{ required: true, message: '请输入图片地址!'}],
              })(<Input placeholder="图片地址"/>)}
            </Form.Item>
          }

          <Form.Item
            {...formItemLayout}
            label="Dragger"
          >
            <div className="dropbox">
              {getFieldDecorator('dragger', {
                valuePropName: 'fileList',
                getValueFromEvent: this.normFile,
              })(
                <Upload.Dragger name="files" action="/upload.do">
                  <p className="ant-upload-drag-icon">
                    <Icon type="inbox" />
                  </p>
                  <p className="ant-upload-text">Click or drag file to this area to upload</p>
                  <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                </Upload.Dragger>
              )}
            </div>
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

