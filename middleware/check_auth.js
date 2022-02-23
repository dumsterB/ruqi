export default function ( { route, redirect, app } )
{
  console.log( 'app', app );
  console.log( 'store', app.store.getters['user/user'] );

  if ( !window.localStorage.getItem( 'ruqi_auth_data' ) && route.name !== 'signin' )
  {
    return redirect( '/signin' );
  }
  else if ( route.name === 'signin' && window.localStorage.getItem( 'ruqi_auth_data' ) )
  {
    app.$auth.setToken();

    return redirect( '/' );
  }
  else if ( window.localStorage.getItem( 'ruqi_auth_data' ) )
  {
    app.$auth.setToken();

  }
}
