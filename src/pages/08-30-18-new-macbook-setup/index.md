---
path: "/new-macbook-setup"
date: "2018-30-08"
title: "Setting up a New MacBook Pro for Web Development"
image: ../../images/macbook-on-couch.jpg
alt: "A silver macbook pro on a grey couch seen from above"
tags:
  - gear
  - mac
  - apple
  - dev
author: "Adam"
category: "random"
---
Recently I bought a new MacBook Pro. It was a big purchase for me. The first new laptop in nearly 10 years! The previous one was also a MBP and I loved it. Sadly the old one was really starting to slow down. I'd upgraded everything I could on it, but time moves on...

So, here are some of the things I did to set up this new laptop for web development. I'll go over as much as I can for each one.

## Browsers.
Many browsers.

## Docker
Docker for macOS is super easy to install. It's an application you can download from the docker store. The application gives you access to `docker`, `docker-compose` and docker machine, and a GUI interface called Kitematic. I'll do more posts specifically about Docker another time, but it's a critical part of my day to day workflow.

## VSCode
Right now [I use VSCode as my main text editor](https://code.visualstudio.com/). There are _a lot_ of plugins you can install for the particular kind of development you do. One thing that I find very helpful to add to it is the [Fira Code font](https://github.com/tonsky/FiraCode). It's a nice font for programming and uses ligatures to combine symbols into glyphs. For instance it combines `-` and `>` into `->` with no gap in between (you can't really see it here, go check out the fonts for yourself). Not everyone likes this approach, but it helps me see things a little easier.

## iTerm
[iTerm is a great terminal replacement](https://iterm2.com/) for Mac. It includes a lot of customization options. But the best part about it is the ability to quickly split the current window into multiple panes. You can even set it so that the newly created views will be in the same folder as the one you started in. 

## Homebrew
[Homebrew is a package manager for macOS](https://brew.sh). Linux operating systems have package managers like `apt` for [Ubuntu](https://www.ubuntu.com/), `dpkg` for [Debian](https://www.debian.org/), or `yum` for [CentOS](https://www.centos.org/). These managers let you install (or delete, manage, etc...) all kinds of things. Homebrew lets you manage terminal utilities, commands, whole desktop applications, etc... To install it open your terminal application. At the prompt, enter
```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```
With homebrew installed, I could add some of my favorite utilities and be sure I could manage them easily later. Which ones?


## nvm
[nvm let's you manage node versions](https://github.com/creationix/nvm). This is helpful because sometimes different projects require different versions of node. Plus, all those tutorials that start "download node from nodejs.org"... Yeah. No thanks. I'd rather use a utility to help me keep track of all that. Installing it is easy with homebrew and the terminal!
```
brew install nvm
```

Then, to add a verion of node all you have to do is type 
```
nvm install 8
```
and you'll get node 8 installed on your computer. Want node 10 also but want to use node 8 for day to day tasks? Sure!
``` 
nvm install 10
nvm alias default 8
```
The first command installs node v10. The second sets the default version to node v8.

## exa
[exa is "A modern replacement for `ls`"](https://the.exa.website/). The `ls` command lists the contents of directories. Exa adds some really nice functionality like: color coding the results, enabling tree views, giving git information, etc... I add an alias to my terminal profile (either .bashrc or .zshrc) so that `exa` is run whenever I type `ls`.
```
alias ls="exa"
```

How do you install it? You guessed it! 
```
brew install exa
```

## exercism
[exercism is a code challenge site](https://exercism.io/). It uses the terminal as an interface to submit and fetch projects. There's a nice community of people who participate. Plus it's a good introduction to [Test Driven Development](https://en.wikipedia.org/wiki/Test-driven_development). Install from the terminal with
```
brew install exercism
```

## htop
[htop is a systems profiler] in the terminal. It's nice when you don't want to open up system utilties and just need a quick glance at what's hogging all your RAM (I'm looking at you chrome...). Anyway, installation is a simple command away!
```
brew install htop
```

## PHP/Composer
PHP is an important server side language. You can choose to not like it if you want, but it's run on a lot of servers. Fortunately PHP can also be installed with homebrew for instance...
```
brew install php72
```
While a lot of the work I do ends up being in docker it's helpful to have PHP installed so that I can also use [composer (the php dependecy manager)](https://getcomposer.org/). Composer takes a little work to install. The easiest way is again through the terminal but not with homebrew.

First, download and confirm the composer script by visiting their download page. It will tell you to run these php commands.
```php
php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
php -r "if (hash_file('SHA384', 'composer-setup.php') === '544e09ee996cdf60ece3804abc52599c22b1f40f4323403c44d44fdfdd586475ca9813a858088ffbc1f233e9b180f061') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
php composer-setup.php
php -r "unlink('composer-setup.php');"
```
Next, you can move the composer.phar file so that instead of always typing `composer.phar` you can just type `composer` to execute commands.

```
mv composer.phar /usr/local/bin/composer
```

## Sequel Pro
[Sequel Pro lets you connect to mysql databases](https://www.sequelpro.com/). That doesn't sound so interesting really... But the interface is amazing. If you're used to phpMyAdmin in a web browser, it's a huge step up.

## Postman
[Postman is a great chrome app for testing API endpoints](https://www.getpostman.com/). I barely use all the things it's capable of. But for anything related to APIs it can't be beat.

## Conclusion.
Well I'm sure I left out a bunch of stuff. When I remember or find something else interesting I'll post an update.