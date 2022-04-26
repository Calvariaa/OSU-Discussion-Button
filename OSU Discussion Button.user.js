// ==UserScript==
// @name         OSU Discussion Button
// @namespace    https://osu.ppy.sh/users/12381096
// @version      0.3
// @description  Update 0.3: Fixed mismatch when open #/beatmapsets link for the first time
// @author       Calvaria
// @match        https://osu.ppy.sh/*
// @icon         https://osu.ppy.sh/favicon.ico
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    setButtonTimer();

    function setButtonTimer() {
        setInterval(function () {
            insertButton();
        }, 100);
    }

    function insertButton() {
        let needInsert = $('.beatmapset-header__buttons').length == 1 && $('.beatmapset-header__buttons')[0].innerHTML.indexOf('/download"') && $('.btn-discussion-instert').length === 0;
        if (needInsert) {
            var append_str = '<a class="btn-discussion-instert btn-osu-big btn-osu-big--beatmapset-header " href="https://osu.ppy.sh/beatmapsets/' + getBeatmapId() + '/discussion" data-turbolinks="false"><span class="btn-osu-big__content"><span class="btn-osu-big__left"><span class="btn-osu-big__text-top">Discussion</span></span><span class="btn-osu-big__icon"><span class="fa fa-fw"><span class="fas fa-comments"></span></span></span></span></a>'
            if ($('.beatmapset-header__more').length === 1){
                $('.beatmapset-header__more').before(append_str);
            }
            else {
                $('.beatmapset-header__buttons').append(append_str);
            }
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
