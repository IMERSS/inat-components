## Developer notes

A few notes for developers out there. 

This repo contains two folders:
- `client/` - containing all the front-end code and documentation.
- `server/` - contains the scripts to scrape and cache the raw iNat data in JSON files, plus a web server to make them
available to the front-end code.


### Running locally

I used yarn for the repo and some of the script commands assume that exists on your machine - plus the lockfiles are
all in yarn, so it's best that you first download it and get it running. 

To run the site, do this:

- `yarn bootstrap` - this just does a `yarn install` in the two folders, getting all the dependencies.
- `yarn start` - boots up a simple webpack server. This repo is based on create-react-app, so you get the usual
goodies: hot reloading, etc. 

> TODO: 
> - configuration? Maybe leave defaults as BC Lepidoptera? Might be best.
> - add command & document here to generate the  