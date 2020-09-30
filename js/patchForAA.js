// MS Pゴシックがインストールされ、DirectWrite 下である場合には patchForAA を
// MS Pゴシックがインストールされてない場合には Saitamaar を読み込む
// @font-face, woff に対応してない場合は読み込まない
// woff 対応は iOS 5.1 以降、Android 4.4 以降
// どの webフォントを読み込むかは cookie に保存され、2回目以降は cookie を
// 参照して webフォントを読み込む
(function() {
    // webフォントに与える font-family 名
    // この値を自分のサイトのCSSの font-family の値に合わせる
    var fontFamilyName = "patchForAA";
    // MS Pゴシックがインストールされておらず、Saitamaar も読み込まれて
    // いない時に Saitamaar を適用するか否か
    var useSaitamaar = false;
    // useSaitamaar が true の場合
    // この値をアップロードした enableSaitamaar.js の URL にする
    var url_enableSaitamaar = "";
    // cookie の保持期間日数
    var cookieExpiresDays = 30;
    // cookie の path の値
    var cookiePath = null;
    var d = document;
    // IE 8 以下、それに準ずるブラウザは関係ない
    // (win 7 の IE 8 は関係ある)
    var isIE8andLower = typeof d.addEventListener == "undefined";
    if (isIE8andLower) {
        return;
    }
    // Cookie の読み書き超簡易版
    // 保持期間 days 日のクッキーを書き込む
    var write_cookie = function(key, value, days, path) {
        var date = new Date();
        date.setMilliseconds(date.getMilliseconds() + days * 864e5);
        d.cookie = key + "=" + value + "; expires=" + date.toUTCString() + (path ? "; path=" + path : "");
    };
    // クッキー読み込み、無ければ null
    var read_cookie = function(key) {
        var result = null;
        if (!d.cookie) {
            return result;
        }
        var cookies = d.cookie.split(/;\s*/);
        for (var i = 0, len = cookies.length; i < len; i++) {
            var parts = cookies[i].split("=");
            if (key === parts[0]) {
                return parts[1];
            }
        }
        return result;
    };
    // 文字幅計測用 span とその入れ物 div を作成する
    var makeDiv = function() {
        var div = d.createElement("div");
        div.style.cssText = "position:absolute; top:-9999px; left:-9999px;" + "width:300px; height:300px;" + "line-height:normal; margin:0; padding:0;";
        return div;
    };
    var makeSpan = function(txt, fontFamily, size) {
        size = size || 16;
        var span = d.createElement("span");
        span.appendChild(d.createTextNode(txt));
        span.style.cssText = "font-size:" + size + "px; width:auto; height:auto;" + "line-height:normal; margin:0; padding:0;" + "font-variant:normal; white-space:nowrap;" + "font-family:" + fontFamily + ";" + "font-style:normal; font-weight:400;";
        return span;
    };
    // @font-face 用 style の作成。head に挿入される
    var readyStyle = function() {
        var style = d.createElement("style");
        style.appendChild(d.createTextNode(""));
        // for WebKit
        d.head.appendChild(style);
        if (style.sheet && style.sheet.insertRule) {
            return style;
        } else {
            style.parentNode.removeChild(style);
        }
        return null;
    };
    // パッチフォントを適用する
    var applyPatchForAA = function() {
        // style 要素を作成してページに挿入
        var style = readyStyle();
        // dataURI で webフォントを読み込む
        if (style) {
            var sheet = style.sheet;
            sheet.insertRule("@font-face { font-family: '" + fontFamilyName + "'; " + "src:url('data:application/x-font-woff;charset=utf-8;base64,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') " + "format('woff'); font-weight: normal; }", sheet.cssRules.length);
        }
    };
    // Saitamaar を適用する
    var applySaitamaar = function() {
        if (!useSaitamaar) {
            return;
        }
        if (!url_enableSaitamaar) {
            return;
        }
        // Saitamaar は大きいので別ファイルに置く
        var sc = d.createElement("script");
        sc.type = "text/javascript";
        sc.src = url_enableSaitamaar;
        sc.charset = "UTF-8";
        d.head.appendChild(sc);
    };
    // 指定したwebフォントが使用できるまで待つ
    var waitEnableWebFont = function(opt) {
        var font_family = opt.font_family || "patchForAA";
        var testString = opt.testString || "i";
        var testSize = opt.testSize || 160;
        var assumedWidth = opt.assumedWidth || 30;
        var timeout = opt.timeout || 3e3;
        var active = opt.active || function() {};
        var inactive = opt.inactive || function() {};
        // font load API があるならそちらを使う
        //    if( !!window["FontFace"] && false){
        if (!!window["FontFace"]) {
            // font load API が使えるなら Promise も使える
            var timeOut = new Promise(function(resolve, reject) {
                setTimeout(function() {
                    reject();
                }, timeout);
            });
            Promise.race([ timeOut, d.fonts.load("normal 400 16px " + font_family, testString) ]).then(function(faces) {
                // @font-face で指定してないフォントを常に resolve してしまうので
                // 本当に対象のフォントを読み込んだか確認する必要がある
                var isFamily = faces.some(function(f) {
                    return f.family.indexOf(font_family) != -1;
                });
                if (isFamily) {
                    active();
                } else {
                    inactive();
                }
            }, function() {
                inactive();
            });
        } else {
            // font load API が無いなら自前で
            // 計測用 span の入れ物 div
            var div = makeDiv();
            d.body.insertBefore(div, d.body.firstChild);
            // 計測用 span
            var span = makeSpan(testString, font_family + ",sans-serif", testSize);
            div.appendChild(span);
            var startTime = new Date().getTime();
            var check = function() {
                if (isAssumedWidth(span)) {
                    // 想定する幅になった
                    finish();
                    active();
                } else {
                    // まだ想定する幅でない
                    if (hasTimedOut()) {
                        finish();
                        inactive();
                    } else {
                        intervalAndCheck();
                    }
                }
            };
            var isAssumedWidth = function(span) {
                var w = span.offsetWidth;
                // webkit 系が誤差を出す気がするので±1
                return assumedWidth - 1 <= w && w <= assumedWidth + 1;
            };
            var hasTimedOut = function() {
                return new Date().getTime() - startTime >= timeout;
            };
            var intervalAndCheck = function() {
                setTimeout(function() {
                    check();
                }, 100);
            };
            var finish = function() {
                // 後始末
                span.parentNode.removeChild(span);
                span = null;
                div.parentNode.removeChild(div);
                div = null;
            };
            setTimeout(function() {
                check();
            }, 0);
        }
    };
    // @font-face 対応、 .woff 対応か調べる
    // 小さな .woff を @font-face で適用できるか実際に試して判別する
    // フォントの反映は非同期なので待つ。そのための callback
    var checkOkWoff = function(callback) {
        // @font-face 対応か調べる (参考 modernizr)
        var style, sheet, ruleIndex, cssText, supportFontFace;
        style = readyStyle();
        if (!style) {
            return finish(false);
        }
        sheet = style.sheet;
        // 一文字だけの woff を読み込めるか試行する
        try {
            ruleIndex = sheet.insertRule("@font-face { font-family: 'OnlyOneA'; " + "src:url('data:application/x-font-woff;charset=utf-8;base64,d09GRgABAAAAAAR0AA4AAAAABjQAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABGRlRNAAABRAAAABwAAAAcc/3YfUdERUYAAAFgAAAAJAAAACYAKQAqT1MvMgAAAYQAAABSAAAAYFcG4n5jbWFwAAAB2AAAAEMAAAFCAA8ED2N2dCAAAAIcAAAABAAAAAQAIgKIZ2FzcAAAAiAAAAAIAAAACP//AAFnbHlmAAACKAAAAHwAAACIbG0YZ2hlYWQAAAKkAAAALwAAADYFMURJaGhlYQAAAtQAAAAeAAAAJAUSAEVobXR4AAAC9AAAABAAAAAQAkAAYmxvY2EAAAMEAAAACgAAAAoAbgBUbWF4cAAAAxAAAAAfAAAAIABIAEFuYW1lAAADMAAAASwAAAITlIKBVXBvc3QAAARcAAAAFgAAACD/gwA0AAAAAQAAAADQnC0IAAAAANECK2oAAAAA0l+ACnicY2BkYGDgAWIxBjkGJgZGBmYgZGRgAYowATEjBAMACK0AVHicY2BhOMA4gYGVgYFpJtMZBgaGfgjN+JrBmJETKMrAyswABg0MDMwM7GCmAIgISHNNYTjAkMiQyNzwv4EhjrkBqIQJopbpAJhSYGAEALgFDbIAAHicY2BgYGaAYBkGRgYQsAHyGMF8FgYFIM0ChCB+4v//EPL/IqhKBkY2BhiTgZEJSDAxoAJGBsoBMxXMoCEAAKoCBx4AACICiAAAAAH//wAAeJxjYGJQYmBgNGJaxcDMwM6gt5GRQd9mEzsLw1ujjWysd2w2MTMBmQwbmUHCrCDhTexsjH9sNjGCxI0FFQXVjQWVlRgF3p05w7Tqb5gSUxoDAxODAwMDQwPTAaCJ/AwM5qbWjLKM2oyCUNpBAQoeAAFTg4MDUDUA7JseRHicY2BkYGAA4tly2z7G89t8ZeBmYQCBS/ENbnBaCajEiOkAkMvBwAQSBQAbowkgAHicY2BkYGBu+N/AEMdwgAEIGI0YGBlQAQsAXRIDWgAAAMAAIgAAAAAAwAAAAMAAQAAAACoAKgAqAEQAAHicY2BkYGBgYRBgYGIAARDJyAASc2DQAwkAAAVJAIoAeJx9j7FqwlAYhc/VaO0ibp0K/9BBwYQb0aHSRYRQugQcHEoXkRAD8V6JyZAH6NhX6ev0ZTr0JF6nghlyvvw59/znAhjiGwqX5xEvjhUGyB13cIdPx1084cexh4EaOu5hpJ4d9zn/oFN59/xatqcaVhjh3XGHeyvHXbziy7FHz6/jHkQ9OO4z/w1rWJxQo0CGFAeUEIyxx4Q6g0aIBabkFQydhs4jtcIZWNtTXWTpoZTxfiIzHS6msjLW1Edb8XdMd05/ownPIzZ5HZuEtOEgZUiOHRdjk6RVviNE7Yqy1YKOpC0RsIbw0vIv8jKdw2fNkO9rYUTWlJEt0kRmgZalXFcT534Y+k3Zmw23HBS8ZNY2EuY2yUGrTRtsk+KcWSNah4HWWm6l/QHpU0+weJxjYGYAg/8NDMZAipEBDQAAKCUBtwAA') " + "format('woff'); }", sheet.cssRules.length);
        } catch (e) {
            return finish(false);
        }
        cssText = sheet.cssRules[0] ? sheet.cssRules[0].cssText : "";
        supportFontFace = /src/i.test(cssText) && cssText.indexOf("@font-face") === 0;
        if (!supportFontFace) {
            return finish(false);
        }
        // フォントが適用されるまで待つ。
        // 試行用 webフォントは font-size: 160px; で 文字 "a" の幅が 30px
        waitEnableWebFont({
            font_family: "OnlyOneA",
            testString: "a",
            assumedWidth: 30,
            testSize: 160,
            active: function() {
                finish(true);
            },
            inactive: function() {
                finish(false);
            }
        });
        var finish = function(isOk) {
            if (sheet && sheet.cssRules.length) {
                sheet.deleteRule(ruleIndex);
            }
            style.parentNode.removeChild(style);
            callback(isOk);
        };
    };
    // どのフォントが必要か調べる
    var checkRequiredFont = function(callback) {
        // MS Pゴシックと Saitamaar が利用できるか確認する
        // MS Pゴシックは webフォントとして利用されることはまず無く
        // Saitamaar はほぼ webフォントとして利用される
        // MS Pゴシックは同期的に確認し、Saitamaar は非同期的に確認することにする
        var msPGothicIsInstalled = false;
        var directWriteIsEnabled = false;
        // MS Pゴシックが利用できるか確認する
        var div = makeDiv();
        d.body.appendChild(div);
        var span = makeSpan("iﾞ", // i と ﾞ(半角の濁点)
        "'ＭＳ Ｐゴシック','MS Pゴシック','MS PGothic','ＭＳＰゴシック','MSPゴシック',Courier,monospace,serif");
        div.appendChild(span);
        var w = parseInt(span.offsetWidth);
        msPGothicIsInstalled = 6 <= w && w <= 8;
        // 3+4=7 (誤差により±1px)
        if (msPGothicIsInstalled) {
            // DirectWrite 適用 → 16px の MS Pゴシック で i*10 の幅 ≠ 30px
            span.replaceChild(d.createTextNode("iiiiiiiiii"), span.firstChild);
            directWriteIsEnabled = parseInt(span.offsetWidth) > 30;
        }
        // 後始末
        div.parentNode.removeChild(div);
        div = span = null;
        // MS Pゴシック 且つ DirectWrite 適用 → patchForAA
        if (msPGothicIsInstalled && directWriteIsEnabled) {
            return callback("patchForAA");
        }
        // MS Pゴシック 且つ DirectWrite 非適用 → noRequired
        if (msPGothicIsInstalled && !directWriteIsEnabled) {
            return callback("noRequired");
        }
        // MS Pゴシックが無い場合、そのサイトが Saitamaar を読み込む設定か確認
        // (@font-face が設定されている 且つ 実際に読み込める)
        if (!msPGothicIsInstalled) {
            waitEnableWebFont({
                font_family: "Saitamaar",
                testString: "iﾞ",
                // i と ﾞ(半角の濁点)
                assumedWidth: 7,
                testSize: 16,
                active: function() {
                    // Saitamaar がサイトで読み込める
                    callback("noRequired");
                },
                inactive: function() {
                    // サイトで Saitamaar の用意も無し
                    // Saitamaar を読み込む
                    // Mobile の一部は woff に対応していないのでチェック
                    checkOkWoff(function(isOk) {
                        if (isOk) {
                            callback("saitamaar");
                        } else {
                            callback("noRequired");
                        }
                    });
                }
            });
        }
    };
    var applyFont = function(name) {
        switch (name) {
          case "noRequired":
            break;

          case "patchForAA":
            applyPatchForAA();
            break;

          case "saitamaar":
            applySaitamaar();
            break;
        }
    };
    var loadedListener = function() {
        var Key_RequiredFont = "requiredFontForAA";
        var requiredFont = read_cookie(Key_RequiredFont);
        if (requiredFont === null) {
            checkRequiredFont(function(requiredFont) {
                write_cookie(Key_RequiredFont, requiredFont, cookieExpiresDays, cookiePath);
                applyFont(requiredFont);
            });
        } else {
            applyFont(requiredFont);
        }
    };
    if (d.readyState === "complete" || d.readyState === "interactive") {
        loadedListener();
    } else {
        d.addEventListener("DOMContentLoaded", loadedListener, false);
    }
})();