# [1.0.0-alpha.5](https://github.com/chrisEff/invoicetify/compare/v1.0.0-alpha.4...v1.0.0-alpha.5) (2025-11-17)


### Bug Fixes

* don't show service period in delivery notes ([3bf7460](https://github.com/chrisEff/invoicetify/commit/3bf7460711dcfc5a3b2c440fd55c019eb6b2b882))
* fix faulty tax calculation ([2af4c47](https://github.com/chrisEff/invoicetify/commit/2af4c478cef05ec95238245f435657b13ff1cc1f))

# [1.0.0-alpha.4](https://github.com/chrisEff/invoicetify/compare/v1.0.0-alpha.3...v1.0.0-alpha.4) (2025-10-29)


### Features

* add order number ([eb284fb](https://github.com/chrisEff/invoicetify/commit/eb284fb52ae3fedf9287f0c23c367fed8247f4cb))

# [1.0.0-alpha.3](https://github.com/chrisEff/invoicetify/compare/v1.0.0-alpha.2...v1.0.0-alpha.3) (2025-10-07)


### Bug Fixes

* adjust column widths in output to avoid overlapping ([772b99f](https://github.com/chrisEff/invoicetify/commit/772b99ffed976136d3c560c3bb03e1040cd910f4))
* avoid extraneous space before company name ([d348986](https://github.com/chrisEff/invoicetify/commit/d348986b2f2e8f11d41d0944c45a601459ad226f))
* make sure to display total with only 2 decimal digits ([13bbcef](https://github.com/chrisEff/invoicetify/commit/13bbcef1318ba234a380e8e9f1bf26bafffb3715))


### Features

* add basic VAT support ([9411b3c](https://github.com/chrisEff/invoicetify/commit/9411b3c5f4df472bbf553b4ba251b980b0a98dd7))
* add invoice number to filename when exporting PDF ([5c9e9e3](https://github.com/chrisEff/invoicetify/commit/5c9e9e3f5f230021edbeda5ff76d007510805128))
* allow switching document type from "invoice" to "deliveryNote" ([11b41aa](https://github.com/chrisEff/invoicetify/commit/11b41aa0138effcb81700552b18c7ec20b56374f))
* better demo data ([b6453ac](https://github.com/chrisEff/invoicetify/commit/b6453acf183a7137e3d12ff6ddb8d70b77de1169))
* better demo data ([266631b](https://github.com/chrisEff/invoicetify/commit/266631b330c98c4f04ea116671d22e62a40d5859))
* save invoice data in localstorage so it doesn't get lost on reloads/restarts ([482a83f](https://github.com/chrisEff/invoicetify/commit/482a83f8fcf906b6284818b35659c607aca0dcda))

# [1.0.0-alpha.2](https://github.com/chrisEff/invoicetify/compare/v1.0.0-alpha.1...v1.0.0-alpha.2) (2025-02-18)


### Bug Fixes

* add workaround for crash when removing item from array ([29b7797](https://github.com/chrisEff/invoicetify/commit/29b7797fb5b40edd455ff07b54af01a7b2ba1f0c))
* format dates correctly ([16a8149](https://github.com/chrisEff/invoicetify/commit/16a8149726898360282897507726a8602a4bac31))
* parse padding as float, not int ([249a62c](https://github.com/chrisEff/invoicetify/commit/249a62c3f53329b779695a8575fd8cb416710ab8))


### Features

* add contact details ([9e09b29](https://github.com/chrisEff/invoicetify/commit/9e09b293dc203ae2d77ec45dc930000c26818135))
* add dark mode support ([209d515](https://github.com/chrisEff/invoicetify/commit/209d5159549c3462c4e165592e148a63a2433640))
* add header images ([edc4b8b](https://github.com/chrisEff/invoicetify/commit/edc4b8bc9f29c42db252ea8874ecfe3b58833145))
* add hidden trigger for dev mode + remember in store ([769cf0e](https://github.com/chrisEff/invoicetify/commit/769cf0e906e709c61c84e7664cdf4f2ca4978f64))
* make font family configurable ([68eec50](https://github.com/chrisEff/invoicetify/commit/68eec5024f5228a53201a4bcdde9c7db9a8ff37b))
* make footer sections movable ([1ca3b33](https://github.com/chrisEff/invoicetify/commit/1ca3b3316a25f9c622f95d7d4f2d8c1c36b13763))
* make page margins configurable ([32ee2ee](https://github.com/chrisEff/invoicetify/commit/32ee2ee7afebef42b79adf6d01fc6e07694630bf))
* split settings into three separate tabs ([73a7410](https://github.com/chrisEff/invoicetify/commit/73a7410d36d661ef164253717e05fb4d2ce9f636))

# 1.0.0-alpha.1 (2025-01-22)


### Features

* first draft ([c40135c](https://github.com/chrisEff/invoicetify/commit/c40135c951a114f2aacc7601fd4e0c7e54aecbc8))
* first draft of settings dialog ([266139c](https://github.com/chrisEff/invoicetify/commit/266139c3159b7300be06ebaacb51e2ae1dd5ec63))
* implement first draft of PDF output ([47fc2fe](https://github.com/chrisEff/invoicetify/commit/47fc2fe9521a43a49b07ac814444eb82b58a1e40))
* implement service period ([4b84201](https://github.com/chrisEff/invoicetify/commit/4b84201fcf44af598a707d3ba8f4926ef0b70651))
* introduce TranslationsContext to ensure that language is instantly updated when switched in settings ([702235f](https://github.com/chrisEff/invoicetify/commit/702235f6d15f1c3a0f82021e98a02e56616b6229))
* make settings dialog look a little nicer ([086089d](https://github.com/chrisEff/invoicetify/commit/086089d478ecc6070457fecd9b0c45282ca580bf))
* make static invoice content (like sender address, introductory + closing text, etc.) configurable in settings ([a0d0bfe](https://github.com/chrisEff/invoicetify/commit/a0d0bfec679375bcc66cb334048c84d45babce35))
* rebuild UI with Material UI ([2a8350e](https://github.com/chrisEff/invoicetify/commit/2a8350e281a3296be8e92cc8887d399739ae3f95))
* save window size + position ([d24da45](https://github.com/chrisEff/invoicetify/commit/d24da45f126b31e724adda529795f825c6ac8519))
* turn PDF link into button + move up ([ff5d06d](https://github.com/chrisEff/invoicetify/commit/ff5d06dd06dc52577a0330ea478883b95ca5c008))
