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
var RollTypes_js_1 = require("./dice/RollTypes.js");
var Shadowrun6CombatTracker = /** @class */ (function (_super) {
    __extends(Shadowrun6CombatTracker, _super);
    function Shadowrun6CombatTracker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Shadowrun6CombatTracker.prototype, "template", {
        get: function () {
            if (game.release.generation <= 9) {
                return "systems/shadowrun6-eden/templates/combat-trackerv9.html";
            }
            else {
                return "systems/shadowrun6-eden/templates/combat-tracker.html";
            }
        },
        enumerable: false,
        configurable: true
    });
    Shadowrun6CombatTracker.prototype.getData = function (options) {
        return __awaiter(this, void 0, Promise, function () {
            var data;
            return __generator(this, function (_a) {
                data = _super.prototype.getData.call(this, options);
                data.then(function (data) {
                    if (data != undefined) {
                        data.turns.forEach(function (turn) {
                            var _a;
                            var combatant = (_a = data.combat) === null || _a === void 0 ? void 0 : _a.combatants.get(turn.id);
                            turn.isPhysical = combatant.initiativeType == RollTypes_js_1.InitiativeType.PHYSICAL;
                            turn.isMatrix = combatant.initiativeType == RollTypes_js_1.InitiativeType.MATRIX;
                            turn.isAstral = combatant.initiativeType == RollTypes_js_1.InitiativeType.ASTRAL;
                        });
                    }
                    return data;
                });
                return [2 /*return*/, data];
            });
        });
    };
    /**
     * Test if any of the extra initiatve buttons from the extended tracker
     * has been clicked. If not, process with default behaviour.
     */
    Shadowrun6CombatTracker.prototype._onCombatantControl = function (event) {
        console.log("---------SR6CombatTracker._onCombatantControl", event);
        event.preventDefault();
        event.stopPropagation();
        var btn = event.currentTarget;
        var li = btn.closest(".combatant");
        var combat = this.viewed;
        var c = combat.combatants.get(li.dataset.combatantId);
        // Switch control action
        switch (btn.dataset.control) {
            case "togglePhysical":
                return this._onChangeInitiativeType(c, RollTypes_js_1.InitiativeType.PHYSICAL);
            case "toggleMatrix":
                return this._onChangeInitiativeType(c, RollTypes_js_1.InitiativeType.MATRIX);
            case "toggleAstral":
                return this._onChangeInitiativeType(c, RollTypes_js_1.InitiativeType.ASTRAL);
        }
        return _super.prototype._onCombatantControl.call(this, event);
    };
    Shadowrun6CombatTracker.prototype._onChangeInitiativeType = function (combatant, value) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log("---------SR6CombatTracker._onChangeInitiativeType  change from " + combatant.initiativeType + " to " + value);
                combatant.setFlag("shadowrun6-eden", "iniType", value);
                return [2 /*return*/];
            });
        });
    };
    return Shadowrun6CombatTracker;
}(CombatTracker));
exports["default"] = Shadowrun6CombatTracker;
