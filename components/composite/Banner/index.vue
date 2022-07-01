<template lang="pug">
  .rq-ui-banners
    .rq-ui-banner-show(v-for="(banner, index) in banners" :key="index")
      .rq-ui-banner(v-show="index == currentBanner").mt-8
        .rq-ui-banner__logo
          img(:src="banner.image" alt="")
        a(:href="banner.link").rq-ui-banner__body
          .rq-ui-banner__title.mb-4 {{ banner.title }}
          .rq-ui-banner__description {{ banner.description }}
          .rq-ui-banner__link.mt-4 {{ banner.link }}
        .rq-ui-banner__actions(@click="nextBanner(banner.slug)")
          svg.rq-ui-banner__actions-close(
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          )
            path(
              d="M8.40994 6.99994L12.7099 2.70994C12.8982 2.52164 13.004 2.26624 13.004 1.99994C13.004 1.73364 12.8982 1.47825 12.7099 1.28994C12.5216 1.10164 12.2662 0.99585 11.9999 0.99585C11.7336 0.99585 11.4782 1.10164 11.2899 1.28994L6.99994 5.58994L2.70994 1.28994C2.52164 1.10164 2.26624 0.99585 1.99994 0.99585C1.73364 0.99585 1.47824 1.10164 1.28994 1.28994C1.10164 1.47825 0.995847 1.73364 0.995847 1.99994C0.995847 2.26624 1.10164 2.52164 1.28994 2.70994L5.58994 6.99994L1.28994 11.2899C1.19621 11.3829 1.12182 11.4935 1.07105 11.6154C1.02028 11.7372 0.994141 11.8679 0.994141 11.9999C0.994141 12.132 1.02028 12.2627 1.07105 12.3845C1.12182 12.5064 1.19621 12.617 1.28994 12.7099C1.3829 12.8037 1.4935 12.8781 1.61536 12.9288C1.73722 12.9796 1.86793 13.0057 1.99994 13.0057C2.13195 13.0057 2.26266 12.9796 2.38452 12.9288C2.50638 12.8781 2.61698 12.8037 2.70994 12.7099L6.99994 8.40994L11.2899 12.7099C11.3829 12.8037 11.4935 12.8781 11.6154 12.9288C11.7372 12.9796 11.8679 13.0057 11.9999 13.0057C12.132 13.0057 12.2627 12.9796 12.3845 12.9288C12.5064 12.8781 12.617 12.8037 12.7099 12.7099C12.8037 12.617 12.8781 12.5064 12.9288 12.3845C12.9796 12.2627 13.0057 12.132 13.0057 11.9999C13.0057 11.8679 12.9796 11.7372 12.9288 11.6154C12.8781 11.4935 12.8037 11.3829 12.7099 11.2899L8.40994 6.99994Z"
              fill="#263043"
            )

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
      position: absolute;
      right: 22px;
      top: 22px;
      cursor: pointer;
    }
  }
}

</style>
