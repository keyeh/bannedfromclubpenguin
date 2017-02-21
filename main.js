const opn = require('opn')
const write = require('fs-writefile-promise')

const MailListener = require("mail-listener2")
const webdriver = require('selenium-webdriver')
const {By, until, Key } = webdriver
const driver = new webdriver.Builder().forBrowser('firefox').build()

const solveCaptcha = require('./solveCaptcha')
const createPenguin = require('./createPenguin')


const penguinAccount = {
	name: Math.random().toString(36).slice(16),
	pass: Math.random().toString(36).slice(16),
	email: Math.random().toString(36).slice(16)+'@xxxxxxxxxxx.com',
}

const mailListener = new MailListener({
  username: "xxxxx@xxxxxxxxxxx.com",
  password: "xxxxxxxx",
  host: "xxxxxxx.com",
  port: 993, // imap port
  tls: true,
  fetchUnreadOnStart: false
});


mailListener.on("server:connected", function(){
  console.log("IMAP connected");
});

mailListener.on("server:disconnected", function(){
  console.error("IMAP disconnected");
});
mailListener.on("error", function(err){
  console.log("IMAP Error", err);
});

console.log("Connecting to IMAP...")
mailListener.start();

write('penguin.txt', `[penguin]\nname=${penguinAccount.name}\npass=${penguinAccount.pass}`)
.then(() => driver.get('https://secured.clubpenguin.com/penguin/create'))
.then(() => {
	opn('openGameTab.ahk')
})
.then(() => driver.executeScript(solveCaptcha))
.then((captchaAnswer) => {
	console.info('Solved captcha, the answer is index ' + captchaAnswer)
	console.info('Creating penguin via async XHR...')
	return driver.executeAsyncScript(createPenguin, captchaAnswer, penguinAccount)
})
.then((response) => {
	if (response.status !== 200) {
		return Promise.reject(Error('Failed to create account, expected 200, got: '+response.status))
	}
	console.info('=== Penguin Created! ===')
	console.info('Name:  ', penguinAccount.name)
	console.info('Email: ', penguinAccount.email)
	console.info('Pass:  ', penguinAccount.pass)
	console.info('========================')
	return response
})
.then(() => {
	console.log("Navigate to activation step 1...")
	driver.navigate().to("https://secured.clubpenguin.com/penguin/activate/")
	driver.findElement(By.id('edit-name')).sendKeys(penguinAccount.name)
	// driver.findElement(By.id('edit-name')).sendKeys('Nm6wqzlrf6r') // this line for debug
	driver.findElement(By.id('edit-captcha-response')).click()
	console.log("Waiting for activation email...")
})



mailListener.on("mail", (mail, seqno, attributes) => {
  if (mail.subject !== "Activate your child's Club Penguin Account") {
  	console.info("Email is not a clubpenguin activation email:", mail.subject)
  	return
  };
  mailListener.stop()
  console.log("Got activation email!")
  console.log("regexing activation code")
  const regexResult = mail.text.match(/this activation code: (.*)/)
  
  if (!regexResult) {
  	console.error("Couldn't find activation code in email!")
  	return
  }
  
  const activationCode = regexResult[1]
  console.info("Got activation code:", activationCode);

  // driver.findElement(By.id('edit-activationcode')).sendKeys('27FA2824') //this line for debugging only
  driver.findElement(By.id('edit-activationcode')).sendKeys(activationCode)
  .then(() => {
  	console.info('Waiting for human to solve CAPTCHA...')

		return new Promise((resolve, reject) => {
			const intervalRef = setInterval(() => {
				driver.findElement(By.id('edit-captcha-response')).getAttribute('value')
				.then((captchaFieldValue) => {
					if (captchaFieldValue.length === 5) {
						console.info("Done waiting for human!")
						clearInterval(intervalRef)
						resolve()
						return
					}
				})
			}, 100) //every 100ms
		})
	})
	.then(() => {
		console.info('Navigate to activation step 2...')
		driver.findElement(By.id('edit-next')).click()
		// wait for page to load
		return driver.wait(until.elementLocated(By.id('standard-chat')), 60000)
	})
	.then(() => {
		driver.wait(() => {
			// Wait again for jquery lol someone refactor this pls
			return driver.executeScript("return typeof jQuery").then(function(jQueryType) {
				return jQueryType !== 'undefined'
			});
		}, 10000);
	})
	.then(() => {
    driver.executeScript("jQuery('#edit-terms')[0].checked = true");
    driver.executeScript("jQuery('#edit-privacy')[0].checked = true");
    driver.executeScript("jQuery('#penguin-activate').submit()");
    console.info('Submitted activation.')
	})
	// Can play the game now...
	.then(() => {
		opn(`playGame.ahk`)
	})
})
