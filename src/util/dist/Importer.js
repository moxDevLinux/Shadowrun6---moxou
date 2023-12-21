"use strict";
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
var npc_js_1 = require("./npc.js");
var constants_js_1 = require("../constants.js");
var Importer = /** @class */ (function () {
    function Importer() {
    }
    Importer.pasteEventhandler = function (e) {
        return __awaiter(this, void 0, void 0, function () {
            var rawData;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        rawData = "";
                        if (!(e instanceof ClipboardEvent)) return [3 /*break*/, 1];
                        rawData = e.clipboardData.getData("text");
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, navigator.clipboard.readText()];
                    case 2:
                        rawData = _a.sent();
                        _a.label = 3;
                    case 3:
                        rawData = rawData.replace(/(\r\n|\n|\r)/gm, "\n");
                        if (!(game.packs.get("world.npcs") === undefined)) return [3 /*break*/, 5];
                        return [4 /*yield*/, CompendiumCollection.createCompendium({
                                type: 'Actor',
                                name: "npcs",
                                label: "NPCs",
                                path: "",
                                private: false,
                                package: "sr6",
                                system: "shadowrun6-eden"
                            })];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [4 /*yield*/, rawData.split(/\n\n/).forEach(function (rawData) { return __awaiter(_this, void 0, void 0, function () {
                            var npc, actor, e_1;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _a.trys.push([0, 5, , 6]);
                                        npc = new npc_js_1.NPC(rawData.trim());
                                        return [4 /*yield*/, Actor.create(npc.to_vtt())];
                                    case 1:
                                        actor = _a.sent();
                                        if (!game.settings.get(constants_js_1.SYSTEM_NAME, "importToCompendium")) return [3 /*break*/, 4];
                                        return [4 /*yield*/, game.packs.get("world.npcs").importDocument(actor)];
                                    case 2:
                                        _a.sent();
                                        return [4 /*yield*/, (actor === null || actor === void 0 ? void 0 : actor["delete"]())];
                                    case 3:
                                        _a.sent();
                                        _a.label = 4;
                                    case 4: return [3 /*break*/, 6];
                                    case 5:
                                        e_1 = _a.sent();
                                        console.log(e_1, rawData);
                                        return [3 /*break*/, 6];
                                    case 6: return [2 /*return*/];
                                }
                            });
                        }); })];
                    case 6:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return Importer;
}());
exports["default"] = Importer;
