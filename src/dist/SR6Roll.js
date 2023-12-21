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
exports.SR6RollChatMessage = void 0;
var config_js_1 = require("./config.js");
var RollTypes_js_1 = require("./dice/RollTypes.js");
/**
 *
 */
var SR6Roll = /** @class */ (function (_super) {
    __extends(SR6Roll, _super);
    function SR6Roll(formula, data, options) {
        var _this = _super.call(this, formula, data, options) || this;
        _this.configured = data;
        // If entered from the combat tracker, the roll type is empty but the
        // formula gives hints what is rolled
        if (formula.indexOf("@initiative") > -1) {
            _this.configured.rollType = RollTypes_js_1.RollType.Initiative;
        }
        console.log("In SR6Roll<init>1(" + formula + " , ", data);
        return _this;
        //console.log("In SR6Roll<init>2(", options);
    }
    SR6Roll.prototype.evaluate = function (options) {
        console.log("ENTER evaluate()");
        console.log("   this: ", this);
        console.log("   formula: ", this._formula);
        if (this.configured.buttonType === RollTypes_js_1.ReallyRoll.AUTOHITS) {
            // Hits have been bought
            console.log("BOUGHT HITS for pool", this.configured.pool);
            var noOfDice = Math.floor(this.configured.pool / 4);
            var formula = this.createFormula(noOfDice, -1, false);
            var die = new Roll(formula).evaluate({ async: false });
            this.results = die.terms[0].results;
            this.results.forEach(function (result) {
                result.result = 6;
                result.success = true;
                result.count = 1;
                result.classes = "die die_" + result.result;
            });
            this._total = noOfDice;
            this._formula = game.i18n.localize("shadowrun6.roll.hits_bought");
            this._evaluated = true;
            this.terms = die.terms;
        }
        else if (this.configured.buttonType === RollTypes_js_1.ReallyRoll.ROLL) {
            var die = new Roll(this._formula).evaluate({ async: false });
            console.log("Nested roll has a total of " + die.total, die);
            this.results = die.terms[0].results;
            this._total = die._total;
            this.terms = die.terms;
            // In case of a wild die, color the wild die
            // and merge results
            if (this.data.useWildDie) {
                this.dice[1].options.colorset = "SR6_light";
                this.results = this.results.concat(die.terms[2].results);
            }
            else {
                this.results = die.terms[0].results;
            }
        }
        else {
            console.log("Unmodified roll " + this._formula);
            var die = new Roll(this._formula).evaluate({ async: false });
            this.results = die.terms[0].results;
            this._total = die._total;
            this.terms = die.terms;
        }
        this._evaluated = true;
        try {
            // Mark wild dice and assign count values to single die
            this.modifyResults();
            if (this.configured.rollType && this.configured.rollType != RollTypes_js_1.RollType.Initiative) {
                this._total = this.calculateTotal();
                this._evaluated = true;
                this._formula = this.data.pool + "d6";
            }
            else {
                this._formula = this.formula;
            }
            this._prepareChatMessage();
            return this;
        }
        finally {
            console.log("LEAVE evaluate()");
        }
    };
    /**********************************************
     */
    SR6Roll.prototype.calculateTotal = function () {
        console.log("LEAVE calculateTotal", this);
        var total = 0;
        this.dice.forEach(function (term) {
            term.results.forEach(function (die) { return (total += die.count); });
        });
        return total;
    };
    //**********************************************
    SR6Roll.prototype.oldEvaluateTotal = function () {
        console.log("-----evaluateTotal");
        var normalTotal = _super.prototype._evaluateTotal.call(this);
        var total = 0;
        this.dice.forEach(function (term) {
            var addedByExplosion = false;
            console.log("-----evaluateTotal : ", term.results);
            term.results.forEach(function (die) { return (total += die.count); });
        });
        console.log("-----evaluateTotal.2:", total, " -", normalTotal);
        console.log("_evaluateTotal: create SR6ChatMessageData", this);
        this.finished = new RollTypes_js_1.SR6ChatMessageData(this.configured);
        this.finished.glitch = this.isGlitch();
        this.finished.criticalglitch = this.isCriticalGlitch();
        this.finished.success = this.isSuccess();
        this.finished.threshold = this.configured.threshold;
        //this.finished.rollMode = this.configured.rollMode;
        if (this.configured.rollType === RollTypes_js_1.RollType.Initiative) {
            this.finished.threshold = 0;
            this.finished.success = true;
            this.finished.formula = this._formula;
            this.finished.total = total;
            this._total = total;
        }
        // ToDO: Detect real monitor
        this.finished.monitor = config_js_1.MonitorType.PHYSICAL;
        if (this.configured.rollType == RollTypes_js_1.RollType.Defense) {
            console.log("_evaluateTotal: calculate remaining damage");
            this.finished.damage = this.configured.damage + (this.configured.threshold - total);
            console.log("_evaluateTotal: remaining damage = " + this.finished.damage);
        }
        console.log("_evaluateTotal: return ", this.finished);
        return total;
    };
    //**********************************************
    SR6Roll.prototype._prepareChatMessage = function () {
        console.log("_prepareChatMessage: create SR6ChatMessageData", this);
        this.finished = new RollTypes_js_1.SR6ChatMessageData(this.configured);
        this.finished.glitch = this.isGlitch();
        this.finished.criticalglitch = this.isCriticalGlitch();
        this.finished.success = this.isSuccess();
        this.finished.threshold = this.configured.threshold;
        this.finished.total = this.total;
        //this.finished.rollMode = this.configured.rollMode;
        if (this.configured.rollType === RollTypes_js_1.RollType.Initiative) {
            this.finished.threshold = 0;
            this.finished.success = true;
            this.finished.formula = this._formula;
            this.finished.total = this.total;
        }
        // ToDO: Detect real monitor
        this.finished.monitor = config_js_1.MonitorType.PHYSICAL;
        this.finished.targets = this.configured.targetIds;
        console.log("targetIds in Chat message: ", this.finished.targets);
        if (this.configured.rollType == RollTypes_js_1.RollType.Defense) {
            console.log("_evaluateTotal: calculate remaining damage");
            this.finished.damage = this.configured.damage + (this.configured.threshold - this.total);
            console.log("_evaluateTotal: remaining damage = " + this.finished.damage);
        }
    };
    /**
     * Assign base css classes
     */
    SR6Roll.prototype._assignBaseCSS = function () {
        this.dice.forEach(function (term) {
            term.results.forEach(function (die) {
                die.classes = "die die_" + die.result;
            });
        });
    };
    /************************
     * If there are wild die, assign them the
     * appropriate CSS class and increase the
     * value of the count
     * @returns TRUE, when 5s shall be ignored
     ************************/
    SR6Roll.prototype._markWildDie = function () {
        var ignoreFives = false;
        if (this.dice.length == 1) {
            console.log("Not a wild die roll");
            return ignoreFives;
        }
        console.log("markWildDie: ", this.dice[1]);
        if (this.dice[1]) {
            var lastExploded_1 = false;
            this.dice[1].results.forEach(function (die) {
                if (!lastExploded_1) {
                    die.classes += "_wild";
                    die.wild = true;
                    // A 5 or 6 counts as 3 hits
                    if (die.success) {
                        die.count = 3;
                    }
                    else if (die.result === 1) {
                        ignoreFives = true;
                    }
                }
                lastExploded_1 = die.exploded;
                console.debug("Die " + die.result + " = " + ignoreFives);
            });
        }
        else {
            console.error("Wild die check not working in V10");
        }
        return ignoreFives;
    };
    /*****************************
     * @override
     */
    SR6Roll.prototype.modifyResults = function () {
        this._assignBaseCSS();
        var ignoreFives = this._markWildDie();
        this.dice.forEach(function (term) {
            var addedByExplosion = false;
            term.results.forEach(function (result) {
                if (addedByExplosion) {
                    if (result.classes.includes("_wild")) {
                        result.classes = result.classes.substring(0, result.classes.length - 5);
                    }
                    if (!result.classes.includes("_exploded")) {
                        result.classes += "_exploded";
                    }
                }
                if (result.result == 5 && ignoreFives && result.classes.indexOf("_ignored") < 0) {
                    result.classes += "_ignored";
                    result.success = false;
                    result.count = 0;
                }
                if (result.exploded) {
                    addedByExplosion = true;
                }
                else {
                    addedByExplosion = false;
                }
            });
        });
    };
    /**
     * Build a formula for a Shadowrun dice roll.
     * Assumes roll will be valid (e.g. you pass a positive count).
     * @param count The number of dice to roll.
     * @param limit A limit, if any. Negative for no limit.
     * @param explode If the dice should explode on sixes.
     */
    SR6Roll.prototype.createFormula = function (count, limit, explode) {
        if (limit === void 0) { limit = -1; }
        if (explode === void 0) { explode = false; }
        console.log("createFormula-------------------------------");
        if (!count) {
            throw new Error("createFormula: Number of dice not set");
        }
        var formula = count + "d6";
        if (explode) {
            formula += "x6";
        }
        if (limit > 0) {
            formula += "kh" + limit;
        }
        return formula + "cs>=5";
    };
    /**
     * The number of glitches rolled.
     */
    SR6Roll.prototype.getGlitches = function () {
        if (!this._evaluated || !this.results) {
            return NaN;
        }
        return this.results.filter(function (die) { return die.result === 1; }).length;
    };
    /**
     * Is this roll a regular (non-critical) glitch?
     */
    SR6Roll.prototype.isGlitch = function () {
        if (!this._evaluated || !this.results) {
            return false;
        }
        return this.getGlitches() > this.results.length / 2;
    };
    /**
     * Is this roll a critical glitch?
     */
    SR6Roll.prototype.isCriticalGlitch = function () {
        return this.isGlitch() && this._total === 0;
    };
    SR6Roll.prototype.isSuccess = function () {
        console.log("SR6Roll.isSuccess for ", this);
        if (this.finished.threshold > 0) {
            return this._total >= this.finished.threshold;
        }
        else {
            return this._total > 0;
        }
    };
    /**
     * Represent the data of the Roll as an object suitable for JSON serialization.
     * @returns Structured data which can be serialized into JSON
     * @override
     */
    SR6Roll.prototype.toJSON = function () {
        console.log("toJSON ", this);
        var json = _super.prototype.toJSON.call(this);
        //console.log("toJSON: json=",json);
        json.data = this.data;
        json.configured = this.configured;
        json.finished = this.finished;
        json.results = this.results;
        return json;
    };
    /**
     * Recreate a Roll instance using a provided data object
     * @param data - Unpacked data representing the Roll
     * @returns A reconstructed Roll instance
     * @override
     */
    SR6Roll.fromData = function (data) {
        var roll = _super.fromData.call(this, data);
        //console.log("fromData ",roll);
        roll.configured = data.configured;
        roll.finished = data.finished;
        roll.results = data.results;
        //console.log("fromData returning ",roll);
        return roll;
    };
    /*****************************************
     * @override
     ****************************************/
    SR6Roll.prototype.getTooltip = function () {
        //console.log("getTooltip = ",this);
        var parts = {};
        return renderTemplate(SR6Roll.TOOLTIP_TEMPLATE, { parts: parts, finished: this.finished, data: this.data, results: this.results, total: this._total });
    };
    /*****************************************
     * Render to Chat message
     * @returns HTML
     ******************************************/
    SR6Roll.prototype.render = function (options) {
        return __awaiter(this, void 0, Promise, function () {
            var isPrivate, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        console.log("ENTER render");
                        console.log("options = ", options);
                        console.log("this = ", this);
                        console.log("this.data = ", this.data);
                        console.log("this.finished = ", this.finished);
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, , 7, 8]);
                        if (!!this._evaluated) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.evaluate({ async: true })];
                    case 2:
                        _c.sent();
                        _c.label = 3;
                    case 3:
                        isPrivate = options ? options.isPrivate : false;
                        if (!this.finished) {
                            console.log("#####this.finished not set#############");
                            this.finished = new RollTypes_js_1.SR6ChatMessageData(this.configured);
                        }
                        //this.finished = new SR6ChatMessageData(this.configured);
                        if (this.configured) {
                            this.finished.actionText = isPrivate ? "" : this.configured.actionText;
                            if (this.finished.rollType == RollTypes_js_1.RollType.Soak) {
                                this.finished.damage = this.finished.threshold - this._total;
                                /*
                                if (this.finished.speaker.token) {
                                    console.log("####Apply "+this.finished.damage+" to token "+this.finished.speaker.alias);
                                    let scene  = (game as Game).scenes!.get(this.finished.speaker.scene!);
                                    console.log("Found scene ",scene);
                                }
                                if (this.finished.speaker) {
                                    let actor : Shadowrun6Actor = ( (game as Game).actors!.get(this.finished.speaker.actor!) as Shadowrun6Actor);
                                    console.log("Found actor ",actor);
                                    if (!this.finished.damageAfterSoakAlreadyApplied) {
                                        console.log("####Apply "+this.finished.damage+" "+this.finished.monitor+" to actor "+this.finished.speaker.alias);
                                        if (this.finished.damage>0) {
                                            actor.applyDamage( this.finished.monitor, this.finished.damage);
                                        }
                                        this.finished.damageAfterSoakAlreadyApplied = true;
                                    }
                                }
                            */
                            }
                        }
                        //finished.user    = (game as Game).user!.id,
                        this.finished.success = this.isSuccess();
                        this.finished.glitch = this.isGlitch();
                        this.finished.criticalglitch = this.isCriticalGlitch();
                        this.finished.total = this._total;
                        this.finished.configured = this.configured;
                        (this.finished.results = isPrivate ? "???" : this.results),
                            (this.finished.formula = isPrivate ? "???" : this._formula),
                            (this.finished.publicRoll = !isPrivate);
                        _a = this.finished;
                        if (!isPrivate) return [3 /*break*/, 4];
                        _b = "";
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, this.getTooltip()];
                    case 5:
                        _b = _c.sent();
                        _c.label = 6;
                    case 6:
                        _a.tooltip = _b;
                        this.finished.publicRoll = !isPrivate;
                        return [2 /*return*/, renderTemplate(SR6Roll.CHAT_TEMPLATE, this.finished)];
                    case 7:
                        console.log("LEAVE render");
                        return [7 /*endfinally*/];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    SR6Roll.CHAT_TEMPLATE = "systems/shadowrun6-eden/templates/chat/roll-sr6.html";
    SR6Roll.TOOLTIP_TEMPLATE = "systems/shadowrun6-eden/templates/chat/tooltip.html";
    return SR6Roll;
}(Roll));
exports["default"] = SR6Roll;
var SR6RollChatMessage = /** @class */ (function (_super) {
    __extends(SR6RollChatMessage, _super);
    function SR6RollChatMessage(data, context) {
        var _this = _super.call(this, data, context) || this;
        //console.log("In SR6RollChatMessage<init>(", data, " , context,", context);
        var prepared = data;
        return _this;
    }
    SR6RollChatMessage.prototype.getHTML = function () {
        //console.log("In SR6RollChatMessage.getHTML()", this);
        return _super.prototype.getHTML.call(this);
    };
    return SR6RollChatMessage;
}(ChatMessage));
exports.SR6RollChatMessage = SR6RollChatMessage;
