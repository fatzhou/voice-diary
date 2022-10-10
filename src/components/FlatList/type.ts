export interface FlatListProps {
  listItemRender: (data: any) => JSX.Element;
  dataSourceApi: (params: any) => Promise<any>;
  emptyTitle?: string;
  onError?: (error: any) => void;
  getQueryParams?: (state: State<T>) => any;
  responseAdaptor?: (response: any) => AnchorResponse<any>;
}

export interface AnchorResponse<T> {
  list: T[];
  lastId?: number | string;
}

export enum Actions {
  RequestPending,
  RequestSuccess,
  RequestFailed,
  Refresh,
}

export interface Action<T = any> {
  type: T;
  payload?: any;
}

export interface State<T> {
  lastId: number | string;
  loading: boolean;
  refresh: boolean;
  hasMore: boolean;
  dataSource: T[];
}
