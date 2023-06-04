if (!window.vlpflash) var vlpflash = [];

function VLPlayer(e) {
    var lastVtoken = new Date();
    var t, n, a, o, i, l, s, r, u, c, d, f, h, p, v, g, m, y, w, C, b, k, B, S, E;
    l = this, u = 0, c = 1, S = [], n = $("<video></video>"), a = n[0], d = 'video/mp4; codecs="avc1.42E01E, mp4a.40.2"', h = e.mode ? e.mode : "html5", o = e.src ? e.src : "", (t = e.id ? e.id : $(".vlPlayer:last")).empty(), $("head").append("<style>\t\t.vlPlayer{position:relative;overflow:hidden;width:100%;height:100%}\t\t.vlPlayer.error{display:table;table-layout:fixed;background:#000;text-align:center}\t\t.vlPlayer.error>span{display:table-cell!important;vertical-align:middle;text-align:center;color:#fff;font-family:Arial;font-size:16px;width:70%}\t</style>"), "flash" != h && a.canPlayType && a.canPlayType(d) || swfobject.hasFlashPlayerVersion("9") && (h = "flash", p = vlpflash.length, v = "flplayer" + p, n = $('<div style="width:100%; height:100%;"><div id="' + v + '"></div></div>'), a = {
        src: "",
        volume: 1,
        duration: 0,
        currentTime: 0,
        currentBuffer: 0,
        buffered: {
            length: 1,
            start: function(e) {
                return 0
            },
            end: function(e) {
                return a.currentBuffer * a.duration
            }
        },
        play: function() {
            getFlashMovie(v).playVideo()
        },
        pause: function() {
            getFlashMovie(v).pauseVideo()
        },
        stop: function() {
            getFlashMovie(v).stopVideo()
        },
        seek: function(e) {
            getFlashMovie(v).seekVideo(e)
        },
        setVolume: function(e) {
            a.volume = e, getFlashMovie(v).setVolume(e)
        },
        setSource: function(e) {
            getFlashMovie(v).clearVideo(), getFlashMovie(v).addVideo(e), a.setVolume(a.volume), a.src = e
        }
    }, vlpflash.push({
        updateDuration: function(e) {
            a.duration = e, n.trigger("durationchange")
        },
        updatePosition: function(e) {
            a.currentTime = e, n.trigger("timeupdate")
        },
        updateBuffer: function(e) {
            a.currentBuffer = e, n.trigger("progress")
        },
        updateStatus: function(e) {
            n.trigger(e)
        },
        flashLoaded: function() {
            l.initialize()
        }
    })), this.obj = t, this.video = n, this.videoObj = a, this.mouseX = 0, this.mouseY = 0, this.initialize = function() {
        y = !0, l.autoplay && l.play(), F && F(), void 0 !== Storage && localStorage.lastVol && l.setVolume(localStorage.lastVol), i.changePreview(l.preview), i.setIntervals(), i.resize()
    }, this.initializeFlash = function() {
        var e = {
                vlpf: p
            },
            t = {
                id: v,
                name: v
            };
        swfobject.embedSWF("https://i.r.worldssl.net/vlPlayer/FlashPlayer19.swf", v, "100%", "100%", "9.0.0", !1, e, {
            allowScriptAccess: "always",
            bgcolor: "000000",
            wmode: "opaque"
        }, t)
    }, this.setCookie = function(e, t) {
        var n = new Date;
        n.setFullYear(n.getFullYear() + 10), document.cookie = e + "=" + t + "; expires=" + n.toGMTString() + "; path=/"
    }, this.getCookie = function(e) {
        for (var t = e + "=", n = decodeURIComponent(document.cookie).split(";"), a = 0; a < n.length; a++) {
            for (var o = n[a];
                 " " == o.charAt(0);) o = o.substring(1);
            if (0 == o.indexOf(t)) return o.substring(t.length, o.length)
        }
        return ""
    }, this.toggle = function() {
        t.hasClass("playing") ? l.pause() : l.play()
    }, this.play = function() {
        $(document).mousemove(), y && (t.hasClass("ended") && l.seek(0), t.addClass("playing started"), t.focus(), l.changeURL(o), m = a.play())
    }, this.pause = function() {
        $(document).mousemove(), t.removeClass("playing"), y && (void 0 !== m ? m.then(function(e) {
            a.pause()
        }).catch(function(e) {}) : a.pause())
    }, this.stop = function() {
        t.removeClass("started"), l.pause(), l.seek(0)
    }, this.changeURL = function(e) {
        if(y && !a.src.endsWith(e)) {
            if(h === "flash")
                a.setSource(e)
            else
                n.attr("src", e)
            o = e
        }
    }, this.change = function(n) {
        y && (l.videoUrl = n.videoUrl ? n.videoUrl : null, l.duration = n.duration ? n.duration : 0, l.preview = n.preview ? n.preview : "", l.start = n.start ? n.start : 0, l.hd = !!n.hdsrc, i.changeBuffer(0), i.changeElapsed(0), i.changeDuration(l.duration), i.changePreview(l.preview), w = null, e.hdsrc = n.hdsrc ? n.hdsrc : null, e.src = n.src, l.hd && t.hasClass("hd720p") ? (t.addClass("hdsrc"), l.changeURL(n.hdsrc)) : (t.removeClass("hdsrc"), l.changeURL(n.src)), n.autoplay && l.play())
    }, this.seek = function(e) {
        w ? (e < 0 && (e = 0), e > l.duration && (e = l.duration), t.removeClass("ended"), i.changeElapsed(e), "flash" == h ? a.seek(e) : a.currentTime = e) : l.start = e
    }, this.setVolume = function(e) {
        y && (e < 0 && (e = 0), e > 1 && (e = 1), "flash" == h ? a.setVolume(e) : a.volume = e, i.changeVolume(e), t.removeClass("vol25 vol50 vol75 muted"), 0 == e ? t.addClass("muted") : e < .25 ? t.addClass("vol25") : e < .5 ? t.addClass("vol50") : e < .75 && t.addClass("vol75"), void 0 !== Storage && (localStorage.lastVol = a.volume))
    }, this.mute = function() {
        t.addClass("muted"), u = a.volume, l.setVolume(0)
    }, this.unmute = function() {
        t.removeClass("muted"), 0 == u && (u = 1), l.setVolume(u)
    }, this.toggleMute = function() {
        t.hasClass("muted") ? l.unmute() : l.mute()
    }, this.toggleHD = function() {
        l.hd && (E || (l.start = a.currentTime), t.toggleClass("hd720p"), t.hasClass("hd720p") ? (t.addClass("hdsrc"), l.changeURL(e.hdsrc), l.setCookie("vlphd", "1")) : (t.removeClass("hdsrc"), l.changeURL(e.src), l.setCookie("vlphd", "0")), t.hasClass("started") || l.play(), E = !0, n.css("opacity", 0))
    }, this.setRate = function(e) {
        e < .25 || e > 4 || "flash" != h && (i.rateChange && i.rateChange(e), a.playbackRate = e, c = e)
    }, this.toggleFull = function(e) {
        var n, a, o;
        t.hasClass("full") ? (n = ["exitFullscreen", "mozCancelFullScreen", "webkitExitFullscreen", "msExitFullscreen"], o = !0) : (n = ["requestFullscreen", "mozRequestFullScreen", "webkitRequestFullscreen", "msRequestFullscreen"], o = !1), a = t[0];
        for (var i = 0; i < n.length; i++)
            if (o) {
                if (n[i] in document) return !0 !== e && document[n[i]](), !0
            } else if (n[i] in a) return !0 !== e && a[n[i]](), !0;
        return !1
    }, this.changeButtonColor = function(e) {
        t.removeClass("redBt orangeBt goldBt oliveBt greenBt tealBt blueBt violetBt pinkBt magentaBt whiteBt"), t.addClass(e + "Bt")
    }, this.changeBackground = function(e) {
        t.removeClass("redBg orangeBg goldBg oliveBg greenBg tealBg blueBg violetBg pinkBg magentaBg whiteBg blackBg"), t.addClass(e + "Bg")
    }, this.changeDuration = function() {
        S = [], w = a.duration, l.duration = w, i.changeDuration(l.duration), l.start && l.seek(l.start), t.hasClass("playing") && l.play()
    }, this.playerKey = function(e) {
        var n = a.currentTime,
            o = a.volume;
        return 37 == e.keyCode ? (l.seek(n - 1), !1) : 39 == e.keyCode ? (l.seek(n + 1), !1) : 38 == e.keyCode ? (l.setVolume(o + .1), !1) : 40 == e.keyCode ? (l.setVolume(o - .1), !1) : 188 == e.keyCode ? t.hasClass("playing") ? (l.setRate(c / 2), !1) : (l.seek(n - .0333333333), !1) : 190 == e.keyCode ? t.hasClass("playing") ? (l.setRate(2 * c), !1) : (l.seek(n + .0333333333), !1) : 77 == e.keyCode ? (l.toggleMute(), !1) : 32 == e.keyCode ? (l.toggle(), !1) : 13 == e.keyCode ? (l.toggleFull(), !1) : void 0
    }, this.bufferUpdate = function() {
        var e, t = a.currentTime,
            n = a.buffered,
            o = n.length;
        if (0 != o)
            if (Math.round(n.end(0)) != Math.round(l.duration)) {
                for (var s = o - 1; s >= 0; s--)
                    if (t >= n.start(s) && t <= n.end(s)) {
                        e = n.end(s) / l.duration * 100, i.changeBuffer(e + "%");
                        break
                    }
            } else i.changeBuffer("100%")
    }, this.seeked = function() {
        n.css("opacity", ""), E = !1
    }, this.ended = function() {
        l.onended && l.onended(), t.hasClass("loop") ? (l.seek(0), l.play()) : (l.seek(l.duration), i.changeElapsed(l.duration), t.addClass("ended"), l.pause())
    }, this.error = function(e) {}, this.fullChange = function() {
        var e;
        e = ["fullscreenElement", "mozFullScreenElement", "webkitFullscreenElement", "msFullscreenElement"];
        for (var n = 0; n < e.length; n++)
            if (e[n] in document) {
                document[e[n]] ? t.addClass("full") : t.removeClass("full");
                break
            }
        t.hasClass("full") && $(document).mousemove()
    }, this.mouseMove = function(e) {
        e.pageX && (l.mouseX = e.pageX, l.mouseY = e.pageY), t.hasClass("full") && (null != s && clearTimeout(s), t.removeClass("hidemouse"), i.mouseHide && i.mouseHide(), s = setTimeout(function() {
            t.hasClass("playing") ? t.addClass("hidemouse") : t.removeClass("hidemouse"), s = null, i.mouseHide && i.mouseHide()
        }, 2e3))
    }, this.mouseDown = function(e) {
        if (t.focus(), !$(e.target).is("object")) return !1
    }, this.mouseUp = function(e) {
        $(e.target).is("object") && (n.trigger("click"), g ? (n.trigger("dblclick"), g = clearTimeout(g)) : g = setTimeout(function() {
            g = void 0
        }, 500))
    }, this.mouseDownBtn = function() {
        return t.focus(), $(this).addClass("active"), !1
    }, this.context = function(e) {
        null != f && f.remove();
        var n = e.clientX,
            o = e.clientY,
            s = -1,
            r = {
                copy: "Copy URL",
                copyT: "Copy URL at current time",
                efull: "Enter Full Screen",
                cfull: "Exit Full Screen",
                thd: "HD Quality",
                loop: "Loop",
                mute: "Mute",
                vlp: "VLPlayer 2"
            };
        (f = $('<ul class="vlPlayerMenu" tabindex="0"></ul>')).css({
            left: n,
            top: o
        });
        for (var u in r) r[u] = $('<li tabindex="-1">' + r[u] + "</li>"), f.append(r[u]);
        return f.blur(function() {
            null != f && (f.remove(), f = null)
        }), f.contextmenu(function() {
            return f.remove(), f = null, !1
        }), f.children().mouseenter(function() {
            f.trigger("mouseleave"), $(this).addClass("hover")
        }), f.mouseleave(function() {
            f.children().removeClass("hover")
        }), f.keydown(function(e) {
            var n = e.keyCode,
                a = f.children().length;
            switch (n) {
                case 27:
                    f.blur(), t.focus();
                    break;
                case 32:
                    f.children().eq(s).click();
                    break;
                case 38:
                    (--s < 0 || s >= a) && (s = a - 1), f.trigger("mouseleave"), f.children().eq(s).addClass("hover");
                    break;
                case 40:
                    (++s < 0 || s >= a) && (s = 0), f.trigger("mouseleave"), f.children().eq(s).addClass("hover")
            }
            return !1
        }), r.copy.click(function() {
            i.hiddenUrl.val(l.videoUrl), i.hiddenUrl.focus().select(), document.execCommand("copy"), i.hiddenUrl.blur(), t.focus()
        }), r.copyT.click(function() {
            var e = Math.round(a.currentTime);
            i.hiddenUrl.val(l.videoUrl + "#t=" + e), i.hiddenUrl.focus().select(), document.execCommand("copy"), i.hiddenUrl.blur(), t.focus()
        }), r.loop.click(function() {
            t.toggleClass("loop"), i.loopChange && i.loopChange(), f.blur(), t.focus()
        }), r.mute.click(function() {
            l.toggleMute(), f.blur(), t.focus()
        }), r.efull.click(function() {
            l.toggleFull(), f.blur(), t.focus()
        }), r.cfull.click(function() {
            l.toggleFull(), f.blur(), t.focus()
        }), r.thd.click(function() {
            f.blur(), t.focus(), i.toggleHD()
        }), t.hasClass("loop") && r.loop.addClass("checked"), t.hasClass("muted") && r.mute.addClass("checked"), t.hasClass("hd720p") && r.thd.addClass("checked"), l.hd || r.thd.remove(), t.hasClass("full") ? r.efull.remove() : r.cfull.remove(), l.videoUrl || (r.copy.remove(), r.copyT.remove()), f.mousedown(!1), f.animate({
            opacity: 1
        }, 250), t.append(f), n + f.width() > $(window).width() && ((n -= f.width()) < 0 && (n = 0), f.css("left", n)), o + f.height() > $(window).height() && ((o -= f.height()) < 0 && (o = 0), f.css("top", o)), f.focus(), !1
    }, C = function() {
        if(l.videoUrl) {
            // Don't call if last call was less than 3 seconds ago
            var secondsAgo = new Date();
            secondsAgo.setSeconds(secondsAgo.getSeconds()-3);
            if(secondsAgo > lastVtoken) {
                lastVtoken = new Date();
                $.ajax({
                    url: "/ajax/vtoken.php",
                    type: "post",
                    data: {
                        a: 1,
                        u: l.videoUrl
                    },
                    timeout: 1e4,
                    success: function (e) {
                        0 == e.indexOf("1.") ? k = e.substr(2) : "1" == e ? (B = !0, b()) : (k = null, C())
                    },
                    error: function () {
                        k = null, C()
                    }
                });
            }
            k = "123";
        }

        if(r || B)
            return false;

        r = setInterval(function() {
            if (!w) return b();
            var e = Math.round(a.currentTime); - 1 == S.indexOf(e) && S.push(e);
            var t = w <= 60 && S.length >= .62 * w,
                n = w > 60 && S.length >= 33;
            (t || n) && k && "123" != k && !B && ($.ajax({
                url: "/ajax/vtoken.php",
                type: "post",
                data: {
                    a: 2,
                    u: l.videoUrl,
                    t: k,
                    v: S
                },
                timeout: 1e4,
                success: function(e) {
                    "1" == e ? b() : B = !1
                },
                error: function() {
                    B = !1
                }
            }), B = !0)
        }, 500), "undefined" == typeof watchinit && setInterval(function() {}, 1e3)
    }, b = function() {
        r = clearInterval(r)
    }, this.hd = !!e.hdsrc, this.preview = "preview" in e ? e.preview : "", this.duration = "duration" in e ? e.duration : 0, this.start = "start" in e ? e.start : 0, this.autoplay = !!e.autoplay, this.adjust = !!e.adjust, this.videoUrl = e.videoUrl ? e.videoUrl : null, this.skinPath = e.skin, this.buttonColor = e.btcolor ? e.btcolor : "teal", this.background = e.bgcolor ? e.bgcolor : "white", this.onended = e.ended ? e.ended : null;
    var F = e.complete;
    "1" == l.getCookie("vlphd") && e.hdsrc && (t.addClass("hdsrc"), t.addClass("hd720p"), o = e.hdsrc), $.getScript(this.skinPath + "/skin.js?" + window.vlpv, function() {
        i = new VLPSkin(l, e.expand, function() {
            t.on("keydown", l.playerKey), t.on("contextmenu", l.context), t.on("mousedown", l.mouseDown), t.on("mousedown", ".vlButton", l.mouseDownBtn), n.on("playing", C), n.on("waiting pause ended", b), n.on("durationchange", l.changeDuration), n.on("progress", l.bufferUpdate), n.on("seeked", l.seeked), n.on("error", l.error), $(document).on("webkitfullscreenchange mozfullscreenchange MSFullscreenChange fullscreenchange", l.fullChange), $(document).on("keydown mousemove", l.mouseMove), $(document).on("mouseup", l.mouseUp), l.duration > 0 && (i.changeElapsed(0), i.changeDuration(l.duration)), "flash" == h ? l.initializeFlash() : l.initialize()

            // Call C everytime time changes
            n[0].addEventListener("timeupdate", C);
        })
    })
}

