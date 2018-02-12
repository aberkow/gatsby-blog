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