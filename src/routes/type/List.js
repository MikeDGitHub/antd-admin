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
      title: '名称',
      dataIndex: 'typeName',
      key: 'typeName',
      render: (text, record) => <Link to={`type/${record.typeId}`}>{text}</Link>,
    }, 
    {
      title: '创建人',
      dataIndex: 'create',
      key: 'create',
    },
    {
      title: '创建时间',
      dataIndex: 'createDate',
      key: 'createDate',
    }, 
    {
      title: '修改人',
      dataIndex: 'modify',
      key: 'modify',
    },  
    {
      title: '修改时间',
      dataIndex: 'modifyDate',
      key: 'modifyDate',
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
      rowKey={record => record.typeId}
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
