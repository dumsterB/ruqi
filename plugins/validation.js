export default ( { app }, inject ) => {
  inject(
    'validation',

    {
      requiredField : v => v?.length || 'Данное поле является обязательным к заполненнию',

      phoneFormat : ( value ) => {
        const pattern = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;

        return pattern.test( value ) || 'Телефон введён некорректно';
      },

      emailFormat : ( email ) => {
        const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Zа-яё\-0-9]+\.)+[a-zA-Zа-яё]{2,}))$/;

        return !!regexp.test( email ) || 'Email введён некорректно';
      }
    }
  );
}
