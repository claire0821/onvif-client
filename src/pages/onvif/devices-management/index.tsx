import React, { useEffect } from 'react';
import { Table, Button, Descriptions } from 'antd';
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
      <Table<DevListItem>
        columns={columns}
        dataSource={devList}
        rowKey="onvifAddress"
        expandable={{
          expandedRowRender: (record) => {
            return (
              <Descriptions title="详细信息">
                <Descriptions.Item label="media">{record.mediaUrl}</Descriptions.Item>
                <Descriptions.Item label="image">{record.imagingUrl}</Descriptions.Item>
                <Descriptions.Item label="event">{record.eventsUrl}</Descriptions.Item>
                <Descriptions.Item label="device">{record.deviceUrl}</Descriptions.Item>
                <Descriptions.Item label="ptz">{record.ptzUrl}</Descriptions.Item>
                <Descriptions.Item label="analytics">{record.analyticsUrl}</Descriptions.Item>
              </Descriptions>
            );
          },
          rowExpandable: (record) =>
            record.mediaUrl.length !== 0 ||
            record.imagingUrl.length !== 0 ||
            record.eventsUrl.length !== 0 ||
            record.deviceUrl.length !== 0 ||
            record.ptzUrl.length !== 0 ||
            record.analyticsUrl.length !== 0,
        }}
      />
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
