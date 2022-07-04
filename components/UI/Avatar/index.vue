<template lang="pug">
v-avatar.ui-avatar(
  :color="avatarBackground"
  :height="height"
  :width="width"
)
  v-icon.ui-avatar__stub(
    :color="avatarLogoBackground"
    v-if="!preview"
    @change="previewImage"
) mdi-camera
  img(:src="preview" height="100" v-if="preview" accept="image/*" )
  input(type="file" accept="image/*" hidden  class="form-control-file" id="my-file" )
</template>

<script>
export default {
  components: {},

  props: {
    logo: {
      type: String,
      default: '',
    },
    theme: {
      type: String,
      default: '',
    },
    height: {
      type: String,
      default: '48px',
    },
    width: {
      type: String,
      default: '48px',
    },
  },
  data: () => ({
    preview: null,
    image: null,
  }),
  computed: {
    avatarBackground() {
      switch (this.theme) {
        case 'blue':
          return '#349CE4';

        default:
          return '#D5DEE8';
      }
    },
    avatarLogoBackground() {
      switch (this.theme) {
        case 'blue':
          return '#2990D7';

        default:
          return '#FFFFFF';
      }
    },
  },

  watch: {},
  methods: {
    previewImage: function(event) {
      var input = event.target;
      if (input.files) {
        var reader = new FileReader();
        reader.onload = (e) => {
          this.preview = e.target.result;
        }
        this.image=input.files[0];
        reader.readAsDataURL(input.files[0]);
      }
    },
    /* GETTERS */
    /* SETTERS */
    /* HANDLERS */
    /* HELPERS */
  },

  created() { },
  mounted() { },
}
</script>

<style lang="scss">
.ui-avatar {}
</style>
