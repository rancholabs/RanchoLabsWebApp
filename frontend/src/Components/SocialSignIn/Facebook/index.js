const FacebookSignIn = (btn, action, dispatch) => {
  window.fbAsyncInit = function() {
    window.FB.init({
      appId      : '2740677982813116',
      cookie     : true,
      xfbml      : true,
      version    : 'v8.0'
    });
      
    window.FB.AppEvents.logPageView();   
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));

   const fbLogin = () => {
    window.FB.login(function(response) {
        if (response.authResponse) {
           window.FB.api('/me', {fields: 'email,first_name,last_name,picture'}, function(info) {
                const email = info.email
                const token = response.authResponse.accessToken
                console.log(email, token)
                //auth token + email
                //send data - token and email
                dispatch(action(email, token))
          });   
            } else {
           //user cancelled login or did not grant authorization
         }
     }, {scope:'email,user_about_me', return_scopes: true}); 
  }

   btn.addEventListener('click', fbLogin)

   return () => {
    btn.removeEventListener('click', fbLogin)
   }
}

  export {FacebookSignIn}