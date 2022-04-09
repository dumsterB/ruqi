export const state = () => ({
  breadcrumbs: [],
})

export const getters = {
  breadcrumbs(state) {
    return state.breadcrumbs;
  },
}


export const actions = {
}

export const mutations = {
  setBreadcrumbs(state, fullPath) {

    console.log('fullPath ---- ', fullPath)

    const params_r = fullPath.startsWith('/')
      ? fullPath.substring(1).split('/')
      : fullPath.split('/');

    const crumbs = [];

    let path = '';

    params_r.forEach((param, index) => {
      path = `${path}/${param}`;
      console.log('path ---', path)
      const match = this.$router.match(path);

      let title = match.meta.title;
      if (match.name !== null) {
        crumbs.push({
          text: title,
          href: match.path
        })
      }

       if(match.path.includes('edit') || match.path.includes('timesheet')){
         crumbs[index - 1].text = match.meta.pre_title;
       }

    })

    state.breadcrumbs = crumbs;
  },

}

