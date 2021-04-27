import { getDevList } from './service';
import type { Reducer, Effect } from 'umi';
import { DevListItem } from './data.d';

export type StateType = {
  devList: DevListItem[]; // Partial<DevListItem>;// 类型转换
};

export type ModelType = {
  namespace: string;
  state: StateType;
  // 异步
  effects: {
    fetch: Effect;
  };
  // 同步
  reducers: {
    queryList: Reducer<StateType>;
  };
};

const Model: ModelType = {
  namespace: 'devManagement',

  state: {
    devList: [],
  },

  effects: {
    // 向后台请求数据
    *fetch({ payload }, { call, put }) {
      console.log('请求数据');
      const response = yield call(getDevList, payload);
      console.log(response);
      // 收到成功数据返回data
      if (response.code === 1) {
        yield put({
          type: 'queryList',
          payload: response.data,
        });
      }
    },
  },

  reducers: {
    queryList(state, action) {
      console.log('reducers');
      console.log(state);
      console.log(action);
      return {
        ...(state as StateType),
        devList: action.payload,
      };
    },
  },
};

export default Model;
