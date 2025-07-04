/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	// Generated by CoffeeScript 1.12.4
	(function() {
	  var skin;

	  skin = new Vue({
	    el: '#skin',
	    data: {
	      jumpbackpng: __webpack_require__(1),
	      fliplpng: __webpack_require__(2),
	      fliprpng: __webpack_require__(3),
	      zoominpng: __webpack_require__(4),
	      zoomoutpng: __webpack_require__(5),
	      jumpbackpngclassic: './btnimg/jumpback_u.png'
	    },
	    computed: {
	      appMiddle: function() {
	        return flipper.appHeight / 2;
	      },
	      appCenter: function() {
	        return flipper.appWidth / 2;
	      }
	    },
	    methods: {
	      flipL: function() {
	        return flipper.flipL();
	      },
	      flipR: function() {
	        return flipper.flipR();
	      },
	      zoomIn: function() {
	        return flipper.zoomin();
	      },
	      zoomOut: function() {
	        return flipper.zoomout();
	      },
	      backClick: function() {
	        return window.open('../index.html', '_blank');
	      }
	    },
	    ready: function() {
	      return flipper.$emit('init');
	    }
	  });

	}).call(this);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAIAAABLixI0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpGRTdGMTE3NDA3MjA2ODExODA4M0EyMkM0MEI3REE2QyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo2QjgxQ0NENjFCNTgxMUU3QjM4NzkwMDkyREI4QzA5NCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo2QjgxQ0NENTFCNTgxMUU3QjM4NzkwMDkyREI4QzA5NCIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6RkU3RjExNzQwNzIwNjgxMTgwODNBMjJDNDBCN0RBNkMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RkU3RjExNzQwNzIwNjgxMTgwODNBMjJDNDBCN0RBNkMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7CaQ0iAAABFElEQVR42mL8////4sWLd+7c+fLlSwaygJWVVVxcnLKyMuMiMGCgDHBzcy9dupT58+fPDBSD379///r1iwXO313CAWfveKTcu+oqScbdvXuXBU0IZspVMlzHhGaQh9zd4jBt8nyKYhbQRZQYx4TsKAqNY1ZSUoKwjl99DWeIyagDjQOScEGCQEJCggmrBHmuY8IlATeOeLNY8MgBjeslOx4pBANkFjCT4Y8KEswiGLMkmEUwoZAWXpjGIZtLctijGYecAFnIiC9QoRSmDTIFZBxlZqEYR2S6xwWKoaagGASsO1j09fUvXrxIqqMw85a1tTVTZmYmsBahMMW7ubnp6ekxAutHYM0IrNbIrh/dwADIAAgwALHzjGRcoFquAAAAAElFTkSuQmCC"

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAIAAABLixI0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo0N0Q3M0FEQTFCNTMxMUU3QjM4NzkwMDkyREI4QzA5NCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo0N0Q3M0FEQjFCNTMxMUU3QjM4NzkwMDkyREI4QzA5NCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjQ3RDczQUQ4MUI1MzExRTdCMzg3OTAwOTJEQjhDMDk0IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjQ3RDczQUQ5MUI1MzExRTdCMzg3OTAwOTJEQjhDMDk0Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+NxGRwwAAAQ9JREFUeNpi/P///+LFi3fu3Pny5UsGsoCVlVVcXJyysjLjIjBgoAxwc3MvXbqU+fPnzwwUg9+/f//69YuJgUrg7t27VDMLCOhllps28+4SjhIPVkrNAhpU6gky5evP/xSZBTdo55W/0/f/Id8sZIN6dvwmP7zINggIWJA54nyMEIOAwF2HGYhwaeve/nvX1b80TBMo7nr56X/Gwp894Ww8HIx3Xv0rWfnr608K0tfd1/+BRnz58V9FjAloKDc7ZWmVbOOwhxeycZmOFKd7iHEXH/8DBiI5YY/VuMFXTgyYWcC6g0lfX58qZllbWzNlZmYCaxEKDXJzc9PT02ME1o/AmhFYrZFdP7qBAZABEGAAX3aDm17EwioAAAAASUVORK5CYII="

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAIAAABLixI0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo0N0Q3M0FERTFCNTMxMUU3QjM4NzkwMDkyREI4QzA5NCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo0N0Q3M0FERjFCNTMxMUU3QjM4NzkwMDkyREI4QzA5NCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjQ3RDczQURDMUI1MzExRTdCMzg3OTAwOTJEQjhDMDk0IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjQ3RDczQUREMUI1MzExRTdCMzg3OTAwOTJEQjhDMDk0Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+uR9+IgAAAQdJREFUeNpi/P///+LFi3fu3Pny5UsGsoCVlVVcXJyysjLjIjBgoAxwc3MvXbqU+fPnzwwUg9+/f//69YuJgUrg7t27VDMLCOhuVqwVS084m7IoIxXMEudj1JdlImgcUWZN3//7zqt/PByM+I0jyqyvPxlKVv4iaByxYU+McSxofDdt5lJPVvzmAo2bEc8eM+vny0//aZUm0N216+pfIMKlusSD1V2HGcjo3v4bzVGkuQvZIKz2MVHLIGLNynRkIWgQsWZxszMSNAhL2GMFPTt+A9HgKyfobRaw7mDS19enilnW1tZMmZmZwFqEQoPc3Nz09PQYgfUjsGYEVmtk149uYABkAAQYAMjkdRqGbxwWAAAAAElFTkSuQmCC"

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAIAAABLixI0AAACpklEQVQ4ja2VPWjbUBDH7+nJTkDBohRLopBCIgUKMdYQskhTSlCaLXjpUOKhm+a6e7pn6tCMBZkMWeyMNYUmSzzVBocMKYmg4KFRDC1unOLIll6Hl+orKgWnN0n33v3u3v/uSYgQUq1WG42G4zgwkWmaVi6XZVlGlmVZljUZJTCO43Z3d/HV1dU9QQAwGo1c12XuD6Jm2zabusBNga5go4DV2TDZRZ90un69NbZ7JDUqhSXn0dZGVuJRwi/xSOLxWgHXWuOdg/G/WdwUUNBgSHYOxkfn3vVNmGNTY/UFXFpiL/qk3vYSsXh+fj76/vZF9vFD5qJPXr6/Of1GRpH9P37B4Rd/MCTLc3h5DtuXfvd7eFhJkmLaG4tYEZjBkGztu0E5Cau3vcaJBwDmSiaxFGNtaiwA1NpeVN3Ks8zHyrSYC+XbORgNhkTikbGI01liDlG9q82YrtQpRlpxfQO1tgcAxdlYKaH2dHen6wcec4WVBUbOI/rs9Emt7R13/WBbotfp8wUAch6VlsJVRWAUAWamUWXP/VtIkhXoYvfIqz2XVqQIzLtPI7tHnP6tjlIuOX0x1vGfssUccn6SwEMbavfIceT4VKmoIJDo49EZbTabcHa6flARPf5aAQNA8yw2rjEW7aC+gKPNrre9yp5LKwUAbgoq6xmaI3ExYyy7R2qtMQC8Xs8kZicAbT/PKgIDd0YH7t6hz199MYcUgdEXsJxHrgcPOCTySOSRpjBvNrISf5v+ySPm8NQLLpkkSWh1dfVu/k2NLWvp43J+6ddbnrnCzkyjxom3/WFE/aqqpgdUm+PmmWcUsCyEIgyGpNP16efBvvTNp5lARGrpdU1gpVKJUVX1v7B0XWdM0+Q47p4gwzCKxSIihDiOY1nWxP9HwzAMwwCA3/mjG8YRpWdeAAAAAElFTkSuQmCC"

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAIAAABLixI0AAACa0lEQVQ4ja1VMWjbQBT9p5PtgIJFKY5EIYVYNhRirKFkkaYU90K24KVDiYdu2ts93TN1yViQyWpnrCdniafakJIhxREUPDRKoCWJUxRb0nW41JYuSgtO33Z3/7//9f77CFFK6/V6q9VyXRdmgmEYtVpN0zRk27Zt27OxTCBJ0u7uLr66unogEQCMx+PRaCQ8nIjBcRwx8UHKgFnApIT1xWmx0wt6OAibXd85p4lZCVxaDm1tpFUZcfeqjFQZr5Vwo+vvtP1/c0kZYERDj+60/YOT4PpmWmPTEM0irj4XTy9osxdwuTifz0fPH16nnz4WTi/om483x9/pOBL/8xfsfw2HHl1ZwitL2DkLBz+mH6uqakx7sowLC8LQo1t7o0k7HJq9oHUUAIC1muKeYlybhggAjV5wn7oMO+3x0KOqjMgyTuZSsojpXe8k6BrF9Q00egEAlBdjrUy1V2QEAIeDkB2lDGy/ShcWptFDj9odn0nOwrhZ3+vV+QyKEgHA/BzSF//mbd4TSva2lHtJX25796WpWd59sb6+/GlbSYrjwJSaCMJzAcBBnw07ebEm0HJorYQBoNOP2TXGxSZoFjE37CikDLxdT7HCnHViXM45bXR9AHi3nkqkiw73rnX4Hfr8LVSyqLAgmEWs5dAogEcSUmSkyMgoCO830qp8W/7ZE2H/OJgsmaqqqFKp3K2/aYg1I1m1k7Ow2Q2sVXF+DrWOgu1PY3av63pyQr3jd/oBKWEt7tXDQci86pyF1ouUexnTK7mvGVCtVgVd1/8Ll2magmVZkiQ9kIgQUi6XEaXUdV3btmf+PxJCCCEA8Bt/IfAlv7unzAAAAABJRU5ErkJggg=="

/***/ })
/******/ ]);