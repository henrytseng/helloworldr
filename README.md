# Helloworldr

[![Build Status](https://travis-ci.org/henrytseng/helloworldr.svg)](https://travis-ci.org/henrytseng/helloworldr)
[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/henrytseng/helloworldr?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

A build system designed for fast and flexible development pipeline.  



## Overview

We've designed a flexible build system that is extendable and easy to use.  

We've been there.  We've had to use multiple build systems that have all been deprecated over time.  They promised to be easy to use and deliver a tight workflow and each time we've had to tweek them for days until they worked just the way we needed them to for a project.  This was especially difficult for smaller projects that required a bit of boilerplate adjustments and detrimental for larger legacy projects that required specific configurations.  

We've designed this build system to be quicker to use for small projects and modular for complex large projects.  

Here's what the development pipeline will look like:

1. Define source(s)
2. Build process actions
3. Define target(s)

The build system will automatically track the dependencies required and build them in parallel.  



## Features

Here's a list of features we've added to enable

* Dependency graph and build target caching
* Pipeline build concurrency
* Deployment packaging
* Extensibility



Getting Started
------------

### Installation

Installation through bash script

```
curl -o- https://raw.githubusercontent.com/henrytseng/helloworldr/master/packages/helloworldr/cli/bin/hello | bash
```

Installation through NPM

```
npm install -g helloworldr
```




### Usage

Create a configuration `hello.config.json` in JSON that describes the build process

```
{
    "builds": {
        "main": {
        	"source": "./main.scss",
        	"actions": [
                {
                    "execute": ""
                }
        	],
        	"target": "./main.css"
		    }
    }
}
```

Then run

	$ hello




License
-------

Copyright (c) 2018 Canvas Digital LLC

Released under the MIT license. See LICENSE for details.
