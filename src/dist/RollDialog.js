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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.RollDialog = void 0;
var constants_js_1 = require("./constants.js");
var RollTypes_js_1 = require("./dice/RollTypes.js");
function isLifeform(obj) {
    return obj.attributes != undefined;
}
function isGear(obj) {
    return obj.skill != undefined;
}
function isWeapon(obj) {
    return obj.attackRating != undefined;
}
function isSpell(obj) {
    return obj.drain != undefined;
}
function attackRatingToString(val) {
    return (val[0] +
        "/" +
        (val[1] != 0 ? val[1] : "-") +
        "/" +
        (val[2] != 0 ? val[2] : "-") +
        "/" +
        (val[3] != 0 ? val[3] : "-") +
        "/" +
        (val[4] != 0 ? val[4] : "-"));
}
function isItemRoll(obj) {
    return obj.rollType != undefined;
}
function isSkillRoll(obj) {
    return obj.skillId != undefined;
}
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
/**
 * Special Shadowrun 6 instance of the RollDialog
 */
var RollDialog = /** @class */ (function (_super) {
    __extends(RollDialog, _super);
    function RollDialog(data, options) {
        var _this = _super.call(this, data, options) || this;
        /** Edge after applying gain and boost cost */
        _this.edge = 0;
        /** Dice added or substracted to the pool */
        _this.modifier = 0;
        var rOptions = options;
        console.log("In RollDialog<init>()", rOptions);
        _this.actor = rOptions.actor;
        _this.prepared = rOptions.prepared;
        _this.dialogResult = rOptions.dialogResult;
        _this.edge = _this.actor ? getSystemData(_this.actor).edge.value : 0;
        return _this;
    }
    /********************************************
     * React to changes on the dialog
     ********************************************/
    RollDialog.prototype.activateListeners = function (html) {
        _super.prototype.activateListeners.call(this, html);
        this.html = html;
        // React to attack/defense rating changes
        //    	html.find('.calc-edge').show(this._onCalcEdge.bind(this));
        html.find("select[name='distance']").change(this._recalculateBaseAR.bind(this));
        html.find("select[name='fireMode']").change(this._onFiringModeChange.bind(this));
        html.find("select[name='bfType']").change(this._onBurstModeChange.bind(this));
        html.find("select[name='fullAutoArea']").change(this._onAreaChange.bind(this));
        /*
    if (!this.data.target) {
      html.find('.calc-edge').show(this._onNoTarget.bind(this));
    }
    */
        html.find(".calc-edge-edit").change(this._onCalcEdge.bind(this));
        html.find(".calc-edge-edit").keyup(this._onCalcEdge.bind(this));
        html.show(this._onCalcEdge.bind(this));
        // React to changed edge boosts and actions
        html.find(".edgeBoosts").change(this._onEdgeBoostActionChange.bind(this));
        html.find(".edgeBoosts").keyup(this._onEdgeBoostActionChange.bind(this));
        html.find(".edgeActions").change(this._onEdgeBoostActionChange.bind(this));
        html.find(".edgeActions").keyup(this._onEdgeBoostActionChange.bind(this));
        html.show(this._onFiringModeChange.bind(this));
        // React to changed amp up
        html.find("#ampUp").change(this._onSpellConfigChange.bind(this));
        // React to changed amp up
        html.find("#incArea").change(this._onSpellConfigChange.bind(this));
        this._recalculateBaseAR();
        // React to attribute change
        html.find(".rollAttributeSelector").change(this._onAttribChange.bind(this));
        // React to Wound Modifier checkbox
        html.find("#useWoundModifier").change(this._updateDicePool.bind(this));
        // React to change in modifier
        html.find("#modifier").change(this._updateDicePool.bind(this));
    };
    //-------------------------------------------------------------
    RollDialog.prototype._recalculateBaseAR = function () {
        var options = this.options;
        var prepared = options.prepared;
        var distanceElement = document.getElementById("distance");
        if (!distanceElement)
            return;
        var ar = parseInt(distanceElement.value);
        var arElement = document.getElementById("baseAR");
        arElement.textContent = ar.toString();
        prepared.baseAR = ar;
        this._onCalcEdge(event);
    };
    //-------------------------------------------------------------
    /*
     * Called when something edge gain relevant changes on the
     * HTML form
     */
    RollDialog.prototype._onCalcEdge = function (event) {
        var _this = this;
        var configured = this.dialogResult;
        var prepared = this.prepared;
        if (!configured.actor)
            return;
        try {
            configured.edgePlayer = 0;
            configured.edgeTarget = 0;
            // Check situational edge
            var situationA = document.getElementById("situationalEdgeA");
            if (situationA && situationA.checked) {
                configured.edgePlayer++;
            }
            var situationD = document.getElementById("situationalEdgeD");
            if (situationD && situationD.checked) {
                configured.edgeTarget++;
            }
            var drElement = document.getElementById("dr");
            if (drElement) {
                var dr = parseInt(drElement.value);
                var arModElem = document.getElementById("arMod");
                if (isItemRoll(prepared)) {
                    var arElement = document.getElementById("baseAR");
                    var ar = arElement.textContent ? parseInt(arElement.textContent) : 0;
                    //					let ar = parseInt( (arElement.children[arElement.selectedIndex] as HTMLOptionElement).value );
                    if (arModElem.value && parseInt(arModElem.value) != 0) {
                        ar += parseInt(arModElem.value);
                    }
                    var finalAR = ar;
                    var result = ar - dr;
                    if (result >= 4) {
                        configured.edgePlayer++;
                    }
                    else if (result <= -4) {
                        configured.edgeTarget++;
                    }
                }
                else {
                    var ar = prepared.calcAttackRating[0];
                    if (arModElem.value && parseInt(arModElem.value) != 0) {
                        ar += parseInt(arModElem.value);
                    }
                    var result = ar - dr;
                    if (result >= 4) {
                        configured.edgePlayer++;
                    }
                    else if (result <= -4) {
                        configured.edgeTarget++;
                    }
                }
            }
            // Set new edge value
            var actor = getSystemData(configured.actor);
            var capped = false;
            // Limit the maximum edge
            var max = game.settings.get(constants_js_1.SYSTEM_NAME, "maxEdgePerRound");
            var combat = game.combat;
            if (combat) {
                max = combat.getMaxEdgeGain(configured.actor);
            }
            // Check if the gained edge would be more than the player may get per round
            if (configured.edgePlayer > max) {
                console.log("Reduce edge gain of attacker to " + max);
                configured.edgePlayer = Math.min(configured.edgePlayer, max);
                capped = true;
            }
            // Check if new Edge value would be >7
            if (actor.edge.value + configured.edgePlayer > 7) {
                configured.edgePlayer = Math.max(0, 7 - actor.edge.value);
                capped = true;
            }
            this.edge = Math.min(7, actor.edge.value + configured.edgePlayer);
            // Update in dialog
            var edgeValue = this._element[0].getElementsByClassName("edge-value")[0];
            if (edgeValue) {
                edgeValue.innerText = this.edge.toString();
            }
            // Update selection of edge boosts
            this._updateEdgeBoosts(this._element[0].getElementsByClassName("edgeBoosts")[0], this.edge);
            var newEdgeBoosts = CONFIG.SR6.EDGE_BOOSTS.filter(function (boost) { return boost.when == "PRE" && boost.cost <= _this.edge; });
            // Prepare text for player
            var innerText = "";
            var speaker = configured.speaker;
            if (configured.edgePlayer) {
                if (capped) {
                    configured.edgePlayer = max;
                    innerText = game.i18n.format("shadowrun6.roll.edge.gain_player_capped", {
                        name: speaker.alias,
                        value: configured.edgePlayer,
                        capped: max
                    });
                }
                else {
                    innerText = game.i18n.format("shadowrun6.roll.edge.gain_player", { name: speaker.alias, value: configured.edgePlayer });
                }
            }
            if (configured.edgeTarget != 0) {
                //configured.targets
                var targetName = "To Do"; //this.targetName ? this.targetName : (game as Game).i18n.localize("shadowrun6.roll.target");
                innerText += "  " + game.i18n.format("shadowrun6.roll.edge.gain_player", { name: targetName, value: configured.edgeTarget });
            }
            if (configured.edgePlayer == 0 && configured.edgeTarget == 0) {
                innerText += "  " + game.i18n.localize("shadowrun6.roll.edge.no_gain");
            }
            configured.edge_message = innerText;
            var edgeLabel = document.getElementById("edgeLabel");
            if (edgeLabel) {
                edgeLabel.innerText = innerText;
            }
        }
        catch (err) {
            console.log("Oh NO! " + err.stack);
        }
    };
    //-------------------------------------------------------------
    RollDialog.prototype._updateEdgeBoosts = function (elem, available) {
        var newEdgeBoosts = CONFIG.SR6.EDGE_BOOSTS.filter(function (boost) { return boost.when == "PRE" && boost.cost <= available; });
        // Node for inserting new data before
        var insertBeforeElem;
        // Remove previous data
        var array = Array.from(elem.children);
        array.forEach(function (child) {
            if (child.value != "none" && child.value != "edge_action") {
                elem.removeChild(child);
            }
            if (child.value == "edge_action") {
                insertBeforeElem = child;
            }
        });
        // Add new data
        newEdgeBoosts.forEach(function (boost) {
            var opt = document.createElement("option");
            opt.setAttribute("value", boost.id);
            opt.setAttribute("data-item-boostid", boost.id);
            var cont = document.createTextNode(game.i18n.localize("shadowrun6.edge_boost." + boost.id) + " - (" + boost.cost + ")");
            opt.appendChild(cont);
            elem.insertBefore(opt, insertBeforeElem);
        });
    };
    //-------------------------------------------------------------
    RollDialog.prototype._updateEdgeActions = function (elem, available) {
        var newEdgeActions = CONFIG.SR6.EDGE_ACTIONS.filter(function (action) { return action.cost <= available; });
        // Remove previous data
        var array = Array.from(elem.children);
        array.forEach(function (child) {
            /*
            if (child.value!="none") {
                elem.removeChild(child)
            }
                    */
        });
        // Add new data
        newEdgeActions.forEach(function (action) {
            var opt = document.createElement("option");
            opt.setAttribute("value", action.id);
            opt.setAttribute("data-item-actionid", action.id);
            var cont = document.createTextNode(game.i18n.localize("shadowrun6.edge_action." + action.id) + " - (" + action.cost + ")");
            opt.appendChild(cont);
            elem.appendChild(opt);
        });
    };
    //-------------------------------------------------------------
    /*
     * Called when a change happens in the Edge Action or Edge Action
     * selection.
     */
    RollDialog.prototype._onEdgeBoostActionChange = function (event) {
        console.log("_onEdgeBoostActionChange");
        console.log("_onEdgeBoostActionChange  this=", this);
        var actor = this.options.actor;
        var prepared = this.options.prepared;
        var configured = this.dialogResult;
        // Ignore this, if there is no actor
        if (!actor) {
            return;
        }
        if (!event || !event.currentTarget) {
            return;
        }
        if (event.currentTarget.name === "edgeBoost") {
            var boostsSelect = event.currentTarget;
            var boostId = boostsSelect.children[boostsSelect.selectedIndex].dataset.itemBoostid;
            console.log(" boostId = " + boostId);
            configured.edgeBoost = boostId;
            if (boostId === "edge_action") {
                this._updateEdgeActions(this._element[0].getElementsByClassName("edgeActions")[0], this.edge);
            }
            else {
                this._updateEdgeActions(this._element[0].getElementsByClassName("edgeActions")[0], 0);
            }
            if (boostId != "none") {
                configured.edge_use = game.i18n.localize("shadowrun6.edge_boost." + boostId);
            }
            else {
                configured.edge_use = "";
            }
            this._performEdgeBoostOrAction(configured, boostId);
        }
        else if (event.currentTarget.name === "edgeAction") {
            var actionSelect = event.currentTarget;
            var actionId = actionSelect.children[actionSelect.selectedIndex].dataset.itemActionid;
            console.log(" actionId = " + actionId);
            configured.edgeAction = actionId;
            configured.edge_use = game.i18n.localize("shadowrun6.edge_action." + actionId);
            this._performEdgeBoostOrAction(configured, actionId);
        }
    };
    //-------------------------------------------------------------
    RollDialog.prototype._updateDicePool = function (data) {
        // Get the value of the user entered modifier ..
        var userModifier = parseInt(document.getElementById("modifier").value);
        // .. and update the roll
        this.modifier = userModifier ? userModifier : 0;
        // Get the value of the checkbox if the calculated wound penality should be used
        var useWoundModifier = document.getElementById("useWoundModifier").checked;
        // Calculate new sum
        console.log("updateDicePool: ", this);
        console.log("updateDicePool2: ", this.prepared.pool, this.modifier, this.actor.getWoundModifier());
        this.prepared.calcPool = this.prepared.pool + this.modifier - (useWoundModifier ? this.actor.getWoundModifier() : 0);
        $("label[name='dicePool']")[0].innerText = this.prepared.calcPool.toString();
    };
    //-------------------------------------------------------------
    RollDialog.prototype._performEdgeBoostOrAction = function (data, boostOrActionId) {
        console.log("ToDo: performEgdeBoostOrAction " + boostOrActionId);
        if (boostOrActionId == "edge_action") {
            return;
        }
        data.explode = false;
        this.modifier = 0;
        switch (boostOrActionId) {
            case "add_edge_pool":
                data.explode = true;
                this.modifier = getSystemData(data.actor).edge.max;
                break;
        }
        // Update content on dialog
        $("input[name='modifier']")[0].value = this.modifier.toString();
        //($("input[name='explode' ]")[0] as HTMLInputElement).value = data.explode;
        $("input[name='explode' ]")[0].checked = data.explode;
        this._updateDicePool(data);
    };
    //-------------------------------------------------------------
    RollDialog.prototype._onSpellConfigChange = function () {
        var ampUpElement = document.getElementById("ampUp");
        var incElement = document.getElementById("incArea");
        var prepared = this.options.prepared;
        if (!isLifeform(getSystemData(prepared.actor)))
            return;
        var lifeform = getSystemData(prepared.actor);
        var baseMagic = lifeform.attributes.mag.pool;
        var ampUpSelect = ampUpElement ? parseInt(ampUpElement.value) : 0;
        var incSelect = incElement ? parseInt(incElement.value) : 0;
        prepared.calcDamage = (prepared.spell.damage === "physical" || prepared.spell.damage === "physical_special" ? baseMagic / 2 : 0) + ampUpSelect;
        prepared.calcDrain = (+prepared.spell.drain + +ampUpSelect * 2 + +incSelect);
        prepared.calcArea = 2 + incSelect * 2;
        this.html.find("td[id='spellDrain']").text(prepared.calcDrain.toString());
        this.html.find("span[id='spellDmg']").text(prepared.calcDamage.toString());
        this.html.find("span[id='spellArea']").text(prepared.calcArea.toString());
    };
    //-------------------------------------------------------------
    RollDialog.prototype._onFiringModeChange = function (event) {
        var prepared = this.options.prepared;
        var fireModeElement = document.getElementById("fireMode");
        if (!fireModeElement)
            return;
        var newMode = fireModeElement.value;
        var poolMod = 0;
        var arMod = 0;
        var dmgMod = 0;
        var rounds = 1;
        prepared.fireMode = newMode;
        switch (newMode) {
            case "SS":
                this.html.find(".onlyFA").css("display", "none");
                this.html.find(".onlyBF").css("display", "none");
                break;
            case "SA":
                this.html.find(".onlyFA").css("display", "none");
                this.html.find(".onlyBF").css("display", "none");
                rounds = 2;
                arMod = -2;
                dmgMod = 1;
                break;
            case "BF":
                this.html.find(".onlyFA").css("display", "none");
                this.html.find(".onlyBF").css("display", "table-cell");
                rounds = 4;
                arMod = -4;
                dmgMod = 2;
                break;
            case "FA":
                rounds = 10;
                arMod = -6;
                this.html.find(".onlyFA").css("display", "table-cell");
                this.html.find(".onlyBF").css("display", "none");
                break;
        }
        // Calculate reduced attack rating
        prepared.calcAttackRating = __spreadArrays(prepared.weapon.attackRating);
        prepared.calcAttackRating.forEach(function (element, index) {
            prepared.calcAttackRating[index] = parseInt(element) + parseInt(arMod);
            if (prepared.calcAttackRating[index] <= 0)
                prepared.calcAttackRating[index] = 0;
        });
        this.html.find("td[name='calcAR']").text(attackRatingToString(prepared.calcAttackRating));
        // Update the range selector for attack rating
        this.html
            .find("select[name='distance']")
            .children("option")
            .each(function () {
            var idx = parseInt(this.getAttribute("name"));
            this.setAttribute("data-item-ar", prepared.calcAttackRating[idx].toString());
            this.setAttribute("value", prepared.calcAttackRating[idx].toString());
            this.text = game.i18n.localize("shadowrun6.roll.ar_" + idx) + " (" + prepared.calcAttackRating[idx].toString() + ")";
        });
        this.html.find("select[name='distance']").change();
        // Calculate modified damage
        prepared.calcDmg = prepared.weapon.dmg + dmgMod;
        this.html.find("span[name='calcDmg']").text(prepared.calcDmg.toString());
        // Calculate modified pool
        prepared.calcPool = prepared.pool + poolMod;
        prepared.calcRounds = rounds;
        this.html.find("td[name='calcRounds']").text(prepared.calcRounds.toString());
        this._recalculateBaseAR();
    };
    //-------------------------------------------------------------
    RollDialog.prototype._onBurstModeChange = function (event) {
        console.log("ToDo: _onBurstModeChanged");
        var prepared = this.options.prepared;
        var fireModeElement = document.getElementById("bfType");
        if (!fireModeElement)
            return;
        prepared.burstMode = fireModeElement.value;
    };
    //-------------------------------------------------------------
    RollDialog.prototype._onAreaChange = function (event) {
        console.log("ToDo: _onAreaChanged");
        var prepared = this.options.prepared;
        var fireModeElement = document.getElementById("fullAutoArea");
        if (!fireModeElement)
            return;
        prepared.faArea = fireModeElement.value;
    };
    //-------------------------------------------------------------
    RollDialog.prototype._onAttribChange = function (event) {
        console.log("_onAttribChange ", this.options);
        var actor = this.options.actor;
        var prepared = this.options.prepared;
        var configured = this.options.dialogResult;
        // Ignore this, if there is no actor
        if (!actor) {
            return;
        }
        if (!event || !event.currentTarget) {
            return;
        }
        if (isSkillRoll(prepared)) {
            console.log("isSkillRoll ", prepared.skillId);
            var attribSelect = event.currentTarget;
            var newAttrib = attribSelect.children[attribSelect.selectedIndex].value;
            console.log(" use attribute = " + newAttrib);
            prepared.attrib = newAttrib;
            actor.updateSkillRoll(prepared, newAttrib);
            prepared.actionText = prepared.checkText;
        }
        console.log("new check: " + prepared.checkText);
        console.log("new pool: " + prepared.pool);
        configured.checkText = prepared.checkText;
        configured.pool = prepared.pool;
        document.getElementById("rolldia-checkText").textContent = prepared.checkText;
        this._updateDicePool(configured);
    };
    //-------------------------------------------------------------
    RollDialog.prototype._onNoTarget = function () {
        document.getElementById("noTargetLabel").innerText = game.i18n.localize("shadowrun6.roll.notarget");
    };
    //-------------------------------------------------------------
    RollDialog.prototype.onClose = function () {
        console.log("To Do: onClose()------------------------------------");
        var options = this.options;
        var prepared = options.prepared;
        var configured = options.dialogResult;
        return new RollTypes_js_1.SR6ChatMessageData(configured);
    };
    return RollDialog;
}(Dialog));
exports.RollDialog = RollDialog;
