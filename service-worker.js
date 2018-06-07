/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.2.0/workbox-sw.js");
workbox.googleAnalytics.initialize();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "css/bootstrap.css",
    "revision": "d2ab08de4855f3f73d2ecec6da794293"
  },
  {
    "url": "css/bootstrap.min.css",
    "revision": "3ab3438f85ad9f9e27e1af1facf0a9c4"
  },
  {
    "url": "css/font-awesome.min.css",
    "revision": "4083f5d376eb849a458cc790b53ba080"
  },
  {
    "url": "css/main.css",
    "revision": "dd5feec4ac4b9ed902b1028a86360d39"
  },
  {
    "url": "css/main.scss",
    "revision": "5ba1e81759b77d61fc77f825a244e446"
  },
  {
    "url": "css/roboto.css",
    "revision": "6c29d4ac38400c59b24db1b1de74470d"
  },
  {
    "url": "fonts/fontawesome-webfont.eot",
    "revision": "25a32416abee198dd821b0b17a198a8f"
  },
  {
    "url": "fonts/fontawesome-webfont.svg",
    "revision": "d7c639084f684d66a1bc66855d193ed8"
  },
  {
    "url": "fonts/fontawesome-webfont.ttf",
    "revision": "1dc35d25e61d819a9c357074014867ab"
  },
  {
    "url": "fonts/fontawesome-webfont.woff",
    "revision": "c8ddf1e5e5bf3682bc7bebf30f394148"
  },
  {
    "url": "fonts/fontawesome-webfont.woff2",
    "revision": "e6cf7c6ec7c2d6f670ae9d762604cb0b"
  },
  {
    "url": "fonts/FontAwesome.otf",
    "revision": "5dc41d8fe329a22fa1ee9225571c843e"
  },
  {
    "url": "fonts/glyphicons-halflings-regular.eot",
    "revision": "7ad17c6085dee9a33787bac28fb23d46"
  },
  {
    "url": "fonts/glyphicons-halflings-regular.svg",
    "revision": "ff423a4251cf2986555523dfe315c42b"
  },
  {
    "url": "fonts/glyphicons-halflings-regular.ttf",
    "revision": "e49d52e74b7689a0727def99da31f3eb"
  },
  {
    "url": "fonts/glyphicons-halflings-regular.woff",
    "revision": "68ed1dac06bf0409c18ae7bc62889170"
  },
  {
    "url": "fonts/roboto-italic.ttf",
    "revision": "31fc50b4c526d006bf3333b5c04eefaa"
  },
  {
    "url": "fonts/roboto-medium.ttf",
    "revision": "88f29ea5a372d06f521395134f62ab91"
  },
  {
    "url": "fonts/roboto-regular.ttf",
    "revision": "38861cba61c66739c1452c3a71e39852"
  },
  {
    "url": "img/aip-logo.png",
    "revision": "86fc8df39dbacd67e45f43a26ef85b1c"
  },
  {
    "url": "img/c4sa-logo-white.png",
    "revision": "2b02d02f99791edc99f88c54622f8c9b"
  },
  {
    "url": "img/code4sa-logo.png",
    "revision": "831760fd7c320f62232260a40e81b93d"
  },
  {
    "url": "img/logo-152.png",
    "revision": "10e44a686c6935e9e13de24b04371dcc"
  },
  {
    "url": "img/logo.png",
    "revision": "5692704f8f735b57cb2ab9b32121c257"
  },
  {
    "url": "img/nqabile-logo.png",
    "revision": "a13beef0f7074b142c3105ba4cd2779f"
  },
  {
    "url": "img/openup-logo.svg",
    "revision": "b72b3f305d1a1ebfc5ff6cc47fb3efdd"
  },
  {
    "url": "index.html",
    "revision": "6228dd60ef8f17adba948f2acfc8abfa"
  },
  {
    "url": "js/helpers.js",
    "revision": "fa9e317549a3c54badf2928c45a4e89f"
  },
  {
    "url": "js/l10n.js",
    "revision": "a9f41fcd421d9dc0d5fd3637db961b0f"
  },
  {
    "url": "js/main.js",
    "revision": "4c56f779c33d9657dc7654637564a6e2"
  },
  {
    "url": "js/models.js",
    "revision": "5736f4ef972c5a9b1039c56de40b042f"
  },
  {
    "url": "js/topics.js",
    "revision": "3034d99b9a658304656e06313fb192d1"
  },
  {
    "url": "js/vendor/backbone-1.3.3-min.js",
    "revision": "1f542a03bb9e6203b95cc9d0c39e0af7"
  },
  {
    "url": "js/vendor/backbone.localStorage.js",
    "revision": "4e4921cfba0adb0c88a5e461222f28a6"
  },
  {
    "url": "js/vendor/backbone.stickit-0.9.2.js",
    "revision": "71fdbffdd7ae69972dbc42e3823c5ed8"
  },
  {
    "url": "js/vendor/bootstrap-3.3.1.min.js",
    "revision": "2616d3564578d8f845813483352802a9"
  },
  {
    "url": "js/vendor/handlebars-v4.0.5.js",
    "revision": "67c1431d8a06d7b2e31f86874b757eeb"
  },
  {
    "url": "js/vendor/jquery-1.11.2.min.js",
    "revision": "5790ead7ad3ba27397aedfa3d263b867"
  },
  {
    "url": "js/vendor/jquery.autogrow-textarea.js",
    "revision": "72673a8b22dd8505d7b6f9f7bfd4f921"
  },
  {
    "url": "js/vendor/modernizr-2.8.3-respond-1.4.2.min.js",
    "revision": "c5de01ee6da003c07e3155cb56c569c8"
  },
  {
    "url": "js/vendor/moment-2.14.1.min.js",
    "revision": "2b7d0faf3728e2b30b55ace597e2a8a5"
  },
  {
    "url": "js/vendor/polyglot.min.js",
    "revision": "c2dbbc8a9a7969161fb1d59e440fae13"
  },
  {
    "url": "js/vendor/progressbar-1.0.1.min.js",
    "revision": "1970f37f615a8339b6b249e396ee7d0d"
  },
  {
    "url": "js/vendor/underscore-1.8.3-min.js",
    "revision": "543feb1ecaf06ea516f8cec5f9f3f279"
  },
  {
    "url": "js/views/about.js",
    "revision": "e9f46f071b7b4b6d20e9463acff21d3b"
  },
  {
    "url": "js/views/add_story.js",
    "revision": "3816231be09302d15b021381e8d11051"
  },
  {
    "url": "js/views/footer.js",
    "revision": "ba5a52ae5d875b795e430fa2b90674a7"
  },
  {
    "url": "js/views/home.js",
    "revision": "b339422e4ae1282e30eba637d708d806"
  },
  {
    "url": "js/views/settings.js",
    "revision": "b98fc2bd541262c0b859fa2ab93d26d5"
  },
  {
    "url": "js/views/story.js",
    "revision": "3e62a2f3be84e45b14e81a473a8d2c97"
  },
  {
    "url": "js/views/userinfo.js",
    "revision": "a63ce0315c6ce598fae02ee41fbf575d"
  },
  {
    "url": "offline.js",
    "revision": "4d5ca8397c08c02523232667900ac85a"
  },
  {
    "url": "README.md",
    "revision": "df91069dd6e9cd87e9a6165580ceabd5"
  },
  {
    "url": "workbox-config.js",
    "revision": "4851d1c58d1b933c914dc85ec781cef0"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
