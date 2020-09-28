var mycookiedomain;
var mostPossibleLink = "";

var isMobileVersion = true;
var STYLEID = '1', STATICURL = 'static/', IMGDIR = '/images', VERHASH = '201881401', charset = 'gbk', discuz_uid = '0', cookiepre = 't7asq_4ad6_', cookiedomain = '.discuz.net', cookiepath = '/', showusercard = '1', attackevasive = '0', disallowfloat = 'newthread|tradeorder|activity|debate', defaultstyle = '', REPORTURL = 'aHR0cDovL3d3dy5kaXNjdXoubmV0Lw==', SITEURL = '', JSPATH = '/scripts/';

var browserInfo;


function initCommonPageScriptAll(v) {
    gotoTop(50);

    processLinkAll();

    processMiniPragram();

    processContainerApp();

}

function savePageView(pageId) {
    var location = document.location;
    var referrer = document.referrer;

    if (null == referrer) {
        referrer = "";
    }

    location = encodeURIComponent(location);
    referrer = encodeURIComponent(referrer);

    var url = "/http/pageview?pageId={0}&random={1}";
        url = url.format(pageId, Math.random());
        post(url,
    {
            requestReferrer: referrer
                , location: location
    },
            function (data) {
                var json = eval('(' +data + ')');
                if ("0" == json.resultId) {
                    var funtionName = 'pageViewCallback';
if(isFunction(funtionName)) {
                        var v = { 'visitLogId' : json.visitLogId
};
                        var callbackfunname = funtionName + "(v)";
    eval(callbackfunname)
                    }
                    }

                    }
        );
}

function isFunction(functionName) {
    var ret = false;
    if (typeof (eval(functionName)) == "function") {
        ret = true;
    }
    return ret;
    }


function browserInit() {
    browserInfo = {
        versions: function () {
            var u = navigator.userAgent,
            app = navigator.appVersion;
            return {
                mobile: !!u.match(/AppleWebKit.*Mobile.*/),
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
                android: u.indexOf("Android") > -1 || u.indexOf("Linux") > -1,
                iPhone: u.indexOf("iPhone") > -1,
                iPad: u.indexOf("iPad") > -1
                , canShare: u.indexOf("MQQBrowser/") > -1 || u.indexOf("UCBrowser/") > -1
            };
        }(),
        language: (navigator.browserLanguage || navigator.language).toLowerCase()
    };
}

function QueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

function decroateRadioList(self) {
    var callback = '';
    if (self.getAttribute("callbackFun")!= null)
        //if (queryObj.hasAttribute("callbackFun"))
    {
        callback = self.getAttribute("callbackFun");
    }
    else {
        callback = '';
    }
    //alert(callback);

    var id = self.id;
    var inputString = '#' + id + ' input';
    var inputs = document.querySelectorAll(inputString);

    var ul = document.createElement('ul');
    ul.className = 'ul_radiobuttonlist clearfix';
    self.appendChild(ul);
    
    var alt = "";
    var ulHtml = '';
    for (var i = 0; i < inputs.length; i++) {
        var tempLabel;
        tempLabel= inputs[i].nextSibling;
        var text = tempLabel.innerHTML;
        var html = inputs[i].outerHTML;

        alt = inputs[i].parentNode.getAttribute("data-icon");
        var liText;
        if (undefined != alt && '' != alt) {
            liText = "<li id='myli{0}' onclick=setSelectedRadioButtonListIndex('{3}',{0},'{4}')>{1}<img src='{5}' class='verticalAlignMiddle'/><span class='verticalAlignMiddle'>{2}</span></li>";
            liText = liText.format(i, html, text, id, callback, alt);
        }
        else {
            liText = "<li id='myli{0}' onclick=setSelectedRadioButtonListIndex('{3}',{0},'{4}')>{1}<span>{2}</span></li>";
            liText = liText.format(i, html, text, id, callback);
        }

        ulHtml += liText;

        //var liItem = document.createElement('ul');
        //var liItem = $(liText);
        //$(liItem).hover(function () {
        //    $(this).addClass('itemHighLight');
        //}, function () {
        //    $(this).removeClass('itemHighLight');
        //});

        //inputs[i].remove();
        inputs[i].parentNode.removeChild(inputs[i]);
        tempLabel.parentNode.removeChild(tempLabel);
        //tempLabel.remove();
    }

    ul.innerHTML = ulHtml;

    var willAdjustWidth = self.getAttribute("data-adjustWidth");
    if (undefined == willAdjustWidth) {
        adjustWidth(self);
    }
    else {
        if ("1" == willAdjustWidth) {
            adjustWidth(self);
        }
    }


}


