import React, {
  useCallback,
  useRef,
  useEffect,
  useImperativeHandle,
} from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  Text,
  View,
  FlatList as RootFlatList,
} from 'react-native';
import {debounce} from 'lodash';
import {Actions, FlatListProps, State} from './type';
import {reducer} from './reducer';
import images from '../../core/images';
import Empty from '../Empty';
import ItemSeparator from './component/ItemSeparator';
import {styles} from './style';
import {showToast} from '../../utils/native';

export interface Handle {}

const initialState: State<any> = {
  loading: false,
  refresh: false,
  hasMore: false,
  lastId: '0',
  dataSource: [],
};

const identity = <T extends {}>(val: T): T => val;

const defaultGetQueryParams = (state: State<any>) => ({
  lastId: state.lastId,
});

const defaultErrorHandler = (error: Error) => {
  showToast(error.message);
};

const FlatList: React.ForwardRefRenderFunction<Handle, FlatListProps> = (
  {
    listItemRender,
    dataSourceApi,
    getQueryParams = defaultGetQueryParams,
    responseAdaptor = identity,
    onError = defaultErrorHandler,
    emptyTitle = 'No Data',
  }: FlatListProps,
  forwardRef,
) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const listRef = useRef<any>(null);

  const fetchData = useCallback(async () => {
    dispatch({type: Actions.RequestPending});
    try {
      const response = await dataSourceApi(getQueryParams(state));
      dispatch({
        type: Actions.RequestSuccess,
        payload: {
          ...responseAdaptor(response),
        },
      });
    } catch (error) {
      dispatch({type: Actions.RequestFailed});
      onError(error);
    }
  }, [dataSourceApi, getQueryParams, state, responseAdaptor, onError]);

  const handleRefresh = useCallback(() => {
    if (state.loading) {
      return;
    }
    fetchData();
  }, [fetchData, state.loading]);

  const handleLoadMore = useCallback(() => {
    if (state.loading || !state.lastId) {
      return;
    }
    fetchData();
  }, [fetchData, state.lastId, state.loading]);

  const debounceLoadMore = useCallback(
    () => debounce(handleLoadMore, 200),
    [handleLoadMore],
  );

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 组件需要调用内部方法，可扩展
  useImperativeHandle(forwardRef, () => ({}), []);

  const renderFooter = () => {
    if (!state.loading) {
      return null;
    }
    if (!state.hasMore) {
      return (
        <View style={styles.footerPadding}>
          {state.dataSource.length !== 0 && (
            <>
              <View style={styles.footerDivider} />
              <Text>no data</Text>
              <View style={styles.footerDivider} />
            </>
          )}
        </View>
      );
    }
    return (
      <View style={styles.footer}>
        <ActivityIndicator animating size="large" />
        <View style={styles.footerLoading}>
          <Text>has more...</Text>
        </View>
      </View>
    );
  };

  return (
    <>
      {(() => {
        // Loading:state.loading
        // 暂不考虑使用
        if (false) {
          return (
            <View style={styles.contentLoading}>
              <Text>loading ...</Text>
            </View>
          );
        }
        // Content
        return (
          <RootFlatList
            keyExtractor={item => item.id} // 默认id,特殊情况需要扩展
            ref={listRef}
            style={styles.container}
            contentContainerStyle={[styles.contentContainer]}
            data={state.dataSource}
            renderItem={listItemRender}
            initialNumToRender={6}
            windowSize={25} // 防止快速滑动白屏
            onEndReached={debounceLoadMore}
            onEndReachedThreshold={0.25}
            removeClippedSubviews={true}
            ItemSeparatorComponent={() => <ItemSeparator />}
            ListEmptyComponent={
              <View style={styles.listEmpty}>
                <Empty image={images.public.empty} description={emptyTitle} />
              </View>
            }
            ListFooterComponent={renderFooter}
            refreshControl={
              <RefreshControl
                refreshing={state.refresh}
                onRefresh={handleRefresh}
              />
            }
          />
        );
      })()}
    </>
  );
};

export default React.memo(React.forwardRef(FlatList));
