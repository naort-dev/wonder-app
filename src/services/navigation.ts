import { NavigationActions, NavigationParams, NavigationRoute } from 'react-navigation';

let navigatorRef: any;

function setContainer(container: Object) {
  navigatorRef = container;
}

function reset(routeName: string, params?: NavigationParams) {
  navigatorRef.dispatch(
    NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName,
          params,
        }),
      ],
    }),
  );
}

function navigate(routeName: string, params?: NavigationParams) {
  navigatorRef.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    }),
  );
}

function navigateDeep(actions: Array<{ routeName: string, params?: NavigationParams }>) {
  navigatorRef.dispatch(
    actions.reduceRight(
      (prevAction, action): any =>
        NavigationActions.navigate({
          routeName: action.routeName,
          params: action.params,
          action: prevAction,
        }),
      undefined,
    ),
  );
}

function getCurrentRoute(): NavigationRoute | null {
  if (!navigatorRef || !navigatorRef.state.nav) {
    return null;
  }

  return navigatorRef.state.nav.routes[navigatorRef.state.nav.index] || null;
}

export default {
  setContainer,
  navigateDeep,
  navigate,
  reset,
  getCurrentRoute,
};