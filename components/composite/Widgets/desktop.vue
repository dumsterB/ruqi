<template lang="pug">
  v-row(class="mt-5" no-gutters)
    v-col
      v-row(class="mt-5" no-gutters)
        v-col(v-for="widget of widgets" v-if="widget.closable === true || widget.visibility === false" class="mt-2 mb-2"  cols="3" :key="widget.id")
           div()
             v-card(class="pa-3 pl-3 mr-1 info-card" elevation="0" dark  v-if="widget.slug == 'tasks' || widget.slug == 'finance' ")
               v-avatar.avatar
                v-icon(color="#0082DE" v-if="widget.slug === 'finance'") mdi-wallet-outline
                v-icon(color="#0082DE" v-else) mdi-flag-outline
               p.desc {{widget.title}}
               p.price-text {{widget.description}}
             v-card(class="card pa-3 pl-3 mr-1" width="280" v-if="widget.slug !== 'tasks' && widget.slug !== 'finance'  "    max-width="280"  )
               div(style="display:flex;justify-content:space-between")
                 v-avatar.avatar
                   v-icon(style="background:#FFC400" dark v-if="widget.slug === 'docs'") mdi-alert-octagon-outline
                   v-icon(style="background:#EB4D3D" dark v-if="widget.slug === 'signature' || widget.slug === 'contract'") mdi-alert-octagon-outline
                 div
                 .rq-ptestl-card__actions
                   v-menu(
                     bottom
                     rounded="10"
                     offset-y
                     nudge-bottom="10"
                     left
                   )
                     template(v-slot:activator="{ on }")
                       v-btn(icon v-on="on")
                         v-icon mdi-dots-horizontal

                     v-card
                       v-list-item-content.justify-start
                         .mx-auto.text-left
                           .actions
                             .action
                               .action-item.pl-3.pr-3(style="cursor:pointer" @click="closeHandler(widget)")  Закрыть
               p.desc {{widget.title}}
               a(style="text-decoration:none") {{widget.link}}
</template>

<script>
export default {
  name: "desktop",
  props: {
    widgets: {},
  },
  data() {
    return {};
  },
  methods: {
    closeHandler(widget) {
      widget.closable = false;
      this.$forceUpdate();
    },
  },
  mounted() {
  },
  computed: {

  },
};
</script>

<style scoped>
.icon_card_wrapper {
  background: #ffc400;
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
.card_icon {
  width: 50px;
  height: 50px;
}
.card {
  background: #f5fbff !important;
  border: 1px solid #d5dee8 !important;
  box-shadow: 0px 4px 24px rgba(0, 10, 17, 0.04) !important;
  border-radius: 14px !important;
  height: 175px;
}
.info-card {
  background: #f5fbff;
  border: 1px solid #d5dee8;
  box-shadow: 0px 4px 24px rgba(0, 10, 17, 0.04);
  border-radius: 14px;
  width: 280px;
  height: 175px;
}
.price-text {
  font-style: normal;
  font-weight: 400;
  font-size: 36px;
  line-height: 50%;
  margin-top: 30px;
  color: black;
  font-weight: 600;
}
.avatar {
  height: 40px;
  min-width: 40px;
  width: 40px;
  background: #e5efff;
}
.desc {
  color: #000000;
  font-weight: 600;
  margin-top: 10px;
}
</style>
