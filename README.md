helloworldr
===========

[![Build Status](https://travis-ci.org/henrytseng/helloworldr.svg)](https://travis-ci.org/henrytseng/helloworldr)
[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/henrytseng/helloworldr?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

A build system designed for fast and flexible development pipeline.  



## Overview

We've designed a flexible build system that is extendable and easy to use.  

We've been there.  We've had to use multiple build systems that have all been deprecated over time.  They promised to be easy to use and deliver a tight workflow and each time we've had to tweek them for days until they worked just the way we needed them to for a project.  

Here's what you do.  Define the following configuration.  

1. Source(s)
2. Build process
3. Target
4. Deploy

For example: `hello.config.json` in JSON format here:

```
{
    "reference": {
        "main": {
        	"source": "./main.scss",
        	"build": [
                {
                    "execute": ""
                }
        	],
        	"target": "./main.css"
		}
    }
}
```



## Features

Here's a list of features we've added to enable

* Dependency graph and build target caching
* Pipeline build concurrency
* Deployment packaging
* Extensibility



Usage
------------

Installation through bash script

```
curl -o- https://raw.githubusercontent.com/henrytseng/helloworldr/master/bin/hello | bash
```

Installation through NPM

```
npm install -g helloworldr
```




Usage
-------------

Create a configuration file `hello` then run:

	$ hello

Optionally use a specific configuration file `config.json`

	$ hello -c config.json




License
-------

Copyright (c) 2018 Canvas Digital LLC

Released under the MIT license. See LICENSE for details.
