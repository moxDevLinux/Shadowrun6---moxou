"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.SR6ItemSheet = void 0;
function getSystemData(obj) {
    if (game.release.generation >= 10)
        return obj.system;
    return obj.data.data;
}
function getActorData(obj) {
    if (game.release.generation >= 10)
        return obj;
    return obj.data;
}
var SR6ItemSheet = /** @class */ (function (_super) {
    __extends(SR6ItemSheet, _super);
    function SR6ItemSheet() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(SR6ItemSheet, "defaultOptions", {
        /** @override */
        get: function () {
            return mergeObject(_super.defaultOptions, {
                classes: ["shadowrun6", "sheet", "item"],
                width: 550
            });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SR6ItemSheet.prototype, "template", {
        get: function () {
            console.log("in template()", getSystemData(this.item));
            var path = "systems/shadowrun6-eden/templates/item/";
            console.log(path + "shadowrun6-" + getActorData(this.item).type + "-sheet.html");
            if (this.isEditable) {
                console.log("ReadWrite sheet ");
                return path + "shadowrun6-" + getActorData(this.item).type + "-sheet.html";
            }
            else {
                console.log("ReadOnly sheet", this);
                var genItem = getSystemData(this.item);
                this.item.descHtml = game.i18n.localize(getActorData(this.item).type + "." + genItem.genesisID + ".desc");
                getActorData(this.item).descHtml2 = game.i18n.localize(getActorData(this.item).type + "." + genItem.genesisID + ".desc");
                return path + "shadowrun6-" + getActorData(this.item).type + "-sheet-ro.html";
            }
        },
        enumerable: false,
        configurable: true
    });
    /** @overrride */
    SR6ItemSheet.prototype.getData = function () {
        var data = _super.prototype.getData.call(this);
        data.config = CONFIG.SR6;
        return data;
    };
    /**
     * Activate event listeners using the prepared sheet HTML
     * @param html {HTML}   The prepared HTML object ready to be rendered into the DOM
     */
    SR6ItemSheet.prototype.activateListeners = function (html) {
        var _this = this;
        _super.prototype.activateListeners.call(this, html);
        if (this.actor && this.actor.isOwner) {
            console.log("is owner");
        }
        else {
            console.log("is not owner");
        }
        if (!this.isEditable) {
            var x = html.find(".data-desc");
            console.log("Replace descriptions for " + this.object.type + " and ", getSystemData(this.object));
            switch (this.object.type) {
                case "quality":
                    x[0].innerHTML = game.i18n.localize("quality." + getSystemData(this.object).genesisID + ".desc");
                    break;
                case "gear":
                    x[0].innerHTML = game.i18n.localize("item." + getSystemData(this.object).genesisID + ".desc");
                    break;
                default:
                    x[0].innerHTML = game.i18n.localize(this.object.type + "." + getSystemData(this.object).genesisID + ".desc");
            }
        }
        // Owner Only Listeners
        if (this.actor && this.actor.isOwner) {
            html.find("[data-field]").change(function (event) { return __awaiter(_this, void 0, void 0, function () {
                var element, value, itemId, field;
                var _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            element = event.currentTarget;
                            if (element.type == "checkbox") {
                                value = element.checked;
                            }
                            else {
                                value = element.value;
                            }
                            itemId = getActorData(this.object)._id;
                            field = element.dataset.field;
                            console.log("Try to update field '" + field + "' of item " + itemId + " with value " + value, this.item);
                            if (!this.item) return [3 /*break*/, 2];
                            return [4 /*yield*/, this.item.update((_a = {}, _a[field] = value, _a))];
                        case 1:
                            _c.sent();
                            return [3 /*break*/, 4];
                        case 2: return [4 /*yield*/, this.actor.items.get(itemId).update((_b = {}, _b[field] = value, _b))];
                        case 3:
                            _c.sent();
                            _c.label = 4;
                        case 4: return [2 /*return*/];
                    }
                });
            }); });
        }
        else if (this.isEditable) {
            html.find("[data-field]").change(function (event) {
                var _a, _b;
                var element = event.currentTarget;
                var value;
                if (element.type == "checkbox") {
                    value = element.checked;
                }
                else {
                    value = element.value;
                }
                var field = element.dataset.field;
                var arrayId = element.dataset.arrayid;
                if (arrayId) {
                    _this.object.update((_a = {}, _a[field] = [, , 3, ,], _a));
                }
                else {
                    _this.object.update((_b = {}, _b[field] = value, _b));
                }
            });
        }
        html.find("[data-array-field]").change(function (event) {
            var _a;
            var element = event.currentTarget;
            var idx = parseInt($(event.currentTarget).closestData("index", "0"));
            var array = $(event.currentTarget).closestData("array");
            var field = $(event.currentTarget).closestData("array-field");
            var newValue = [];
            if (!(idx >= 0 && array !== ""))
                return;
            /* Duplicate the data from the object. Sets null & NaN to 0 */
            if (field) {
                newValue = duplicate(
                //array.split(".").reduce(function (prev, curr) {
                //	return prev ? prev[curr] : null;
                //}, (this.object as any).system) //getActorData(this.object))
                _this.object.system[array.split(".")[1]]);
                newValue[idx][field] = element.value;
            }
            else {
                newValue = duplicate(
                //array.split(".").reduce(function (prev, curr) {
                //	return prev ? prev[curr] : null;
                //}, (this.object as any).system)
                _this.object.system[array.split(".")[1]]);
                newValue[idx] = element.value;
            }
            /* Update the value of 'array' with newValue */
            _this.object.update((_a = {}, _a[array] = newValue, _a));
        });
    };
    return SR6ItemSheet;
}(ItemSheet));
exports.SR6ItemSheet = SR6ItemSheet;
