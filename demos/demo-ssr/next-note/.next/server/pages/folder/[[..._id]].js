(() => {
var exports = {};
exports.id = 134;
exports.ids = [134];
exports.modules = {

/***/ 87752:
/***/ ((module) => {

// Exports
module.exports = {
	"header": "Folder_header__RLgsS"
};


/***/ }),

/***/ 72317:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "getServerSideProps": () => (/* binding */ getServerSideProps)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(20997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var antd_mobile_icons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(50584);
/* harmony import */ var antd_mobile_icons__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(antd_mobile_icons__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var antd_mobile__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(2311);
/* harmony import */ var _styles_Folder_module_scss__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(87752);
/* harmony import */ var _styles_Folder_module_scss__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_styles_Folder_module_scss__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _services_ssr__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(20343);
/* harmony import */ var _components_PageHead__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(96740);
/* harmony import */ var _components_MainLayout__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(58318);
/* harmony import */ var _components_FileList__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(22825);
/* harmony import */ var _components_AddButton__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(67337);









const getServerSideProps = async (ctx)=>{
    let rows = [];
    let parent = null;
    if (!ctx.query._id) {
        rows = _services_ssr__WEBPACK_IMPORTED_MODULE_2__/* .items.filter */ .e.filter((item)=>item.folder === true).sort((a, b)=>{
            return a.title.localeCompare(b.title);
        }).slice(0, 3).concat(_services_ssr__WEBPACK_IMPORTED_MODULE_2__/* .items.filter */ .e.filter((item)=>item.folder === false).sort((a, b)=>{
            return a.title.localeCompare(b.title);
        }).slice(0, -3));
    } else {
        const _id = ctx.query._id[0];
        if (_id.endsWith("03")) {
            rows = _services_ssr__WEBPACK_IMPORTED_MODULE_2__/* .items.filter */ .e.filter((item)=>item.folder === true).sort((a, b)=>{
                return a.title.localeCompare(b.title);
            }).slice(3).concat(_services_ssr__WEBPACK_IMPORTED_MODULE_2__/* .items.filter */ .e.filter((item)=>item.folder === false).sort((a, b)=>{
                return a.title.localeCompare(b.title);
            }).slice(-3));
        }
        parent = _services_ssr__WEBPACK_IMPORTED_MODULE_2__/* .items.find */ .e.find((item)=>item._id === _id) || null;
    }
    return {
        props: {
            items: rows,
            parent
        }
    };
};
const Folder = ({ items , parent  })=>{
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_PageHead__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
                title: "文件夹"
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_MainLayout__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
                active: "/folder",
                children: [
                    !!parent && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: (_styles_Folder_module_scss__WEBPACK_IMPORTED_MODULE_7___default().header),
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd_mobile_icons__WEBPACK_IMPORTED_MODULE_1__.LeftOutline, {
                                onClick: ()=>history.back()
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                children: parent.title
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                style: {
                                    width: "16px"
                                }
                            })
                        ]
                    }),
                    items.length > 0 ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_FileList__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {
                        items: items
                    }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd_mobile__WEBPACK_IMPORTED_MODULE_8__.Empty, {
                            description: "暂无数据"
                        })
                    })
                ]
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_AddButton__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {})
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Folder);


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

/***/ 95468:
/***/ ((module) => {

"use strict";
module.exports = require("dayjs/locale/zh-cn");

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

/***/ 14195:
/***/ ((module) => {

"use strict";
module.exports = require("dayjs/plugin/relativeTime");

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
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [900,740,318,811,337], () => (__webpack_exec__(72317)));
module.exports = __webpack_exports__;

})();