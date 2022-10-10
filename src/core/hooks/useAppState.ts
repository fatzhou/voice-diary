import {useCallback, useEffect, useRef} from 'react';
import {AppState, AppStateStatus} from 'react-native';

export default (fn?: () => void) => {
  const appState = useRef(AppState.currentState);

  const _handleAppStateChange = useCallback(
    (nextAppState: AppStateStatus) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('App has come to the foreground app!');
        if (appState.current.match(/background/)) {
          fn && fn();
        }
      } else {
        console.log('App has come to the background app!');
      }

      appState.current = nextAppState;
      console.log('AppState app.tsx', appState.current);
    },
    [fn],
  );

  useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
    };
  }, [_handleAppStateChange]);
};