function showSubmittingCommon(ctrl) {
    var submittingText = ctrl.getAttribute("submittingText");
    ctrl.setAttribute("disabled", true);
    addClass(ctrl, "ac_loading_onbutton");
    ctrl.value=submittingText;
}

function showUIOnSubmitDoneCommon(ctrl) {
    var text = ctrl.getAttribute("normalText");
    ctrl.removeAttribute("disabled");
    removeClass(ctrl,"ac_loading_onbutton");
    ctrl.value = text;
}



function addClass(id, className) {
    var dom = document.querySelector("#" + id);
    dom.className = dom.className + " " + className;
}


function addClass(dom, className) {
    if ('' == dom.className)
    {
        dom.className = className;
    }
    else {
        dom.className = dom.className + " " + className;
    }
    
}


function removeClass(id,className)
{
    var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
    var dom = document.querySelector("#" + id );
    dom.className = dom.className.replace(reg, ' ').replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}


function removeClass(dom, className) {
    var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
    dom.className = dom.className.replace(reg, ' ').replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}

function changeRadio(self) {
    var id = self.id;
    var index = getSelectedRadioButtonListIndex(self);
    if (-1 != index) {
        var liTemplate = "myli{0}";
        var li = liTemplate.format(index);
        document.querySelector("#" + id + " #" + li).className +=" current";
        var string = '#' + id + ' input';
        var children = document.querySelectorAll(string);
        for (var i = 0; i < children.length; i++) {
            if (i != index) {
                li = liTemplate.format(i);

                var reg = new RegExp('(\\s|^)' + 'current' + '(\\s|$)');
                var dom = document.querySelector("#" + id + " #" + li);
                dom.className = dom.className.replace(reg, ' ').replace(/^\s\s*/, '').replace(/\s\s*$/, '');
            }
        }
    }
    else {
        var liTemplate = "myli{0}";
        var li;
        var string = '#' + id + ' input';
        var children = document.querySelectorAll(string);
        for (var i = 0; i < children.length; i++) {
            li = liTemplate.format(i);
            var reg = new RegExp('(\\s|^)' + 'current' + '(\\s|$)');
            document.querySelector("#" + id + " #" + li).className.replace(reg, ' ').replace(/^\s\s*/, '').replace(/\s\s*$/, '');
        }
    }
}



function getSelectedRadioButtonListIndex(ctrl) {
    var ret = -1;
    var children;
    var id = ctrl.id;
    var string = '#' + id + ' input';
    children = document.querySelectorAll(string);
    for (var i = 0; i < children.length; i++) {
        var checked = children[i].checked;
        if (true == checked) {
            ret = i;
            break;
        }
    }
    return ret;
}

String.prototype.format = function () {
    var args = arguments;
    return this.replace(/\{(\d+)\}/g,
        function (m, i) {
            return args[i];
        });
}


function adjustWidth(self) {
    var id = self.id;
    var lis = document.querySelectorAll('#'+id + " ul li");
    var maxWidth = 0;
    var i;
    for (i = 0; i < lis.length; i++) {
        var width = lis[i].clientWidth;
        maxWidth = Math.max(maxWidth, width);
    }

    if (0 != maxWidth) {
        for (i = 0; i < lis.length; i++) {
            lis[i].style.width = maxWidth + 'px';
            lis[i].style.display = 'unset';
        }
    }
}



