import React, { useEffect } from 'react';
import { Table, Button } from 'antd';
import type { Dispatch } from 'umi';
import { connect } from 'umi';
import type { StateType } from './model';
import { PageContainer } from '_@ant-design_pro-layout@6.17.0@@ant-design/pro-layout';
import { DevListItem } from './data.d';
import { ColumnProps } from '_antd@4.15.2@antd/lib/table';

type DevManagementProps = {
  dispatch: Dispatch;
  devManagement: StateType;
};

// const handleAdd = async(fields: DevListItem) => {

// }

const DevList: React.FC<DevManagementProps> = ({ dispatch, devManagement: { devList } }) => {
  useEffect(() => {
    console.log('init');
    dispatch({
      type: 'devManagement/fetch',
    });
  }, []);
  const columns: ColumnProps<DevListItem>[] = [
    {
      title: 'IP',
      dataIndex: 'ip',
    },
    {
      title: '端口',
      dataIndex: 'port',
    },
    {
      title: '用户名',
      dataIndex: 'username',
    },
    {
      title: '密码',
      dataIndex: 'password',
    },
    {
      title: '地址',
      dataIndex: 'onvifAddress',
    },
  ];

  return (
    <PageContainer>
      <Table<DevListItem> columns={columns} dataSource={devList} />
      <Button type="primary">Primary Button</Button>
    </PageContainer>
  );
};

// export default connect(({ devManagement }: { devManagement: ModelType }) => ({
//   data: devManagement.step,
// }))(DevList);
// export default connect()

// export default connect(({ devManagement }: { devManagement: StateType }) => ({
//   list: devManagement.devList,
// }))(DevList);
export default connect(({ devManagement }: { devManagement: StateType }) => ({
  devManagement,
}))(DevList);
