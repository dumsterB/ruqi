<template lang="pug">
.cards( class="mt-8")
  v-row(no-gutters)
    v-col(v-for="widget of widgets" cols="6" class="mt-2 mb-2" :key="widget.id")
      v-card(class="pa-2 pl-3 mr-1 ml-1 info-card" elevation="0" dark v-if="widget.slug == 'tasks' || widget.slug == 'finance' " )
        v-avatar.avatar
          v-icon(dark) mdi-wallet-outline
        p.mt-2 Заработано в мае
        p.price-text 35 000р.
      v-card(class="card pa-2 pl-3 mr-1 ml-1"  v-if="widget.slug !== 'tasks' && widget.slug !== 'finance'")
        v-avatar.avatar
          v-icon(style="background:#FFC400" dark v-if="widget.slug === 'docs'") mdi-alert-octagon-outline
          v-icon(style="background:#EB4D3D" dark v-if="widget.slug === 'signature' || widget.slug === 'contract'") mdi-alert-octagon-outline
        p.desc {{widget.title}}
</template>

<script>
export default {
  props:{
    widgets:{
      type:Array
    }
  },
  name: "mobile"
}
</script>

<style scoped>
.info-card{
  background:#349CE4!important;
  border-radius:14px!important;
}
.price-text{
  font-style: normal;
  font-weight: 400;
  font-size: 36px;
  line-height: 50%;
}
.avatar{
  height: 40px;
  min-width: 40px;
  width: 40px;
  background: #0082DE;
}
.card{
  background:#349CE4!important;
  box-shadow: 0px 4px 24px rgba(0, 10, 17, 0.04)!important;
  border-radius: 14px!important;
  height: 175px;
}
.desc{
  color: white;
  font-weight: 600;
  margin-top: 10px;
}
</style>