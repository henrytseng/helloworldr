# Helloworldr

[![Build Status](https://travis-ci.org/henrytseng/helloworldr.svg)](https://travis-ci.org/henrytseng/helloworldr)
[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/henrytseng/helloworldr?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

A build system designed for fast and flexible development pipeline.



## Overview

We've designed a flexible build system that is extendable and easy to use.

With the advent of multi-threaded processing the main goal for this project is to engineer a platform that be easy to setup and can distribute a build process.

We've been there.  We've had to use multiple build systems that have all been deprecated over time.  They promised to be easy to use and deliver a tight workflow and each time we've had to tweek them for days until they worked just the way we needed them to for a project.  This was especially difficult for smaller projects that required a bit of boilerplate adjustments and detrimental for larger legacy projects that required specific configurations.

We've designed this build system to be quicker to use for small projects and modular for complex large projects.

Here's what the development pipeline will look like:

1. Define source(s)
2. Define actions(s)
3. (Optionally) Define dependencies

The build system will automatically track the dependencies required distribute and build them in parallel.



## Features

Here's a list of features we've added to enable

* Mesh-network communication layer to process actions
* Dependency graph and build target caching
* Deployment packaging
* Messaging layers
* Readable build log
* Extensibility and plugin support
* Security



Getting Started
------------

### Installation

Installation through bash script

```
curl -o- https://raw.githubusercontent.com/henrytseng/helloworldr/master/packages/helloworldr/cli/bin/hello | bash
```


### Usage

Create a configuration YAML file that describes the build process

```yaml
---
trigger:
    schedule:
        # Every 15 minutes
        - cron:  '*/15 * * * *'
    events:
        # When network receives test event
        -'events.TestEvent'
source:
    watch:
        - 'src/**'
actions:
    build_css:
        name: 'Build CSS'
        image:

    build_gui:
        name: 'Build application GUI'
    build_app:
        name: 'Build application service'
    deploy_version:
        name: 'Launch new node instances'
    rollover:
        name: 'Begin switching over traffic to new version'
    undeploy_previous:
        name: 'Deprecates previous node instances'
```

Start a node

	$ hello start node

Send command to node

    $ hello build 'events.TestEvent'



License
-------

Copyright (c) 2020 Canvas Digital LLC

Released under the MIT license. See LICENSE for details.