function setSelectedRadioButtonListIndex(id, index, callback) {
    var children;
    var string = '#' + id + ' input';
    children = document.querySelectorAll(string);
    for (var i = 0; i < children.length; i++) {
        if (i == index) {
            children[i].checked = true;
            break;
        }
    }

    if ('' != callback) {
        var fun = callback + "('" + id + "')";
        eval(fun);
    }

    changeRadio(document.getElementById(id));

}


function getSelectedDecoroateRadioButtonListValue(ctrl) {
    var ret = "";
    var id = ctrl.id;
    var string = '#' + id + ' input';
    children = document.querySelectorAll(string);

    for (var i = 0; i < children.length; i++) {
        var checked = children[i].checked;
        if (true == checked) {
            ret = children[i].value;
            break;
        }
    }
    return ret;
}






function gotoTop(min_height) {
    //预定义返回顶部的html代码，它的css样式默认为不显示
    var id = 'gotoTop';
    //var gotoTop_html = '<div id="gotoTop" class="common_icon"><em>顶部</em></div>';
    var gotoTop = document.createElement('div');
    gotoTop.id = id;
    addClass(gotoTop, 'common_icon');
    gotoTop.innerHTML = '<em>顶部</em>';

    //将返回顶部的html代码插入页面上id为page的元素的末尾 
    document.body.appendChild(gotoTop);
    
    gotoTop.onclick = function () {
        document.documentElement.scrollTop = document.body.scrollTop = 0;
    };
    //获取页面的最小高度，无传入值则默认为600像素
    min_height ? min_height = min_height : min_height = 600;
    //为窗口的scroll事件绑定处理函数
    window.onscroll = function () {
        var s;
        s = document.documentElement.scrollTop || document.body.scrollTop;
        if (s > min_height) {
            gotoTop.style.display = 'unset';
        } else {
            gotoTop.style.display = 'none';
        };
    };
}

function makeLinkResponsive() {
    browserInit();
    if (false == browserInfo.versions.mobile) {
        var items = $("a");
        for (var i = 0; i < items.length; i++) {
            var target = items[i].getAttribute("target");
            var href = items[i].getAttribute("href");
            if ("undefined" == typeof (href) || 0 == href.indexOf("javascript:")) {
                continue;
            }
            else {
                if ("undefined" == typeof (target) || null == target) {
                    var exist = items[i].getAttribute("target");
                    items[i].setAttribute("target", "_blank");
                }
            }
        }
    }

    processLinkAll();

}

function processLinkAll() {
    processLink('container');
    processLink('cityId');
    processLink('inviter');
    //processLink('from');
}


function processLink(paraName) {
    var value = QueryString(paraName);
    var add = false;
    if (null != value && '' != value) {
        add = true;
    }

    if (add) {
        var items = document.getElementsByTagName("a");
        for (var i = 0; i < items.length; i++) {
            var transmit = items[i].getAttribute("transmit");
            if ('0' == transmit) {
                continue;
            }
            else {
                var href = items[i].getAttribute("href");
                if (undefined == href) {
                    continue;
                }
                var docA = document.createElement('a');
                docA.href = href;
                var protocal = docA.protocol.replace(':', '');
                var lowerProtocal = protocal.toLowerCase();
                if ('http' == lowerProtocal || 'https' == lowerProtocal) {
                    var newHref;
                    if (false == containPara(href, paraName)) {
                        newHref = addPara(href, paraName, value);
                        items[i].setAttribute("href", newHref);
                    }
                }
                else {

                }
            }

        }
    }
}

function isMiniProgramEnv() {
    var ret = window.__wxjs_environment === 'miniprogram';
    return ret;
}

function processMiniPragram() {
    if (isMiniProgramEnv()) {
        $('.miniProgram').hide();

        $('.showInMiniProgram').removeClass('hide');

    }
    else {
        $('#divMiniProgram').hide();
    }
}


