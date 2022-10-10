import {figureHasMore} from './util';
import {Action, State, Actions} from './type';

export const reducer = (state: State<any>, action: Action) => {
  const {type, payload = {}} = action as any;

  const {list, lastId = 0} = payload;

  switch (type) {
    case Actions.RequestPending:
      return {
        ...state,
        loading: true,
      };
    case Actions.RequestSuccess:
      return {
        ...state,
        dataSource: list,
        lastId: lastId,
        hasMore: figureHasMore(lastId),
        loading: false,
        refresh: false,
      };
    case Actions.RequestFailed:
      return {
        ...state,
        loading: false,
      };
    case Actions.Refresh:
      return {
        ...state,
        lastId: 0,
        refresh: true,
      };
    default:
      return state;
  }
};
