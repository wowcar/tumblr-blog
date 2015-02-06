function tumblrNotesInserted() {
    if ($(".more_notes_link").length) {
        Optica.LOADING_NOTES = false
    } else {
        Optica.DONE_LOADING_NOTES = true
    }
}
(function(e, t) {
    var n = {init: function() {
            this.globals();
            this.devices();
            this.like_button();
            this.in_iframe();
            this.like_button();
            this.link_color();
            this.description_color();
            if (e(".header-image").length) {
                this.load_header()
            }
            if (Function("/*@cc_on return document.documentMode===10@*/")()) {
                Optica.$body.addClass("ie10")
            }
        },globals: function() {
            Optica.$win = e(window);
            Optica.$doc = e(document);
            Optica.$body = e("body");
            Optica.$win_body = e("html, body")
        },in_iframe: function() {
            if (window.self !== window.top) {
                Optica.$body.addClass("iframe")
            }
        },is_touch_device: function() {
            return !!("ontouchstart" in window) || !!window.navigator.msMaxTouchPoints
        },load_header: function() {
            var t = e(".header-image");
            if (Optica.$body.hasClass("iframe") || Optica.$body.hasClass("touch")) {
                t.css({opacity: 1}).addClass("loaded")
            } else {
                var n = t.data("bg-image");
                var r = new Image;
                e(r).bind("load", function(e) {
                    t.addClass("loaded")
                });
                r.src = n
            }
        },like_button: function() {
            e("#posts").on("mouseenter touchstart", ".like_button", function(t) {
                var n = e(t.currentTarget);
                if (!n.hasClass("liked"))
                    n.addClass("interacted")
            })
        },link_color: function() {
            var e = Optica.Utils.hex_to_hsv(Optica.ACCENT_COLOR);
            var t = Optica.Utils.hex_to_hsv(Optica.BACKGROUND_COLOR);
            if (e.s < .2 && e.v > .8) {
                Optica.$body.addClass("light-accent");
                if (t.s < .2 && t.v > .8) {
                    Optica.$body.addClass("light-on-light")
                }
            }
            if (e.v < .2 && t.v < .2) {
                Optica.$body.addClass("dark-on-dark")
            }
        },description_color: function() {
            var t = e(".title-group .description");
            if (!t.length)
                return;
            var n = Optica.Utils.hex_to_rgb(Optica.TITLE_COLOR);
            t.css({color: "rgba(" + n.r + "," + n.g + "," + n.b + ", 0.7)"})
        },devices: function() {
            var t = navigator.userAgent;
            var n;
            var r;
            if (this.is_touch_device()) {
                Optica.$body.addClass("touch");
                if (!Optica.$body.hasClass("permalink")) {
                    setTimeout(function() {
                        window.scrollTo(0, 1)
                    }, 1)
                }
            }
            if (t.match(/(iPhone|iPod|iPad)/)) {
                this.ios()
            } else if (n = t.match(/Android\s([0-9\.]*)/)) {
                r = n[1];
                Optica.$body.addClass("android");
                if (parseFloat(r) < 4.4) {
                    Optica.$body.addClass("android-lt-4-4")
                }
            }
            e("#posts").on("click", "a.open-in-app", e.proxy(function(t) {
                t.preventDefault();
                var n = e(t.currentTarget).data("post");
                this.open_in_app(n)
            }, this))
        },ios: function() {
            Optica.$body.addClass("ios");
            this.is_ios = true
        },open_in_app: function(t) {
            if (!t || typeof t !== "number")
                return;
            var n = "//www.tumblr.com/open/app?referrer=blog_popover&app_args=" + encodeURIComponent("blog?blogName=") + e("body").data("urlencoded-name") + encodeURIComponent("&postID=" + t);
            if (this.is_ios) {
                this.open_in_app_or_store(n);
                return
            }
            document.location = n
        },open_in_app_or_store: function(e) {
            var t = "itms-apps://itunes.com/apps/tumblr/tumblr";
            var n = document.getElementById("app_protocol_check") || document.createElement("iFrame");
            n.setAttribute("id", "app_protocol_check");
            n.style.display = "none";
            document.body.appendChild(n);
            n.src = e;
            setTimeout(function() {
                document.location.href = t
            }, 1e3)
        },rgb_to_hex: function(e, t, n) {
            return "#" + ((1 << 24) + (e << 16) + (t << 8) + n).toString(16).slice(1)
        },hex_to_rgb: function(e) {
            e = (new String(e)).replace(/[^0-9a-f]/gi, "");
            if (e.length < 6) {
                e = e[0] + e[0] + e[1] + e[1] + e[2] + e[2]
            }
            var t = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);
            return t ? {r: parseInt(t[1], 16),g: parseInt(t[2], 16),b: parseInt(t[3], 16)} : null
        },rgb_to_hsv: function(e, t, n) {
            var r = Math.min(Math.min(e, t), n);
            var i = Math.max(Math.max(e, t), n);
            var s = i - r;
            var o = {h: 6,s: i ? (i - r) / i : 0,v: i / 255};
            if (!s) {
                o.h = 0
            } else if (i === e) {
                o.h += (t - n) / s
            } else if (i === t) {
                o.h += 2 + (n - e) / s
            } else {
                o.h += 4 + (e - t) / s
            }
            o.h = 60 * o.h % 360;
            return o
        },hsv_to_rgb: function(e, t, n) {
            var r, i, s;
            if (!t) {
                r = i = s = n
            } else {
                r = i = s = 0;
                var o = (e + 360) % 360 / 60;
                var u = n * t;
                var a = n - u;
                var f = u * (1 - Math.abs(o % 2 - 1));
                if (o < 1) {
                    r = u;
                    i = f
                } else if (o < 2) {
                    r = f;
                    i = u
                } else if (o < 3) {
                    i = u;
                    s = f
                } else if (o < 4) {
                    i = f;
                    s = u
                } else if (o < 5) {
                    s = u;
                    r = f
                } else {
                    s = f;
                    r = u
                }
                r += a;
                i += a;
                s += a
            }
            return {r: Math.round(255 * r),g: Math.round(255 * i),b: Math.round(255 * s)}
        },hex_to_hsv: function(n) {
            n = (new String(n)).replace(/[^0-9a-f]/gi, "");
            if (n.length < 6) {
                n = n[0] + n[0] + n[1] + n[1] + n[2] + n[2]
            }
            var r = t.Utils.hex_to_rgb(n);
            var i = e.map(r, function(e) {
                return e
            });
            var s = t.Utils.rgb_to_hsv.apply(t.Utils, i);
            return s
        },hsv_to_hex: function(n, r, i) {
            var s = t.Utils.hsv_to_rgb(n, r, i);
            var o = e.map(s, function(e) {
                return e
            });
            var u = t.Utils.rgb_to_hex.apply(t.Utils, o);
            return u
        },hex_brightness: function(e, t) {
            e = String(e).replace(/[^0-9a-f]/gi, "");
            if (e.length < 6) {
                e = e[0] + e[0] + e[1] + e[1] + e[2] + e[2]
            }
            t = t || 0;
            var n = parseInt(e, 16), r = t < 0 ? 0 : 255, i = t < 0 ? -t : t, s = n >> 16, o = n >> 8 & 255, u = n & 255, a, f, l;
            a = Math.round((r - s) * i) + s;
            f = Math.round((r - o) * i) + o;
            l = Math.round((r - u) * i) + u;
            return "#" + (16777216 + a * 65536 + f * 256 + l).toString(16).slice(1)
        }};
    var r = function() {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(e) {
            window.setTimeout(e, 1e3 / 20)
        }
    }();
    var i = {init: function() {
            this.tick = false;
            this.event_loop()
        },event_loop: function() {
            Optica.$win.on("scroll.Eventor:next-frame", e.proxy(function() {
                if (!this.tick) {
                    r(e.proxy(this.next_frame, this));
                    this.tick = true
                }
            }, this))
        },next_frame: function(e) {
            Optica.$win.trigger("Eventor:scroll");
            this.tick = false
        }};
    var s = function(t, n) {
        if (!(this instanceof s)) {
            return new s(t, n)
        }
        this.el = typeof t === "string" ? e(t).get(0) : t;
        this.$el = e(t);
        this.options = n;
        this.metadata = this.$el.data("plugin-options");
        this.config = e.extend({}, s.defaults, this.options, this.metadata);
        this.trigger = this.config.trigger || false;
        this.$trigger = e(this.config.trigger) || this.$el;
        this.bind_events();
        return this
    };
    s.prototype = {__mouse_enter: function(t) {
            this.show(e(t.currentTarget))
        },__mouse_leave: function(t) {
            this.hide(e(t.currentTarget))
        },bind_events: function() {
            this.$el.on("mouseenter", this.trigger, e.proxy(this.__mouse_enter, this));
            this.$el.on("mouseleave", this.trigger, e.proxy(this.__mouse_leave, this))
        },show: function(t) {
            clearTimeout(this.leave_delay);
            e(this.trigger).removeClass("active");
            t.addClass("active")
        },hide: function(t) {
            Optica.Popmenu.hide_all();
            this.leave_delay = setTimeout(e.proxy(function() {
                t.removeClass("active");
                clearTimeout(this.leave_delay)
            }, this), this.config.forgiveness_delay)
        }};
    s.defaults = {forgiveness_delay: 0};
    e.fn.drawer = function(e) {
        return this.each(function() {
            new s(this, e)
        })
    };
    var o = function(t, n) {
        this.$el = e(t);
        this.options = e.extend({animate_opacity: false,animate_position: true,inertia: .3,opacity_inertia: .4}, n || {});
        this.inertia = this.options.inertia;
        Optica.$win.on("Eventor:scroll", e.proxy(this.__window_scroll, this))
    };
    o.prototype = {__window_scroll: function() {
            this.parallax()
        },reset_offset: function() {
            this.$el.css({transform: "translate3d(0, 0, 0)"})
        },parallax: function() {
            var e = Optica.$win.scrollTop();
            var t = Math.round(e * this.inertia);
            if (t > 400)
                return;
            if (this.options.animate_opacity) {
                var n = e * this.options.opacity_inertia;
                var r = (100 - n) / 100;
                if (r < 0)
                    r = 0;
                this.$el.css({opacity: r})
            }
            if (this.options.animate_position) {
                this.$el.css({transform: "translate3d(0," + t + "px, 0)"})
            }
        }};
    var u = function(t, n, r) {
        if (!(this instanceof u)) {
            return new u(t, n, r)
        }
        this.el = typeof t === "string" ? e(t).get(0) : t;
        this.$el = e(t);
        this.config = e.extend({}, u.defaults, n);
        this.callback = r || function() {
        };
        this.successes = 0;
        this.errors = 0;
        this.items = [];
        this.get_items();
        return this
    };
    u.prototype = {get_items: function() {
            this.items = this.el.querySelectorAll(this.config.selector);
            if (!this.items.length)
                this.callback();
            for (var t = 0, n = this.items.length; t < n; t++) {
                this.re_load(e(this.items[t]))
            }
        },re_load: function(t) {
            t.on("load", e.proxy(function() {
                this.successes += 1;
                if (this.done()) {
                    this.callback.apply(this)
                }
            }, this));
            t.on("error", function() {
                this.errors += 1
            });
            t.attr({src: t.attr("src")})
        },done: function() {
            return this.items.length === this.successes + this.errors
        }};
    u.defaults = {selector: "iframe"};
    e.fn.iframesLoaded = function(e, t) {
        return this.each(function() {
            new u(this, e, t)
        })
    };
    var a = function(t, n) {
        if (!(this instanceof a)) {
            return new a(t, n)
        }
        this.el = typeof t === "string" ? e(t).get(0) : t;
        this.$el = e(t);
        this.options = n;
        this.metadata = this.$el.data("plugin-options");
        this.config = e.extend({}, a.defaults, this.options, this.metadata);
        this.trigger = this.config.trigger;
        this.$trigger = this.$el.find(this.trigger);
        this.$search_input = e("#search input");
        this.events = {trigger_click: e.proxy(this.__trigger_click, this),document_click: e.proxy(this.__document_click, this),glass_click: e.proxy(this.__class_click, this),offset_scroll: e.proxy(this._check_offset, this)};
        this.bind_events();
        a.register(this);
        return this
    };
    a.prototype = {__document_click: function(t) {
            var n = e(t.target);
            if (this.$popover && this.$popover.hasClass("active") && !this.$el.has(n.parents(this.config.container)).length) {
                this.hide()
            }
        },__trigger_click: function(t) {
            t.preventDefault();
            this.$trigger = e(t.currentTarget);
            this.$container = this.$trigger.parents(this.config.container);
            this.$glass = this.$container.siblings(this.config.glass);
            this.$popover = this.$trigger.siblings(this.config.popopver);
            if (!this.$popover.hasClass("active")) {
                this.show()
            } else {
                this.hide()
            }
        },_check_offset: function() {
            if (Math.abs(this.scroll_offset - Optica.$win.scrollTop()) > this.config.scroll_distance) {
                if (!this.$search_input.is(":focus")) {
                    this.hide()
                }
            }
        },bind_events: function() {
            this.$el.on("touchstart click", this.trigger, this.events.trigger_click);
            Optica.$doc.on("click", this.events.document_click)
        },unbind_events: function() {
            this.$el.off("click", this.trigger, this.events.trigger_click);
            Optica.$doc.off("click", this.events.document_click)
        },destroy: function() {
        },show: function() {
            if (this.$glass)
                this.$glass.addClass("active");
            this.$popover.parents("article").addClass("visible");
            this.$popover.addClass("show");
            this.$trigger.addClass("show");
            setTimeout(e.proxy(function() {
                this.$trigger.addClass("active");
                this.$container.addClass("active");
                this.$popover.addClass("active");
                this.scroll_offset = Optica.$win.scrollTop();
                Optica.$win.on("Eventor:scroll", this.events.offset_scroll)
            }, this), 10)
        },hide: function(t) {
            this.$search_input.blur();
            var n = this.$el.find(this.config.popover);
            var r = this.$el.find(this.config.trigger);
            Optica.$win.off("Eventor:scroll", this.events.offset_scroll);
            if (this.$glass)
                this.$glass.removeClass("active");
            if (this.$container)
                this.$container.removeClass("active");
            r.removeClass("active");
            n.removeClass("active");
            n.each(function() {
                e(this).parents("article").removeClass("visible")
            });
            setTimeout(e.proxy(function() {
                r.removeClass("show");
                n.removeClass("show")
            }, this), t ? 0 : 250)
        }};
    a.instances = [];
    a.defaults = {container: ".pop",trigger: ".selector",popover: ".pop-menu",use_glass: false,glass: ".glass",scroll_distance: 50};
    a.register = function(e) {
        this.instances.push(e)
    };
    a.hide_all = function() {
        for (var e = 0; e < this.instances.length; e++) {
            this.instances[e].hide(true)
        }
    };
    e.fn.popmenu = function(e) {
        return this.each(function() {
            new a(this, e)
        })
    };
    var f = {__window_scroll: function() {
            if (Optica.DONE_LOADING_NOTES) {
                this.unbind_events()
            }
            if (this._near_bottom() && !Optica.LOADING_NOTES) {
                this.load_notes()
            }
        },_near_bottom: function() {
            return Optica.$doc.height() - Optica.$win.scrollTop() < Optica.$win.height() * 3
        },init: function() {
            Optica.LOADING_NOTES = false;
            this.events = {scroll: e.proxy(this.__window_scroll, this)};
            this.bind_events()
        },bind_events: function() {
            Optica.$win.on("Eventor:scroll", this.events.scroll)
        },unbind_events: function() {
            Optica.$win.off("Eventor:scroll", this.events.scroll)
        },load_notes: function() {
            Optica.LOADING_NOTES = true;
            e(".more_notes_link").trigger("click")
        }};
    var l = function(t, n) {
        if (!(this instanceof l)) {
            return new l(t, n)
        }
        this.el = typeof t === "string" ? e(t).get(0) : t;
        this.$el = e(t);
        this.config = e.extend({}, l.defaults, n);
        if (!this.config.$pagination && !this.config.$pagination.length)
            return;
        this.current_page = this.config.$pagination.data("current-page");
        this.next_page_number = this.current_page + 1;
        this.total_pages = this.config.$pagination.data("total-pages");
        this.base_url = this.config.$pagination.attr("href");
        if (this.base_url)
            this.base_url = this.base_url.substring(0, this.base_url.lastIndexOf("/")) + "/";
        this.loading_data = false;
        this.is_scrolling = false;
        this.body_timeout = -1;
        this.cache_selectors();
        this.bind_events();
        if (this.config.endless_scrolling && this.config.$pagination.length) {
            this.config.$pagination.addClass("invisible");
            this.init = true
        } else {
            this.init = false
        }
        if (Optica.$body.hasClass("touch") || this.$html.hasClass("lt-ie9")) {
            Optica.GRID_LAYOUT = false;
            this.is_grid_layout = false;
            Optica.$body.removeClass("grid")
        }
        this.update_body();
        this.remove_empty_quotes();
        if (!Optica.GRID_LAYOUT) {
            this.update_spotify()
        }
        this.set_embed_size(e(".video-wrapper > iframe, .video-wrapper > blockquote"));
        this.update_video_player(e(".tumblr_video_container, .video-embed iframe"));
        this.update_iframes();
        if (Optica.$body.hasClass("narrow"))
            this.upscale_images();
        this.set_body_type();
        l.register(this);
        return this
    };
    l.prototype = {__document_keydown: function(t) {
            var n = t.charCode ? t.charCode : t.keyCode;
            var r = t ? t.target : window.event.srcElement;
            if (e(r).is("input:focus") || this.is_grid_layout)
                return;
            if (n === 74) {
                this.next_post()
            } else if (n === 75) {
                this.previous_post()
            } else if (n === 190) {
                Optica.$win_body.animate({scrollTop: 0})
            }
        },__window_resize: function() {
            this.set_body_type();
            if (!this.is_grid_layout)
                this.update_spotify();
            this.update_video_player(e(".tumblr_video_container, .video-embed iframe"));
            this.update_iframes()
        },__window_scroll: function() {
            if (Optica.$body.hasClass("touch"))
                this.update_body();
            if (!this.is_scrolling) {
                Optica.$body.addClass("is-scrolling");
                this.is_scrolling = true
            }
            clearTimeout(this.body_timeout);
            this.body_timeout = setTimeout(e.proxy(function() {
                Optica.$body.removeClass("is-scrolling");
                this.is_scrolling = false
            }, this), 200);
            if (!this.init)
                return;
            if (this._near_bottom() && !this.loading_data) {
                this.next_page()
            }
        },_debounce: function(t, n) {
            var r = null;
            return function() {
                var i = arguments;
                clearTimeout(r);
                r = setTimeout(e.proxy(function() {
                    t.apply(this, i)
                }, this), n)
            }
        },_throttle: function(e, t, n) {
            t || (t = 250);
            var r;
            var i;
            return function() {
                var s = n || this;
                var o = +(new Date);
                var u = arguments;
                if (r && o < r + t) {
                    clearTimeout(i);
                    i = setTimeout(function() {
                        r = o;
                        e.apply(s, u)
                    }, t)
                } else {
                    r = o;
                    e.apply(s, u)
                }
            }
        },_get_window_bounds: function() {
            this.window_height = Optica.$win.height()
        },_get_post_bounds: function(t) {
            return e.data(t[0], "offsets")
        },_set_post_bounds: function(t) {
            var n = t.offset().top;
            var r = t.outerHeight();
            var i = n + r;
            return e.data(t[0], "offsets", {top: n,height: r,bottom: i})
        },_in_view: function(e) {
            var t;
            var n = Optica.$win.scrollTop();
            this.window_height = this.window_height || Optica.$win.height();
            var r = n + this.window_height;
            t = this._get_post_bounds(e);
            if (!t) {
                t = this._set_post_bounds(e)
            }
            if (t.bottom + this.window_height < n || t.top > r + this.window_height) {
                return false
            } else {
                return true
            }
        },_snooze: function(e) {
            e.addClass("snooze")
        },_wake: function(e) {
            e.removeClass("snooze")
        },_near_bottom: function() {
            var e = this.is_grid_layout ? 1.25 : 3;
            return Optica.$doc.height() - this.$el.scrollTop() < this.$el.height() * e
        },_near_top: function() {
            return !!(Optica.$win.scrollTop() < 50)
        },_slender: function() {
            if (Optica.$win.width() < 720) {
                return true
            }
            return false
        },_get_next_page: function() {
            this.show_loader();
            var t = e.ajax({url: this.base_url + this.next_page_number,dataType: "html"});
            t.done(e.proxy(this._append_new_posts, this));
            t.fail(e.proxy(this._failed, this))
        },_failed: function() {
            this.hide_loader(true)
        },_append_new_posts: function(t) {
            var n = e(t).find("#posts > div");
            var r = n.children();
            var i = [];
            // this.config.$target.append(n);
            $('#footer').scope().insertDOM(this.config.$target, n);
            r.each(e.proxy(function(t, n) {
                i.push(e(n).find(".like_button").data("post-id"))
            }, this));
            this.set_embed_size(r.find(".video-wrapper > iframe, .video-wrapper > blockquote"));
            this.update_video_player(r.find(".tumblr_video_container, .video-embed iframe"));
            this.update_iframes(n);
            this.remove_empty_quotes(n);
            if (Optica.GRID_LAYOUT && this.is_grid_layout) {
                r.imagesLoaded(e.proxy(function() {
                    n.iframesLoaded({selector: "iframe.photoset"}, e.proxy(function() {
                        this.config.$target.masonry("appended", r, true);
                        this.loading_data = false;
                        this.animate_posts(r);
                        this.hide_loader()
                    }, this))
                }, this))
            } else {
                this.loading_data = false;
                this.update_spotify(n);
                if (Optica.$body.hasClass("narrow"))
                    this.upscale_images(n);
                r.fadeTo(300, 1);
                this.hide_loader()
            }
            Tumblr.LikeButton.get_status_by_post_ids(i);
            if (window.ga) {
                ga("send", "pageview", {page: "/page/" + this.next_page_number,title: "Index Page -- Ajax Load"})
            }
            this.current_page = this.next_page_number;
            this.next_page_number++
        },cache_selectors: function() {
            this.$html = e("html");
            this.$header = e("#header");
            this.$posts = e("#posts")
        },animate: function() {
            if (this.go_to_position && !this.animating) {
                this.animating = true;
                var t = 0;
                e("html,body").stop().animate({scrollTop: this.go_to_position - 10}, 250, e.proxy(function() {
                    this.animating = false
                }, this))
            }
        },set_masonry: function() {
            var t = e("#posts");
            var n = t.find("article");
            t.imagesLoaded(e.proxy(function() {
                t.iframesLoaded({selector: "iframe.photoset"}, e.proxy(function() {
                    t.masonry({itemSelector: "article",isFitWidth: true});
                    this.animate_posts(n)
                }, this))
            }, this));
            this.is_grid_layout = true
        },animate_posts: function(t) {
            t.first().fadeTo(250, 1);
            if (t.length > 0) {
                this.animate_timer = setTimeout(e.proxy(function() {
                    this.animate_posts(t.slice(1))
                }, this), 25)
            } else {
                clearTimeout(this.animate_timer)
            }
        },next_post: function() {
            this.update_post_info();
            for (var e in this.post_positions) {
                var t = this.post_positions[e];
                if (t > this.current_position + 12 && (t < this.go_to_position || !this.go_to_position)) {
                    this.go_to_position = t
                }
            }
            this.animate()
        },previous_post: function() {
            this.update_post_info();
            for (var e in this.post_positions) {
                var t = this.post_positions[e];
                if (t < this.current_position - 12 && t > this.go_to_position) {
                    this.go_to_position = t
                }
            }
            this.animate()
        },set_body_type: function() {
            if (this._slender()) {
                Optica.$body.addClass("slender").removeClass("grid");
                if (Optica.GRID_LAYOUT && this.is_grid_layout) {
                    this.config.$target.css({width: "auto"});
                    this.config.$target.masonry("destroy");
                    this.is_grid_layout = false
                }
            } else {
                Optica.$body.removeClass("slender");
                if (Optica.GRID_LAYOUT && Optica.$body.hasClass("index-page")) {
                    Optica.$body.addClass("grid");
                    this.set_masonry()
                }
            }
        },update_body: function() {
            if (this._near_top()) {
                Optica.$body.addClass("top");
                Optica.$body.removeClass("below-header")
            } else {
                Optica.$body.removeClass("top");
                Optica.$body.addClass("below-header")
            }
        },update_post_info: function() {
            this.update_post_positions();
            this.current_position = window.pageYOffset || document.documentElement && document.documentElement.scrollTop || document.body.scrollTop;
            this.go_to_position = 0
        },update_post_positions: function() {
            var t = {};
            e("#posts article").each(function() {
                var n = e(this).data("post-id");
                t[n] = e(this).offset().top
            });
            this.post_positions = t
        },bind_events: function() {
            this.$el.on("Eventor:scroll", e.proxy(this.__window_scroll, this));
            this.$el.on("resize orientationchange", e.proxy(this._debounce(this.__window_resize, this.config.resizeDelay), this));
            Optica.$doc.on("keydown", e.proxy(this.__document_keydown, this))
        },update_spotify: function(t) {
            var n = e(".audio_container").width();
            var r = n + 80;
            var i = t && t.length ? e('iframe[src*="embed.spotify.com"]', t) : e('iframe[src*="embed.spotify.com"]');
            if (n > 500) {
                i.each(function() {
                    e(this).css({width: n,height: r});
                    e(this).attr("src", e(this).attr("src"))
                })
            } else {
                i.each(function() {
                    e(this).css({width: n,height: 80});
                    e(this).attr("src", e(this).attr("src"))
                })
            }
        },upscale_images: function(t) {
            var n = t && t.length ? e(".photo figure:not(.high-res)", t) : e(".photo figure:not(.high-res)");
            n.each(function() {
                if (e(this).data("photo-width") > 420)
                    e(this).addClass("high-res")
            })
        },set_embed_size: function(t) {
            var n = {yahoo_sport: {pattern: /sports\.yahoo/,width: 700,height: 532},instagram: {pattern: /instagram/,width: 612,height: 710}};
            t.each(function() {
                var t = e(this);
                var r = t.attr("src");
                var i;
                if (t.is("iframe") && !t.data("aspect-ratio")) {
                    e.each(n, function(e, t) {
                        if (r.match(t.pattern)) {
                            i = this;
                            return false
                        }
                    });
                    if (i) {
                        var s = i.width;
                        var o = i.height;
                        var u = o / s;
                        t.attr("data-aspect-ratio", u);
                        t.width(s);
                        t.height(o);
                        e(this).parent().addClass("preserve video-embed")
                    }
                } else if (t.is("blockquote") && t.hasClass("instagram-media")) {
                    t.parent().addClass("preserve video-instagram")
                }
            })
        },update_video_player: function(t) {
            t.each(function() {
                var t = e(this);
                if (!t.data("aspect-ratio")) {
                    var n = t.height() / t.width();
                    t.attr("data-aspect-ratio", n);
                    t.css({width: "100%"});
                    t.css({height: t.width() * n + "px"});
                    e(this).parent().addClass("tumblr-video")
                } else {
                    t.css({height: t.width() * t.data("aspect-ratio") + "px"})
                }
            })
        },update_iframes: function(t) {
            if (!Optica.$body.hasClass("touch"))
                return;
            var n = t && t.length ? e("iframe.tumblr_audio_player, iframe.photoset", t) : e("iframe.tumblr_audio_player, iframe.photoset");
            n.each(function() {
                var t = e(this);
                var n = t.parent().width();
                t.attr("width", n).width(n)
            })
        },remove_empty_quotes: function(t) {
            e(".quote .post > blockquote p:empty", t).remove()
        },next_page: function() {
            if (this.total_pages < this.next_page_number) {
                this.hide_loader(true);
                return
            }
            this.loading_data = true;
            this.show_loader();
            this._get_next_page()
        },hide_loader: function(e) {
            if (e)
                this.config.$pagination.hide();
            this.config.$loader.removeClass("animate")
        },show_loader: function() {
            this.config.$loader.addClass("animate")
        }};
    l.instances = [];
    l.defaults = {bufferPx: 1e3,$pagination: e("#pagination"),$loader: e(".loader"),resizeDelay: 100,scrollDelay: 100,$target: e("#posts")};
    l.register = function(e) {
        this.instances.push(e)
    };
    e.fn.pager = function(e) {
        return this.each(function() {
            new l(this, e)
        })
    };
    t.Utils = n;
    t.Eventor = i;
    t.Popmenu = a;
    t.Parallaxer = o;
    t.Drawer = s;
    t.Pager = l;
    t.NotesPager = f
})(jQuery, Optica);
$(document).ready(function() {
    Optica.Utils.init();
    Optica.Eventor.init();
    var e = $("body");
    if (e.hasClass("contain-header-image")) {
        new Optica.Parallaxer("body:not(.ie10, .touch) .parallax", {animate_opacity: true,animate_position: false})
    } else {
        new Optica.Parallaxer("body:not(.ie10, .touch) .parallax")
    }
    new Optica.Pager(window, {$pagination: $("#pagination a"),$loader: $("#pagination .loader"),endless_scrolling: Optica.ENDLESS_SCROLLING});
    $("body:not(.touch) #posts").drawer({trigger: "article:not(.exposed)"});
    $("#page").popmenu();
    if (e.hasClass("permalink") && $(".more_notes_link").length && Optica.ENDLESS_NOTES_SCROLLING) {
        Optica.NotesPager.init()
    }
})