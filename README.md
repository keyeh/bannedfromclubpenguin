# bannedfromclubpenguin


### [Current record for this tool is 29.1s (video)](https://www.youtube.com/watch?v=OALbVKuJm60)
**Requires:**

 * Autohotkey (could rewrite these scripts, they doesn't do much)
 * NodeJS
 * Firefox/Selenium
 * Email server (with catch-all and local if possible)

## What it do 
**t+0 to t+3 seconds:**
Create new penguin - Get CSRF tokens, break the captcha, randomly generate name, email, password, and submit everything to the server.
Open new tab with the game at the login screen.

**t+4 seconds:**
Navigate to activation page, fill in the penguin name. 

**t+4 to t+13 seconds:**
Human manually solves the captcha while waiting for activation email to arrive.

**t+13 seconds:**
Got an email, read it, extract the activation code, fill it in the form and submit. Wait for next page.

**t+14:**
Blink and you'll miss it. Accepts the terms of use/privacy policy and submits the form.

**t+14 to end:**
Same as human, just faster.

## Setup
It's very unfinished

 * Clone repo
 * `npm install`
 * In main.js
   * Edit `mailListener` with your email server
   * Edit `penguinAccount.email` with the email to sign up with. Just change the domain if you are using a catch-all address.
 * Edit `playGame.ahk`, it's using hardcoded coords so it probably won't work on your system.

## Usage
 * `npm start`
 * Wait
 * Fill in the captcha, don't press enter.
 * Wait until account is activated
 * `playGame.ahk` is run automatically, but you may need to trigger it with `x` hotkey manually
 * Enjoy your ban

## Contributing
Please do, I'll accept pretty much any PR just keep it clean-ish

## Todo
* Refactor
* Tests
* Multiple tabs
* Don't use Autohotkey
* Programatically activate account
* Browserless sign up and activation
* Local email server in Node?


## License
Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)