
FROM ubuntu:18.04
# Aktualisieren der Software-Repository
RUN apt-get update

RUN apt-get install -y curl
