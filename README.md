# Moodle Scraper

A simple extension to download moodle hosted documents.

## Building

Due to this what appears to be a bug, the paths generated by building with parcel appear to be incorrect in index.html

To fix, append a single . infront of all links.

To build, run `parcel build src/index.html -d dist`