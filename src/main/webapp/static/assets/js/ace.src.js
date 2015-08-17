'ace' in window || (window.ace = {
}),
'helper' in window.ace || (window.ace.helper = {
}),
'options' in window.ace || (window.ace.options = {
}),
'vars' in window.ace || (window.ace.vars = {
    icon: ' ace-icon ',
    '.icon': '.ace-icon'
}),
ace.vars.touch = 'ontouchstart' in document.documentElement,
jQuery(function (e) {
    ace.click_event = ace.vars.touch && e.fn.tap ? 'tap' : 'click';
    var a = navigator.userAgent;
    ace.vars.webkit = !!a.match(/AppleWebKit/i),
    ace.vars.safari = !!a.match(/Safari/i) && !a.match(/Chrome/i),
    ace.vars.android = ace.vars.safari && !!a.match(/Android/i),
    ace.vars.ios_safari = !!a.match(/OS ([4-9])(_\d)+ like Mac OS X/i) && !a.match(/CriOS/i),
    ace.vars.old_ie = document.all && !document.addEventListener,
    ace.vars.non_auto_fixed = ace.vars.android || ace.vars.ios_safari,
    ace.vars.non_auto_fixed && e('body').addClass('mob-safari');
    var t = document.documentElement.style;
    ace.vars.transition = 'transition' in t || 'WebkitTransition' in t || 'MozTransition' in t || 'OTransition' in t;
    var i = {
        general_vars: null,
        add_touch_drag: null,
        general_things: null,
        handle_side_menu: null,
        sidebar_scrollable: {
            scroll_to_active: !0,
            include_shortcuts: !0,
            include_toggle: !1 || ace.vars.safari || ace.vars.ios_safari,
            smooth_scroll: 200,
            outside: !1
        },
        sidebar_hoverable: {
            sub_scroll: !1
        },
        widget_boxes: null,
        widget_reload_handler: null,
        settings_box: null,
        settings_rtl: null,
        settings_skin: null,
        enable_searchbox_autocomplete: null,
        auto_hide_sidebar: !1,
        auto_padding: !1,
        auto_container: !1
    };
    for (var s in i) if (s in ace) {
        var n = i[s];
        n !== !1 && (null === n ? n = [
            jQuery
        ] : n instanceof Array ? n.unshift(jQuery)  : n = [
            jQuery,
            n
        ], ace[s].apply(null, n))
    }
}),
ace.general_vars = function (e) {
    var a = 'menu-min',
    t = 'responsive-min',
    i = 'h-sidebar',
    s = e('#sidebar').eq(0);
    ace.vars.mobile_style = 1,
    s.hasClass('responsive') && !e('#menu-toggler').hasClass('navbar-toggle') ? ace.vars.mobile_style = 2 : s.hasClass(t) ? ace.vars.mobile_style = 3 : s.hasClass('navbar-collapse') && (ace.vars.mobile_style = 4),
    e(window).on('resize.ace.vars', function () {
        ace.vars.window = {
            width: parseInt(e(this).width()),
            height: parseInt(e(this).height())
        },
        ace.vars.mobile_view = ace.vars.mobile_style < 4 && ace.helper.mobile_view(),
        ace.vars.collapsible = !ace.vars.mobile_view && ace.helper.collapsible(),
        ace.vars.nav_collapse = (ace.vars.collapsible || ace.vars.mobile_view) && e('#navbar').hasClass('navbar-collapse');
        var s = e(document.getElementById('sidebar'));
        ace.vars.minimized = !ace.vars.collapsible && s.hasClass(a) || 3 == ace.vars.mobile_style && ace.vars.mobile_view && s.hasClass(t),
        ace.vars.horizontal = !(ace.vars.mobile_view || ace.vars.collapsible) && s.hasClass(i)
    }).triggerHandler('resize.ace.vars')
},
ace.general_things = function (e) {
    var a = !!e.fn.ace_scroll;
    a && e('.dropdown-content').ace_scroll({
        reset: !1,
        mouseWheelLock: !0
    }),
    e(window).on('resize.reset_scroll', function () {
        a && e('.ace-scroll').ace_scroll('reset')
    }),
    a && e(document).on('settings.ace.reset_scroll', function (a, t) {
        'sidebar_collapsed' == t && e('.ace-scroll').ace_scroll('reset')
    }),
    e(document).on('click.dropdown.pos', '.dropdown-toggle[data-position="auto"]', function () {
        var a = e(this).offset(),
        t = e(this.parentNode);
        parseInt(a.top + e(this).height()) + 50 > ace.helper.scrollTop() + ace.helper.winHeight() - t.find('.dropdown-menu').eq(0).height() ? t.addClass('dropup')  : t.removeClass('dropup')
    }),
    e(document).on('click', '.dropdown-navbar .nav-tabs', function (a) {
        a.stopPropagation();
        {
            var t;
            a.target
        }(t = e(a.target).closest('[data-toggle=tab]')) && t.length > 0 && (t.tab('show'), a.preventDefault())
    }),
    e('.ace-nav [class*="icon-animated-"]').closest('a').one('click', function () {
        var a = e(this).find('[class*="icon-animated-"]').eq(0),
        t = a.attr('class').match(/icon\-animated\-([\d\w]+)/);
        a.removeClass(t[0])
    }),
    e('.sidebar .nav-list .badge[title],.sidebar .nav-list .badge[title]').each(function () {
        var a = e(this).attr('class').match(/tooltip\-(?:\w+)/);
        a = a ? a[0] : 'tooltip-error',
        e(this).tooltip({
            placement: function (a, t) {
                var i = e(t).offset();
                return parseInt(i.left) < parseInt(document.body.scrollWidth / 2) ? 'right' : 'left'
            },
            container: 'body',
            template: '<div class="tooltip ' + a + '"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
        })
    });
    var t = e('.btn-scroll-up');
    if (t.length > 0) {
        var i = !1;
        e(window).on('scroll.scroll_btn', function () {
            var e = ace.helper.scrollTop(),
            a = ace.helper.winHeight(),
            s = document.body.scrollHeight;
            e > parseInt(a / 4) || e > 0 && s >= a && a + e >= s - 1 ? i || (t.addClass('display'), i = !0)  : i && (t.removeClass('display'), i = !1)
        }).triggerHandler('scroll.scroll_btn'),
        t.on(ace.click_event, function () {
            var a = Math.min(500, Math.max(100, parseInt(ace.helper.scrollTop() / 3)));
            return e('html,body').animate({
                scrollTop: 0
            }, a),
            !1
        })
    }
    if (ace.vars.webkit) {
        var s = e('.ace-nav').get(0);
        s && e(window).on('resize.webkit', function () {
            ace.helper.redraw(s)
        })
    }
    ace.vars.ios_safari && e(document).on('ace.settings.ios_fix', function (a, t, i) {
        'navbar_fixed' == t && (e(document).off('focus.ios_fix blur.ios_fix', 'input,textarea,.wysiwyg-editor'), 1 == i && e(document).on('focus.ios_fix', 'input,textarea,.wysiwyg-editor', function () {
            e(window).on('scroll.ios_fix', function () {
                var a = e('#navbar').get(0);
                a && ace.helper.redraw(a)
            })
        }).on('blur.ios_fix', 'input,textarea,.wysiwyg-editor', function () {
            e(window).off('scroll.ios_fix')
        }))
    }).triggerHandler('ace.settings.ios_fix', [
        'navbar_fixed',
        'fixed' == e('#navbar').css('position')
    ])
},
ace.helper.collapsible = function () {
    var e;
    return null != document.querySelector('#sidebar.navbar-collapse') && null != (e = document.querySelector('.navbar-toggle[data-target*=".sidebar"]')) && e.scrollHeight > 0
},
ace.helper.mobile_view = function () {
    var e;
    return null != (e = document.getElementById('menu-toggler')) && e.scrollHeight > 0
},
ace.helper.redraw = function (e) {
    var a = e.style.display;
    e.style.display = 'none',
    e.offsetHeight,
    e.style.display = a
},
ace.helper.scrollTop = function () {
    return document.scrollTop || document.documentElement.scrollTop || document.body.scrollTop
},
ace.helper.winHeight = function () {
    return window.innerHeight || document.documentElement.clientHeight
},
ace.helper.camelCase = function (e) {
    return e.replace(/-([\da-z])/gi, function (e, a) {
        return a ? a.toUpperCase()  : ''
    })
},
ace.helper.removeStyle = 'removeProperty' in document.documentElement.style ? function (e, a) {
    e.style.removeProperty(a)
}
 : function (e, a) {
    e.style[ace.helper.camelCase(a)] = ''
},
ace.helper.hasClass = 'classList' in document.documentElement ? function (e, a) {
    return e.classList.contains(a)
}
 : function (e, a) {
    return e.className.indexOf(a) > - 1
},
ace.add_touch_drag = function (e) {
    if (ace.vars.touch) {
        var a = 'touchstart MSPointerDown pointerdown',
        t = 'touchend touchcancel MSPointerUp MSPointerCancel pointerup pointercancel',
        i = 'touchmove MSPointerMove MSPointerHover pointermove';
        e.event.special.ace_drag = {
            setup: function () {
                var s = 0,
                n = e(this);
                n.on(a, function (a) {
                    function r(e) {
                        if (c) {
                            var a = e.originalEvent.touches ? e.originalEvent.touches[0] : e;
                            if (o = {
                                coords: [
                                    a.pageX,
                                    a.pageY
                                ]
                            }, c && o && (u = 0, h = 0, d = Math.abs(h = c.coords[1] - o.coords[1]) > s && Math.abs(u = c.coords[0] - o.coords[0]) <= Math.abs(h) ? h > 0 ? 'up' : 'down' : Math.abs(u = c.coords[0] - o.coords[0]) > s && Math.abs(h) <= Math.abs(u) ? u > 0 ? 'left' : 'right' : !1, d !== !1)) {
                                var t = {
                                    cancel: !1
                                };
                                c.origin.trigger({
                                    type: 'ace_drag',
                                    direction: d,
                                    dx: u,
                                    dy: h,
                                    retval: t
                                }),
                                0 == t.cancel && e.preventDefault()
                            }
                            c.coords[0] = o.coords[0],
                            c.coords[1] = o.coords[1]
                        }
                    }
                    var o,
                    l = a.originalEvent.touches ? a.originalEvent.touches[0] : a,
                    c = {
                        coords: [
                            l.pageX,
                            l.pageY
                        ],
                        origin: e(a.target)
                    },
                    d = !1,
                    u = 0,
                    h = 0;
                    n.on(i, r).one(t, function () {
                        n.off(i, r),
                        c = o = void 0
                    })
                })
            }
        }
    }
},
ace.handle_side_menu = function (e) {
    var a = e('.sidebar').eq(0);
    e(document).on(ace.click_event + '.ace.menu', '#menu-toggler', function () {
        return a.toggleClass('display'),
        e(this).toggleClass('display'),
        e(this).hasClass('display') && 'sidebar_scroll' in ace.helper && ace.helper.sidebar_scroll.reset(),
        !1
    }).on(ace.click_event + '.ace.menu', '.sidebar-collapse', function () {
        ace.vars.collapsible || ace.vars.horizontal || (ace.vars.minimized = !ace.vars.minimized, ace.settings.sidebar_collapsed.call(this, ace.vars.minimized), ace.vars.old_ie && ace.helper.redraw(a.get(0)))
    }).on(ace.click_event + '.ace.menu', '.sidebar-expand', function () {
        ace.vars.minimized && ace.settings.sidebar_collapsed.call(this, !1, !1);
        var t = e(this).find(ace.vars['.icon']),
        i = t.attr('data-icon1'),
        s = t.attr('data-icon2');
        a.hasClass('responsive-min') ? (t.removeClass(i).addClass(s), a.removeClass('responsive-min'), a.addClass('display responsive-max'), ace.vars.minimized = !1)  : (t.removeClass(s).addClass(i), a.removeClass('display responsive-max'), a.addClass('responsive-min'), ace.vars.minimized = !0),
        e(document).triggerHandler('settings.ace', [
            'sidebar_collapsed',
            ace.vars.minimized
        ])
    });
    var t = ace.vars.ios_safari; //判断浏览器
    e(document).on(ace.click_event + '.ace.submenu', '.sidebar .nav-list', function (a) {
        var i = this,
        s = e(a.target).closest('a');
        if (s && 0 != s.length) {
            var n = ace.vars.minimized && !ace.vars.collapsible;
            //判断是否为一级菜单
            if (s.hasClass('dropdown-toggle')) {
                var r = s.siblings('.submenu').get(0);
                if (!r) return !1;
                var o = 0,
                l = 250,
                c = r.parentNode.parentNode;
                if (n && c == i || e(r.parentNode).hasClass('hover') && 'absolute' == e(r).css('position') && !ace.vars.collapsible) return a.preventDefault(),
                !1;
                0 == r.scrollHeight && e(c).find('> .open > .submenu').each(function () {
                    this == r || e(this.parentNode).hasClass('active') || (o -= this.scrollHeight, ace.submenu.hide(this, l))
                });
                var d = 0;
                return 1 == (d = ace.submenu.toggle(r, l)) ? 0 != o && (o += r.scrollHeight)  : - 1 == d && (o -= r.scrollHeight),
                0 != o && 'sidebar_scroll' in ace.helper && ace.helper.sidebar_scroll.prehide(o),
                a.preventDefault(),
                !1
            }
            if ('tap' == ace.click_event && n && s.get(0).parentNode.parentNode == i) {
                var u = s.find('.menu-text').get(0);
                if (a.target != u && !e.contains(u, a.target)) return a.preventDefault(),
                !1
            }
            //
            if ('false' !== s.parent().find("a").attr('action-data')){
            	$('ul.nav-list>li,ul.submenu>li').removeClass("active");
            	s.parent().addClass("active");
            	frameTab.addTab(s.parent().find("a").attr('action-data'));
            }else{
            }
            if (t && 'false' !== s.attr('data-link')) return document.location = s.attr('href'),
            a.preventDefault(),
            !1
        }
    })
},
ace.enable_ajax_content = function (e, a) {
    function t(a, t, n) {
        var r;
        if (e(document).trigger(r = e.Event('ajaxloadstart'), {
            url: a,
            hash: t
        }), !r.isDefaultPrevented()) {
            var v = e('.page-content-area');
            v.css('opacity', 0.25);
            var p = e('<div style="position: fixed; z-index: 2000;" class="ajax-loading-overlay"><i class="ajax-loading-icon fa fa-spin ' + o + '"></i> ' + l + '</div>').insertBefore(v),
            f = v.offset();
            p.css({
                top: f.top,
                left: f.left
            }),
            e.ajax({
                url: a
            }).complete(function () {
                v.css('opacity', 0.8),
                e(document).on('ajaxscriptsloaded', function () {
                    v.css('opacity', 1),
                    v.prevAll('.ajax-loading-overlay').remove()
                })
            }).error(function () {
                e(document).trigger('ajaxloaderror', {
                    url: a,
                    hash: t
                })
            }).done(function (r) {
                e(document).trigger('ajaxloaddone', {
                    url: a,
                    hash: t
                });
                var o = e('a[data-url="' + t + '"]'),
                l = '';
                if (o.length > 0) {
                    var p = o.closest('.nav');
                    p.length > 0 && (u && (p.find('.active').each(function () {
                        var a = 'active';
                        (e(this).hasClass('hover') || h) && (a += ' open'),
                        e(this).removeClass(a),
                        h && e(this).find(' > .submenu').css('display', '')
                    }), o.closest('li').addClass('active').parents('.nav li').addClass('active open'), 'sidebar_scroll' in ace.helper && (ace.helper.sidebar_scroll.reset(), n && ace.helper.sidebar_scroll.scroll_to_active())), c && (l = i(o)))
                }
                r = String(r).replace(/<(title|link)([\s\>])/gi, '<div class="hidden ajax-append-$1"$2').replace(/<\/(title|link)\>/gi, '</div>'),
                v.empty().html(r),
                v.css('opacity', 0.6),
                setTimeout(function () {
                    e('head').find('link.ajax-stylesheet').remove();
                    var a = e('head').find('link#main-ace-style');
                    v.find('.ajax-append-link').each(function () {
                        var t = e(this);
                        if (t.attr('href')) {
                            var i = jQuery('<link />', {
                                type: 'text/css',
                                rel: 'stylesheet',
                                'class': 'ajax-stylesheet'
                            });
                            a.length > 0 ? i.insertBefore(a)  : i.appendTo('head'),
                            i.attr('href', t.attr('href'))
                        }
                        t.remove()
                    })
                }, 10),
                d && s(l, v),
                n || e('html,body').animate({
                    scrollTop: 0
                }, 250),
                e(document).trigger('ajaxloadcomplete', {
                    url: a,
                    hash: t
                })
            })
        }
    }
    function i(a) {
        var t = '',
        i = e('.breadcrumb');
        if (i.length > 0 && i.is(':visible')) {
            i.find('> li:not(:first-child)').remove();
            var s = 0;
            a.parents('.nav li').each(function () {
                var a = e(this).find('> a'),
                n = a.clone();
                n.find('i,.fa,.glyphicon,.ace-icon,.menu-icon,.badge,.label').remove();
                var r = n.text();
                n.remove();
                var o = a.attr('href');
                if (0 == s) {
                    var l = e('<li class="active"></li>').appendTo(i);
                    l.text(r),
                    t = r
                } else {
                    var l = e('<li><a /></li>').insertAfter(i.find('> li:first-child'));
                    l.find('a').attr('href', o).text(r)
                }
                s++
            })
        }
        return t
    }
    function s(a, t) {
        var i = t.find('.ajax-append-title');
        if (i.length > 0) document.title = i.text(),
        i.remove();
         else if (a.length > 0) {
            var s = e.trim(String(document.title).replace(/^(.*)[\-]/, ''));
            s && (s = ' - ' + s),
            a = e.trim(a) + s
        }
    }
    var n = a.content_url || !1,
    r = a.default_url || !1,
    o = a.loading_icon || 'fa-spinner fa-2x orange',
    l = a.loading_text || '',
    c = a.update_breadcrumbs || 'undefined' == typeof a.update_breadcrumbs,
    d = a.update_title || 'undefined' == typeof a.update_title,
    u = a.update_active || 'undefined' == typeof a.update_active,
    h = a.close_active || 'undefined' == typeof a.close_active;
    e(window).off('hashchange.ajax').on('hashchange.ajax', function (a, i) {
        var s = e.trim(window.location.hash);
        if (s && 0 != s.length) {
            s = s.replace(/^(\#\!)?\#/, '');
            var r = !1;
            'function' == typeof n && (r = n(s)),
            'string' == typeof r && t(r, s, i || !1)
        }
    }).trigger('hashchange.ajax', [
        !0
    ]),
    r && '' == window.location.hash && (window.location.hash = r)
},
ace.load_ajax_scripts = function (e, a) {
    jQuery.ajaxPrefilter('script', function (e) {
        e.cache = !0
    }),
    setTimeout(function () {
        'ajax_loaded_scripts' in ace.vars || (ace.vars.ajax_loaded_scripts = {
        });
        for (var t = [
        ], i = 0; i < e.length; i++) e[i] && !function () {
            var a = 'js-' + e[i].replace(/[^\w\d\-]/g, '-').replace(/\-\-/g, '-');
            a in ace.vars.ajax_loaded_scripts || t.push(jQuery.getScript(e[i]).done(function () {
                ace.vars.ajax_loaded_scripts[a] = !0
            }))
        }();
        t.length > 0 ? (t.push(jQuery.Deferred(function (e) {
            jQuery(e.resolve)
        })), jQuery.when.apply(null, t).then(function () {
            'function' == typeof a && a(),
            jQuery('.btn-group[data-toggle="buttons"] > .btn').button(),
            $(document).trigger('ajaxscriptsloaded')
        }))  : ('function' == typeof a && a(), jQuery('.btn-group[data-toggle="buttons"] > .btn').button(), $(document).trigger('ajaxscriptsloaded'))
    }, 10)
},
ace.submenu = {
    show: function (e, a) {
        var t,
        i = window.jQuery,
        s = i(e);
        if (s.trigger(t = i.Event('show.ace.submenu')), t.isDefaultPrevented()) return !1;
        s.css({
            height: 0,
            overflow: 'hidden',
            display: 'block'
        }).removeClass('nav-hide').addClass('nav-show').parent().addClass('open'),
        a > 0 && s.css({
            height: e.scrollHeight,
            'transition-property': 'height',
            'transition-duration': a / 1000 + 's'
        });
        var n = function (e, a) {
            e && e.stopPropagation(),
            s.css({
                'transition-property': '',
                'transition-duration': '',
                overflow: '',
                height: ''
            }),
            ace.vars.transition && s.off('.trans'),
            a !== !1 && s.trigger(i.Event('shown.ace.submenu'))
        };
        return a > 0 && ace.vars.transition ? s.one('transitionend.trans webkitTransitionEnd.trans mozTransitionEnd.trans oTransitionEnd.trans', n)  : n(),
        ace.vars.android && setTimeout(function () {
            n(null, !1)
        }, a + 20),
        !0
    },
    hide: function (e, a) {
        var t,
        i = window.jQuery,
        s = i(e);
        if (s.trigger(t = i.Event('hide.ace.submenu')), t.isDefaultPrevented()) return !1;
        s.css({
            height: e.scrollHeight,
            overflow: 'hidden'
        }).parent().removeClass('open'),
        e.offsetHeight,
        a > 0 && s.css({
            height: 0,
            'transition-property': 'height',
            'transition-duration': a / 1000 + 's'
        });
        var n = function (e, a) {
            e && e.stopPropagation(),
            s.css({
                display: 'none',
                overflow: '',
                height: '',
                'transition-property': '',
                'transition-duration': ''
            }).removeClass('nav-show').addClass('nav-hide'),
            ace.vars.transition && s.off('.trans'),
            a !== !1 && s.trigger(i.Event('hidden.ace.submenu'))
        };
        return a > 0 && ace.vars.transition ? s.one('transitionend.trans webkitTransitionEnd.trans mozTransitionEnd.trans oTransitionEnd.trans', n)  : n(),
        ace.vars.android && setTimeout(function () {
            n(null, !1)
        }, a + 20),
        !0
    },
    toggle: function (e, a) {
        if (0 == e.scrollHeight) {
            if (ace.submenu.show(e, a)) return 1
        } else if (ace.submenu.hide(e, a)) return - 1;
        return 0
    }
},
ace.sidebar_scrollable = function (e, a) {
    if (e.fn.ace_scroll) {
        var t = ace.vars.safari && navigator.userAgent.match(/version\/[1-5]/i),
        i = e('.sidebar'),
        s = (e('.navbar'), i.find('.nav-list')),
        n = i.find('.sidebar-toggle'),
        r = i.find('.sidebar-shortcuts'),
        o = e(window),
        l = i.get(0),
        c = s.get(0);
        if (l && c) {
            var d,
            u,
            h = null,
            v = null,
            p = null,
            f = null,
            g = null,
            m = !1,
            b = !1,
            w = a.scroll_to_active || !1,
            _ = a.include_shortcuts || !1,
            y = a.include_toggle || !1,
            C = a.smooth_scroll || !1,
            x = a.outside || !1,
            k = 'getComputedStyle' in window ? function () {
                return l.offsetHeight,
                'fixed' == window.getComputedStyle(l).position
            }
             : function () {
                return l.offsetHeight,
                'fixed' == i.css('position')
            },
            T = k(),
            j = i.hasClass('h-sidebar'),
            H = ace.helper.sidebar_scroll = {
                available_height: function () {
                    var e = s.parent().offset();
                    return T && (e.top -= ace.helper.scrollTop()),
                    o.innerHeight() - e.top - (y ? 0 : n.outerHeight())
                },
                content_height: function () {
                    return c.scrollHeight
                },
                initiate: function (a) {
                    if (!b && T) {
                        s.wrap('<div style="position: relative;" />'),
                        s.after('<div><div></div></div>'),
                        s.wrap('<div class="nav-wrap" />'),
                        y || n.css({
                            'z-index': 1
                        }),
                        _ || r.css({
                            'z-index': 99
                        }),
                        h = s.parent().next().ace_scroll({
                            size: H.available_height(),
                            reset: !0,
                            mouseWheelLock: !0,
                            hoverReset: !1,
                            dragEvent: !0,
                            touchDrag: !1
                        }).closest('.ace-scroll').addClass('nav-scroll'),
                        g = h.data('ace_scroll'),
                        v = h.find('.scroll-content').eq(0),
                        p = v.find(' > div').eq(0),
                        f = h.find('.scroll-bar').eq(0),
                        _ && (s.parent().prepend(r).wrapInner('<div />'), s = s.parent()),
                        y && (s.append(n), s.closest('.nav-wrap').addClass('nav-wrap-t')),
                        s.css({
                            position: 'relative'
                        }),
                        x === !0 && h.addClass('scrollout'),
                        c = s.get(0),
                        c.style.top = 0,
                        v.on('scroll.nav', function () {
                            c.style.top = - 1 * this.scrollTop + 'px'
                        }),
                        s.on('mousewheel.ace_scroll DOMMouseScroll.ace_scroll', function (e) {
                            return h.trigger(e)
                        });
                        var i = v.get(0);
                        if (s.on('ace_drag.nav', function (e) {
                            if (!m) return void (e.retval.cancel = !0);
                            if ('up' == e.direction || 'down' == e.direction) {
                                g.move_bar(!0);
                                var a = e.dy;
                                a = parseInt(Math.min(d, a)),
                                Math.abs(a) > 2 && (a = 2 * a),
                                0 != a && (i.scrollTop = i.scrollTop + a, c.style.top = - 1 * i.scrollTop + 'px')
                            }
                        }), C && s.on('touchstart.nav MSPointerDown.nav pointerdown.nav', function () {
                            s.css('transition-property', 'none'),
                            f.css('transition-property', 'none')
                        }).on('touchend.nav touchcancel.nav MSPointerUp.nav MSPointerCancel.nav pointerup.nav pointercancel.nav', function () {
                            s.css('transition-property', 'top'),
                            f.css('transition-property', 'top')
                        }), t && !y) {
                            var o = n.get(0);
                            o && v.on('scroll.safari', function () {
                                ace.helper.redraw(o)
                            })
                        }
                        if (b = !0, 1 == a && (H.reset(), w && H.scroll_to_active(), w = !1), 'number' == typeof C && C > 0 && (s.css({
                            'transition-property': 'top',
                            'transition-duration': (C / 1000).toFixed(2) + 's'
                        }), f.css({
                            'transition-property': 'top',
                            'transition-duration': (C / 1500).toFixed(2) + 's'
                        }), h.on('drag.start', function (e) {
                            e.stopPropagation(),
                            s.css('transition-property', 'none')
                        }).on('drag.end', function (e) {
                            e.stopPropagation(),
                            s.css('transition-property', 'top')
                        })), ace.vars.android) {
                            var l = ace.helper.scrollTop();
                            2 > l && (window.scrollTo(l, 0), setTimeout(function () {
                                H.reset()
                            }, 20));
                            var u,
                            k = ace.helper.winHeight();
                            e(window).on('scroll.ace_scroll', function () {
                                m && g.is_active() && (u = ace.helper.winHeight(), u != k && (k = u, H.reset()))
                            })
                        }
                    }
                },
                scroll_to_active: function () {
                    if (g && g.is_active()) try {
                        var e,
                        a = i.find('.nav-list');
                        ace.vars.minimized && !ace.vars.collapsible ? e = a.find('> .active')  : (e = s.find('> .active.hover'), 0 == e.length && (e = s.find('.active:not(.open)')));
                        var t = e.outerHeight();
                        a = a.get(0);
                        for (var n = e.get(0); n != a; ) t += n.offsetTop,
                        n = n.parentNode;
                        var r = t - h.height();
                        r > 0 && (c.style.top = - r + 'px', v.scrollTop(r))
                    } catch (o) {
                    }
                },
                reset: function () {
                    if (!T) return void H.disable();
                    b || H.initiate();
                    var e = !ace.vars.collapsible && (!j || j && ace.vars.mobile_view) && (d = H.available_height()) < (u = c.scrollHeight);
                    m = !0,
                    e && (p.css({
                        height: u,
                        width: 8
                    }), h.prev().css({
                        'max-height': d
                    }), g.update({
                        size: d
                    }).enable().reset()),
                    e && g.is_active() ? i.addClass('sidebar-scroll')  : m && H.disable()
                },
                disable: function () {
                    m = !1,
                    h && (h.css({
                        height: '',
                        'max-height': ''
                    }), p.css({
                        height: '',
                        width: ''
                    }), h.prev().css({
                        'max-height': ''
                    }), g.disable()),
                    parseInt(c.style.top) < 0 && C && ace.vars.transition ? s.one('transitionend.trans webkitTransitionEnd.trans mozTransitionEnd.trans oTransitionEnd.trans', function () {
                        i.removeClass('sidebar-scroll'),
                        s.off('.trans')
                    })  : i.removeClass('sidebar-scroll'),
                    c.style.top = 0
                },
                prehide: function (e) {
                    if (m && !ace.vars.minimized) if (H.content_height() + e < H.available_height()) H.disable();
                     else if (0 > e) {
                        var a = v.scrollTop() + e;
                        if (0 > a) return;
                        c.style.top = - 1 * a + 'px'
                    }
                },
                _reset: function () {
                    ace.vars.webkit ? setTimeout(function () {
                        H.reset()
                    }, 0)  : H.reset()
                }
            };
            H.initiate(!0),
            e(document).on('settings.ace.scroll', function (e, a) {
                'sidebar_collapsed' == a && T ? H.reset()  : ('sidebar_fixed' === a || 'navbar_fixed' === a) && (T = k(), T && !m ? H.reset()  : T || H.disable())
            }),
            o.on('resize.ace.scroll', function () {
                T = k(),
                H.reset()
            }),
            i.on('hidden.ace.submenu shown.ace.submenu', '.submenu', function (e) {
                e.stopPropagation(),
                ace.vars.minimized || H._reset()
            })
        }
    }
},
ace.sidebar_hoverable = function (e, a) {
    function t(a) {
        var t = e(a);
        a.style.removeProperty('top'),
        a.style.removeProperty('bottom');
        var s = null;
        ace.vars.minimized && (s = a.parentNode.querySelector('.menu-text')) && s.style.removeProperty('margin-top');
        var n = t.offset(),
        r = ace.helper.scrollTop(),
        o = !1,
        c = r;
        d && (c += l.clientHeight + 1);
        var h = a.scrollHeight;
        s && (h += 40, n.top -= 40);
        var v,
        p = parseInt(n.top + h),
        f = window.innerHeight;
        if ((v = p - (f + r - 50)) > 0) if (u > h - v && n.top - v > c) a.style.top = 'auto',
        a.style.bottom = '-10px',
        s && (s.style.marginTop = - (h - 50) + 'px', o = !0);
         else {
            n.top - v < c && (v = n.top - c),
            p - v < n.top + u && (v -= u);
            var g = s ? 40 : 20;
            v > g && (a.style.top = - v + 'px', s && (s.style.marginTop = - v + 'px', o = !0))
        }
        var m = this.className.lastIndexOf('pull_up');
        if (o) {
            if ( - 1 == m && (this.className = this.className + ' pull_up'), i) {
                var b = h + n.top - v;
                0 > f - b ? e(a).css({
                    'max-height': h + f - b - 50,
                    'overflow-x': 'hidden',
                    'overflow-y': 'scroll'
                }).on('mousewheel.sub_scroll DOMMouseScroll.sub_scroll ace_drag.sub_scroll', function (e) {
                    e.stopPropagation()
                })  : e(a).css({
                    'max-height': '',
                    'overflow-x': '',
                    'overflow-y': ''
                }).off('mousewheel.sub_scroll DOMMouseScroll.sub_scroll ace_drag.sub_scroll', function (e) {
                    e.stopPropagation()
                })
            }
        } else m >= 0 && (this.className = this.className.replace(/(^|\s)pull_up($|\s)/, ' '));
        ace.vars.safari && ace.helper.redraw(a)
    }
    if ('querySelector' in document && 'removeProperty' in document.documentElement.style) {
        var i = a.sub_scroll || !1;
        ace.helper.sidebar_hover = {
            reset: function () {
                n.find('.submenu').each(function () {
                    var a = this,
                    t = this.parentNode;
                    if (a) {
                        a.style.removeProperty('top'),
                        a.style.removeProperty('bottom');
                        var i = t.querySelector('.menu-text');
                        i && i.style.removeProperty('margin-top')
                    }
                    t.className.lastIndexOf('_up') >= 0 && e(t).removeClass('pull_up')
                })
            }
        };
        var s = 'getComputedStyle' in window ? function (e, a) {
            return e.offsetHeight,
            window.getComputedStyle(e).position == a
        }
         : function (a, t) {
            return a.offsetHeight,
            e(a).css('position') == t
        };
        e(window).on('resize.ace_hover', function () {
            d = s(l, 'fixed'),
            ace.helper.sidebar_hover.reset()
        }),
        e(document).on('settings.ace.hover', function (e, a, t) {
            'sidebar_collapsed' == a ? ace.helper.sidebar_hover.reset()  : 'navbar_fixed' == a && (d = t)
        });
        var n = e('.sidebar').eq(0),
        r = (n.get(0), n.find('.nav-list').get(0)),
        o = e('.navbar').eq(0),
        l = o.get(0),
        c = n.hasClass('h-sidebar'),
        d = 'fixed' == o.css('position');
        n.find('.submenu').parent().addClass('hsub');
        var i = i && ace.vars.touch || !1;
        n.on('mouseenter.ace_hover', '.nav-list li.hsub', function () {
            if (!(ace.vars.collapsible || c && !ace.vars.mobile_view)) {
                var e = this.querySelector('.submenu');
                e && (ace.helper.hasClass(this, 'hover') && s(e, 'absolute') ? t.call(this, e)  : this.parentNode == r && ace.vars.minimized && t.call(this, e))
            }
        });
        var u = 50
    }
},
ace.widget_boxes = function (e) {
    e(document).on('hide.bs.collapse show.bs.collapse', function (a) {
        var t = a.target.getAttribute('id'),
        i = e('a[href*="#' + t + '"]');
        0 == i.length && (i = e('a[data-target*="#' + t + '"]')),
        0 != i.length && i.find(ace.vars['.icon']).each(function () {
            var t,
            i = e(this),
            s = null,
            n = null;
            return (s = i.attr('data-icon-show')) ? n = i.attr('data-icon-hide')  : (t = i.attr('class').match(/fa\-(.*)\-(up|down)/)) && (s = 'fa-' + t[1] + '-down', n = 'fa-' + t[1] + '-up'),
            s ? ('show' == a.type ? i.removeClass(s).addClass(n)  : i.removeClass(n).addClass(s), !1)  : void 0
        })
    });
    var a = function (a) {
        this.$box = e(a);
        this.reload = function () {
            var e = this.$box,
            a = !1;
            'static' == e.css('position') && (a = !0, e.addClass('position-relative')),
            e.append('<div class="widget-box-overlay"><i class="' + ace.vars.icon + 'loading-icon fa fa-spinner fa-spin fa-2x white"></i></div>'),
            e.one('reloaded.ace.widget', function () {
                e.find('.widget-box-overlay').remove(),
                a && e.removeClass('position-relative')
            })
        },
        this.close = function () {
            var e = this.$box,
            a = 300;
            e.fadeOut(a, function () {
                e.trigger('closed.ace.widget'),
                e.remove()
            })
        },
        this.toggle = function (e, a) {
            var t = this.$box,
            i = t.find('.widget-body'),
            s = null,
            n = 'undefined' != typeof e ? e : t.hasClass('collapsed') ? 'show' : 'hide',
            r = 'show' == n ? 'shown' : 'hidden';
            if ('undefined' == typeof a && (a = t.find('> .widget-header a[data-action=collapse]').eq(0), 0 == a.length && (a = null)), a) {
                s = a.find(ace.vars['.icon']).eq(0);
                var o,
                l = null,
                c = null;
                (l = s.attr('data-icon-show')) ? c = s.attr('data-icon-hide')  : (o = s.attr('class').match(/fa\-(.*)\-(up|down)/)) && (l = 'fa-' + o[1] + '-down', c = 'fa-' + o[1] + '-up')
            }
            var d = 250,
            u = 200;
            'show' == n ? (s && s.removeClass(l).addClass(c), i.hide(), t.removeClass('collapsed'), i.slideDown(d, function () {
                t.trigger(r + '.ace.widget')
            }))  : (s && s.removeClass(c).addClass(l), i.slideUp(u, function () {
                t.addClass('collapsed'),
                t.trigger(r + '.ace.widget')
            }))
        },
        this.hide = function () {
            this.toggle('hide')
        },
        this.show = function () {
            this.toggle('show')
        },
        this.fullscreen = function () {
            var e = this.$box.find('> .widget-header a[data-action=fullscreen]').find(ace.vars['.icon']).eq(0),
            a = null,
            t = null;
            (a = e.attr('data-icon1')) ? t = e.attr('data-icon2')  : (a = 'fa-expand', t = 'fa-compress'),
            this.$box.hasClass('fullscreen') ? (e.addClass(a).removeClass(t), this.$box.removeClass('fullscreen'))  : (e.removeClass(a).addClass(t), this.$box.addClass('fullscreen')),
            this.$box.trigger('fullscreened.ace.widget')
        }
    };
    e.fn.widget_box = function (t, i) {
        var s,
        n = this.each(function () {
            var n = e(this),
            r = n.data('widget_box'),
            o = 'object' == typeof t && t;
            r || n.data('widget_box', r = new a(this, o)),
            'string' == typeof t && (s = r[t](i))
        });
        return void 0 === s ? n : s
    },
    e(document).on('click.ace.widget', '.widget-header a[data-action]', function (t) {
        t.preventDefault();
        var i = e(this),
        s = i.closest('.widget-box');
        if (0 != s.length && !s.hasClass('ui-sortable-helper')) {
            var n = s.data('widget_box');
            n || s.data('widget_box', n = new a(s.get(0)));
            var r = i.data('action');
            if ('collapse' == r) {
                var o,
                l = s.hasClass('collapsed') ? 'show' : 'hide';
                if (s.trigger(o = e.Event(l + '.ace.widget')), o.isDefaultPrevented()) return;
                n.toggle(l, i)
            } else if ('close' == r) {
                var o;
                if (s.trigger(o = e.Event('close.ace.widget')), o.isDefaultPrevented()) return;
                n.close()
            } else if ('reload' == r) {
                i.blur();
                var o;
                if (s.trigger(o = e.Event('reload.ace.widget')), o.isDefaultPrevented()) return;
                n.reload()
            } else if ('fullscreen' == r) {
                var o;
                if (s.trigger(o = e.Event('fullscreen.ace.widget')), o.isDefaultPrevented()) return;
                n.fullscreen()
            } else 'settings' == r && s.trigger('setting.ace.widget')
        }
    })
},
ace.settings_box = function (e) {
    e('#ace-settings-btn').on(ace.click_event, function (a) {
        a.preventDefault(),
        e(this).toggleClass('open'),
        e('#ace-settings-box').toggleClass('open')
    }),
    e('#ace-settings-navbar').on('click', function () {
        ace.settings.navbar_fixed(this.checked)
    }).each(function () {
        this.checked = ace.settings.is('navbar', 'fixed')
    }),
    e('#ace-settings-sidebar').on('click', function () {
        ace.settings.sidebar_fixed(this.checked)
    }).each(function () {
        this.checked = ace.settings.is('sidebar', 'fixed')
    }),
    e('#ace-settings-breadcrumbs').on('click', function () {
        ace.settings.breadcrumbs_fixed(this.checked)
    }).each(function () {
        this.checked = ace.settings.is('breadcrumbs', 'fixed')
    }),
    e('#ace-settings-add-container').on('click', function () {
        ace.settings.main_container_fixed(this.checked)
    }).each(function () {
        this.checked = ace.settings.is('main-container', 'fixed')
    }),
    e('#ace-settings-compact').removeAttr('checked').on('click', function () {
        if (this.checked) {
            e('#sidebar').addClass('compact');
            var a = e('#ace-settings-hover');
            a.length > 0 && !a.get(0).checked && a.removeAttr('checked').trigger('click')
        } else e('#sidebar').removeClass('compact'),
        'sidebar_scroll' in ace.helper && ace.helper.sidebar_scroll.reset()
    }),
    e('#ace-settings-highlight').removeAttr('checked').on('click', function () {
        this.checked ? e('#sidebar .nav-list > li').addClass('highlight')  : e('#sidebar .nav-list > li').removeClass('highlight')
    }),
    e('#ace-settings-hover').removeAttr('checked').on('click', function () {
        if (!e('.sidebar').hasClass('h-sidebar')) {
            if (this.checked) e('#sidebar li').addClass('hover').filter('.open').removeClass('open').find('> .submenu').css('display', 'none');
             else {
                e('#sidebar li.hover').removeClass('hover');
                var a = e('#ace-settings-compact');
                a.length > 0 && a.get(0).checked && a.trigger('click'),
                'sidebar_hover' in ace.helper && ace.helper.sidebar_hover.reset()
            }
            'sidebar_scroll' in ace.helper && ace.helper.sidebar_scroll.reset()
        }
    })
},
ace.settings_rtl = function (e) {
    e('#ace-settings-rtl').removeAttr('checked').on('click', function () {
        ace.switch_direction(jQuery)
    })
},
ace.switch_direction = function (e) {
    function a(e, a) {
        t.find('.' + e).removeClass(e).addClass('tmp-rtl-' + e).end().find('.' + a).removeClass(a).addClass(e).end().find('.tmp-rtl-' + e).removeClass('tmp-rtl-' + e).addClass(a)
    }
    var t = e(document.body);
    t.toggleClass('rtl').find('.dropdown-menu:not(.datepicker-dropdown,.colorpicker)').toggleClass('dropdown-menu-right').end().find('.pull-right:not(.dropdown-menu,blockquote,.profile-skills .pull-right)').removeClass('pull-right').addClass('tmp-rtl-pull-right').end().find('.pull-left:not(.dropdown-submenu,.profile-skills .pull-left)').removeClass('pull-left').addClass('pull-right').end().find('.tmp-rtl-pull-right').removeClass('tmp-rtl-pull-right').addClass('pull-left').end().find('.chosen-select').toggleClass('chosen-rtl').next().toggleClass('chosen-rtl'),
    a('align-left', 'align-right'),
    a('no-padding-left', 'no-padding-right'),
    a('arrowed', 'arrowed-right'),
    a('arrowed-in', 'arrowed-in-right'),
    a('tabs-left', 'tabs-right'),
    a('messagebar-item-left', 'messagebar-item-right'),
    e('.fa').each(function () {
        if (!(this.className.match(/ui-icon/) || e(this).closest('.fc-button').length > 0)) for (var a = this.attributes.length, t = 0; a > t; t++) {
            var i = this.attributes[t].value;
            i.match(/fa\-(?:[\w\-]+)\-left/) ? this.attributes[t].value = i.replace(/fa\-([\w\-]+)\-(left)/i, 'fa-$1-right')  : i.match(/fa\-(?:[\w\-]+)\-right/) && (this.attributes[t].value = i.replace(/fa\-([\w\-]+)\-(right)/i, 'fa-$1-left'))
        }
    });
    var i = t.hasClass('rtl');
    i ? e('.scroll-hz').addClass('make-ltr').find('.scroll-content').wrapInner('<div class="make-rtl" />')  : e('.scroll-hz').removeClass('make-ltr').find('.make-rtl').children().unwrap(),
    e.fn.ace_scroll && e('.scroll-hz').ace_scroll('reset');
    try {
        var s = e('#piechart-placeholder');
        if (s.length > 0) {
            var n = e(document.body).hasClass('rtl') ? 'nw' : 'ne';
            s.data('draw').call(s.get(0), s, s.data('chart'), n)
        }
    } catch (r) {
    }
},
ace.settings_skin = function (e) {
    try {
        e('#skin-colorpicker').ace_colorpicker()
    } catch (a) {
    }
    e('#skin-colorpicker').on('change', function () {
        var a = e(this).find('option:selected').data('skin'),
        t = e(document.body);
        t.removeClass('no-skin skin-1 skin-2 skin-3'),
        t.addClass(a),
        ace.data.set('skin', a);
        var i = [
            'red',
            'blue',
            'green',
            ''
        ];
        e('.ace-nav > li.grey').removeClass('dark'),
        e('.ace-nav > li').removeClass('no-border margin-1'),
        e('.ace-nav > li:not(:last-child)').removeClass('light-pink').find('> a > ' + ace.vars['.icon']).removeClass('pink').end().eq(0).find('.badge').removeClass('badge-warning'),
        e('.sidebar-shortcuts .btn').removeClass('btn-pink btn-white').find(ace.vars['.icon']).removeClass('white'),
        e('.ace-nav > li.grey').removeClass('red').find('.badge').removeClass('badge-yellow'),
        e('.sidebar-shortcuts .btn').removeClass('btn-primary btn-white');
        var s = 0;
        e('.sidebar-shortcuts .btn').each(function () {
            e(this).find(ace.vars['.icon']).removeClass(i[s++])
        });
        var n = [
            'btn-success',
            'btn-info',
            'btn-warning',
            'btn-danger'
        ];
        if ('no-skin' == a) {
            var s = 0;
            e('.sidebar-shortcuts .btn').each(function () {
                e(this).attr('class', 'btn ' + n[s++ % 4])
            })
        } else if ('skin-1' == a) {
            e('.ace-nav > li.grey').addClass('dark');
            var s = 0;
            e('.sidebar-shortcuts').find('.btn').each(function () {
                e(this).attr('class', 'btn ' + n[s++ % 4])
            })
        } else if ('skin-2' == a) e('.ace-nav > li').addClass('no-border margin-1'),
        e('.ace-nav > li:not(:last-child)').addClass('light-pink').find('> a > ' + ace.vars['.icon']).addClass('pink').end().eq(0).find('.badge').addClass('badge-warning'),
        e('.sidebar-shortcuts .btn').attr('class', 'btn btn-white btn-pink').find(ace.vars['.icon']).addClass('white');
         else if ('skin-3' == a) {
            t.addClass('no-skin'),
            e('.ace-nav > li.grey').addClass('red').find('.badge').addClass('badge-yellow');
            var s = 0;
            e('.sidebar-shortcuts .btn').each(function () {
                e(this).attr('class', 'btn btn-primary btn-white'),
                e(this).find(ace.vars['.icon']).addClass(i[s++])
            })
        }
        'sidebar_scroll' in ace.helper && ace.helper.sidebar_scroll.reset()
    })
},
ace.widget_reload_handler = function (e) {
    e(document).on('reload.ace.widget', '.widget-box', function () {
        var a = e(this);
        setTimeout(function () {
            a.trigger('reloaded.ace.widget')
        }, parseInt(1000 * Math.random() + 1000))
    })
},
ace.enable_searchbox_autocomplete = function (e) {
    ace.vars.US_STATES = [
        'Alabama',
        'Alaska',
        'Arizona',
        'Arkansas',
        'California',
        'Colorado',
        'Connecticut',
        'Delaware',
        'Florida',
        'Georgia',
        'Hawaii',
        'Idaho',
        'Illinois',
        'Indiana',
        'Iowa',
        'Kansas',
        'Kentucky',
        'Louisiana',
        'Maine',
        'Maryland',
        'Massachusetts',
        'Michigan',
        'Minnesota',
        'Mississippi',
        'Missouri',
        'Montana',
        'Nebraska',
        'Nevada',
        'New Hampshire',
        'New Jersey',
        'New Mexico',
        'New York',
        'North Dakota',
        'North Carolina',
        'Ohio',
        'Oklahoma',
        'Oregon',
        'Pennsylvania',
        'Rhode Island',
        'South Carolina',
        'South Dakota',
        'Tennessee',
        'Texas',
        'Utah',
        'Vermont',
        'Virginia',
        'Washington',
        'West Virginia',
        'Wisconsin',
        'Wyoming'
    ];
    try {
        e('#nav-search-input').bs_typeahead({
            source: ace.vars.US_STATES,
            updater: function (a) {
                return e('#nav-search-input').focus(),
                a
            }
        })
    } catch (a) {
    }
};
