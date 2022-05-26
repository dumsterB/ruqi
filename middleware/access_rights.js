
export default function access_rights ({ route, store, redirect}){

  let user = store.getters['user/user'],
      subroute = false;

  if (Object.keys(user).length != 0){
    user.visibility_sections.forEach(function(item){
      if(route.name && route.name.includes(item)){
        subroute = true;
      }
    })

    if(route.name != 'index'
      && route.name != 'signin'
      && route.name !== 'auth-signup-executor'
      && !(user.visibility_sections.includes(route.name) || subroute)){
      redirect('/');
    }
  }
}
