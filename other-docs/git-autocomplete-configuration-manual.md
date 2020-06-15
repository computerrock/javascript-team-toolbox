# Git autocomplete configuration

Create (if you don't have one) `.bashrc` file in home directory and add one of two versions of content below:

* one-line version:

```bash
source ~/.git-prompt.sh
source ~/git-completion.bash
GIT_PS1_SHOWDIRTYSTATE=true
GIT_PS1_SHOWUNTRACKEDFILES=true
GIT_PS1_SHOWCOLORHINTS=true
GIT_PS1_SHOWUPSTREAM="auto"
PROMPT_COMMAND='__git_ps1 "\[\e[01;31m\]\u\[\e[01;33m\]@\[\e[01;36m\]\h \[\e[01;33m\]\w \[\e[01;35m\]\[\e[00m\]" "\\\$ " "[%s]"'
```

or
* multi line version:

```bash
source ~/.git-prompt.sh
source ~/git-completion.bash
GIT_PS1_SHOWDIRTYSTATE=true
GIT_PS1_SHOWUNTRACKEDFILES=true
GIT_PS1_SHOWCOLORHINTS=true
GIT_PS1_SHOWUPSTREAM="auto"
PROMPT_COMMAND='__git_ps1 "\[\e[01;33m\]@\[\e[01;36m\]\h>----------------------------------->\n \[\e[01;33m\]\w\n \[\e[01;35m\]\[\e[00m\]" "\\\$ " "[%s]"'
```

then put two files from this repository to home directory:

```bash
../other-docs/.git-prompt.sh
../other-docs/git-completition.bash
```

Logout and login from current terminal session.
