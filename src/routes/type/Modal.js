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
        <FormItem label="名称" hasFeedback {...formItemLayout}>
          {getFieldDecorator('typeName', {
            initialValue: item.typeName,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input />)}
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
            <Radio value>启用</Radio>
            <Radio value={false}>禁用</Radio>
          </Radio.Group>)}
        </FormItem>
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
