function processWeChatContainer(v) {
    if (isWeChat()) {
        post("/http/wechatstatus" + "?random=" + Math.random(),
            {
                from: 'wechat'
            },
            function (data) {
                onProcessLoginStatusReturn(data);
            }
        );
    }
}

function onProcessLoginStatusReturn(data) {
    var json
    var json = eval('(' + data + ')');
    var jump;
    inWeChat = json.inWeChat;
    needLbs = json.needLbs;
    jump = json.jump;

    //test
    //jump = false;
    //inWeChat = true;
    //needLbs = true;
    //test end

    if (jump) {
        var urlJump = json.urlJump;
        window.location.href = urlJump;
    }
    else {
        if (inWeChat) {
            if (needLbs) {
                getLbsLocation('lbs');
            }
        }
        else {

        }
    }
}



function onLbs(value) {
    var url;
    var homepage;
    var longitude = value.point.lng;
    var latitude = value.point.lat;
    //alert(window.location.protocol) ;
    homepage = window.location.protocol + "//" + window.location.host;
    url = window.location.href;
    post("/http/lbs",
                    {
                        command: "getLocationByLatLon"
                        , cityId: cityId
                        , latitude: latitude
                        , longitude: longitude
                        , homepage: homepage
                        , url: url
                    },
                    function (data) {
                        var cityId;
                        var json = eval('(' + data + ')');
                        var result = json.resultId;
                        if (result == '0') {
                            if (confirm(json.resultDesc)) {
                                var urlTo = json.url;
                                cityId = json.cityIdByLbs;

                                setCityIdInWeChatContainer(cityId, urlTo);
                            }
                            else {
                                cityId = json.cityId;
                                setCityIdInWeChatContainer(cityId, "");
                            }

                        }
                    }
                  );
}


function setCityIdInWeChatContainer(cityId, url) {
    post("/http/lbs",
                    {
                        command: "setCityIdInWeChatContainer"
                        , cityId: cityId
                    },
                    function (data) {
                        if ("" != url) {
                            window.location.href = url;
                        }
                    }
                )
}