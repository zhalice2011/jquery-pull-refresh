//baidu map sdk
/*lbs*/
var lbsAction;

function getLbsLocation(action) {
    lbsAction = action;

    var script = document.createElement("script");

    var url = "http://api.map.baidu.com/api?v=2.0&ak={0}&callback=getLbsLocationOnCallback";
    url = "https://api.map.baidu.com/api?v=3.0&ak={0}&s=1&callback=getLbsLocationOnCallback";
    var defaultAk = "o5n3YznLKlEE4HOuejedMVvH";
    var ak = baiduMapAk;
    if ("" == baiduMapAk) {
        ak = defaultAk;
    }
    url = url.format(ak);

    script.src = url;
    document.body.appendChild(script);
}


function getLbsLocationOnCallback() {
    onLbsPrepared();
}


function onLbsPrepared() {
    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function (r) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            //alert('您的位置：' + r.point.lng + ',' + r.point.lat);
            if ("teacher" == lbsAction) {
                jumpNearbyTeacherList(r);
            }
            else if ("student" == lbsAction) {
                jumpNearbyStudentList(r);
            }
            else if ("lbs" == lbsAction) {
                onLbs(r);
            }
        }
        else {
            alert('定位失败' + ' ' + this.getStatus());
        }
    }, { enableHighAccuracy: true }
    );
}