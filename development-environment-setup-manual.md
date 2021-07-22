# Development Environment Setup Manual

Please read this guide carefully and try to set your development environment accordingly. All members of team should 
have their environments set as similarly as possible. All installation steps are mandatory unless not applicable to your 
operating system or marked as [optional].

See something missing? Please submit pull request with the update :)


### [macOS] System requirements: Install Xcode & Homebrew

You can download and install Xcode here: [developer.apple.com/xcode/](https://developer.apple.com/xcode/) or from App Store.

Homebrew is package manager for macOS. It will allow you to install missing Unix packages you may need during work. You 
primarily need it for installing Git.

```shell
$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
$ brew install wget # example usage
$ brew list # lists installed packages
``` 

If you have an M1 chip in your computer, you may need to [manually](https://stackoverflow.com/questions/65487249/getting-a-warning-when-installing-homebrew-on-macos-big-sur-m1-chip) add a homebrew PATH:
```shell
$ echo 'eval $(/opt/homebrew/bin/brew shellenv)' >> /Users/yourusename/.zprofile
eval $(/opt/homebrew/bin/brew shellenv) 
```

### [Ubuntu] System requirements: none

You are all set. 


### [Windows 10] System requirements: Install WSL2 & Ubuntu

WSL2 is only available in Windows 10, Version 2004, Build 19041 or higher.

To enable it open PowerShell as administrator and run:

```
PS C:\> Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux
PS C:\> dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
```

This can also be done from "Turn Windows features on or off" application. Options to select are "Virtual Machine Platform" 
and "Windows Subsystem for Linux".

After system restart run:

```
PS C:\> wsl --set-default-version 2
```

It is also recommended to uninstall or convert any existing WSL1 distributions into WSL2. 

In Microsoft store search for Ubuntu (or some other distribution) and install it. Launch the app to finish setup.

Once in Ubuntu, run to update:

```
$ sudo apt update
$ sudo apt -y upgrade
```

#### WSL2 network drive

You may also want to assign drive letter to WSL2 network drive to Ubuntu file system for ease of access. In Windows 
explorer in right side menu right click on `This PC` and select `Map network drive`. Choose drive letter and for 
location type `\\wsl$\Ubuntu` or according to your distribution name.

#### Windows Terminal

*Windows Terminal* can be installed from Microsoft store. Alternatively you may want to use *ConEmu*. Setup tips and download
links are in Miscellaneous section of this document.

#### WSL2/Ubuntu installation troubleshooting

If WSL2 is not getting enabled or Ubuntu installation fails try troubleshooting steps from the official guide 
or linked git thread:

* [Windows Subsystem for Linux Installation Guide for Windows 10](http://aka.ms/wsl2);
* [Virtual hard disk files must be uncompressed and unencrypted and must not be sparse](https://github.com/microsoft/WSL/issues/4103).


## IDE

As IDE of choice, in  Computer Rock we use [IntelliJ](https://www.jetbrains.com/) IDEs for web, Phpstorm/Webstorm and 
you will be provided with license for one those. You may use any other IDE as long it is set up to output code that 
respects coding style guides and standards used in team.

For IDE code style configuration manuals please check `./other-docs/` folder:

* [PhpStorm/Webstorm code style configuration](./other-docs/ide-code-style-configuration-manual-phpstorm-webstorm.md)
* [VSCode code style configuration](./other-docs/ide-code-style-configuration-manual-vscode.md)

In `./other-docs/` folder you will also find `.editorconfig` file from [EditorConfig](http://editorconfig.org/ ) initiative 
which you may copy to your `Projects` folder. While rule set in it is still limited, in the future it may become standard 
for easy IDE setup.

#### [Windows 10] WSL2/Ubuntu and Webstorm/Phpstorm

To have Ubuntu's terminal from WSL as default in Webstorm/Phpstorm go to `Settings > Tools > Terminal` and set `Shell path`
to `wsl.exe`. IntelliJ IDEs automatically use Git from Ubuntu if project is located in wsl network drive.


## Other software

You will also need:

* Chrome & Firefox
* Postman [getpostman.com](https://www.getpostman.com/newhostnamenewhostnamenewhostnamenewhostname)
* Insomnia [insomnia.rest](https://insomnia.rest/)
* Lightshot [app.prntscr.com](https://app.prntscr.com/en/index.html)
* [macOS] iTerm [iterm2.com](https://www.iterm2.com/)
* [Win 10] Windows Terminal [Microsoft Store](https://www.microsoft.com/en-us/p/windows-terminal/9n0dx20hk701)
* [optional] Charles [charlesproxy.com](https://www.charlesproxy.com/)

Browser extensions: 

* [LastPass (Chrome)](https://chrome.google.com/webstore/detail/lastpass-free-password-ma/hdokiejnpimakedhajhdlcegeplioahd)
* [LastPass (Firefox)](https://addons.mozilla.org/en-US/firefox/addon/lastpass-password-manager/)
* [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)
* [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en)
* [Node.js inspector manager](https://chrome.google.com/webstore/detail/nodejs-v8-inspector-manag/gnhhdgbaldcilmgcpfddgdbkhjohddkj?hl=en)
* [Awesome Screenshot recorder](https://chrome.google.com/webstore/detail/awesome-screenshot-screen/nlipoenfbbikpbjkfpfillcgkoblgpmj?hl=en)


## Projects folder

In your home (`~`) folder create new one named `Projects` (macOS) or `projects` (WSL2/Ubuntu). Here you will be 
placing all JavaScript projects. 


## Node.js & JavaScript tooling

### Prepare *bash* profile files

```shell
$ touch .profile
$ touch .bash_profile
$ touch .bashrc # if not present
```

In `.bash_profile` and `.profile` insert content:

```shell
[[ -s ~/.bashrc ]] && source ~/.bashrc
```

### Install Node version manager (nvm), Node.js, npm & global npm packages

*Node Version Manager* is a simple bash script to manage multiple active node.js versions 
[(website)](https://github.com/creationix/nvm) If you have some version of Node.js previously installed via some other 
method (*homebrew*, native installer, etc) uninstall it first.

To install or update *nvm*, run install script using cURL:

```shell
$ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.5/install.sh | bash
```

The script clones the nvm repository to `~/.nvm` and adds the source line to your bash profile file (`~/.bashrc` ). Make 
sure this content is in file after installation:

```shell
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
```

Installing Node: 

```shell
# install latest long term support version of node:
$ nvm install --lts

# to list installed versions type:
$ nvm ls

# to install any other version of node:
$ nvm install vX.X.X
```

On a computer with an M1 chip, you may have a problem installing node.js, if so then do you will need to install node using Rosetta 2:
1. How to open terminal in Rosetta2 mode -> got to Application -> right click on terminal app -> get Info -> Select "Open using Rosetta" -> restart Terminal;
2. In Terminal, write -> `arch -x86_64 zsh`, Now you will be able to install any version of node `nvm install X.X.X`;

It is recommended to install these global packages:

```shell
$ npm install -g http-server nodemon lerna yarn
```

Note: global packages need to be installed for each node version.

```shell
# lists all globally installed packages
$ npm list -g --depth 0 

# to install some new node version and all global packages from existing version you can use:
$ nvm install NodeVersion --reinstall-packages-from=OldNodeVersion

# to use some node version type:
$ nvm use NodeVersion
```

When working on project, you can add `.nvmrc` file in project root for storing node version number with next content:

```
[node version number]
```

Use by calling `nvm use` while in project root.


## GIT setup

macOS:

```shell
$ brew install git
```

WSL2 / Ubuntu:

```shell
$ sudo apt install git-all
```

### Global .gitignore file

Create global `.gitignore` file:

```shell
$ cd ~/
$ nano .gitignore
$ git config --global core.excludesfile ~/.gitignore
```

contents for the file:

```shell
.DS_Store
.idea 
# here you must also define any other config folder used by your IDE
```

### Configure your name and email 

```shell
$ git config --global user.email "you@your.email"
$ git config --global user.name  "Name Surname"
```

### Configure CRLF

Windows and Linux/macOS use different characters to mark line-endings in a file. Windows system uses carriage-return 
character and a linefeed character for newlines in its files (CRLF), while macOS and Linux systems use only the linefeed 
character (LF). Git can handle this for us if we configure `core.autocrlf` correctly. To check current system 
configuration use `git config -l`.

On *Windows 10*, we need Git to auto-convert CRLF line endings into LF when adding them to the index, and vice versa when 
it checks out code onto your filesystem. Configure `core.autocrlf` like this:

```shell
$ git config --global core.autocrlf true
```

On *macOS / Linux / WSL2*, we need Git to fix any accidentally introduced CRLF endings, but only when we commit the file, 
not during code check out. Configure `core.autocrlf` like this:

```shell
$ git config --global core.autocrlf input
```

This way we ensure that we can work with system based line-endings while always having LF line-endings in the repository.


### Connecting to GitHub/Beanstalkapp with SSH key

First generate new key or find existing you wish to use:

```shell
$ cd ~/
$ ls -al ~/.ssh # lists files in .ssh directory
$ ssh-keygen -t rsa -b 4096 -C "your_email@example.com" # generates new key
```

Copy public key and add to your profile on Beanstalk/GitHub:

```shell
$ cat ~/.ssh/id_rsa.pub | pbcopy
```

Validating connection:

```shell
$ ssh -T git@spoiledmilk.git.beanstalkapp.com
$ ssh -T git@github.com
```

If note using default name for the key, you will need to add it to the agent

```shell
$ eval "$(ssh-agent -s)"
Agent pid 59566
$ ssh-add -K ~/.ssh/id_rsa_key_name
```

If you're using macOS Sierra 10.12.2 or later, you will need to modify your `~/.ssh/config` file to automatically load 
keys into the ssh-agent and store passphrases in your keychain. Example setup:

```shell
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

### [optional] Set nano as default editor

```shell
$ git config --global core.editor "nano"
```

### [optional] Git autocomplete

* [Git autocomplete](./other-docs/git-autocomplete-configuration-manual.md)


## Miscellaneous

### Permission settings for `.ssh` directory and key files

In case of copying `.ssh` directory to new machine you will need to set permission values:

* `.ssh` directory permissions should be 700 (drwx------);
* public keys (`.pub`) files should be 644 (-rw-r--r--);
* private keys (`id_rsa`) on the client host should be 600 (-rw-------);
* authorized_keys file on the server should be 600 (-rw-------). 

### [macOS] Setting hostname and computer name

```shell
$ sudo scutil --set HostName newhostname
$ sudo scutil --set LocalHostName newhostname
$ sudo scutil --set ComputerName newhostname
$ dscacheutil -flushcache
# restart mac to make permanent
```

### [Windows 10] ConEmu

**ConEmu-Maximus5** is Windows console emulator. It will add all available system consoles automatically (eg. Git, CygWin). 
[(download)](http://conemu.github.io/)

In case your WSL2 distribution console is missing you can add it by going to `Settings > Startup > Tasks` then setting 
new task group with name `Bash::WSL2 bash` and command value `wsl.exe -d Ubuntu` or according to your distribution name.
