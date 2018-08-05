# Pocket Reporter

PocketReporter is an offline web app that helps you be a better reporter by guiding you through the news gathering process.

* [app.pocketreporter.co.za](http://app.pocketreporter.co.za)

PocketReporter is a simple client-only Javascript app based on [Backbone.js](http://backbonejs.org/).

## Local development

1. Check out the repo as above
2. Start any local webserver, such as Jekyll: ``jekyll server``
3. You can also use python: ``python -m SimpleHTTPServer 4000``
4. Visit the site in your browser: [http://localhost:4000](http://localhost:4000)

## Updating translations

1. Download the translations file [from CrowdIn.com](https://crowdin.com/project/pocketreporter/settings#translations)
2. Make a note of the language code (eg. ``en-za`` or ``xh``)
3. Import it into ``js/l10n.js`` by running:
    ```bash
    python strings.py --file download.csv --language LANGUAGE_CODE
    ```
4. Check the new strings in the app
5. Sanity check the changes using ``git diff``
6. Commit as usual

# License and Copyright

Copyright (c) 2016, 2017 OpenUp

Licensed under the [MIT license](LICENSE).

The Pocket Reporter name and logo are Copyright 2016 OpenUp, and may not be used without permission.

# Attribution

Pocket Reporter is the brainchild of Raymond Joseph and is inspired by the [Virtual Reporter tool](http://nqabile.co.za/virtual) by [Kanthan Pillay](http://kanthanpillay.com/content/about).

The logo is a derivative of [this Freepik icon](http://www.flaticon.com/free-icon/quill-drawing-a-line_16294).

You're welcome to re-use this code to build your own application, provided you give it a new name and logo, provide attribution to Pocket Reporter and OpenUp, and follow the requirements of the MIT License.
