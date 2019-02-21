import React, { Component } from 'react';
import { connect } from 'dva';
import { Form, Select, Radio, Button, Upload, Icon, Row, Col, Divider, Input } from 'antd';

const { Option } = Select;

export class ReleaseProduct extends Component {
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
              <Radio.Group>
                <Radio value="a">item 1</Radio>
                <Radio value="b">item 2</Radio>
                <Radio value="c">item 3</Radio>
              </Radio.Group>
            )}
          </Form.Item>

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

