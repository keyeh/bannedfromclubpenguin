module.exports = (name) => {
	const penguinCaptcha = Drupal.settings.penguin.captcha
	const imageDecodeKeys = {
		'XMAAAAASUVORK5CYII=': 'pizza',
		'IAAAAASUVORK5CYII=': 'igloo',
		'wuWB85cW2c5NQAAAABJRU5ErkJggg==': 'balloon',
		'B0eBprJbn4wXAAAAAElFTkSuQmCC': 'cheese',
		'yat7sdCF61QAAAABJRU5ErkJggg==': 'popcorn',
		'ARRB8J8KQ9t7AAAAAElFTkSuQmCC': 'watermelon'
	}

	const challengeImagesArr = Object.values(penguinCaptcha.images)
	const challengeAnswerName = penguinCaptcha.item_name

	const solveB64 = (b64) => {
		const decodeKeysArr = Object.keys(imageDecodeKeys)
		for (let i = decodeKeysArr.length - 1; i >= 0; i--) {
			if (b64.endsWith(decodeKeysArr[i])) {
				return imageDecodeKeys[decodeKeysArr[i]]
			}
		}
		return false
	}

	for (let i = challengeImagesArr.length - 1; i >= 0; i--) {
		if (solveB64(challengeImagesArr[i]) === challengeAnswerName) {
			return i
		}
	}
	return false
}