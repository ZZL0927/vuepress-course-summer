exports.id = 811;
exports.ids = [811];
exports.modules = {

/***/ 70941:
/***/ ((module) => {

// Exports
module.exports = {
	"wrap": "style_wrap__xbmgz",
	"icon": "style_icon__tdyCj",
	"content": "style_content__3I7yB",
	"title": "style_title__veC2q",
	"time": "style_time__aoRYg",
	"more": "style_more__jK48_"
};


/***/ }),

/***/ 19422:
/***/ ((module) => {

// Exports
module.exports = {
	"grid": "style_grid__y68sh",
	"share": "style_share__I7EX_",
	"input": "style_input__rxR6m",
	"title": "style_title__hE8xu"
};


/***/ }),

/***/ 22825:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ FileList)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(20997);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(16689);
// EXTERNAL MODULE: ./node_modules/.pnpm/antd-mobile@5.19.0_biqbaboplfbrettd7655fr4n2y/node_modules/antd-mobile/cjs/index.js
var cjs = __webpack_require__(2311);
// EXTERNAL MODULE: ./src/components/FileList/style.module.scss
var style_module = __webpack_require__(19422);
var style_module_default = /*#__PURE__*/__webpack_require__.n(style_module);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(71853);
// EXTERNAL MODULE: external "antd-mobile-icons"
var external_antd_mobile_icons_ = __webpack_require__(50584);
// EXTERNAL MODULE: ./src/components/FileItem/style.module.scss
var FileItem_style_module = __webpack_require__(70941);
var FileItem_style_module_default = /*#__PURE__*/__webpack_require__.n(FileItem_style_module);
;// CONCATENATED MODULE: ./src/assets/imgs/folder.svg
var _path, _path2;

function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }



var SvgFolder = function SvgFolder(props) {
  return /*#__PURE__*/external_react_.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 48 48",
    width: 96,
    height: 96
  }, props), _path || (_path = /*#__PURE__*/external_react_.createElement("path", {
    fill: "#FFA000",
    d: "M40 12H22l-4-4H8c-2.2 0-4 1.8-4 4v8h40v-4c0-2.2-1.8-4-4-4z"
  })), _path2 || (_path2 = /*#__PURE__*/external_react_.createElement("path", {
    fill: "#FFCA28",
    d: "M40 12H8c-2.2 0-4 1.8-4 4v20c0 2.2 1.8 4 4 4h32c2.2 0 4-1.8 4-4V16c0-2.2-1.8-4-4-4z"
  })));
};

/* harmony default export */ const folder = (SvgFolder);
;// CONCATENATED MODULE: ./src/assets/imgs/file.svg
var file_path, file_path2, _path3, _path4;

function file_extends() { file_extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return file_extends.apply(this, arguments); }



var SvgFile = function SvgFile(props) {
  return /*#__PURE__*/external_react_.createElement("svg", file_extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 48 48",
    width: 96,
    height: 96
  }, props), file_path || (file_path = /*#__PURE__*/external_react_.createElement("path", {
    fill: "#2196f3",
    d: "M37 45H11a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3h19l10 10v29a3 3 0 0 1-3 3z"
  })), file_path2 || (file_path2 = /*#__PURE__*/external_react_.createElement("path", {
    fill: "#bbdefb",
    d: "M40 13H30V3z"
  })), _path3 || (_path3 = /*#__PURE__*/external_react_.createElement("path", {
    fill: "#1565c0",
    d: "m30 13 10 10V13z"
  })), _path4 || (_path4 = /*#__PURE__*/external_react_.createElement("path", {
    fill: "#e3f2fd",
    d: "M15 23h18v2H15zm0 4h18v2H15zm0 4h18v2H15zm0 4h10v2H15z"
  })));
};

/* harmony default export */ const file = (SvgFile);
// EXTERNAL MODULE: external "dayjs"
var external_dayjs_ = __webpack_require__(1635);
var external_dayjs_default = /*#__PURE__*/__webpack_require__.n(external_dayjs_);
// EXTERNAL MODULE: external "dayjs/plugin/relativeTime"
var relativeTime_ = __webpack_require__(14195);
var relativeTime_default = /*#__PURE__*/__webpack_require__.n(relativeTime_);
// EXTERNAL MODULE: external "dayjs/locale/zh-cn"
var zh_cn_ = __webpack_require__(95468);
var zh_cn_default = /*#__PURE__*/__webpack_require__.n(zh_cn_);
;// CONCATENATED MODULE: ./src/libs/util.ts



external_dayjs_default().extend((relativeTime_default()));
external_dayjs_default().locale((zh_cn_default()));
function fromNow(time) {
    if (Date.now() - time < 14 * 24 * 3600 * 1000) {
        return external_dayjs_default()(time).fromNow();
    }
    return external_dayjs_default()(time).format("YYYY-MM-DD");
}

