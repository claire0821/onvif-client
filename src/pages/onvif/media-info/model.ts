import {getMediaProfiles, getMediaInfo} from './service'
import type {MediaProfilesItem, MediaInfoDataType} from './data'
import type { Reducer, Effect } from 'umi';

export type StateType = {
    url: string;
    profiles: MediaProfilesItem[]
    info: Partial<MediaInfoDataType>
}

export type ModelType = {
    namespace: string;
    state: StateType;
    effects:  {
      fetchMediaURL: Effect;
      fetchMediaProfiles: Effect;
      fetchMediaInfo: Effect;
    };
    reducers: {
        changeMediaURL: Reducer;
        queryMediaProfiles: Reducer;
        queryMediaInfo: Reducer;
    };
}

const Model: ModelType = {
    namespace: 'mediaInfo',
    state: {
        url: '',
        profiles: [],
        info: {},
    },

    effects: {
        *fetchMediaURL({payload}, {put}) {
            yield put({
                type: 'changeMediaURL',
                payload,
            });
        },
        *fetchMediaProfiles({payload},{call,put}) {
            const response = yield call(getMediaProfiles, payload);
            // 收到成功数据返回data
            if (response.code === 1) {
              yield put({
                type: 'queryMediaProfiles',
                payload: response.data,
              });
            }
        },
        *fetchMediaInfo({payload}, {call,put}) {
            const response = yield call(getMediaInfo, payload);
            // 收到成功数据返回data
            if (response.code === 1) {
              yield put({
                type: 'queryMediaInfo',
                payload: response.data,
              });
            //   const d: Partial<MediaInfoDataType> = response.data
            //   console.log(d)
            }
        }
    },
    reducers: {
        changeMediaURL(state, action) {
            return {
                ...(state as StateType),
                url: action.payload,
              };
        },
        queryMediaProfiles(state, action) {
            return {
                ...(state as StateType),
                profiles: action.payload,
              };
        },
        queryMediaInfo(state, action) {
            return {
                ...(state as StateType),
                info: action.payload,
              };
        }
    }
}

export default Model