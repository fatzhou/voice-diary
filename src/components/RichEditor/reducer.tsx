import React from 'react';
import {Dispatch} from 'react';

export interface Action<T = any> {
  type: T;
  payload?: any;
}

export const initialState: {
  richHTML: any;
  contentStyle: any;
  disabled: boolean;
  editorFocus: boolean;
  emojiVisible: boolean;
} = {
  richHTML: '',
  contentStyle: {},
  disabled: false,
  editorFocus: false,
  emojiVisible: false,
};

// 定义action
export enum Actions {
  UpdateHtml,
  UpdateEditorFocus,
  UpdateEmojiVisible,
  UpdateContentStyle,
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
    case Actions.UpdateHtml:
      return {
        ...state,
        richHTML: payload,
      };
    case Actions.UpdateEditorFocus:
      return {
        ...state,
        editorFocus: payload,
      };
    case Actions.UpdateEmojiVisible:
      return {
        ...state,
        emojiVisible: payload,
      };
    case Actions.UpdateContentStyle:
      return {
        ...state,
        contentStyle: payload,
      };
    default:
      return state;
  }
};
