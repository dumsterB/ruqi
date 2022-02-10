import axios from 'axios';

export default ( { app }, inject ) => {
  inject(
    'auth',

    {
      async signin ( payload = {} )
      {
        try
        {
          return await axios.post(
            `https://cdn.ruqi.maxber.ru/api/v1/auth/login`,

            payload
          );
        }
        catch ( err ) {
          console.error( err );
        }
      }
    }
  );
}
