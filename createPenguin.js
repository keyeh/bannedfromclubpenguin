module.exports = (captchaAnswer, { name, email, pass }) => {
    const callback = arguments[arguments.length - 1]; // selenium webdriver injects callback for async

	const formParams = {
		'anon_token': jQuery("input[name='anon_token']")[0].value,
		'color': 15,
		name,
		pass,
		'pass_show': 1,
		email,
		'fx_friends': Drupal.settings.penguin.fx_friends,
		'terms': 1,
		'captcha': captchaAnswer,
		'op': 'Create Your Penguin',
		'form_build_id': jQuery("input[name='form_build_id']")[0].value,
		'form_id': 'penguin_create_form'
	}

	const urlEncodedFormParams = Object.keys(formParams).map((key) => {
	  return encodeURIComponent(key) + '=' + encodeURIComponent(formParams[key]);
	}).join('&');

	// Uncomment this next line to skip account creation
	callback(Promise.resolve({status: 200})) 

	const fetchPromise = fetch("https://secured.clubpenguin.com/penguin/create", {
		method: "POST",
	  	credentials: 'include',
		headers: {
	    	'Content-Type': 'application/x-www-form-urlencoded'
		},
	  body: urlEncodedFormParams
	})

	callback(fetchPromise)
}