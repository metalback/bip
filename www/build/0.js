webpackJsonp([0],{

/***/ 284:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BipDetailPageModule", function() { return BipDetailPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__bip_detail__ = __webpack_require__(286);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var BipDetailPageModule = /** @class */ (function () {
    function BipDetailPageModule() {
    }
    BipDetailPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__bip_detail__["a" /* BipDetailPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__bip_detail__["a" /* BipDetailPage */]),
            ],
        })
    ], BipDetailPageModule);
    return BipDetailPageModule;
}());

//# sourceMappingURL=bip-detail.module.js.map

/***/ }),

/***/ 286:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BipDetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_api_api__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__ = __webpack_require__(102);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the BipDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var BipDetailPage = /** @class */ (function () {
    function BipDetailPage(navCtrl, navParams, api, storage, splashScreen) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.api = api;
        this.storage = storage;
        this.splashScreen = splashScreen;
        this.bip_response = {
            estadoContrato: '',
            fechaSaldo: '',
            id: null,
            saldoTarjeta: '',
            fecha_consulta: '',
            id_hash: null
        };
        this.bip_storage = [];
        this.item = navParams.get('item') || {};
        this.bip = navParams.get('bip') || 0;
        this.storage.get('tarjetas')
            .then(function (tarjetas) {
            if (tarjetas != null) {
                _this.bip_storage = tarjetas;
            }
            if (_this.bip != 0) {
                _this.getDatos();
            }
            else if (typeof _this.item.id != 'undefined') {
                _this.bip = _this.item.id;
                _this.getDatos();
            }
        });
    }
    BipDetailPage.prototype.ionViewDidLoad = function () {
        this.splashScreen.show();
    };
    BipDetailPage.prototype.getDatos = function () {
        var _this = this;
        this.api.getSaldo(this.bip)
            .subscribe(function (data) {
            var fecha_consulta = new Date();
            var options = {
                hour: "numeric", minute: "numeric"
            };
            _this.splashScreen.hide();
            _this.bip_response = data;
            _this.bip_response.fecha_consulta = fecha_consulta.toLocaleDateString("en-EU", options);
            _this.bip_response.id_hash = _this.bip_storage.length;
            _this.item = _this.bip_response;
            _this.bip_storage.push(_this.bip_response);
            _this.storage.set('tarjetas', _this.bip_storage)
                .then(function (response) { return console.log(response); }, function (error) { return console.log(error); });
        }, function (error) {
            console.log(error);
            _this.navCtrl.pop();
        });
    };
    BipDetailPage.prototype.deleteItem = function (id) {
        var _this = this;
        this.storage.get('tarjetas')
            .then(function (tarjetas) {
            for (var el in tarjetas) {
                if (tarjetas[el].id == id) {
                    _this.bip_storage.splice(parseInt(el), 1);
                    _this.storage.set('tarjetas', _this.bip_storage);
                    _this.navCtrl.pop();
                }
            }
        });
    };
    BipDetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-bip-detail',template:/*ion-inline-start:"/home/mbeltran/public_html/simplebip/src/pages/bip-detail/bip-detail.html"*/'<!--\n  Generated template for the BipDetailPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Simple bip!</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n	<ion-card>\n		<ion-card-header>\n			Estado Tarjeta bip!\n		</ion-card-header>\n		<ion-list>\n			<ion-item>\n				<ion-icon name="subway"></ion-icon> {{item.id}}\n			</ion-item>\n			<ion-item>\n				 <ion-icon name="logo-usd"></ion-icon> {{item.saldoTarjeta}}\n			</ion-item>\n			<ion-item>\n				<ion-icon name="stats"></ion-icon> {{item.estadoContrato}}\n			</ion-item>\n			<ion-item>\n				<ion-icon name="calendar"></ion-icon> {{item.fechaSaldo}}\n			</ion-item>\n			<ion-item>\n				<ion-icon name="stopwatch"></ion-icon> {{item.fecha_consulta}}\n			</ion-item>\n		</ion-list>\n	</ion-card>\n</ion-content>'/*ion-inline-end:"/home/mbeltran/public_html/simplebip/src/pages/bip-detail/bip-detail.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__providers_api_api__["a" /* ApiProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__providers_api_api__["a" /* ApiProvider */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__["a" /* SplashScreen */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__["a" /* SplashScreen */]) === "function" && _e || Object])
    ], BipDetailPage);
    return BipDetailPage;
    var _a, _b, _c, _d, _e;
}());

//# sourceMappingURL=bip-detail.js.map

/***/ })

});
//# sourceMappingURL=0.js.map