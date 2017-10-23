---
path: "/git-aliases"
date: "2017-10-22"
title: "Quick Aliases for git"
image: ./assets/featured-image.jpg
tags:
  - git
  - gitflow
  - bash
  - workflow
  - productivity
author: "Adam"
category: "productivity"
---

The other day at work I got ridiculously tired of typing out git commands in the terminal. I'd been updating our repos all day and was getting RSI from typing things like `git push origin develop` over and over. Ok, not really, but still... Also, we use [git flow](https://danielkummer.github.io/git-flow-cheatsheet/) quite a bit so I added aliases for those as well.

Anyway, here's a list of the terminal aliases I came up with to handle this. They work well for me.

```bash
# git aliases
alias ga="git add"
alias gb="git branch"
alias gc="git checkout"
alias gm="git commit -m"
alias gp="git push"
alias gpu="git pull"
alias grh="git reset --hard"
alias gs="git status"
alias gt="git tag"

# git flow aliases
alias gffs="git flow feature start"
alias gfff="git flow feature finish"
alias gfrs="git flow release start"
alias gfrf="git flow release finish"
```
<br />
This way all I have to do is add an argument after the alias like `gm 'initial commit'`. Quick, simple, and effective!

