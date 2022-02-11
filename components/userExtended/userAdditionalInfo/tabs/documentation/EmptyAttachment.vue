<template lang="pug">

.emptyAttachment
  .wrapper
    .modal-export__format-content
      input.picture-upload( type="file" id="import_load" tabindex="-1" name="file" ref="file_addedit1" @change="handlers().uploadPicture()" )
      .upload-btn( @click="handlers().uploadFile()" )
        img.add-attachment-logo( src="@/assets/img/addAttachment.svg" )

</template>

<script>

  import { mapState, mapActions, mapGetters, mapMutations } from 'vuex';

  export default {

    components : {},

    props : {
      doc_uuid : {
        type : String,
        required : true,
      },

      cntr_uuid : {
        type : String,
        required : true,
      },
    },

    data ()
    {
      return {}
    },

    methods : {

      ...mapActions( 'contractorDocs', [ 'getDocuments', ] ),

      getters ()
      {
        return {}
      },

      setters ()
      {
        return {}
      },

      handlers ()
      {
        return {
          uploadFile : ( payload = {} ) => {
            document.querySelector( '#import_load' ).click();
          },

          uploadPicture : ( payload = {} ) => {
            let formData = new FormData();

            formData.append( 'file', this.$refs.file_addedit1.files[ 0 ] );
            formData.append( 'description', 'text' );

            console.log( 'uploadPicture' );
            console.log( formData );
            console.log( 'this.cntr_uuid', this.cntr_uuid );
            console.log( 'this.doc_uuid', this.doc_uuid );
            console.log( this.$refs );

            this.$axios.put(
              `/dispatcher/contractors/${this.cntr_uuid}/docs/${this.doc_uuid}/uploadImage`,

              formData,

              {
                headers : {
                  'Content-Type'  : 'multipart/form-data'
                }
              }
            )
            .then(
              ( response ) => {
                console.log( response );

                this.getDocuments( this.cntr_uuid );
              }
            );
          },
        }
      },

      helpers ()
      {
        return {}
      },

      init (){},

      bindActions (){},
    }

  }

</script>

<style lang="scss" scoped>

.emptyAttachment
{
  width         : 210px;
  height        : 445px;
  border        : 1.5px dashed #D5DEE8;
  box-sizing    : border-box;
  border-radius : 10px;

  .wrapper
  {
    width           : 100%;
    height          : 100%;
    display         : flex;
    flex-direction  : row;
    flex-wrap       : nowrap;
    align-content   : center;
    justify-content : center;
    align-items     : center;

    .add-attachment-logo
    {
      cursor  : pointer;
    }
  }
}

.picture-upload
{
  display : none;
}

</style>
