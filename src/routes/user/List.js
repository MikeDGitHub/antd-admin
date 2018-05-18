import React from 'react'
import PropTypes from 'prop-types'
import { Table, Modal } from 'antd'
import classnames from 'classnames'
import { DropOption } from 'components'
import { Link } from 'react-router-dom'
import queryString from 'query-string'
import AnimTableBody from 'components/DataTable/AnimTableBody'
import styles from './List.less'

const { confirm } = Modal

const List = ({
  onDeleteItem, onEditItem, isMotion, location, ...tableProps
}) => {
  location.query = queryString.parse(location.search)
  const handleMenuClick = (record, e) => {
    if (e.key === '1') {
      onEditItem(record)
    } else if (e.key === '2') {
      confirm({
        title: 'Are you sure delete this record?',
        onOk() {
          onDeleteItem(record.id)
        },
      })
    }
  }

  const columns = [
    {
      title: '用户名',
      dataIndex: 'userName',
      key: 'userName',
      render: (text, record) => <Link to={`user/${record.userId}`}>{text}</Link>,
    }, 
    {
      title: '登录名',
      dataIndex: 'loginName',
      key: 'loginName',
    },
    // {
    //   title: 'NickName',
    //   dataIndex: 'nickName',
    //   key: 'nickName',
    // }, 
    // {
    //   title: 'Age',
    //   dataIndex: 'age',
    //   key: 'age',
    // }, 
    // {
    //   title: 'Gender',
    //   dataIndex: 'isMale',
    //   key: 'isMale',
    //   render: text => (<span>{text
    //     ? 'Male'
    //     : 'Female'}</span>),
    // }, 
    {
      title: '手机',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    }, 
    {
      title: 'Email',
      dataIndex: 'userEmail',
      key: 'userEmail',
    }, 
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: text => (<span>{text===0
        ? '禁用'
        : '启用'}</span>),
    }
    // {
    //   title: 'Address',
    //   dataIndex: 'address',
    //   key: 'address',
    // }, 
    // {
    //   title: 'CreateTime',
    //   dataIndex: 'createTime',
    //   key: 'createTime',
    // }, 
    // {
    //   title: 'Operation',
    //   key: 'operation',
    //   width: 100,
    //   render: (text, record) => {
    //     return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: 'Update' }, { key: '2', name: 'Delete' }]} />
    //   },
    // },
  ]

  const AnimateBody = (props) => {
    return <AnimTableBody {...props} />
  }

  const CommonBody = (props) => {
    return <tbody {...props} />
  }

  return (
    <Table
      {...tableProps}
      className={classnames(styles.table, { [styles.motion]: isMotion })}
      bordered
      //scroll={{ x: 1250 }}
      columns={columns}
      simple
      rowKey={record => record.userId}
      components={{
        body: { wrapper: isMotion ? AnimateBody : CommonBody },
      }}
    />
  )
}

List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  isMotion: PropTypes.bool,
  location: PropTypes.object,
}

export default List
