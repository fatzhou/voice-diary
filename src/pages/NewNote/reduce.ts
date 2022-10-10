import React from 'react';
import {Dispatch} from 'react';

export interface Action<T = any> {
  type: T;
  payload?: any;
}

interface Content {
  title: string;
  content: any;
}

export const initialState: {
  loading: boolean; // 标识搜索状态
  content: Content; // 存放详情
  readOnlyStatus: boolean; // 标识编辑与只读状态,false 表示编辑状态
  copyContent: Content; // 初始化副本,只存存储，不可更改
} = {
  loading: false,
  content: {} as any,
  readOnlyStatus: false,
  copyContent: {} as any,
};

// 定义action
export enum Actions {
  DetailRequest,
  DetailRequestSuccess,
  DetailRequestFailed,
  UpdateDetail,
  UpdateDetailDone,
  UpdateDetailTitle,
  UpdateDetailContent,
}

export interface ContextType {
  initialValues: any;
  state: typeof initialState;
  dispatch: Dispatch<Action<Actions>>;
  refresh: () => void;
}

export const ContentDetailContext = React.createContext({} as ContextType);

export const reducer = (
  state: typeof initialState,
  action: Action<Actions>,
): typeof initialState => {
  const {type, payload} = action;
  switch (type) {
    case Actions.DetailRequest:
      return {
        ...state,
        loading: true,
      };
    case Actions.DetailRequestSuccess:
      return {
        ...state,
        ...payload,
        loading: false,
      };
    case Actions.DetailRequestFailed:
      return {
        ...state,
        loading: false,
      };
    case Actions.UpdateDetail:
      return {
        ...state,
        loading: true,
        readOnlyStatus: false,
      };
    case Actions.UpdateDetailDone:
      return {
        ...state,
        loading: false,
        readOnlyStatus: true,
      };
    case Actions.UpdateDetailTitle:
      return {
        ...state,
        content: {
          ...state.content,
          title: payload,
        },
      };
    case Actions.UpdateDetailContent:
      return {
        ...state,
        content: {
          ...state.content,
          content: payload,
        },
      };
    default:
      return state;
  }
};
