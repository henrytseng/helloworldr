FROM ubuntu:18.04

MAINTAINER Henry Tseng <info@heycanvas.com>

# Update
RUN   \
  apt-get -y update

# Upgrade
RUN   \
  apt-get -y upgrade

# Install dependencies
RUN   \
  apt-get -y install curl git

# Set the working directory
WORKDIR /hello

ENTRYPOINT ["/hello/bin/hello"]
