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
const Detail = ({ userDetail }) => {
  const { data } = userDetail
  const content = []

  let disabled=true;
  if (data !== null) {
    console.log(data);
     if(data.logoImageUrl===null||data.logoImageUrl==='')
     {
       data.logoImageUrl='/logo.svg';
     }
 return (<Form layout="horizontal">
      <FormItem label="用户名" hasFeedback {...formItemLayout}>
        {(<Input value={String(data.userName)} disabled />)}
      </FormItem>
      <FormItem label="登录名" hasFeedback {...formItemLayout}>
        {(<Input value={String(data.loginName)} disabled />)}
      </FormItem>
      <FormItem label="状态" hasFeedback {...formItemLayout}>
          {(<Radio.Group disabled>
            <Radio value>启用</Radio>
            <Radio value={false}>禁用</Radio>
          </Radio.Group>)}
        </FormItem>
      <FormItem label="E-mail" hasFeedback {...formItemLayout}>
        {(<Input value={String(data.phoneNumber)} disabled />)}
      </FormItem>
      <FormItem label="Phone" hasFeedback {...formItemLayout}>
        {(<Input value={String(data.userEmail)} disabled />)}
      </FormItem>
      <FormItem label="头像" hasFeedback {...formItemLayout}>
        {(<img  src={String(data.logoImageUrl)} style={{width:100}}/>)}
      </FormItem>
      <FormItem label="原始密码" hasFeedback {...formItemLayout}>
          {(<Input id='oldPwd' type="password"  placeholder="Password" disabled={disabled}/>)}
        </FormItem>
        <FormItem label="新密码" hasFeedback {...formItemLayout}>
          {(<Input id='newPwd' type="password"  placeholder="Password" disabled={disabled}/>)}
        </FormItem>
        <button className="ant-btn ant-btn-primary" >修改</button>
        <input className="ant-btn" type="submit" value="Submit" disabled/>
    </Form >)
    
  }
  // for (let key in data) {
  //   console.log(key);
  //   if ({}.hasOwnProperty.call(data, key)) {
  //     // content.push(<div key={key} className={styles.item}>
  //     //   <div>{key}</div>
  //     //   <div>{String(data[key])}</div>
  //     // </div>)
  //     content.push(<div key={key} class='ant-form-item'>
  //     <label class="col-5">{key}</label>
  //     <div class="col-12">
  //     <input class="ant-input" type="text" value={String(data[key])} disabled/>
  //     </div>
  //     </div>)
  //   }
  // }
  // return (<div className="content-inner">
  //   <div className={styles.content}>
  //     {content}
  //   </div>
  // </div>)
}

Detail.propTypes = {
  userDetail: PropTypes.object,
}

export default connect(({ userDetail, loading }) => ({ userDetail, loading: loading.models.userDetail }))(Detail)
