<template lang="pug">
  .rq-ui-banners-wrapper
    .rq-ui-banners.rq-ui-banners--desktop
      .rq-ui-banner-show(v-for="(banner, index) in banners" :key="index")
        .rq-ui-banner(v-show="index == currentBanner").mt-8
          .rq-ui-banner__logo
            img(:src="banner.image" alt="")
          a(:href="banner.link").rq-ui-banner__body
            .rq-ui-banner__title.mb-4 {{ banner.title }}
            .rq-ui-banner__description {{ banner.description }}
            .rq-ui-banner__link.mt-4 {{ banner.link }}
          .rq-ui-banner__actions(@click="nextBanner(banner.slug)")
            v-icon.rq-ui-banner__actions-close(color="#263043") mdi-close

    .rq-ui-banners.rq-ui-banners--mobile
      .rq-ui-banner-show(v-for="(banner, index) in banners" :key="index")
        .rq-ui-banner(v-show="index == currentBanner").mt-8
          .rq-ui-banner__title.mb-4 {{ banner.title }}
          a(:href="banner.link").rq-ui-banner__body
            .rq-ui-banner__logo
              img(:src="banner.image" alt="")
            .rq-ui-banner__body--mobile
              .rq-ui-banner__description {{ banner.description }}
              .rq-ui-banner__link.mt-4 {{ banner.link }}
          .rq-ui-banner__actions(@click="nextBanner(banner.slug)")
            v-icon.rq-ui-banner__actions-close(color="#263043") mdi-close

</template>

<script>
export default {
  components: {},

  props: {
    banners: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      isShow: true,
      currentBanner: 0
    }
  },
  computed: {
    user() {
      return this.$store.getters["user/user"];
    },
  },

  watch: {
    banners: function () {
      for (let i = this.currentBanner; i < this.banners.length; i++) {

        //localStorage.removeItem('banner_' + this.banners[i].slug);

        if (this.isShownBanner(this.banners[i].slug)) {
          this.currentBanner += 1;
        } else {
          return;
        }
      }
    },
  },

  methods: {
    nextBanner(slug) {

      this.setWithExpiry(slug);

      for (let i = this.currentBanner; i < this.banners.length; i++) {
        if (this.isShownBanner(this.banners[i].slug)) {
          this.currentBanner += 1;
          return;
        }
      }
    },

    setWithExpiry(slug) {
      const date = new Date();
      date.setDate(date.getDate() + 1);

      const item = {
        expiry: date,
      };

      localStorage.setItem('banner_' + slug, JSON.stringify(item))
    },

    isShownBanner(slug) {
      let bannerLocal = localStorage.getItem('banner_' + slug),
        banner = JSON.parse(bannerLocal);

      let current_date = new Date().toISOString();

      if (bannerLocal) {
        if (current_date > banner.expiry) {
          localStorage.removeItem('banner_' + slug);
          return false;
        } else {
          return true;
        }
      } else {
        return false;
      }
    }
  },

  created() {

  },
  mounted() {

  },
}
</script>

<style lang="scss">

.rq-ui-banners {

  &--desktop {
    display: block;
  }

  &--mobile {
    display: none;
  }

  .rq-ui-banner {
    display: flex;
    min-height: 154px;
    background: linear-gradient(98.57deg, rgba(0, 130, 222, 0.28) -61.29%, rgba(157, 255, 30, 0.28) 100%);
    border-radius: 14px;
    line-height: 1.25;
    position: relative;

    .rq-ui-banner__logo {
      display: flex;
      align-items: flex-end;
      min-width: 180px;
      justify-content: center;
    }

    .rq-ui-banner__body {
      padding: 16px;
      max-width: 590px;
      color: #263043;
      text-decoration: none;

      .rq-ui-banner__title {
        font-weight: 700;
        font-size: 22px;
      }

      .rq-ui-banner__description {
        font-weight: 400;
        font-size: 16px;
        line-height: 1.3;
      }

      .rq-ui-banner__link {
        text-decoration: none;
        color: #0082DE;

      }
    }

    .rq-ui-banner__actions {
      font-size: 20px;
      position: absolute;
      right: 20px;
      top: 20px;
      cursor: pointer;
    }
  }

  @media screen and (max-width: 768px) {
    &--desktop {
      display: none;
    }

    &--mobile {
      display: block;
      margin: 16px;
    }

    .rq-ui-banner {
      display: block;
      padding: 16px;

      .rq-ui-banner__title {
        font-size: 16px;
        font-weight: 700;
      }

      .rq-ui-banner__body {
        padding: 0;
        color: #263043;
        display: flex;

        .rq-ui-banner__logo {
          min-width: 90px;
          align-items: center;
          margin-right: 8px;

          img {
            max-width: 100%;
          }
        }

        .rq-ui-banner__description {
          font-size: 14px;
        }

      }

      .rq-ui-banner__actions {
        right: 11px;
        top: 11px;
      }

    }


  }

}


</style>
