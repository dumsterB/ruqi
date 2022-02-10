export default function ( { route, redirect, app } )
{
  console.log( 'app', app );

  if ( !window.localStorage.getItem( 'ruqi_auth_data' ) && route.name !== 'signin' )
  {
    return redirect( '/signin' );
  }
  else if ( route.name === 'signin' && window.localStorage.getItem( 'ruqi_auth_data' ) )
  {
    app.$auth.setToken();

    return redirect( '/request' );
  }
  else
  {
    app.$auth.setToken();
  }
}