;// CONCATENATED MODULE: ./src/components/FileItem/index.tsx









function FileItem({ note , onClickShare  }) {
    const router = (0,router_.useRouter)();
    const handle = (0,external_react_.useRef)();
    const showMore = ()=>{
        const actions = [
            {
                text: "打开",
                key: "open",
                onClick: ()=>{
                    handle.current?.close();
                    router.push("/file/" + note._id);
                }
            }
        ];
        if (note.folder === false) {
            actions.push({
                text: "分享",
                key: "share",
                onClick: ()=>{
                    handle.current?.close();
                    onClickShare();
                }
            });
        }
        actions.push({
            text: "删除",
            key: "delete",
            danger: true,
            onClick: ()=>{
                handle.current?.close();
                cjs.Dialog.confirm({
                    content: `确定要删除该${note.folder ? "文件夹" : "文件"}吗？`
                });
            }
        });
        handle.current = cjs.ActionSheet.show({
            actions,
            cancelText: "取消"
        });
    };
    const onOpen = ()=>{
        if (note.folder) {
            router.push("/folder/" + note._id);
        } else {
            router.push("/file/" + note._id);
        }
    };
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: (FileItem_style_module_default()).wrap,
        children: [
            note.folder ? /*#__PURE__*/ jsx_runtime_.jsx(folder, {
                className: (FileItem_style_module_default()).icon
            }) : /*#__PURE__*/ jsx_runtime_.jsx(file, {
                className: (FileItem_style_module_default()).icon
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: (FileItem_style_module_default()).content,
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: (FileItem_style_module_default()).title,
                        onClick: onOpen,
                        children: note.title
                    }),
                    !note.folder && /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: (FileItem_style_module_default()).time,
                        children: fromNow(note.time)
                    })
                ]
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(external_antd_mobile_icons_.MoreOutline, {
                className: (FileItem_style_module_default()).more,
                onClick: showMore
            })
        ]
    });
};

;// CONCATENATED MODULE: ./src/components/FileList/index.tsx






function FileList({ items  }) {
    const { 0: visible , 1: setVisible  } = (0,external_react_.useState)(false);
    const { 0: current , 1: setCurrent  } = (0,external_react_.useState)();
    const shareLink = (0,external_react_.useMemo)(()=>{
        if (true) return "";
        return `${location.origin}/share/0dbe2f`;
    }, []);
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: (style_module_default()).grid,
        children: [
            items.map((item)=>/*#__PURE__*/ jsx_runtime_.jsx(FileItem, {
                    note: item,
                    onClickShare: ()=>{
                        setCurrent(item);
                        setVisible(true);
                    }
                }, item._id)),
            /*#__PURE__*/ jsx_runtime_.jsx(cjs.Popup, {
                position: "bottom",
                visible: visible,
                onClose: ()=>setVisible(false),
                closeOnMaskClick: true,
                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: (style_module_default()).share,
                    children: [
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            className: (style_module_default()).title,
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx(file, {}),
                                /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                    children: current?.title || ""
                                })
                            ]
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("input", {
                            type: "text",
                            defaultValue: shareLink,
                            readOnly: true,
                            className: (style_module_default()).input
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx(cjs.Button, {
                            color: "primary",
                            block: true,
                            children: "复制链接"
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx(cjs.Button, {
                            color: "danger",
                            block: true,
                            children: "取消分享"
                        })
                    ]
                })
            })
        ]
    });
};


/***/ }),

/***/ 20343:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "e": () => (/* binding */ items)
/* harmony export */ });
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1635);
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_0__);

const items = [];
const titles = [
    "React设计模式",
    "React进阶指南",
    "Node.js实战",
    "ssr服务端渲染原理",
    "如何定义清晰可维护的接口",
    "组件的内部实现",
    "组件化样式",
    "聪明组件和傻瓜组件",
    "高阶组件",
    "render props 模式",
    "提供者模式",
    "组合组件",
    "React 单元测试",
    "组件状态",
    "Redux 使用模式",
    "Mobx  使用模式",
    "路由的魔法：React Router",
    "理解 Next.js",
    "拥抱异步渲染",
    "Suspense 带来的异步操作革命",
    "函数化的 Hooks",
    "自定义 Hooks 设计",
    "总结篇-如何有效阅读源码",
    "V18特性篇-transition",
    "v18特性篇-订阅外部数据源",
    "实践篇-设计并实现 keepalive 功能"
];
for(let i = 0; i < titles.length; i++){
    items.push({
        _id: "6cf3a9e4b1679c0ed2d5bd" + (i + 1).toString().padStart(2, "0"),
        title: titles[i],
        time: dayjs__WEBPACK_IMPORTED_MODULE_0___default()().add((i + 1) * -1, "day").unix() * 1000,
        folder: i < 4
    });
}


/***/ })

};
;