import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import styles from './index.less'
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
const Detail = ({ typeDetail }) => {
  const { data } = typeDetail
  const content = []

 return (<Form layout="horizontal">
      <FormItem label="名称" hasFeedback {...formItemLayout}>
        {(<Input value={String(data.typeName)}  />)}
      </FormItem>
      
      <FormItem label="状态" hasFeedback {...formItemLayout}>
          {(<Radio.Group disabled>
            <Radio value>启用</Radio>
            <Radio value={false}>禁用</Radio>
          </Radio.Group>)}
        </FormItem>
        <button className="ant-btn ant-btn-primary" >修改</button>
    </Form >)
    
  }

Detail.propTypes = {
  typeDetail: PropTypes.object,
}

export default connect(({ typeDetail, loading }) => ({ typeDetail, loading: loading.models.typeDetail }))(Detail)
