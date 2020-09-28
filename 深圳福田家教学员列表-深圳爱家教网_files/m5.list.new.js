//新的filter
function initCondition() {
    //遍历所有筛选项 dl
    var filterItems = document.getElementsByClassName('filter_item');
    for (var i = 0; i < filterItems.length; i++)
    {
        if (filterItems[i].getAttribute("type") == "area") 
        {
            var dds = filterItems[i].children;
            for (var j = 0; j < dds.length; j++)
            {
                if (dds[j].nodeName == 'DD')
                {
                    var len = dds[j].children.length;
                    var divMore = document.createElement('div');
                    $(divMore).addClass('ico_more');
                    dds[j].appendChild(divMore);
                    //dd.css({ "padding-right": "30px", "height": "28px" });
                    dds[j].style.height = '28px';
                    dds[j].style.paddingRight = '28px';
                }
            }
            //div.css("padding-right","30px");
        }
    }

    initIconMore();
}

function initIconMore()
{
    var isclick = false;

    $(".ico_more").on("onclick", function () {
        if (isclick) {
            return;
        }

        isclick = true;
        if (1==this.getAttribute("data-up")) {
            if (this.parentNode.parentNode.getAttribute("type") == "area") {
                $(this.parentNode).css("height", "28px");
            } else {
                $(this.parentNode).css("height", "28px");
            }
            $(this).removeClass("up");
            this.setAttribute("data-up", 0)
        } else {
            $(this.parentNode).css("height", "auto");
            $(this).addClass("up");
            this.setAttribute("data-up",1)
        }
        setTimeout(function () {
            isclick = false;
        }, 500);
    });
}

function initCondition0()
    {
		//遍历所有筛选项 dl
		$(".filter_item").each(function(){
			var len=$(this).find("dd a").length;
			//如果a标签的长度大于4，并且数据类型是cmc或者cmcs
			if(len>3 && $(this).attr("type")=="cmc_cmcs"){
				$(this).find("dd").append("<div class='ico_more'></div>");
				$(this).find("dd").css("padding-right","30px");
			}
			//如果a标签的长度大于4，并且数据类型是商圈数据
			if(len>4 && $(this).attr("type")=="subarea"){
				$(this).find("dd").append("<div class='ico_more'></div>");
				$(this).find("dd").css("padding-right","30px");
			}
			//如果a标签的长度大于或等于5，并且数据类型是区域，设置ico位置和dd高度
			if(len>=5 && $(this).attr("type")=="area"){
				$(this).find("dd").append("<div class='ico_more'></div>");
				//$(".ico_more").css("top","24px");
				$(this).find("dd").css({"padding-right":"30px","height":"28px"});
			}
			//筛选项大于三行添加”更多“按钮
			if($(".filter_item").length>=3 && $(this).hasClass("hide") && !$(".filter_more").length && $(this).attr("type")=="cmc_cmcs"){
			    $('.filter').append("<div class='filter_more'><a href='javascript:;'><span>"+moreFilterConditions+"</span><b class='arrow'></b></a></div>");
			}
		});
	
}
