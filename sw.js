"use strict";

var CACHE_VERSION = 1;
var CACHE_NAME = `discretion_cache_v${CACHE_VERSION}`;
var CACHE_FILES = [
    'index.html',
    'style.css',
    'script.js',
    'modules/luxon.js',
    'icon.svg',
    'icon-180x180.png',
    'icon-192.png',
    'discretion.webmanifest',
];


function fill_cache(cache) {
    return cache.addAll(CACHE_FILES);
}


function install_sw(event) {
    event.waitUntil(
        self.caches.open(CACHE_NAME).then(fill_cache));
}


function do_fetch(event) {
    event.respondWith(
        self.fetch(event.request, {cache: "no-store"}).then(
            function(response) {
                let rclone = response.clone();
                self.caches.open(CACHE_NAME).then(
                    function (cache) {
                        cache.put(event.request, rclone);
                    });
                return response;
            }).catch(
                function() {
                    return self.caches.match(event.request);
            })
    );
}

self.addEventListener('install', install_sw);
self.addEventListener('fetch', do_fetch);
