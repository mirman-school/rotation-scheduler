FROM ubuntu:latest
MAINTAINER "Michael Taggart" <mtaggart@mirman.org>

EXPOSE 3003

RUN apt-get update
RUN apt-get install -y nodejs npm git
RUN ln -s /usr/bin/nodejs /usr/bin/node
COPY ./ /rotation-scheduler
WORKDIR /rotation-scheduler
CMD node ./ 3003
