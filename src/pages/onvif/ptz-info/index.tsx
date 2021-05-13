import React from 'react'
import type { Dispatch } from 'umi';
import { connect } from 'dva';
import type { StateType } from './model';
import type { DevListItem } from '../devices-management/data';
import {Input,Select,Button,Divider} from 'antd';
import { RedoOutlined } from '@ant-design/icons';
import type { MediaProfilesItem } from '../media-info/data';
type PTZInfoProps = {
    dispatch: Dispatch
    ptzInfo: StateType;
    currentDev?: DevListItem
    mediaUrl: string
    ptzUrl: string
    meidaProfiles: MediaProfilesItem[];
}

const mapStateToProps = (state: any) => {
    const namespace = 'devManagement';
    const currentDev = state[namespace].controlDev;
    const namespace1 = 'ptzInfo';
    const ptzInfo = state[namespace1]
    const namespace2 = 'mediaInfo';
    const meidaProfiles = state[namespace2].profiles
    return {
        currentDev,
        ptzInfo,
        meidaProfiles,
    }
}

const PTZPage: React.FC<PTZInfoProps> = (props) => {
    const {
        dispatch,
        ptzInfo, 
        currentDev,
        meidaProfiles,
    } = props

    const handleGetMediaProfile = () => {
        dispatch({
            type: 'mediaInfo/fetchMediaProfiles',
            payload: {ip: currentDev?.ip}
        });
    }
    const filterOptionText = (item: MediaProfilesItem) => {
        const str = `${item.name}(${item.token})`
        return str
    }
    return (
        <div>
            <div>
                <Input addonBefore="Media URL" value={currentDev?.mediaUrl} style={{width: 400}}/>
                <Button type="primary" shape="circle" icon={<RedoOutlined onClick={handleGetMediaProfile}/>} size='middle' />
            </div>
            <div>
            <Select style={{ minWidth: 200 }} >
            {meidaProfiles.map(item => (
            <Select.Option key={item.token} value={item.token}>{filterOptionText(item)}</Select.Option>
            ))}
            </Select>
            </div>
        </div>
    )
}

export default connect(mapStateToProps)(PTZPage)