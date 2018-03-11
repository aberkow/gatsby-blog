---
path: "/learn-to-ssh"
date: "2018-02-08"
title: "Learn to SSH"
image: ../../images/lock-and-gate.jpg
alt: "A rusty green metal gate secured with an old metal chain and bronze padlock"
tags:
  - fundamentals
  - ssh
  - raspberry pi
  - command line
author: "Adam"
category: "programming concepts"
---
Recently I bought a [raspberry pi](https://www.raspberrypi.org/) to experiment with. I want to try things like:
- running a simple server
- experimenting with different terminal commands
- using it to try different databases
- stream files
- etc...

It's a great platform for experimenting because the pi itself is so inexpensive I don't worry too much about breaking it by accident.

After running around trying to find a spare keyboard and mouse I finally got it set up! Of course the next thing I wanted to do was make sure I could use it like a headless development environment. For those that don't know, this means that I didn't want to use any of the graphical interface. The way to do that is with Secure Shell (aka ssh).

> Secure Shell (SSH) is a cryptographic network protocol for operating network services securely over an unsecured network.[1] The best known example application is for remote login to computer systems by users. - [wikipedia](https://en.wikipedia.org/wiki/Secure_Shell)

Basically this means that you can securely connect two computers to each other. In this case I wanted to use the terminal on my laptop to connect to the pi.

## SSH via Username and Password
If you're on MacOS or Linux the terminal has the ssh command already available. The most basic ssh command allows you to connect by "answering" two questions - "which user?" and "what network address?" like this... `ssh {user}@{address}`. The default user is `pi` so our command would be `ssh pi@123.456.7.89` (that's a pretend IP address. You can should find your pi's IP address before you start this). The terminal will then ask you for the password you set for that user. Enter it (you won't see it on screen), press `enter` and you should be in.

## SSH Keys and Config
But, this is kind of a hassle. You may eventually need to connect to all kinds of systems. Remembering or keeping the passwords for all of them won't work in the long run. It would be better to simply type `ssh pi` (or something) and connect automatically. We can do that by creating a public and private key pair and a config file. At any time during this process, the command `ls -la` will show you everything in this directory. Here are the steps.

### Make some keys!
In the terminal on _your_ computer (not the pi), navigate to the ssh directory `cd ~/.ssh`. Next, use the command `ssh-keygen -t rsa`. You'll then be prompted for a file name for the keys. I like to make different key pairs for each device I want to connect to. This way I can easily find and/or replace them if needed. So, I might enter `id_rsa-raspberry-pi`. Here's the tricky bit. The terminal will ask you for a password. **Don't enter one!**. If you do, you'll have to enter it every time you want to connect with that ssh key which sort of defeats the purpose. Instead just hit `enter` twice. The terminal will then confirm that two files have been created. The one with the `.pub` suffix is the public key. This is what you will add to the pi. You'll also get an odd looking piece of "art". So that's fun!

### Config
Next, if you need to, create a `config` file like this - `touch config`. Use `nano` or `vi` to edit the file directly in the terminal like this - `nano config`. Now we want to enter four pieces of information.
- The host: this is what will come after `ssh` when you want to connect
- The user: this is the user on the pi
- The hostname: in this case this is the IP address of the pi on the network
- The identity file: this is the file with the _private_ key.

Here's what a completed entry looks like
```
Host pi
  User pi
  Hostname 123.456.7.89
  IdentityFile ~/.ssh/id_rsa-raspberry-pi
```
The only thing left to do is get the public key onto the pi!
### Connecting
This will be the last time you'll need the password for the pi. Copy the contents of the `.pub` key into your clipboard and use the first method I described to connect to the pi. Next, you need to check the home directory of the pi for the .ssh directory. If it's not there, create one, enter it and add a file called `authorized_keys`
- `cd ~/ && ls -la`
- if needed - `mkdir .ssh`
- `cd .ssh`
- if needed - `touch authorized_keys`
- paste the key into the file.
- that's it!

Now you should be able to type `ssh pi` into the terminal and connect directly without needing to enter a password.

### Caveat
Sometimes you might run into a problem connecting because the permissions on the .ssh directory or the authorized_key file are wrong. To fix this, change the permissions on the directory to 700 and the file to 600.
```bash
chmod 700 .ssh
chmod 600 .ssh/authorized_keys
```