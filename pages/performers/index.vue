<template>
  <div>
    <div>
      <Header :content="title" :size="title_size" :isnew="false" :isback="false"/>
      <ul v-if="performers.length">
        <div>
          <li v-for="performer in performers" >
            <a href="#" @click.prevent="openPerformer(performer)">
              Исполнитель {{ performer.name }}
            </a>
          </li>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    async fetch({store}) {
      if (store.getters['performers/performers'].length === 0) {
        await store.dispatch('performers/fetch')
      }
    },
    data: () => ({
      title: 'Исполнители',
      title_size: 'big',
    }),
    computed: {
      performers() {
        return this.$store.getters['performers/performers']
      }
    },
    methods: {
      openPerformer(performer){
        this.$router.push('/performers/'+ performer.id);
      }
    }
  }
</script>
