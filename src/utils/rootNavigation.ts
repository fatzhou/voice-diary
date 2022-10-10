import * as React from 'react';
import {CommonActions} from '@react-navigation/native';
import {PageName} from '../types/page.d';
/**
 * @description 为避免不可预知的影响，在无法使用this.props.navigation时，优先不推荐使用 useNavigation;
 * @description 使用时可直接导入，可考虑进行全局导入，进行优化;
 */

export const isReadyRef: any = React.createRef();

export const navigationRef: any = React.createRef();

export function navigate(name: PageName, params?: any) {
  if (isReadyRef.current && navigationRef.current) {
    // Perform navigation if the app has mounted
    navigationRef.current.navigate(name, params);
  } else {
    // ignore this
  }
}

export function navigateWithAction(
  params: any,
  type: 'navigate' | 'changeParams' = 'changeParams',
) {
  switch (type) {
    case 'changeParams':
      navigationRef.current?.dispatch({
        ...CommonActions.setParams(params),
      });
      break;
    case 'navigate':
      navigationRef.current?.dispatch(CommonActions.navigate(params));
      break;
    default:
      break;
  }
}
