# Development Environment Setup Guide

Please read this guide carefully and try to set your development environment accordingly. All members of team should 
have their environments set as similarly as possible. 

See something missing? Please submit pull request with update :)


## IDE & other software 

As IDE of choice, in  Computer Rock we use [Webstorm/Phpstorm](https://www.jetbrains.com/) and you will be provided with 
license for it. You may use any other IDE as long it is set up to output code that respects coding style guides and 
standards used in team.

For IDE code style configuration manuals please check  `./other-docs/` folder in this project. There, you will also find 
`.editorconfig` file from [EditorConfig](http://editorconfig.org/ ) initiative that you may copy to your `Projects` folder. 
While rule set in it is still limited, in the future it may become standard for easy IDE setup.

### Install Homebrew

Homebrew is package manager for OS X. It will allow you to install missing Unix packages you may need during work.

```bash
$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
$ brew install wget # example usage
$ brew list # lists installed packages
``` 

TODO: update with list of packages we install using brew

### Install Xcode

Download and install here: [developer.apple.com/xcode/](https://developer.apple.com/xcode/) or from App Store.

### Other software

You will also need:

* Chrome & Firefox
* Lightshot [app.prntscr.com](https://app.prntscr.com/en/index.html)
* Postman [getpostman.com](https://www.getpostman.com/newhostnamenewhostnamenewhostnamenewhostname)
* Insomnia [insomnia.rest](https://insomnia.rest/)
* iTerm [iterm2.com](https://www.iterm2.com/)
* Charles [charlesproxy.com](https://www.charlesproxy.com/)

Chrome extensions: 

* [LastPass](https://chrome.google.com/webstore/detail/lastpass-free-password-ma/hdokiejnpimakedhajhdlcegeplioahd)
* [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)
* [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en)
* [Node.js inspector manager](https://chrome.google.com/webstore/detail/nodejs-v8-inspector-manag/gnhhdgbaldcilmgcpfddgdbkhjohddkj?hl=en)
* [Awesome Screenshot recorder](https://chrome.google.com/webstore/detail/awesome-screenshot-screen/nlipoenfbbikpbjkfpfillcgkoblgpmj?hl=en)

Firefox extensions:

* [LastPass](https://addons.mozilla.org/en-US/firefox/addon/lastpass-password-manager/)


## Node.js & JavaScript tooling

### Prepare *bash* profile files

```bash
$ touch .profile
$ touch .bash_profile
$ touch .profile
```

In `.bash_profile` and `.profile` insert content:

```bash
[[ -s ~/.bashrc ]] && source ~/.bashrc
```

### Install Node version manager (nvm)

*Node Version Manager* is a simple bash script to manage multiple active node.js versions 
[(website)](https://github.com/creationix/nvm)

To install or update *nvm*, run install script using cURL:

```bash
$ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.5/install.sh | bash
```

The script clones the nvm repository to `~/.nvm` and adds the source line to your bash profile file (`~/.bashrc` ). Make 
sure this content is in file after installation:

```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
```

### Install Node.js & NPM

Installing node and node versions, listing version and switching versions using nvm:

```bash
$ nvm install node
$ nvm ls
$ nvm use node
```

### Install global packages

```bash
$ npm install -g gulp
$ npm install -g create-react-app
$ npm list -g --depth 0 # lists all globally installed packages
```

Note: With nvm, global packages need to be installed per active node version.


## GIT setup

If git is not installed use:
```bash
$ brew install git
```

### Global .gitignore file

Create global `.gitignore` file:
```bash
$ cd ~/
$ nano .gitignore
$ git config --global core.excludesfile ~/.gitignore
```

contents for the file:
```bash
.DS_Store
.idea 
# here you must also define any other config folder used by your IDE
```

### Connecting to Beanstalkapp/GitHub with SSH key

First generate new key or find existing you wish to use:

```bash
$ cd ~/
$ ls -al ~/.ssh # lists files in .ssh directory
$ ssh-keygen -t rsa -b 4096 -C "your_email@example.com" # generates new key
```

Copy public key and add to your profile on Beanstalk/GitHub:
```bash
$ cat ~/.ssh/id_rsa.pub | pbcopy
```

Validating connection:

```bash
$ ssh -T git@spoiledmilk.git.beanstalkapp.com
$ ssh -T git@github.com
```

If note using default name for the key, you will need to add it to the agent

```bash
$ eval "$(ssh-agent -s)"
Agent pid 59566
$ ssh-add -K ~/.ssh/id_rsa_key_name
```

If you're using macOS Sierra 10.12.2 or later, you will need to modify your `~/.ssh/config` file to automatically load 
keys into the ssh-agent and store passphrases in your keychain. Example setup:

```bash
#GitHub
Host github.com
  HostName github.com
  AddKeysToAgent yes
  User git
  IdentityFile ~/.ssh/id_rsa_github
  IdentitiesOnly yes

#Beanstalkapp
Host spoiledmilk.git.beanstalkapp.com
  HostName spoiledmilk.git.beanstalkapp.com
  AddKeysToAgent yes
  User git
  IdentityFile ~/.ssh/id_rsa_beanstalkapp
  IdentitiesOnly yes
```

### Set nano as default editor

```bash
$ git config --global core.editor "nano"
```

### Configure your name and email 

```bash
$ git config --global user.email "you@your.email"
$ git config --global user.name  "Name Surname"
```


## Miscellaneous

### Setting hostname and computer name

```bash
$ sudo scutil --set HostName newhostname
$ sudo scutil --set LocalHostName newhostname
$ sudo scutil --set ComputerName newhostname
$ dscacheutil -flushcache
# restart mac to make permanent
```
