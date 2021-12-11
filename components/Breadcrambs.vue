<template>
  <div class="breadcrumbs">
    <router-link class="breadcrumbs-level"
       v-for="(link, i) in breadcrumbsLinks"
      :key="i"
      :to="link">
      {{link.meta.title}}
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'breadcrumbs',
  computed: {
    breadcrumbsLinks () {
      let tmp = []
      if (this.$route.matched) {
        this.$route.matched.forEach(link => {
          tmp.push(Object.assign({meta: {title: 'Title not found in meta'}}, link))
        })
      }
      if (tmp.length === 0) {
        tmp.push({path: '/', meta: {title: 'Home'}})
      }
      return tmp
    }
  },
  created() {
    console.log(this.$route.matched);
  }
}
</script>
