function loadScript(src) {
	return new Promise((resolve) => {
		const script = document.createElement('script')
		script.src = src
		script.onload = () => {
			resolve(true)
		}
		script.onerror = () => {
			resolve(false)
		}
		document.body.appendChild(script)
	})
}

const googleScript = loadScript('https://apis.google.com/js/platform.js')

const GoogleSignIn = (btn, action, dispatch) => {

    const onLoadGoogleCallback = () => {
        const client_id = '462139699296-ugij2j1k8l953om9rko8j2pc2qsjcott'
        window.gapi.load('auth2', () => {
            const auth2 = window.gapi.auth2.init({
                client_id: `${client_id}.apps.googleusercontent.com`,
                cookiepolicy: 'single_host_origin',
                scope: 'profile'
            })
      
            auth2.attachClickHandler(btn, {}, 
                (googleUser) => {
                    //const profile = googleUser.getBasicProfile()
                    const token = googleUser.getAuthResponse().id_token
                    console.log(token)
                    //send data only token - token
                    dispatch(action(token))
                }, 
                (error) => {
                    console.log('Sign-in error', error);
                }
            )
        })
    }
    googleScript
    .then(r => onLoadGoogleCallback())
    .catch(err => console.log('Google err:', err))
}

export {GoogleSignIn}