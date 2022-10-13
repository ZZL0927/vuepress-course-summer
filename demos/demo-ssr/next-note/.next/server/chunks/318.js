exports.id = 318;
exports.ids = [318];
exports.modules = {

/***/ 11359:
/***/ ((module) => {

// Exports
module.exports = {
	"wrap": "style_wrap__o98wr",
	"header": "style_header__kaGiL",
	"avatar": "style_avatar__Kp_JG",
	"nickname": "style_nickname__ulnWz",
	"more": "style_more__56_1u",
	"main": "style_main__js_VT",
	"footer": "style_footer__eoDWv",
	"drawer": "style_drawer__gNp6p",
	"menu": "style_menu__6Qt_l",
	"menuItem": "style_menuItem__QP_Vr",
	"menuIcon": "style_menuIcon__KPA_u",
	"menuActive": "style_menuActive__4KqWt"
};


/***/ }),

/***/ 58318:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ MainLayout)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(20997);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(71853);
// EXTERNAL MODULE: ./node_modules/.pnpm/antd-mobile@5.19.0_biqbaboplfbrettd7655fr4n2y/node_modules/antd-mobile/cjs/index.js
var cjs = __webpack_require__(2311);
// EXTERNAL MODULE: external "antd-mobile-icons"
var external_antd_mobile_icons_ = __webpack_require__(50584);
// EXTERNAL MODULE: ./src/components/MainLayout/style.module.scss
var style_module = __webpack_require__(11359);
var style_module_default = /*#__PURE__*/__webpack_require__.n(style_module);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(16689);
;// CONCATENATED MODULE: ./src/assets/imgs/time.svg
var _path;

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }



var SvgTime = function SvgTime(props) {
  return /*#__PURE__*/external_react_.createElement("svg", _extends({
    className: "time_svg__icon",
    viewBox: "0 0 1024 1024",
    xmlns: "http://www.w3.org/2000/svg",
    fill: "currentColor",
    width: "1em",
    height: "1em"
  }, props), _path || (_path = /*#__PURE__*/external_react_.createElement("path", {
    d: "M512 905.216c111.275-2.731 203.947-41.131 278.016-115.2S902.485 623.275 905.216 512c-2.731-111.275-41.131-203.947-115.2-278.016S623.275 121.515 512 118.784c-111.275 2.731-203.947 41.131-278.016 115.2S121.515 400.725 118.784 512c2.731 111.275 41.131 203.947 115.2 278.016S400.725 902.485 512 905.216zm0 65.536c-129.707-3.413-237.739-48.299-324.096-134.656S56.661 641.707 53.248 512c3.413-129.707 48.299-237.739 134.656-324.096S382.293 56.661 512 53.248c129.707 3.413 237.739 48.299 324.096 134.656S967.339 382.293 970.752 512c-3.413 129.707-48.299 237.739-134.656 324.096S641.707 967.339 512 970.752zm-32.768-720.896c9.557 0 17.408 3.072 23.552 9.216S512 273.067 512 282.624v262.144c0 9.557-3.072 17.408-9.216 23.552s-13.995 9.216-23.552 9.216-17.408-3.072-23.552-9.216-9.216-13.995-9.216-23.552V282.624c0-9.557 3.072-17.408 9.216-23.552s13.995-9.216 23.552-9.216zm0 262.144h262.144c21.845 0 32.768 10.923 32.768 32.768s-10.923 32.768-32.768 32.768H479.232c-21.845 0-32.768-10.923-32.768-32.768S457.387 512 479.232 512z"
  })));
};

/* harmony default export */ const time = (SvgTime);
;// CONCATENATED MODULE: ./src/assets/imgs/share.svg
var share_path;

function share_extends() { share_extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return share_extends.apply(this, arguments); }



var SvgShare = function SvgShare(props) {
  return /*#__PURE__*/external_react_.createElement("svg", share_extends({
    className: "share_svg__icon",
    viewBox: "0 0 1024 1024",
    xmlns: "http://www.w3.org/2000/svg",
    fill: "currentColor",
    width: "1em",
    height: "1em"
  }, props), share_path || (share_path = /*#__PURE__*/external_react_.createElement("path", {
    d: "M751.968 624.096c-55.68 0-103.456 31.968-127.392 78.24L367.36 546.048c10.336-19.872 16.736-42.08 16.736-66.016 0-16.352-3.328-31.776-8.32-46.432L645.28 288c26.368 29.312 64.192 48.096 106.688 48.096 79.552 0 144-64.48 144-144s-64.448-144-144-144c-79.488 0-144 64.48-144 144 0 13.952 2.592 27.168 6.304 39.904l-271.84 146.848c-26.08-26.4-62.272-42.816-102.368-42.816-79.52 0-144 64.48-144 144s64.48 144 144 144c32.064 0 61.408-10.848 85.344-28.576L608.064 767.2c0 .32-.096.608-.096.864 0 79.52 64.512 144 144 144 79.552 0 144-64.48 144-144s-64.448-143.968-144-143.968zm0-512c44.128 0 80 35.904 80 80s-35.872 80-80 80-80-35.904-80-80 35.872-80 80-80zM240.064 560.032c-44.096 0-80-35.904-80-80s35.904-80 80-80 80 35.904 80 80-35.872 80-80 80zm511.904 288.064c-44.128 0-80-35.872-80-80s35.872-80 80-80 80 35.872 80 80-35.872 80-80 80z"
  })));
};

/* harmony default export */ const share = (SvgShare);
;// CONCATENATED MODULE: ./src/components/MainLayout/index.tsx







function MainLayout(props) {
    const router = (0,router_.useRouter)();
    const tabs = [
        {
            key: "/",
            title: "最近",
            icon: /*#__PURE__*/ jsx_runtime_.jsx(time, {})
        },
        {
            key: "/folder",
            title: "文件夹",
            icon: /*#__PURE__*/ jsx_runtime_.jsx(external_antd_mobile_icons_.FolderOutline, {})
        },
        {
            key: "/share",
            title: "分享",
            icon: /*#__PURE__*/ jsx_runtime_.jsx(share, {})
        },
        {
            key: "/me",
            title: "我",
            icon: /*#__PURE__*/ jsx_runtime_.jsx(external_antd_mobile_icons_.UserOutline, {})
        }
    ];
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: (style_module_default()).wrap,
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("main", {
                className: (style_module_default()).main,
                children: props.children
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(cjs.TabBar, {
                safeArea: true,
                activeKey: props.active,
                onChange: (key)=>router.push(key),
                className: (style_module_default()).footer,
                children: tabs.map((item)=>/*#__PURE__*/ jsx_runtime_.jsx(cjs.TabBar.Item, {
                        icon: item.icon,
                        title: item.title
                    }, item.key))
            })
        ]
    });
};


/***/ })

};
;