function getFlashMovie(e) {
    return -1 != navigator.appName.indexOf("Microsoft") ? window[e] : document[e]
}
var swfobject = function() {
    var e, t, n, a, o, i, l = "undefined",
        s = "object",
        r = "Shockwave Flash",
        u = "application/x-shockwave-flash",
        c = "SWFObjectExprInst",
        d = "onreadystatechange",
        f = window,
        h = document,
        p = navigator,
        v = !1,
        g = [function() {
            v ? function() {
                var e = h.getElementsByTagName("body")[0],
                    t = N(s);
                t.setAttribute("type", u);
                var n = e.appendChild(t);
                if (n) {
                    var a = 0;
                    ! function() {
                        if (typeof n.GetVariable != l) {
                            var o = n.GetVariable("$version");
                            o && (o = o.split(" ")[1].split(","), B.pv = [parseInt(o[0], 10), parseInt(o[1], 10), parseInt(o[2], 10)])
                        } else if (a < 10) return a++, void setTimeout(arguments.callee, 10);
                        e.removeChild(t), n = null, T()
                    }()
                } else T()
            }() : T()
        }],
        m = [],
        y = [],
        w = [],
        C = !1,
        b = !1,
        k = !0,
        B = function() {
            var e = typeof h.getElementById != l && typeof h.getElementsByTagName != l && typeof h.createElement != l,
                t = p.userAgent.toLowerCase(),
                n = p.platform.toLowerCase(),
                a = /win/.test(n || t),
                o = /mac/.test(n || t),
                i = !!/webkit/.test(t) && parseFloat(t.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")),
                c = !1,
                d = [0, 0, 0],
                g = null;
            if (typeof p.plugins != l && typeof p.plugins[r] == s) !(g = p.plugins[r].description) || typeof p.mimeTypes != l && p.mimeTypes[u] && !p.mimeTypes[u].enabledPlugin || (v = !0, c = !1, g = g.replace(/^.*\s+(\S+\s+\S+$)/, "$1"), d[0] = parseInt(g.replace(/^(.*)\..*$/, "$1"), 10), d[1] = parseInt(g.replace(/^.*\.(.*)\s.*$/, "$1"), 10), d[2] = /[a-zA-Z]/.test(g) ? parseInt(g.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0);
            else if (typeof f.ActiveXObject != l) try {
                var m = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
                m && (g = m.GetVariable("$version")) && (c = !0, g = g.split(" ")[1].split(","), d = [parseInt(g[0], 10), parseInt(g[1], 10), parseInt(g[2], 10)])
            } catch (e) {}
            return {
                w3: e,
                pv: d,
                wk: i,
                ie: c,
                win: a,
                mac: o
            }
        }();
    B.w3 && ((typeof h.readyState != l && "complete" == h.readyState || typeof h.readyState == l && (h.getElementsByTagName("body")[0] || h.body)) && S(), C || (typeof h.addEventListener != l && h.addEventListener("DOMContentLoaded", S, !1), B.ie && B.win && (h.attachEvent(d, function() {
        "complete" == h.readyState && (h.detachEvent(d, arguments.callee), S())
    }), f == top && function() {
        if (!C) {
            try {
                h.documentElement.doScroll("left")
            } catch (e) {
                return void setTimeout(arguments.callee, 0)
            }
            S()
        }
    }()), B.wk && function() {
        C || (/loaded|complete/.test(h.readyState) ? S() : setTimeout(arguments.callee, 0))
    }(), F(S)));

    function S() {
        if (!C) {
            try {
                var e = h.getElementsByTagName("body")[0].appendChild(N("span"));
                e.parentNode.removeChild(e)
            } catch (e) {
                return
            }
            C = !0;
            for (var t = g.length, n = 0; n < t; n++) g[n]()
        }
    }

    function E(e) {
        C ? e() : g[g.length] = e
    }

    function F(e) {
        if (typeof f.addEventListener != l) f.addEventListener("load", e, !1);
        else if (typeof h.addEventListener != l) h.addEventListener("load", e, !1);
        else if (typeof f.attachEvent != l) a = "onload", o = e, (n = f).attachEvent(a, o), w[w.length] = [n, a, o];
        else if ("function" == typeof f.onload) {
            var t = f.onload;
            f.onload = function() {
                t(), e()
            }
        } else f.onload = e;
        var n, a, o
    }

    function T() {
        var e = m.length;
        if (e > 0)
            for (var t = 0; t < e; t++) {
                var n = m[t].id,
                    a = m[t].callbackFn,
                    o = {
                        success: !1,
                        id: n
                    };
                if (B.pv[0] > 0) {
                    var i = A(n);
                    if (i)
                        if (!P(m[t].swfVersion) || B.wk && B.wk < 312)
                            if (m[t].expressInstall && $()) {
                                var s = {};
                                s.data = m[t].expressInstall, s.width = i.getAttribute("width") || "0", s.height = i.getAttribute("height") || "0", i.getAttribute("class") && (s.styleclass = i.getAttribute("class")), i.getAttribute("align") && (s.align = i.getAttribute("align"));
                                for (var r = {}, u = i.getElementsByTagName("param"), c = u.length, d = 0; d < c; d++) "movie" != u[d].getAttribute("name").toLowerCase() && (r[u[d].getAttribute("name")] = u[d].getAttribute("value"));
                                L(s, r, n, a)
                            } else U(i), a && a(o);
                        else R(n, !0), a && (o.success = !0, o.ref = x(n), a(o))
                } else if (R(n, !0), a) {
                    var f = x(n);
                    f && typeof f.SetVariable != l && (o.success = !0, o.ref = f), a(o)
                }
            }
    }

    function x(e) {
        var t = null,
            n = A(e);
        if (n && "OBJECT" == n.nodeName)
            if (typeof n.SetVariable != l) t = n;
            else {
                var a = n.getElementsByTagName(s)[0];
                a && (t = a)
            }
        return t
    }

    function $() {
        return !b && P("6.0.65") && (B.win || B.mac) && !(B.wk && B.wk < 312)
    }

    function L(o, i, s, r) {
        b = !0, n = r || null, a = {
            success: !1,
            id: s
        };
        var u = A(s);
        if (u) {
            "OBJECT" == u.nodeName ? (e = V(u), t = null) : (e = u, t = s), o.id = c, (typeof o.width == l || !/%$/.test(o.width) && parseInt(o.width, 10) < 310) && (o.width = "310"), (typeof o.height == l || !/%$/.test(o.height) && parseInt(o.height, 10) < 137) && (o.height = "137"), h.title = h.title.slice(0, 47) + " - Flash Player Installation";
            var d = B.ie && B.win ? "ActiveX" : "PlugIn",
                p = "MMredirectURL=" + f.location.toString().replace(/&/g, "%26") + "&MMplayerType=" + d + "&MMdoctitle=" + h.title;
            if (typeof i.flashvars != l ? i.flashvars += "&" + p : i.flashvars = p, B.ie && B.win && 4 != u.readyState) {
                var v = N("div");
                s += "SWFObjectNew", v.setAttribute("id", s), u.parentNode.insertBefore(v, u), u.style.display = "none",
                    function() {
                        4 == u.readyState ? u.parentNode.removeChild(u) : setTimeout(arguments.callee, 10)
                    }()
            }
            j(o, i, s)
        }
    }

    function U(e) {
        if (B.ie && B.win && 4 != e.readyState) {
            var t = N("div");
            e.parentNode.insertBefore(t, e), t.parentNode.replaceChild(V(e), t), e.style.display = "none",
                function() {
                    4 == e.readyState ? e.parentNode.removeChild(e) : setTimeout(arguments.callee, 10)
                }()
        } else e.parentNode.replaceChild(V(e), e)
    }

    function V(e) {
        var t = N("div");
        if (B.win && B.ie) t.innerHTML = e.innerHTML;
        else {
            var n = e.getElementsByTagName(s)[0];
            if (n) {
                var a = n.childNodes;
                if (a)
                    for (var o = a.length, i = 0; i < o; i++) 1 == a[i].nodeType && "PARAM" == a[i].nodeName || 8 == a[i].nodeType || t.appendChild(a[i].cloneNode(!0))
            }
        }
        return t
    }

    function j(e, t, n) {
        var a, o = A(n);
        if (B.wk && B.wk < 312) return a;
        if (o)
            if (typeof e.id == l && (e.id = n), B.ie && B.win) {
                var i = "";
                for (var r in e) e[r] != Object.prototype[r] && ("data" == r.toLowerCase() ? t.movie = e[r] : "styleclass" == r.toLowerCase() ? i += ' class="' + e[r] + '"' : "classid" != r.toLowerCase() && (i += " " + r + '="' + e[r] + '"'));
                var c = "";
                for (var d in t) t[d] != Object.prototype[d] && (c += '<param name="' + d + '" value="' + t[d] + '" />');
                o.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + i + ">" + c + "</object>", y[y.length] = e.id, a = A(e.id)
            } else {
                var f = N(s);
                f.setAttribute("type", u);
                for (var h in e) e[h] != Object.prototype[h] && ("styleclass" == h.toLowerCase() ? f.setAttribute("class", e[h]) : "classid" != h.toLowerCase() && f.setAttribute(h, e[h]));
                for (var p in t) t[p] != Object.prototype[p] && "movie" != p.toLowerCase() && M(f, p, t[p]);
                o.parentNode.replaceChild(f, o), a = f
            }
        return a
    }

    function M(e, t, n) {
        var a = N("param");
        a.setAttribute("name", t), a.setAttribute("value", n), e.appendChild(a)
    }

    function I(e) {
        var t = A(e);
        t && "OBJECT" == t.nodeName && (B.ie && B.win ? (t.style.display = "none", function() {
            4 == t.readyState ? function(e) {
                var t = A(e);
                if (t) {
                    for (var n in t) "function" == typeof t[n] && (t[n] = null);
                    t.parentNode.removeChild(t)
                }
            }(e) : setTimeout(arguments.callee, 10)
        }()) : t.parentNode.removeChild(t))
    }

    function A(e) {
        var t = null;
        try {
            t = h.getElementById(e)
        } catch (e) {}
        return t
    }

    function N(e) {
        return h.createElement(e)
    }

    function P(e) {
        var t = B.pv,
            n = e.split(".");
        return n[0] = parseInt(n[0], 10), n[1] = parseInt(n[1], 10) || 0, n[2] = parseInt(n[2], 10) || 0, t[0] > n[0] || t[0] == n[0] && t[1] > n[1] || t[0] == n[0] && t[1] == n[1] && t[2] >= n[2]
    }

    function O(e, t, n, a) {
        if (!B.ie || !B.mac) {
            var r = h.getElementsByTagName("head")[0];
            if (r) {
                var u = n && "string" == typeof n ? n : "screen";
                if (a && (o = null, i = null), !o || i != u) {
                    var c = N("style");
                    c.setAttribute("type", "text/css"), c.setAttribute("media", u), o = r.appendChild(c), B.ie && B.win && typeof h.styleSheets != l && h.styleSheets.length > 0 && (o = h.styleSheets[h.styleSheets.length - 1]), i = u
                }
                B.ie && B.win ? o && typeof o.addRule == s && o.addRule(e, t) : o && typeof h.createTextNode != l && o.appendChild(h.createTextNode(e + " {" + t + "}"))
            }
        }
    }

    function R(e, t) {
        if (k) {
            var n = t ? "visible" : "hidden";
            C && A(e) ? A(e).style.visibility = n : O("#" + e, "visibility:" + n)
        }
    }

    function D(e) {
        return null != /[\\\"<>\.;]/.exec(e) && typeof encodeURIComponent != l ? encodeURIComponent(e) : e
    }
    B.ie && B.win && window.attachEvent("onunload", function() {
        for (var e = w.length, t = 0; t < e; t++) w[t][0].detachEvent(w[t][1], w[t][2]);
        for (var n = y.length, a = 0; a < n; a++) I(y[a]);
        for (var o in B) B[o] = null;
        B = null;
        for (var i in swfobject) swfobject[i] = null;
        swfobject = null
    });
    return {
        registerObject: function(e, t, n, a) {
            if (B.w3 && e && t) {
                var o = {};
                o.id = e, o.swfVersion = t, o.expressInstall = n, o.callbackFn = a, m[m.length] = o, R(e, !1)
            } else a && a({
                success: !1,
                id: e
            })
        },
        getObjectById: function(e) {
            if (B.w3) return x(e)
        },
        embedSWF: function(e, t, n, a, o, i, r, u, c, d) {
            var f = {
                success: !1,
                id: t
            };
            B.w3 && !(B.wk && B.wk < 312) && e && t && n && a && o ? (R(t, !1), E(function() {
                n += "", a += "";
                var h = {};
                if (c && typeof c === s)
                    for (var p in c) h[p] = c[p];
                h.data = e, h.width = n, h.height = a;
                var v = {};
                if (u && typeof u === s)
                    for (var g in u) v[g] = u[g];
                if (r && typeof r === s)
                    for (var m in r) typeof v.flashvars != l ? v.flashvars += "&" + m + "=" + r[m] : v.flashvars = m + "=" + r[m];
                if (P(o)) {
                    var y = j(h, v, t);
                    h.id == t && R(t, !0), f.success = !0, f.ref = y
                } else {
                    if (i && $()) return h.data = i, void L(h, v, t, d);
                    R(t, !0)
                }
                d && d(f)
            })) : d && d(f)
        },
        switchOffAutoHideShow: function() {
            k = !1
        },
        ua: B,
        getFlashPlayerVersion: function() {
            return {
                major: B.pv[0],
                minor: B.pv[1],
                release: B.pv[2]
            }
        },
        hasFlashPlayerVersion: P,
        createSWF: function(e, t, n) {
            return B.w3 ? j(e, t, n) : void 0
        },
        showExpressInstall: function(e, t, n, a) {
            B.w3 && $() && L(e, t, n, a)
        },
        removeSWF: function(e) {
            B.w3 && I(e)
        },
        createCSS: function(e, t, n, a) {
            B.w3 && O(e, t, n, a)
        },
        addDomLoadEvent: E,
        addLoadEvent: F,
        getQueryParamValue: function(e) {
            var t = h.location.search || h.location.hash;
            if (t) {
                if (/\?/.test(t) && (t = t.split("?")[1]), null == e) return D(t);
                for (var n = t.split("&"), a = 0; a < n.length; a++)
                    if (n[a].substring(0, n[a].indexOf("=")) == e) return D(n[a].substring(n[a].indexOf("=") + 1))
            }
            return ""
        },
        expressInstallCallback: function() {
            if (b) {
                var o = A(c);
                o && e && (o.parentNode.replaceChild(e, o), t && (R(t, !0), B.ie && B.win && (e.style.display = "block")), n && n(a)), b = !1
            }
        }
    }
}();