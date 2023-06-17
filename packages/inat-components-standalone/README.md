# Standalone

The purpose of this (private, non-published) package is provide a way to generate a standalone version of the script:
i.e. the raw JS and CSS files that you can then copy for use on your own site.

To maximize re-usability, version 1.2.0 of this script separates the configuration settings from the code itself.
Here's how it all works.

- First, if you haven't already done so, play around with the [demo app](../demo). That'll give you and idea of what
  options are available and how it works. It'll also give you an opportunity to tweak the settings to show exactly
  what taxon, place + other settings you want (try editing the [inat.config.json](../demo/src/inat.config.json) file).

  > TODO. Here link to the typings / doc for the data structure for the TaxonPanel component. Will that differ from the JSON
  > data passed to the standalone script? I believe not, but the API for the inat-component-utils WILL differ. That should
  > be explicitly explained & how the minimal settings needed for that are related to the main script's settings.


