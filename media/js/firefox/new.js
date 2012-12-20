;(function($, Modernizr, _gaq, site) {
    'use strict';

    if (site.platform === 'android') {
        return;
    }

    // Load images on load so as not to block the loading of other images.
    $(window).on('load', function() {
        // Replace install images depending on the user's platform.
        var $install1 = $('#install1');
        var $install2 = $('#install2');
        var $install3 = $('#install3');
        var img_os = (site.platform === 'osx') ? 'mac' : 'win';

        $('html').addClass('ready-for-scene2');

        var install2_img = $('<img>', {
            src: $install2.data('src').replace(/win/gi, img_os),
            id: 'install2',
            alt: ''
        });
        $install2.replaceWith(install2_img);

        var install3_img = $('<img>', {
            src: $install3.data('src').replace(/win/gi, img_os),
            id: 'install3',
            alt: ''
        });
        $install3.replaceWith(install3_img);

        // Screen 1 is unique for IE < 9
        if (site.platform === 'windows' && $.browser.msie && $.browser.version < 9) {
            img_os = 'winIE8';
        }

        var install1_img = $('<img>', {
            src: $install1.data('src').replace(/win/gi, img_os),
            id: 'install1',
            alt: ''
        });
        $install1.replaceWith(install1_img);
    });

    // Bind events on domReady.
    $(function() {
        // Pull Firefox download link from the download button and add to the
        // 'click here' link.
        // TODO: Remove and generate link in bedrock.
        var $li = $('.download-list li:visible').filter(':first');
        var ff_dl_link = $li.find('a:first').attr('href');
        $('#direct-download-link').attr('href', ff_dl_link);

        // Trigger animation after download.
        var $scene2 = $('#scene2');
        var $stage = $('#stage-firefox');
        var $thankYou = $('.thankyou');
        $('.download-firefox').on('click', function() {
            // track download click
            if (_gaq) {
                _gaq.push(['_trackPageview',
                           '/en-US/products/download.html?referrer=new-b']);
            }

            if (!Modernizr.csstransitions) {
                $scene2.css('visibility', 'visible');
                $stage.animate({
                    bottom: '-400px'
                }, 400, function() {
                    $thankYou.focus();
                });
            } else {
                $stage.addClass('scene2');
                // transitionend fires multiple times in FF 17, including
                // before the transition actually finished.
                // Work-around with setTimeout.
                setTimeout(function() {
                    $thankYou.focus();
                }, 500);
            }
        });
    });
})(window.jQuery, window.Modernizr, window._gaq, window.site);