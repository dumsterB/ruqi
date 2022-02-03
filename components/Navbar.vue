<template>
  <nav>
    <Logo/>
    <div class="main-nav">
      <ul>
        <li v-for="(item, index) in items"
            :key="index">
          <nuxt-link active-class="active" class="nav-link" :to="item.link">
            <img :src="item.img" :alt="item.title">
            <span>{{ item.title }}</span>
          </nuxt-link>
        </li>
      </ul>
    </div>
  </nav>

</template>

<script>
  export default {
    data: () => ({
      showMenu: true,
      items: [
        {title: 'Заявки', link: '/request', img: '/img/ico_app.svg'},
        {title: 'Сотрудники', link: '/employees', img: '/img/ico_employees.svg'},
        {title: 'Исполнители', link: '/performers', img: '/img/ico_performers.svg'},
        {title: 'Клиенты', link: '/clients', img: '/img/ico_clients.svg'},
        {title: 'Объекты', link: '/objects', img: '/img/ico_objects.svg'},
        {title: 'Финансы', link: '/finance', img: '/img/ico_finance.svg'},
        {title: 'Обращения', link: '/appeal', img: '/img/ico_appeal.svg'},
        {title: 'Уведомления', link: '/notification', img: '/img/ico_notifications.svg'},
      ],
    }),
    computed: {},
    methods: {}
  }
</script>

<style lang="scss">
  @import '/assets/scss/colors.scss';

  .main-nav {

    margin-top: 64px;

    ul {
      display: flex;
      flex-direction: column;
      margin: 0;
      padding: 0;
    }

    li {
      list-style: none;
      padding: 12px 10px;

      a {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        color: #fff;
        font-size: 12px;
        line-height: 1.25;
        opacity: 0.5;

        img{
          width: 24px;
          margin-bottom: 4px;
        }
      }

      a.active{
        opacity: 1;
      }
    }
  }

</style>
