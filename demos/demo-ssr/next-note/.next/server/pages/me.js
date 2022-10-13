(() => {
var exports = {};
exports.id = 865;
exports.ids = [865];
exports.modules = {

/***/ 27350:
/***/ ((module) => {

// Exports
module.exports = {
	"wrap": "Me_wrap__mPJ1t",
	"top": "Me_top__ceUdr",
	"nickname": "Me_nickname__j1Dvr"
};


/***/ }),

/***/ 30781:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({"src":"/_next/static/media/avatar.04c14b5b.webp","height":256,"width":256,"blurDataURL":"data:image/webp;base64,UklGRlgAAABXRUJQVlA4IEwAAADwAQCdASoIAAgAAkA4JZQCdAEf3aEH8AAA/u5sd/rz9jvXwwQN48ATfv0//hu273SCIbHssXdu7asEfgVAEvkE3gVXJWk8nBg2wAAA"});

/***/ }),

/***/ 59466:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ me),
  "getServerSideProps": () => (/* binding */ getServerSideProps)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(20997);
// EXTERNAL MODULE: ./node_modules/.pnpm/antd-mobile@5.19.0_biqbaboplfbrettd7655fr4n2y/node_modules/antd-mobile/cjs/index.js
var cjs = __webpack_require__(2311);
// EXTERNAL MODULE: external "antd-mobile-icons"
var external_antd_mobile_icons_ = __webpack_require__(50584);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(71853);
// EXTERNAL MODULE: ./src/styles/Me.module.scss
var Me_module = __webpack_require__(27350);
var Me_module_default = /*#__PURE__*/__webpack_require__.n(Me_module);
// EXTERNAL MODULE: ./src/assets/imgs/avatar.webp
var avatar = __webpack_require__(30781);
// EXTERNAL MODULE: ./src/components/PageHead/index.tsx
var PageHead = __webpack_require__(96740);
// EXTERNAL MODULE: ./src/components/MainLayout/index.tsx + 2 modules
var MainLayout = __webpack_require__(58318);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(16689);
;// CONCATENATED MODULE: ./src/assets/imgs/logout.svg
var _path, _path2;

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }



var SvgLogout = function SvgLogout(props) {
  return /*#__PURE__*/external_react_.createElement("svg", _extends({
    className: "logout_svg__icon",
    viewBox: "0 0 1024 1024",
    xmlns: "http://www.w3.org/2000/svg",
    fill: "currentColor",
    width: "1em",
    height: "1em"
  }, props), _path || (_path = /*#__PURE__*/external_react_.createElement("path", {
    d: "M961 511.5c.1-7.8-2.9-15.5-8.8-21.4-1-1-2.1-1.9-3.2-2.7L810.7 349.1c-11.7-11.7-30.7-11.7-42.4 0s-11.7 30.8 0 42.4l85.6 85.5h-471c-16.5 0-30 13.5-30 30s13.5 30 30 30h479.9l-94.6 94.5c-11.7 11.7-11.7 30.8 0 42.4 11.7 11.7 30.7 11.7 42.4 0L949 535.6c1.1-.8 2.2-1.7 3.2-2.7 5.9-5.9 8.8-13.6 8.8-21.4z"
  })), _path2 || (_path2 = /*#__PURE__*/external_react_.createElement("path", {
    d: "M726.6 835c-63.4 41.8-137.2 64-213.5 64-52.4 0-103.2-10.3-151-30.5-46.2-19.5-87.7-47.5-123.4-83.2C203 749.7 175 708.2 155.5 662c-20.2-47.8-30.5-98.6-30.5-151 0-52.4 10.3-103.2 30.5-151 19.5-46.2 47.5-87.7 83.2-123.3C274.3 201 315.8 173 362 153.5c47.8-20.2 98.6-30.5 151-30.5 75.7 0 151.6 21.9 213.9 61.8 14 8.9 32.5 4.9 41.4-9.1 8.9-14 4.9-32.5-9.1-41.4C687.5 88.3 600 63 513.1 63c-60.5 0-119.2 11.8-174.4 35.2-53.4 22.6-101.3 54.9-142.4 96-41.1 41.1-73.4 89-96 142.4C76.9 391.9 65 450.5 65 511s11.9 119.1 35.2 174.4c22.6 53.4 54.9 101.3 96 142.4 41.1 41.1 89.1 73.4 142.4 96C393.9 947.2 452.5 959 513 959c88.1 0 173.3-25.5 246.6-73.9 13.8-9.1 17.6-27.7 8.5-41.6-9.1-13.8-27.7-17.6-41.5-8.5z"
  })));
};

/* harmony default export */ const logout = (SvgLogout);
;// CONCATENATED MODULE: ./src/pages/me.tsx









const getServerSideProps = async ()=>{
    const user = {
        nickname: "Tanya"
    };
    return {
        props: {
            user
        }
    };
};
const Me = ({ user  })=>{
    const router = (0,router_.useRouter)();
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(PageHead/* default */.Z, {
                title: "我"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(MainLayout/* default */.Z, {
                active: "/me",
                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: (Me_module_default()).wrap,
                    children: [
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            className: (Me_module_default()).top,
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx(cjs.Avatar, {
                                    src: avatar/* default.src */.Z.src,
                                    style: {
                                        "--size": "60px"
                                    }
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                    className: (Me_module_default()).nickname,
                                    children: user.nickname
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)(cjs.List, {
                            mode: "card",
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx(cjs.List.Item, {
                                    prefix: /*#__PURE__*/ jsx_runtime_.jsx(external_antd_mobile_icons_.LockOutline, {}),
                                    onClick: ()=>router.push("/passwd"),
                                    children: "修改密码"
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx(cjs.List.Item, {
                                    prefix: /*#__PURE__*/ jsx_runtime_.jsx(logout, {}),
                                    onClick: ()=>{
                                        cjs.Dialog.confirm({
                                            content: "确定要退出登录吗？"
                                        });
                                    },
                                    children: "退出登录"
                                })
                            ]
                        })
                    ]
                })
            })
        ]
    });
};
/* harmony default export */ const me = (Me);


/***/ }),

/***/ 50584:
/***/ ((module) => {

"use strict";
module.exports = require("antd-mobile-icons");

/***/ }),

/***/ 59003:
/***/ ((module) => {

"use strict";
module.exports = require("classnames");

/***/ }),

/***/ 1635:
/***/ ((module) => {

"use strict";
module.exports = require("dayjs");

/***/ }),

/***/ 45144:
/***/ ((module) => {

"use strict";
module.exports = require("dayjs/plugin/isLeapYear");

/***/ }),

/***/ 89983:
/***/ ((module) => {

"use strict";
module.exports = require("dayjs/plugin/isoWeek");

/***/ }),

/***/ 47172:
/***/ ((module) => {

"use strict";
module.exports = require("dayjs/plugin/isoWeeksInYear");

/***/ }),

/***/ 40968:
/***/ ((module) => {

"use strict";
module.exports = require("next/head");

/***/ }),

/***/ 71853:
/***/ ((module) => {

"use strict";
module.exports = require("next/router");

/***/ }),

/***/ 16689:
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ 66405:
/***/ ((module) => {

"use strict";
module.exports = require("react-dom");

/***/ }),

/***/ 20997:
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [900,740,318], () => (__webpack_exec__(59466)));
module.exports = __webpack_exports__;

})();