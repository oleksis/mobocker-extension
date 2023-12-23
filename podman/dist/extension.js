/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./extension.tsx":
/*!***********************!*\
  !*** ./extension.tsx ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   activate: () => (/* binding */ activate),\n/* harmony export */   deactivate: () => (/* binding */ deactivate)\n/* harmony export */ });\nObject(function webpackMissingModule() { var e = new Error(\"Cannot find module '@podman-desktop/api'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }());\n\nasync function activate(extensionContext) {\n    // register the command referenced in package.json file\n    const serviceCommand = Object(function webpackMissingModule() { var e = new Error(\"Cannot find module '@podman-desktop/api'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()).registerCommand('service', async () => {\n        // display a choice to the user for selecting some values\n        const result = await Object(function webpackMissingModule() { var e = new Error(\"Cannot find module '@podman-desktop/api'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()).showQuickPick(['un', 'deux', 'trois'], {\n            canPickMany: true, // user can select more than one choice\n        });\n        // display an information message with the user choice\n        await Object(function webpackMissingModule() { var e = new Error(\"Cannot find module '@podman-desktop/api'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()).showInformationMessage(`The choice was: ${result}`);\n    });\n    // create an item in the status bar to run our command\n    // it will stick on the left of the status bar\n    const item = Object(function webpackMissingModule() { var e = new Error(\"Cannot find module '@podman-desktop/api'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()).createStatusBarItem(Object(function webpackMissingModule() { var e = new Error(\"Cannot find module '@podman-desktop/api'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()), 100);\n    item.text = 'Service command';\n    item.command = 'service';\n    item.show();\n    // register disposable resources to it's removed when we deactivte the extension\n    extensionContext.subscriptions.push(serviceCommand);\n    extensionContext.subscriptions.push(item);\n}\nfunction deactivate() {\n    console.log('stopping Mobocker extension');\n}\n\n\n//# sourceURL=webpack://mobocker-extension/./extension.tsx?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./extension.tsx"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;