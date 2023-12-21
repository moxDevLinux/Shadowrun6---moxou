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
exports.__esModule = true;
exports.Shadowrun6ActorSheet = void 0;
var RollTypes_js_1 = require("../dice/RollTypes.js");
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
 * Extend the basic ActorSheet with some very simple modifications
 * @extends {ActorSheet}
 */
var Shadowrun6ActorSheet = /** @class */ (function (_super) {
    __extends(Shadowrun6ActorSheet, _super);
    function Shadowrun6ActorSheet() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /** @overrride */
    Shadowrun6ActorSheet.prototype.getData = function () {
        var data = _super.prototype.getData.call(this);
        data.config = CONFIG.SR6;
        if (game.release.generation >= 10) {
            data.system = data.data.system;
        }
        else {
            data.system = data.data.data.data;
        }
        console.log("getData1() ", data);
        return data;
    };
    Object.defineProperty(Shadowrun6ActorSheet.prototype, "template", {
        get: function () {
            console.log("in template()", getSystemData(this.actor));
            console.log("default: ", _super.prototype.template);
            var path = "systems/shadowrun6-eden/templates/actor/";
            if (this.isEditable) {
                console.log("ReadWrite sheet ");
                return _super.prototype.template;
            }
            else {
                console.log("ReadOnly sheet", this);
                var genItem = getSystemData(this.actor);
                this.actor.descHtml = game.i18n.localize(getActorData(this.actor).type + "." + genItem.genesisID + ".desc");
                getActorData(this.actor).descHtml2 = game.i18n.localize(getActorData(this.actor).type + "." + genItem.genesisID + ".desc");
                console.log(path + "shadowrun6-" + getActorData(this.actor).type + "-sheet-ro.html");
                return path + "shadowrun6-" + getActorData(this.actor).type + "-sheet-ro.html";
            }
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Activate event listeners using the prepared sheet HTML
     * @param html {HTML}   The prepared HTML object ready to be rendered into the DOM
     */
    Shadowrun6ActorSheet.prototype.activateListeners = function (html) {
        var _this = this;
        // Owner Only Listeners
        if (this.actor.isOwner) {
            html.find(".health-phys").on("input", this._redrawBar(html, "Phy", getSystemData(this.actor).physical));
            html.find(".health-stun").on("input", this._redrawBar(html, "Stun", getSystemData(this.actor).stun));
            // Roll Skill Checks
            html.find(".skill-roll").click(this._onRollSkillCheck.bind(this));
            html.find(".spell-roll").click(this._onRollSpellCheck.bind(this));
            html.find(".ritual-roll").click(this._onRollRitualCheck.bind(this));
            html.find(".item-roll").click(this._onRollItemCheck.bind(this));
            html.find(".defense-roll").click(this._onCommonCheck.bind(this));
            html.find(".matrix-roll").click(this._onMatrixAction.bind(this));
            html.find(".complexform-roll").click(this._onRollComplexFormCheck.bind(this));
            html.find(".attributeonly-roll").click(this._onCommonCheck.bind(this));
            this.activateCreationListener(html);
            html.find(".item-delete").click(function (event) {
                var itemId = _this._getClosestData($(event.currentTarget), "item-id");
                console.log("Delete item " + itemId);
                _this.actor.deleteEmbeddedDocuments("Item", [itemId]);
            });
            html.find("[data-field]").change(function (event) {
                var _a, _b;
                console.log("data-field", event);
                var element = event.currentTarget;
                var value = element.value;
                if (element.type == "number" || (element.dataset && element.dataset.dtype && element.dataset.dtype == "Number")) {
                    value = parseInt(element.value);
                }
                var itemId = _this._getClosestData($(event.currentTarget), "item-id");
                var field = element.dataset.field;
                if (itemId) {
                    console.log("Update item " + itemId + " field " + field + " with " + value);
                    var item = _this.actor.items.get(itemId);
                    if (item)
                        item.update((_a = {}, _a[field] = value, _a));
                }
                else {
                    console.log("Update actor field " + field + " with " + value);
                    _this.actor.update((_b = {}, _b[field] = value, _b));
                }
            });
            html.find("[data-check]").click(function (event) {
                var _a, _b;
                var element = event.currentTarget;
                console.log("Came here with checked=" + element.checked + "  and value=" + element.value);
                var value = element.checked;
                var itemId = _this._getClosestData($(event.currentTarget), "item-id");
                var field = element.dataset.check;
                if (itemId) {
                    console.log("Update field " + field + " with " + value);
                    var item = _this.actor.items.get(itemId);
                    if (item)
                        item.update((_a = {}, _a[field] = value, _a));
                }
                else {
                    console.log("Update actor field " + field + " with " + value);
                    _this.actor.update((_b = {}, _b[field] = value, _b));
                }
            });
            //Collapsible
            html.find(".collapsible").click(function (event) {
                var element = event.currentTarget;
                var itemId = _this._getClosestData($(event.currentTarget), "item-id");
                var item = _this.actor.items.get(itemId);
                if (!item)
                    return;
                //				console.log("Collapsible: old styles are '"+element.classList+"'' and flag is "+item.getFlag("shadowrun6-eden","collapse-state"));
                element.classList.toggle("open");
                var content = element.parentElement.parentElement.nextElementSibling.firstElementChild.firstElementChild;
                if (content.style.maxHeight) {
                    content.style.maxHeight = null;
                }
                else {
                    content.style.maxHeight = content.scrollHeight + "px";
                }
                //				console.log("Collapsible: temp style are '"+element.classList);
                var value = element.classList.contains("open") ? "open" : "closed";
                //				console.log("Update flag 'collapse-state' with "+value);
                item.setFlag("shadowrun6-eden", "collapse-state", value);
                //				console.log("Collapsible: new styles are '"+element.classList+"' and flag is "+item.getFlag("shadowrun6-eden","collapse-state"));
            });
            //Collapsible for lists
            html.find(".collapsible-skill").click(function (event) {
                var element = event.currentTarget;
                var skillId = _this._getClosestData($(event.currentTarget), "skill-id");
                var item = getSystemData(_this.actor).skills[skillId];
                element.classList.toggle("open");
                var content = $(element.parentElement).find(".collapsible-content")[0];
                if (content.style.maxHeight) {
                    content.style.maxHeight = "";
                }
                else {
                    content.style.maxHeight = content.scrollHeight + "px";
                }
                var value = element.classList.contains("open") ? "open" : "closed";
                _this.actor.setFlag("shadowrun6-eden", "collapse-state-" + skillId, value);
            });
            //Collapsible
            html.find("select.contdrolled").change(function (event) {
                var element = event.currentTarget;
                var itemId = _this._getClosestData($(event.currentTarget), "item-id");
                console.log("SELECT ", element);
                console.log("SELECT2", event);
                console.log("SELECT3", event.target.value);
                console.log("-> itemId ", itemId);
                console.log("-> ds ", element.dataset);
            });
            /*
             * Drag & Drop
             */
            $(".draggable")
                .on("dragstart", function (event) {
                console.log("DRAG START");
                var itemId = event.currentTarget.dataset.itemId;
                if (itemId) {
                    console.log("Item " + itemId + " dragged");
                    var itemData = getActorData(_this.actor).items.find(function (el) { return el.id === itemId; });
                    event.originalEvent.dataTransfer.setData("text/plain", JSON.stringify({
                        type: "Item",
                        data: itemData,
                        actorId: _this.actor.id
                    }));
                    event.stopPropagation();
                    return;
                }
            })
                .attr("draggable", "true");
        }
        else {
            html.find(".rollable").each(function (i, el) { return el.classList.remove("rollable"); });
        }
        // Handle default listeners last so system listeners are triggered first
        _super.prototype.activateListeners.call(this, html);
    };
    Shadowrun6ActorSheet.prototype.activateCreationListener = function (html) {
        var _this = this;
        console.log("activateCreationListener");
        html.find(".adeptpower-create").click(function (ev) {
            var itemData = {
                name: game.i18n.localize("shadowrun6.newitem.adeptpower"),
                type: "adeptpower"
            };
            return _this.actor.createEmbeddedDocuments("Item", [itemData]);
        });
        html.find(".martialartstyle-create").click(function (ev) {
            var itemData = {
                name: game.i18n.localize("shadowrun6.newitem.martialartstyle"),
                type: "martialartstyle"
            };
            return _this.actor.createEmbeddedDocuments("Item", [itemData]);
        });
        html.find(".quality-create").click(function (ev) { return _this._onCreateNewEmbeddedItem("quality"); });
        html.find(".echo-create").click(function (ev) { return _this._onCreateNewEmbeddedItem("echo"); });
        html.find(".contact-create").click(function (ev) { return _this._onCreateNewEmbeddedItem("contact"); });
        html.find(".sin-create").click(function (ev) { return _this._onCreateNewEmbeddedItem("sin"); });
        html.find(".lifestyle-create").click(function (ev) { return _this._onCreateNewEmbeddedItem("lifestyle"); });
        html.find(".complexform-create").click(function (ev) { return _this._onCreateNewEmbeddedItem("complexform"); });
        html.find(".metamagic-create").click(function (ev) { return _this._onCreateNewEmbeddedItem("metamagic"); });
        html.find(".spell-create").click(function (ev) { return _this._onCreateNewEmbeddedItem("spell"); });
        html.find(".ritual-create").click(function (ev) { return _this._onCreateNewEmbeddedItem("ritual"); });
        html.find(".focus-create").click(function (ev) { return _this._onCreateNewEmbeddedItem("focus"); });
        html.find(".weapon-create").click(function (ev) {
            var itemData = {
                name: game.i18n.localize("shadowrun6.newitem.weapon"),
                type: "gear",
                data: {
                    type: "WEAPON_FIREARMS"
                }
            };
            return _this.actor.createEmbeddedDocuments("Item", [itemData]);
        });
        html.find(".ELECTRONICS-create").click(function (ev) { return _this._onCreateNewEmbeddedItem("gear", "ELECTRONICS"); });
        html.find(".CHEMICALS-create").click(function (ev) { return _this._onCreateNewEmbeddedItem("gear", "CHEMICALS"); });
        html.find(".BIOLOGY-create").click(function (ev) { return _this._onCreateNewEmbeddedItem("gear", "BIOLOGY"); });
        html.find(".SURVIVAL-create").click(function (ev) { return _this._onCreateNewEmbeddedItem("gear", "SURVIVAL"); });
        html.find(".armor-create").click(function (ev) { return _this._onCreateNewEmbeddedItem("gear", "ARMOR"); });
        html.find(".ammunition-create").click(function (ev) { return _this._onCreateNewEmbeddedItem("gear", "AMMUNITION"); });
        html.find(".bodyware-create").click(function (ev) { return _this._onCreateNewEmbeddedItem("gear", "CYBERWARE"); });
        html.find(".close-weapon-create").click(function (ev) {
            var itemData = {
                name: game.i18n.localize("shadowrun6.newitem.weaponclose"),
                type: "gear",
                data: {
                    type: "WEAPON_CLOSE_COMBAT"
                }
            };
            return _this.actor.createEmbeddedDocuments("Item", [itemData]);
        });
        html.find('.critterpower-create').click(function (ev) {
            var itemData = {
                name: game.i18n.localize("shadowrun6.newitem.critterpower"),
                type: "critterpower"
            };
            return _this.actor.createEmbeddedDocuments("Item", [itemData]);
        });
        html.find(".martialart-style-create").click(function (ev) {
            var itemData = {
                name: game.i18n.localize("shadowrun6.newitem.martialartstyle"),
                type: "martialartstyle",
                data: {
                    genesisID: _this._create_UUID()
                }
            };
            return _this.actor.createEmbeddedDocuments("Item", [itemData]);
        });
        html.find(".martialart-tech-create").click(function (ev) {
            var element = ev.currentTarget.closest(".item");
            var styleId = element.dataset.styleId;
            var itemData = {
                name: game.i18n.localize("shadowrun6.newitem.martialarttech"),
                type: "martialarttech",
                data: {
                    style: styleId
                }
            };
            return _this.actor.createEmbeddedDocuments("Item", [itemData]);
        });
        html.find(".skill-knowledge-create").click(function (ev) {
            var itemData = {
                name: game.i18n.localize("shadowrun6.newitem.skill.knowledge"),
                type: "skill",
                data: {
                    genesisID: "knowledge"
                }
            };
            return _this.actor.createEmbeddedDocuments("Item", [itemData]);
        });
        html.find(".skill-language-create").click(function (ev) {
            var itemData = {
                name: game.i18n.localize("shadowrun6.newitem.skill.language"),
                type: "skill",
                data: {
                    genesisID: "language",
                    points: 1
                }
            };
            return _this.actor.createEmbeddedDocuments("Item", [itemData]);
        });
        html.find(".matrix-create").click(function (ev) {
            var itemData = {
                name: game.i18n.localize("shadowrun6.newitem.matrix"),
                type: "gear",
                data: {
                    genesisID: _this._create_UUID(),
                    type: "ELECTRONICS",
                    subtype: "COMMLINK"
                }
            };
            return _this.actor.createEmbeddedDocuments("Item", [itemData]);
        });
        html.find(".vehicle-create").click(function (ev) {
            var itemData = {
                name: game.i18n.localize("shadowrun6.newitem.vehicles"),
                type: "gear",
                data: {
                    genesisID: _this._create_UUID(),
                    type: "VEHICLES",
                    subtype: "CARS"
                }
            };
            return _this.actor.createEmbeddedDocuments("Item", [itemData]);
        });
        html.find(".drone-create").click(function (ev) {
            var itemData = {
                name: game.i18n.localize("shadowrun6.newitem.drones"),
                type: "gear",
                data: {
                    genesisID: _this._create_UUID(),
                    type: "DRONES",
                    subtype: "SMALL_DRONES"
                }
            };
            return _this.actor.createEmbeddedDocuments("Item", [itemData]);
        });
        html.find(".item-edit").click(function (ev) {
            var element = ev.currentTarget.closest(".item");
            var item = _this.actor.items.get(element.dataset.itemId);
            console.log("edit ", item);
            if (!item) {
                throw new Error("Item is null");
            }
            if (item.sheet) {
                item.sheet.render(true);
            }
        });
    };
    //-----------------------------------------------------
    Shadowrun6ActorSheet.prototype._onCreateNewEmbeddedItem = function (type, itemtype) {
        if (itemtype === void 0) { itemtype = null; }
        var nameType = itemtype ? itemtype.toLowerCase() : type.toLowerCase();
        var itemData = {
            name: game.i18n.localize("shadowrun6.newitem." + nameType),
            type: type
        };
        if (itemtype) {
            itemData = mergeObject(itemData, {
                data: {
                    type: itemtype
                }
            });
        }
        return this.actor.createEmbeddedDocuments("Item", [itemData]);
    };
    //-----------------------------------------------------
    Shadowrun6ActorSheet.prototype._getClosestData = function (jQObject, dataName, defaultValue) {
        var _a;
        if (defaultValue === void 0) { defaultValue = ""; }
        var value = (_a = jQObject.closest("[data-" + dataName + "]")) === null || _a === void 0 ? void 0 : _a.data(dataName);
        return value ? value : defaultValue;
    };
    //-----------------------------------------------------
    Shadowrun6ActorSheet.prototype._setDamage = function (html, i, monitorAttribute, id, event) {
        var _a, _b, _c, _d;
        if (!isLifeform(getSystemData(this.actor)))
            return;
        switch (event.target.parentNode.getAttribute("id")) {
            case "barPhyBoxes":
                console.log("setDamage (physical health to " + event.currentTarget.dataset.value + ")");
                //Allow setting zero health by clicking again
                if ((getSystemData(this.actor).physical.dmg == monitorAttribute.max - 1) == i) {
                    this.actor.update((_a = {}, _a["data.physical.dmg"] = monitorAttribute.max, _a));
                }
                else {
                    this.actor.update((_b = {}, _b["data.physical.dmg"] = monitorAttribute.max - i, _b));
                }
                break;
            case "barStunBoxes":
                console.log("setDamage (stun health to " + event.currentTarget.dataset.value + ")");
                //Allow setting zero health by clicking again
                if ((getSystemData(this.actor).stun.dmg == monitorAttribute.max - 1) == i) {
                    this.actor.update((_c = {}, _c["data.stun.dmg"] = monitorAttribute.max, _c));
                }
                else {
                    this.actor.update((_d = {}, _d["data.stun.dmg"] = monitorAttribute.max - i, _d));
                }
                break;
        }
    };
    //-----------------------------------------------------
    Shadowrun6ActorSheet.prototype._redrawBar = function (html, id, monitorAttribute) {
        if (!monitorAttribute || !monitorAttribute.value)
            return;
        //let vMax = parseInt(html.find("#data"+id+"Max")[0].value);
        //let vCur = parseInt(html.find("#data"+id+"Cur")[0].value);
        var perc = (monitorAttribute.value / monitorAttribute.max) * 100;
        if (html.find("#bar" + id + "Cur").length == 0) {
            return;
        }
        html.find("#bar" + id + "Cur")[0].style.width = perc + "%";
        var myNode = html.find("#bar" + id + "Boxes")[0];
        // Only change nodes when necessary
        if (myNode.childElementCount != monitorAttribute.max) {
            // The energy bar
            // Remove previous boxes
            while (myNode.firstChild) {
                myNode.removeChild(myNode.lastChild);
            }
            // Add new ones
            var i = 0;
            while (i < monitorAttribute.max) {
                i++;
                var div = document.createElement("div");
                var text = document.createTextNode("\u00A0");
                if (i < monitorAttribute.max) {
                    div.setAttribute("style", "flex: 1; border-right: solid black 1px;");
                }
                else {
                    div.setAttribute("style", "flex: 1");
                }
                div.addEventListener("click", this._setDamage.bind(this, html, i, monitorAttribute, id));
                div.appendChild(text);
                myNode.appendChild(div);
            }
            // The scale
            myNode = html.find("#bar" + id + "Scale")[0];
            while (myNode.firstChild) {
                myNode.removeChild(myNode.lastChild);
            }
            // Add new
            i = 0;
            while (i < monitorAttribute.max) {
                i++;
                var div = document.createElement("div");
                if (i % 3 == 0) {
                    var minus = -(i / 3);
                    div.setAttribute("style", "flex: 1; border-right: solid black 1px; text-align:right;");
                    div.appendChild(document.createTextNode(minus.toString()));
                }
                else {
                    div.setAttribute("style", "flex: 1");
                    div.appendChild(document.createTextNode("\u00A0"));
                }
                myNode.insertBefore(div, myNode.childNodes[0]);
            }
        }
    };
    Shadowrun6ActorSheet.prototype._create_UUID = function () {
        var dt = new Date().getTime();
        var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
            var r = (dt + Math.random() * 16) % 16 | 0;
            dt = Math.floor(dt / 16);
            return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
        });
        return uuid;
    };
    //-----------------------------------------------------
    Shadowrun6ActorSheet.prototype._onRecalculatePhysicalBar = function (html) {
        console.log("LE editiert  " + html);
        var vMax = parseInt(html.find("#dataPhyMax")[0].value);
        console.log("vMax = " + vMax);
        var vCur = parseInt(html.find("#dataPhyCur")[0].value);
        console.log("vCur = " + vCur);
        var totalVer = vMax - vCur; // Wieviel nach Verschnaufpause
        console.log("Damage = " + totalVer);
        var percVerz = (totalVer / vMax) * 100;
        console.log("Percent = " + percVerz);
        html.find("#barPhyCur")[0].style.width = percVerz + "%";
        var myNode = html.find("#barPhyBoxes")[0];
        // Only change nodes when necessary
        if (myNode.childElementCount != vMax) {
            // The energy bar
            // Remove previous boxes
            while (myNode.firstChild) {
                myNode.removeChild(myNode.lastChild);
            }
            // Add new ones
            var i = 0;
            while (i < vMax) {
                i++;
                var div = document.createElement("div");
                var text = document.createTextNode("\u00A0");
                if (i < vMax) {
                    div.setAttribute("style", "flex: 1; border-right: solid black 1px;");
                }
                else {
                    div.setAttribute("style", "flex: 1");
                }
                div.appendChild(text);
                myNode.appendChild(div);
            }
            // The scale
            myNode = html.find("#barPhyScale")[0];
            while (myNode.firstChild) {
                myNode.removeChild(myNode.lastChild);
            }
            // Add new
            i = 0;
            while (i < vMax) {
                i++;
                var div = document.createElement("div");
                if (i % 3 == 0) {
                    div.setAttribute("style", "flex: 1; border-right: solid black 1px; text-align:right;");
                    div.appendChild(document.createTextNode((-(i / 3)).toString()));
                }
                else {
                    div.setAttribute("style", "flex: 1");
                    div.appendChild(document.createTextNode("\u00A0"));
                }
                myNode.insertBefore(div, myNode.childNodes[0]);
            }
        }
    };
    //-----------------------------------------------------
    Shadowrun6ActorSheet.prototype._onCommonCheck = function (event, html) {
        console.log("onCommonCheck");
        event.preventDefault();
        var roll = new RollTypes_js_1.PreparedRoll();
        roll.pool = parseInt(event.currentTarget.dataset.pool);
        roll.rollType = RollTypes_js_1.RollType.Common;
        var classList = event.currentTarget.classList;
        if (classList.contains("defense-roll")) {
            roll.actionText = game.i18n.localize("shadowrun6.defense." + event.currentTarget.dataset.itemId);
        }
        else if (classList.contains("attributeonly-roll")) {
            roll.actionText = game.i18n.localize("shadowrun6.derived." + event.currentTarget.dataset.itemId);
        }
        else {
            roll.actionText = game.i18n.localize("shadowrun6.rolltext." + event.currentTarget.dataset.itemId);
        }
        var dialogConfig;
        if (classList.contains("defense-roll")) {
            roll.allowBuyHits = false;
            dialogConfig = {
                useModifier: true,
                useThreshold: false
            };
        }
        else if (classList.contains("attributeonly-roll")) {
            roll.allowBuyHits = true;
            dialogConfig = {
                useModifier: true,
                useThreshold: true
            };
        }
        else {
            roll.allowBuyHits = true;
            roll.useWildDie = 1;
            dialogConfig = {
                useModifier: true,
                useThreshold: true
            };
        }
        this.actor.rollCommonCheck(roll, dialogConfig);
    };
    //-----------------------------------------------------
    /**
     * Handle rolling a Skill check
     * @param {Event} event   The originating click event
     * @private
     */
    Shadowrun6ActorSheet.prototype._onRollSkillCheck = function (event, html) {
        console.log("onRollSkillCheck");
        event.preventDefault();
        if (!event.currentTarget)
            return;
        if (!event.currentTarget.dataset)
            return;
        var dataset = event.currentTarget.dataset;
        var skillId = dataset.skill;
        var roll = new RollTypes_js_1.SkillRoll(getSystemData(this.actor), skillId);
        roll.skillSpec = dataset.skillspec;
        if (dataset.threshold)
            roll.threshold = dataset.threshold;
        roll.attrib = dataset.attrib;
        console.log("onRollSkillCheck before ", roll);
        this.actor.rollSkill(roll);
    };
    //-----------------------------------------------------
    Shadowrun6ActorSheet.prototype._onRollItemCheck = function (event, html) {
        console.log("_onRollItemCheck");
        event.preventDefault();
        var attacker = getSystemData(this.actor);
        var itemId = event.currentTarget.dataset.itemId;
        var item = this.actor.items.get(itemId);
        if (!item) {
            throw new Error("onRollItemCheck for non-existing item");
        }
        if (!isGear(getSystemData(item))) {
            throw new Error("onRollItemCheck: No skill for item");
        }
        if (isWeapon(getSystemData(item))) {
            console.log("is weapon", item);
        }
        var gear = getSystemData(item);
        var roll = new RollTypes_js_1.WeaponRoll(attacker, item, itemId, gear);
        roll.useWildDie = gear.wild ? 1 : 0;
        console.log("_onRollItemCheck before ", roll);
        this.actor.rollItem(roll);
    };
    //-----------------------------------------------------
    Shadowrun6ActorSheet.prototype._onRollSpellCheck = function (event, html) {
        console.log("_onRollSpellCheck");
        event.preventDefault();
        if (!event.currentTarget)
            return;
        if (!event.currentTarget.dataset)
            return;
        var caster = getSystemData(this.actor);
        var itemId = event.currentTarget.dataset.itemId;
        var item = this.actor.items.get(itemId);
        if (!item) {
            throw new Error("_onRollSpellCheck for non-existing item");
        }
        var skill = caster.skills["sorcery"];
        var spellRaw = this.actor.items.get(itemId);
        if (!spellRaw) {
            console.log("No such item: " + itemId);
            return;
        }
        var spell = getSystemData(spellRaw);
        var roll = new RollTypes_js_1.SpellRoll(caster, item, itemId, spell);
        roll.skillSpec = "spellcasting";
        this.actor.rollSpell(roll, false);
    };
    //-----------------------------------------------------
    Shadowrun6ActorSheet.prototype._onRollRitualCheck = function (event, html) {
        event.preventDefault();
        var item = event.currentTarget.dataset.itemId;
        this.actor.rollSpell(item, true);
    };
    //-----------------------------------------------------
    Shadowrun6ActorSheet.prototype._onMatrixAction = function (event, html) {
        event.preventDefault();
        console.log("onMatrixAction ", event.currentTarget.dataset);
        if (!event.currentTarget)
            return;
        if (!event.currentTarget.dataset)
            return;
        var attacker = getSystemData(this.actor);
        var matrixId = event.currentTarget.dataset.matrixId;
        var matrixAction = CONFIG.SR6.MATRIX_ACTIONS[matrixId];
        var roll = new RollTypes_js_1.MatrixActionRoll(attacker, matrixAction);
        console.log("_onMatrixAction before ", roll);
        this.actor.performMatrixAction(roll);
    };
    //-----------------------------------------------------
    Shadowrun6ActorSheet.prototype._onRollComplexFormCheck = function (event, html) {
        console.log("_onRollComplexFormCheck");
        event.preventDefault();
        if (!event.currentTarget)
            return;
        if (!event.currentTarget.dataset)
            return;
        var caster = getSystemData(this.actor);
        var itemId = event.currentTarget.dataset.itemId;
        var item = this.actor.items.get(itemId);
        if (!item) {
            throw new Error("_onRollComplexFormCheck for non-existing item");
        }
        var formRaw = this.actor.items.get(itemId);
        if (!formRaw) {
            console.log("No such item: " + itemId);
            return;
        }
        var cform = getSystemData(formRaw);
        var roll = new RollTypes_js_1.ComplexFormRoll(caster, item, itemId, cform);
        roll.skillSpec = "complex_forms";
        this.actor.rollComplexForm(roll);
    };
    return Shadowrun6ActorSheet;
}(ActorSheet));
exports.Shadowrun6ActorSheet = Shadowrun6ActorSheet;
