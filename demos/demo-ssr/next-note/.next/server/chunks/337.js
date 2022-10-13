exports.id = 337;
exports.ids = [337];
exports.modules = {

/***/ 98450:
/***/ ((module) => {

// Exports
module.exports = {
	"wrap": "style_wrap__wzBKF"
};


/***/ }),

/***/ 67337:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ AddButton)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(20997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(16689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var antd_mobile_icons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(50584);
/* harmony import */ var antd_mobile_icons__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd_mobile_icons__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var antd_mobile__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2311);
/* harmony import */ var _style_module_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(98450);
/* harmony import */ var _style_module_scss__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_style_module_scss__WEBPACK_IMPORTED_MODULE_4__);





function AddButton() {
    const handle = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)();
    const onClick = ()=>{
        const actions = [
            {
                text: "新建文件夹",
                key: "open",
                onClick: ()=>{
                    handle.current?.close();
                }
            },
            {
                text: "新建笔记",
                key: "open",
                onClick: ()=>{
                    handle.current?.close();
                }
            }
        ];
        handle.current = antd_mobile__WEBPACK_IMPORTED_MODULE_3__.ActionSheet.show({
            actions,
            cancelText: "取消"
        });
    };
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_4___default().wrap),
        onClick: onClick,
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd_mobile_icons__WEBPACK_IMPORTED_MODULE_2__.AddOutline, {})
    });
};


/***/ })

};
;