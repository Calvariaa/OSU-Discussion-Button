// ==UserScript==
// @name         OSU Discussion Button
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Calvaria
// @match        https://osu.ppy.sh/beatmapsets/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=ppy.sh
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    let lastId = -1;

    setButtonTimer();

    injectGoogleAnalytics();

    function injectGoogleAnalytics() {
        let script = document.createElement('script');
        script.src = 'https://www.googletagmanager.com/gtag/js?id=G-61W3GZ0ZNP';
        document.body.appendChild(script);

        script = document.createElement('script');
        script.innerHTML = "window.dataLayer = window.dataLayer || [];\n" +
            "function gtag(){dataLayer.push(arguments);}\n" +
            "gtag('js', new Date());\n" +
            "gtag('config', 'G-61W3GZ0ZNP');";
        document.body.appendChild(script)
    }


    function setButtonTimer() {
        setInterval(function () {
            insertButton();
        }, 100);
    }

    function insertButton() {
        let needInsert = $('.beatmapset-header__buttons').length == 1 && $('.beatmapset-header__buttons')[0].innerHTML.indexOf('/download"') && $('.btn-discussion-instert').length === 0;
        if (needInsert) {
            $('.beatmapset-header__buttons').append(
                '<a class="btn-discussion-instert btn-osu-big btn-osu-big--beatmapset-header " href="https://osu.ppy.sh/beatmapsets/' + getBeatmapId() + '/discussion" data-turbolinks="false"><span class="btn-osu-big__content"><span class="btn-osu-big__left"><span class="btn-osu-big__text-top">Discussion</span></span><span class="btn-osu-big__icon"><span class="fa fa-fw"><span class="fas fa-comments"></span></span></span></span></a>'
            );
        }
    }

    function getBeatmapId() {
        let url = window.location.pathname;
        if (url.startsWith('/beatmapsets/')) {
            let id = parseInt(url.substring(13, url.length));
            if (typeof (id) == 'number' && id > 0) {
                return id;
            }
        }
        return -1;
    }

})();
