export default function ( { route, redirect } )
{
  if ( !window.localStorage.getItem( 'ruqi_auth_data' ) && route.name !== 'signin' )
  {
    return redirect( '/signin' );
  }
  else if ( route.name === 'signin' && window.localStorage.getItem( 'ruqi_auth_data' ) )
  {
    return redirect( '/request' );
  }
}
