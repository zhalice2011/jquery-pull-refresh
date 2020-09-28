(function () {

    var _$ = window.$;
    var _jQuery = window.jQuery;

    var jQuery = window.jQuery = window.$ = function (selector) {

        return new jQuery.fn.init(selector);
    };

    var obj = {},
      toStr = obj.toString,
      hasOwnProp = obj.hasOwnProperty,
      arr = [],
      slice = arr.slice,
      push = arr.push;

    var isObject = function(obj) {
        return obj == null ? obj.toString() : toStr.call(obj) === '[object Object]';
    },
    isArray = Array.isArray || function(obj) {
        return toStr.call(obj) === '[object Array]';
    },
    isFunction = function(obj) {
        return typeof obj === 'function';
    },
    isString = function(obj) {
        return typeof obj === 'string';
    },
    isBoolean = function(obj) {
        return typeof obj === 'boolean';
    },
    inArray = function(arr, item) {
        return arr.indexOf(item) !== -1;
    };

    function pushStack(target) {
        var len = target.length;
  
        if (typeof len !== 'number' || len < 0) {
            //没有length属性，或者它小于0，直接返回target
            return target;
        }
  
        //保存除target外的所有参数并转化为数组形式
        var sources = slice.call(arguments, 1);
  
        each(sources, function() {
            //this值就是sources数组中的每一项
            var len = this.length;
  
            //同样判断是否为数组或类数组
            if (typeof len !== 'number' || len < 0) {
                return;
            }
  
            //之前保存的常用函数之一push，派上用场
            //与apply结合，批量push进target中
            push.apply(target, this);
        });
        return target;
    }

    function each(obj, callback) {
        //如果既不是对象也不是数组，不迭代，直接返回
        if (!isObject(obj) && !isArray(obj)) {
            return obj;
        }
        var len = obj.length;
        //要求obj.length类型为数字且不小于0
        //符合该条件就当做数组来迭代
        if (typeof len === 'number' && len >= 0) {
            //如果有用户滥用length属性，导致错误是其活该
            for (var i = 0; i < len; i += 1) {
                //callback函数的this值为数组中的每一项
                if (callback.call(obj[i], i, obj[i]) === false) {
                    //如果callback函数的返回值等价于false
                    //终止迭代
                    break;
                }
            }
        } else {
            //程序运行到这一步，说明该迭代的Obj类型为object
            for (var prop in obj) {
                if (hasOwnProp.call(obj, prop)) {
                    if (callback.call(obj[prop], prop, obj[prop]) === false) {
                        break;
                    }
                }
            }
        }
        //返回被迭代的数组或对象
        return obj;
    }

    jQuery.fn = jQuery.prototype = {
        init: function (selector) {
            if (selector && selector.nodeType) {
                this[0] = selector;
                this.length = 1;
                return this;
            }
            else {
                var elements = document.querySelectorAll(selector);
                Array.prototype.push.apply(this, elements);
                return this;
            }
        },
        jQuery: "1.0.0",
        length: 0,
        size: function () {
            return this.length;
        }

    };
    jQuery.fn.init.prototype = jQuery.fn;

    jQuery.extend = jQuery.fn.extend = function () {
        var o = arguments[0];
        for (var p in o) {
            this[p] = o[p];
        }
    };


    jQuery.extend({
        merge: function( first, second ) {
            var len = +second.length,
                j = 0,
                i = first.length;
    
            for ( ; j < len; j++ ) {
                first[ i++ ] = second[ j ];
            }
    
            first.length = i;
    
            return first;
        },
        trim: function (text) {
            return (text || "").replace(/^\s+|\s+$/g, "");
        },
        noConflict: function () {
            window.$ = _$;
            window.jQuery = _jQuery;
            return jQuery;
        }
        ,post: function (url, data, callback) {
        window.post(url, data, callback);
    }
    });


    jQuery.fn.extend({

        
        //each在这里很简单
        easyEach: function(callback) {
            return each(this, callback);
        },
        get: function (num) {
            return this[num];
        },
        each: function (fn) {
            for (var i = 0 ; i < this.length; i++) {
                fn(i, this[i]);
            }
            return this;
        },
        css: function () {
            var l = arguments.length;
            if (l == 1) {
                return this[0].style[arguments[0]];
            } else {
                var name = arguments[0];
                var value = arguments[1];
                this.each(function (index, ele) {
                    ele.style[name] = value;

                });
            }
            return this;
        },
        hide: function () {//隐藏元素
            this.each(function (index, ele) {
                ele.style.display = "none";
            });
        },
        show: function () {//显示元素
            this.each(function (index, ele) {
                ele.style.display = "block";
            });
        },
        addClass: function () { //添加(class)类
            var name = arguments[0];
            this.each(function (index, ele) {
                var ele_class = ele.className,
                blank = (ele_class != '') ? ' ' : '';
                added = ele_class + blank + name;
                ele.className = added;
            });
            return this;
        },
        removeClass: function () { //删除(class)类
            var name = arguments[0];
            this.each(function (index, ele) {
                var obj_class = ' ' + ele.className + ' ';
                obj_class = obj_class.replace(/(\s+)/gi, ' '),
                removed = obj_class.replace(' ' + name + ' ', ' ');
                removed = removed.replace(/(^\s+)|(\s+$)/g, '');
                ele.className = removed;
            });
        },
        remove: function () { //删除属性
            var name = arguments[0];
            this.each(function (index, ele) {
                ele.attributes.removeNamedItem(name);
            });
        },
        width: function () { //设置宽度
            var name = arguments[0];
            if (name === undefined) {
                return parseInt(getComputedStyle(this[0]).getPropertyValue('width'))
            }
            this.each(function (index, ele) {
                var strName = JSON.stringify(name);
                if (-1 != strName.indexOf('px'))
                {
                    ele.style.width = name;
                }
                else
                {
                    ele.style.width = name + 'px';
                }
            });
            return this;
        },
        height: function () { //设置高度
            var name = arguments[0];
            if (name === undefined) {
                return parseInt(getComputedStyle(this[0]).getPropertyValue('height'))
            }
            this.each(function(index, ele) {
                var strName = JSON.stringify(name);
                if (-1 != strName.indexOf('px')) {
                    ele.style.height = name;
                    }
                else
                    {
                    ele.style.height = name + 'px';
                    }
            });
            return this;
        },
        
        on: function (eventName, callback) {//on事件
            this.each(function (index, ele) {
                ele[eventName] = callback;
            });
        },
        first: function () {//获取该元素的第一个子元素
            this.each(function (index, ele) {
                var ss = ele.children[0];
            });
        },       
        allEle: function () {//获取该元素的全部子元素
            this.each(function (index, ele) {
                for (var i = 0; i < ele.children.length; i++) {
                    var ss = ele.children[i];
                }
            });
        },
        find: function(selector) {
            var ret = $();
            var nodes = [];
            this.easyEach(function() {
                var items = this.querySelectorAll(selector);
                items.length && push.apply(nodes, items);
            });
            return pushStack(ret, nodes);
        },

    });

})();
