# bannedfromclubpenguin


### Current record for this tool is 29.1s
Requires:

 * Windows
 * NodeJS
 * Autohotkey
 * Firefox/Selenium
 * Email server (with catch-all and local if possible)


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