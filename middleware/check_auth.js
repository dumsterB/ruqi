export default async function ({ route, redirect, app }) {
  if (!window.localStorage.getItem('ruqi_auth_data') && route.name !== 'signin'
    && route.name !== 'auth-signup-executor'
    && route.name !== 'auth-signin-executor'
    && route.name !== 'auth-signup-executor-steps'
    && route.name !== 'auth-signin-executor-recover'
    && route.name !== 'auth-signin-executor-login'
    && route.name !== 'auth-signin-executor-recover-phone'
    && route.name !== 'auth-signin-executor-recover-sms'
    && route.name !== 'auth-signin-executor-recover-password'
    && route.name !== 'auth-signin-super-manager'
    && route.name !== 'auth-signin-super-manager-recover-email'
    && route.name !== 'auth-signin-super-manager-recover-sms'
    && route.name !== 'auth-signin-super-manager-recover-password') {
    return redirect('/signin');
  }
  else if (route.name === 'signin' && window.localStorage.getItem('ruqi_auth_data')) {
    app.$auth.setToken();
    await app.store.dispatch('user/fetchUser');

    return redirect('/');
  }
  else if (window.localStorage.getItem('ruqi_auth_data')) {
    app.$auth.setToken();
    await app.store.dispatch('user/fetchUser');
  }
}
