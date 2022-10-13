"use strict";
(() => {
var exports = {};
exports.id = 347;
exports.ids = [347];
exports.modules = {

/***/ 99616:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "getServerSideProps": () => (/* binding */ getServerSideProps)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(20997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _services_ssr__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(20343);
/* harmony import */ var _components_PageHead__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(96740);
/* harmony import */ var _components_MainLayout__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(58318);
/* harmony import */ var _components_FileList__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(22825);





const getServerSideProps = async ()=>{
    const rows = _services_ssr__WEBPACK_IMPORTED_MODULE_1__/* .items.filter */ .e.filter((item)=>item.folder === false).sort((a, b)=>{
        return b.time - a.time;
    }).slice(5, 10);
    return {
        props: {
            items: rows
        }
    };
};
const Shares = ({ items  })=>{
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_PageHead__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z, {
                title: "分享"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_MainLayout__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
                active: "/share",
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_FileList__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
                    items: items
                })
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Shares);


/***/ }),

/***/ 50584:
/***/ ((module) => {

module.exports = require("antd-mobile-icons");

/***/ }),

/***/ 59003:
/***/ ((module) => {

module.exports = require("classnames");

/***/ }),

/***/ 1635:
/***/ ((module) => {

module.exports = require("dayjs");

/***/ }),

/***/ 95468:
/***/ ((module) => {

module.exports = require("dayjs/locale/zh-cn");

/***/ }),

/***/ 45144:
/***/ ((module) => {

module.exports = require("dayjs/plugin/isLeapYear");

/***/ }),

/***/ 89983:
/***/ ((module) => {

module.exports = require("dayjs/plugin/isoWeek");

/***/ }),

/***/ 47172:
/***/ ((module) => {

module.exports = require("dayjs/plugin/isoWeeksInYear");

/***/ }),

/***/ 14195:
/***/ ((module) => {

module.exports = require("dayjs/plugin/relativeTime");

/***/ }),

/***/ 40968:
/***/ ((module) => {

module.exports = require("next/head");

/***/ }),

/***/ 71853:
/***/ ((module) => {

module.exports = require("next/router");

/***/ }),

/***/ 16689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 66405:
/***/ ((module) => {

module.exports = require("react-dom");

/***/ }),

/***/ 20997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [900,740,318,811], () => (__webpack_exec__(99616)));
module.exports = __webpack_exports__;

})();