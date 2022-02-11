<template lang="pug">

.emptyAttachment
  .wrapper
    .modal-export__format-content
      input.picture-upload( type="file" id="import_load" tabindex="-1" name="file" ref="file_addedit1" @change="handlers().uploadPicture()" )
      .upload-btn( @click="handlers().uploadFile()" )
        img.add-attachment-logo( src="@/assets/img/addAttachment.svg" )

</template>

<script>

  export default {

    components : {},

    props : {
      doc_uuid : {
        type : String,
        required : true,
      },
    },

    data ()
    {
      return {}
    },

    methods : {
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

            console.log( formData );
            console.log( this.doc_uuid );

            // this.$axios.put(
            //   `/user/documents/${this.doc_uuid}/uploadImage`,

            //   formData,

            //   {
            //     headers : {
            //       'Content-Type'  : 'multipart/form-data'
            //     }
            //   }
            // )
            // .then(
            //   ( response ) => {
            //     console.log( response );
            //   }
            // );
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
