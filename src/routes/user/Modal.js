import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal, Cascader } from 'antd'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

const modal = ({
  item = {},
  onOk,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
  ...modalProps
}) => {
  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        key: item.key,
      }
      //data.address = data.address.join(' ')
      onOk(data)
    })
  }

  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }

  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="用户名" hasFeedback {...formItemLayout}>
          {getFieldDecorator('userName', {
            initialValue: item.userName,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="登录名" hasFeedback {...formItemLayout}>
          {getFieldDecorator('loginName', {
            initialValue: item.loginName,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="密码" hasFeedback {...formItemLayout}>
          {getFieldDecorator('password', {
            initialValue: item.password,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input type="password" onPressEnter={handleOk} placeholder="Password" />)}
        </FormItem>
        <FormItem label="状态" hasFeedback {...formItemLayout}>
          {getFieldDecorator('status', {
            initialValue: item.status,
            rules: [
              {
                required: true,
                type: 'boolean',
              },
            ],
          })(<Radio.Group>
            <Radio value={true}>启用</Radio>
            <Radio value={false}>禁用</Radio>
          </Radio.Group>)}
        </FormItem>
        {/* <FormItem label="Age" hasFeedback {...formItemLayout}>
          {getFieldDecorator('age', {
            initialValue: item.age,
            rules: [
              {
                required: true,
                type: 'number',
              },
            ],
          })(<InputNumber min={18} max={100} />)}
        </FormItem> */}
        <FormItem label="Phone" hasFeedback {...formItemLayout}>
          {getFieldDecorator('phone', {
            initialValue: item.phone,
            rules: [
              {
                required: true,
                pattern: /^1[34578]\d{9}$/,
                message: 'The input is not valid phone!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="E-mail" hasFeedback {...formItemLayout}>
          {getFieldDecorator('email', {
            initialValue: item.email,
            rules: [
              {
                required: true,
                pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
                message: 'The input is not valid E-mail!',
              },
            ],
          })(<Input />)}
        </FormItem>
        {/* <FormItem label="Address" hasFeedback {...formItemLayout}>
          {getFieldDecorator('address', {
            initialValue: item.address && item.address.split(' '),
            rules: [
              {
                required: true,
              },
            ],
          })(<Cascader
            style={{ width: '100%' }}
            options={city}
            placeholder="Pick an address"
          />)}
        </FormItem> */}
      </Form>
    </Modal>
  )
}

modal.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default Form.create()(modal)