function processContainerApp() {
    var value = QueryString('container');

    var referrer = document.referrer;
    if (1 == value&&null!=referrer&&''!=referrer) {
        $('#floatback').removeClass('hide');

        var clientWidth = document.body.clientWidth;
        var screenWidth = document.documentElement.clientWidth;
        var offsetLeft = (screenWidth - clientWidth) / 2;
        var myLeft = offsetLeft + 30;
        $('#floatback').css('left', myLeft);
    }
    else {

    }
}


function containPara(href, paraName) {
    paraName = paraName.toLowerCase();
    var ret = false;
    if (href.toLowerCase().indexOf('?' + paraName + '=') < 0 && href.toLowerCase().indexOf('&' + paraName + '=') < 0) {
        ret = false;
    }
    else {
        ret = true;
    }
    return ret;
}

function addPara(href, paraName, paraValue) {

    if (false == containPara(href, paraName)) {
        var newHref;
        var token = '';
        if (href.indexOf('?') >= 0) {
            token = '&';
        }
        else {
            token = '?';
        }
        newHref = href + token + paraName + "=" + paraValue;
        return newHref;
    }
    else {
        return href;
    }
}

function isWeChat() {
    var ret = false;
    if (undefined != window.navigator.userAgent && '' != window.navigator.userAgent) {
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == 'micromessenger') {
            ret = true;
        } else {
            ret = false;
        }
    }
    return ret;
}

//show window
function discuzJsLoaded() {
    var ret = false;
    if (typeof showMenu == 'function') {
        ret = true;
    }
    return ret;
}

function showCustomerWeChatWindow(ctrl) {
    if (false == discuzJsLoaded()) {
        head.load(discuzCommonJavascript);
        head.ready(function () {
            doShowCustomerWeChatWindow(ctrl);
        });
    }
    else {
        doShowCustomerWeChatWindow(ctrl);
    }

}

function doShowCustomerWeChatWindow(ctrlObj) {

    var screenHeight = document.documentElement.clientHeight;
    var screenWidth = document.documentElement.clientWidth;

    var url = (!isUndefined(ctrlObj.href) ? ctrlObj.href : ctrlObj.attributes['href'].value);

    url = addPara(url, "containerHeight", screenHeight);
    url = addPara(url, "containerWidth", screenWidth);

    var v = { 'pos': '00', 'layer': '0', 'cache': 1, 'maxh': screenHeight, 'maxw': screenWidth };
    showWindow("customerwechat", url, 'get', -1, v);
}
//end of showing window


var FrontFileLoaded = [];
function exeAirJavascript(func, args, script) {
    var run = function () {
        var argc = args.length, s = '';
        for (i = 0; i < argc; i++) {
            s += ',args[' + i + ']';
        }
        eval('var check = typeof ' + func + ' == \'function\'');
        if (check) {
            var fun = func + '(' + s.substr(1) + ')';
            eval(fun);
        } else {
            setTimeout(function () { checkrun(); }, 50);
        }
    };

    var checkrun = function () {
        if (checkAllLoaded()) {
            run();
        } else {
            setTimeout(function () { checkrun(); }, 250);
        }
    };

    var checkAllLoaded = function () {
        var ret = true;
        var scriptCount = script.length;
        for (j = 0; j < scriptCount; j++) {
            var fileName = script[j];
            if (!FrontFileLoaded[fileName]) {
                ret = false;
                break;
            }
        }

        return ret;
    };

    var loadAll = function () 
    {
        head.load(script);
        head.ready(function ()
        {
            var scriptCount = script.length;
            for (j = 0; j < scriptCount; j++)
            {
                var fileName = script[j];
                FrontFileLoaded[fileName] = 1;
            }
        })
    };

    if (false == checkAllLoaded(script)) {
        loadAll(script);
    }

    checkrun();
}

function parseBoolean(str) {
    return /^true$/i.test(str);
}