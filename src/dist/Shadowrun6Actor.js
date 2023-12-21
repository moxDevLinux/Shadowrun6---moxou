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
exports.Shadowrun6Actor = void 0;
var ActorTypes_js_1 = require("./ActorTypes.js");
var config_js_1 = require("./config.js");
var ItemTypes_js_1 = require("./ItemTypes.js");
//import { doRoll } from "./dice/CommonRoll.js";
var Rolls_js_1 = require("./Rolls.js");
var RollTypes_js_1 = require("./dice/RollTypes.js");
function isLifeform(obj) {
    return obj.attributes != undefined;
}
function isSpiritOrSprite(obj) {
    return obj.rating != undefined;
}
function isMatrixUser(obj) {
    return obj.persona != undefined;
}
function isGear(obj) {
    return obj.skill != undefined;
}
function isVehicle(obj) {
    return obj.skill != undefined && (obj.type === "VEHICLES" || obj.type === "DRONES");
}
function isSpell(obj) {
    return obj.category != undefined;
}
function isWeapon(obj) {
    return ((obj.type === "WEAPON_FIREARMS" || obj.type === "WEAPON_CLOSE_COMBAT" || obj.type === "WEAPON_RANGED" || obj.type === "WEAPON_SPECIAL") &&
        obj.dmg != undefined);
}
function isArmor(obj) {
    return obj.defense != undefined;
}
function isComplexForm(obj) {
    return obj.fading != undefined;
}
function isMatrixDevice(obj) {
    return obj.d != undefined && (obj.type == "ELECTRONICS" || obj.type == 'CYBERWARE');
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
function getItemData(obj) {
    if (game.release.generation >= 10)
        return obj;
    return obj.data;
}
var Shadowrun6Actor = /** @class */ (function (_super) {
    __extends(Shadowrun6Actor, _super);
    function Shadowrun6Actor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * @Override
     */
    Shadowrun6Actor.prototype.prepareData = function () {
        console.log("Shadowrun6Actor.prepareData() " + this);
        _super.prototype.prepareData.call(this);
        var actorData = getActorData(this);
        var system = getSystemData(this);
        console.log("Shadowrun6Actor.prepareData() " + actorData.name + " = " + actorData.type);
        try {
            if (actorData.type === "Spirit") {
                this._applySpiritPreset();
                this._applyForce();
            }
            this._prepareAttributes();
            this._prepareDerivedAttributes();
            if (actorData.type != "Vehicle" && actorData.type != "Critter") {
                this._preparePersona();
                this._prepareAttackRatings();
                this._prepareDefenseRatings();
                this._prepareSkills();
                this._prepareDefensePools();
                this._prepareItemPools();
                this._prepareVehiclePools();
                this._calculateEssence();
                if (isLifeform(system) && system.mortype) {
                    system.morDef = config_js_1.SR6.MOR_DEFINITIONS[system.mortype];
                }
            }
            if (actorData.type === "Critter") {
                this._prepareAttackRatings();
                this._prepareDefenseRatings();
                this._prepareSkills();
                this._prepareDefensePools();
                //     this._prepareItemPools();
            }
            if (actorData.type === "Vehicle") {
                this._prepareDerivedVehicleAttributes();
                this._prepareVehicleActorSkills();
            }
        }
        catch (err) {
            console.log("Error " + err.stack);
        }
    };
    //---------------------------------------------------------
    /**
     * Apply the force rating as a attribute and skill modifier
     */
    Shadowrun6Actor.prototype._applySpiritPreset = function () {
        var data = getSystemData(this);
        // Only run on spirits
        if (!isSpiritOrSprite(data))
            return;
        switch (data.spiritType) {
            case 'air':
                data.attributes.bod.base = 2;
                data.attributes.agi.base = 3;
                data.attributes.rea.base = 3;
                data.attributes.str.base = 0;
                data.attributes.wil.base = 0;
                data.attributes.log.base = 0;
                data.attributes.int.base = 0;
                data.attributes.cha.base = 0;
                data.attributes.mag.base = 0;
                break;
            case 'beasts':
                data.attributes.bod.base = 2;
                data.attributes.agi.base = 1;
                data.attributes.rea.base = 0;
                data.attributes.str.base = 2;
                data.attributes.wil.base = 0;
                data.attributes.log.base = 0;
                data.attributes.int.base = 0;
                data.attributes.cha.base = 0;
                data.attributes.mag.base = 0;
                break;
            case 'earth':
                data.attributes.bod.base = 4;
                data.attributes.agi.base = 2;
                data.attributes.rea.base = -1;
                data.attributes.str.base = 4;
                data.attributes.wil.base = 0;
                data.attributes.log.base = -1;
                data.attributes.int.base = 0;
                data.attributes.cha.base = 0;
                data.attributes.mag.base = 0;
                break;
            case 'fire':
                data.attributes.bod.base = 1;
                data.attributes.agi.base = 2;
                data.attributes.rea.base = 3;
                data.attributes.str.base = 2;
                data.attributes.wil.base = 0;
                data.attributes.log.base = 0;
                data.attributes.int.base = 1;
                data.attributes.cha.base = 0;
                data.attributes.mag.base = 0;
                break;
            case 'kin':
                data.attributes.bod.base = 1;
                data.attributes.agi.base = 0;
                data.attributes.rea.base = 2;
                data.attributes.str.base = -2;
                data.attributes.wil.base = 0;
                data.attributes.log.base = 0;
                data.attributes.int.base = 1;
                data.attributes.cha.base = 0;
                data.attributes.mag.base = 0;
                break;
            case 'water':
                data.attributes.bod.base = 0;
                data.attributes.agi.base = 1;
                data.attributes.rea.base = 2;
                data.attributes.str.base = 0;
                data.attributes.wil.base = 0;
                data.attributes.log.base = 0;
                data.attributes.int.base = 1;
                data.attributes.cha.base = 0;
                data.attributes.mag.base = 0;
                break;
        }
    };
    //---------------------------------------------------------
    /**
     * Apply the force rating as a attribute and skill modifier
     */
    Shadowrun6Actor.prototype._applyForce = function () {
        var data = getSystemData(this);
        // Only run on spirits
        if (isSpiritOrSprite(data)) {
            var force_1 = parseInt(data.rating);
            data.mortype = "mysticadept";
            config_js_1.SR6.ATTRIBUTES.forEach(function (attr) {
                data.attributes[attr].mod = force_1;
            });
            config_js_1.SR6.ATTRIB_BY_SKILL.forEach(function (skillDef, id) {
                var skill = data.skills[id];
                skill.modifier = 0;
                if (skill.points > 0) {
                    skill.points = force_1;
                }
            });
            // Magic rating
            data.attributes.mag.base = 0;
            data.essence = force_1;
            data.defenserating.physical.base = force_1;
            data.defenserating.astral.base = force_1;
            data.initiative.physical.base = force_1 * 2;
            data.initiative.physical.pool = data.initiative.physical.base + data.initiative.physical.mod;
            data.initiative.physical.dicePool = Math.min(5, data.initiative.physical.dice + data.initiative.physical.diceMod);
            data.initiative.actions = data.initiative.physical.dicePool + 1;
            data.initiative.astral.base = force_1 * 2;
            data.initiative.astral.pool = data.initiative.astral.base + data.initiative.astral.mod;
            data.initiative.astral.dicePool = data.initiative.astral.dice + data.initiative.astral.diceMod;
            data.physical.max = 8 + Math.round(data.attributes.wil.pool / 2) + data.physical.mod;
            data.physical.value = data.physical.max - data.physical.dmg;
            data.stun.max = 0;
            data.stun.value = 0;
            data.stun.dmg = 0;
            data.stun.mod = 0;
        }
    };
    //---------------------------------------------------------
    /*
     * Calculate the final attribute values
     */
    Shadowrun6Actor.prototype._prepareAttributes = function () {
        var data = getSystemData(this);
        // Only run on lifeforms
        if (isLifeform(data)) {
            config_js_1.SR6.ATTRIBUTES.forEach(function (attr) {
                data.attributes[attr].pool = data.attributes[attr].base + parseInt(data.attributes[attr].mod);
                if (data.attributes[attr].pool < 1)
                    data.attributes[attr].pool = 1;
            });
        }
    };
    //---------------------------------------------------------
    /*
     * Calculate the attributes like Initiative
     */
    Shadowrun6Actor.prototype._prepareDerivedAttributes = function () {
        var actorData = getActorData(this);
        var system = getSystemData(this);
        if (!isLifeform(system))
            return;
        var data = system;
        // Don't calculate monitors and initiative for spirits
        if (actorData.type != "Spirit") {
            if (data.physical) {
                data.physical.max = 8 + Math.round(data.attributes["bod"].pool / 2) + data.physical.mod;
                data.physical.value = data.physical.max - data.physical.dmg;
            }
            if (data.stun) {
                data.stun.max = 8 + Math.round(data.attributes["wil"].pool / 2) + data.stun.mod;
                data.stun.value = data.stun.max - data.stun.dmg;
            }
            if (data.initiative) {
                data.initiative.physical.base = data.attributes["rea"].pool + data.attributes["int"].pool;
                data.initiative.physical.pool = data.initiative.physical.base + data.initiative.physical.mod;
                data.initiative.physical.dicePool = Math.min(5, data.initiative.physical.dice + data.initiative.physical.diceMod);
                data.initiative.actions = data.initiative.physical.dicePool + 1;
                data.initiative.astral.base = data.attributes["log"].pool + data.attributes["int"].pool;
                data.initiative.astral.pool = data.initiative.astral.base + data.initiative.astral.mod;
                data.initiative.astral.dicePool = data.initiative.astral.dice + data.initiative.astral.diceMod;
                if (!data.initiative.matrix)
                    data.initiative.matrix = new ActorTypes_js_1.Initiative;
                data.initiative.matrix.base = data.attributes["rea"].pool + data.attributes["int"].pool;
                data.initiative.matrix.pool = data.initiative.matrix.base + data.initiative.matrix.mod;
                data.initiative.matrix.dicePool = data.initiative.matrix.dice + data.initiative.matrix.diceMod;
            }
        }
        if (!data.derived) {
            data.derived = new ActorTypes_js_1.Derived();
        }
        // Composure
        if (data.derived.composure) {
            data.derived.composure.base = data.attributes["wil"].pool + data.attributes["cha"].pool;
            data.derived.composure.pool = data.derived.composure.base + data.derived.composure.mod;
        }
        // Judge Intentions
        if (data.derived.judge_intentions) {
            data.derived.judge_intentions.base = data.attributes["wil"].pool + data.attributes["int"].pool;
            data.derived.judge_intentions.pool = data.derived.judge_intentions.base + data.derived.judge_intentions.mod;
        }
        // Memory
        if (data.derived.memory) {
            data.derived.memory.base = data.attributes["log"].pool + data.attributes["int"].pool;
            data.derived.memory.pool = data.derived.memory.base + data.derived.memory.mod;
        }
        // Lift/Carry
        if (data.derived.lift_carry) {
            data.derived.lift_carry.base = data.attributes["bod"].pool + data.attributes["wil"].pool;
            data.derived.lift_carry.pool = data.derived.lift_carry.base + data.derived.lift_carry.mod;
        }
        // Soak / Damage Resistance
        if (data.derived.resist_damage) {
            data.derived.resist_damage.base = data.attributes["bod"].pool;
            data.derived.resist_damage.pool = data.derived.resist_damage.base + data.derived.resist_damage.mod;
        }
        // Toxin Resistance
        if (data.derived.resist_toxin) {
            data.derived.resist_toxin.base = data.attributes["bod"].pool + data.attributes["wil"].pool;
            data.derived.resist_toxin.pool = data.derived.resist_toxin.base + data.derived.resist_toxin.mod;
        }
        // Matrix perception
        if (data.derived.matrix_perception) {
            data.derived.matrix_perception.base = data.skills["electronics"].points + data.skills["electronics"].modifier + data.attributes["int"].pool;
            data.derived.matrix_perception.pool = data.derived.matrix_perception.base + data.derived.matrix_perception.mod;
        }
    };
    //---------------------------------------------------------
    /*
     * Calculate the attack ratings
     */
    Shadowrun6Actor.prototype._prepareAttackRatings = function () {
        var _a, _b;
        var system = getSystemData(this);
        if (!isLifeform(system))
            return;
        if (!system.attackrating)
            system.attackrating = new ActorTypes_js_1.Ratings();
        if (!system.attackrating.physical)
            system.attackrating.physical = new ActorTypes_js_1.Attribute();
        if (!system.attackrating.astral)
            system.attackrating.astral = new ActorTypes_js_1.Attribute();
        if (!system.attackrating.vehicle)
            system.attackrating.vehicle = new ActorTypes_js_1.Attribute();
        if (!system.attackrating.matrix)
            system.attackrating.matrix = new ActorTypes_js_1.Attribute();
        if (!system.attackrating.social)
            system.attackrating.social = new ActorTypes_js_1.Attribute();
        if (!system.attackrating.resonance)
            system.attackrating.resonance = new ActorTypes_js_1.Attribute();
        /* Physical Attack Rating - used for unarmed combat */
        system.attackrating.physical.base = system.attributes["rea"].pool + system.attributes["str"].pool;
        system.attackrating.physical.modString = game.i18n.localize("attrib.rea_short") + " " + system.attributes["rea"].pool + "\n";
        system.attackrating.physical.modString += game.i18n.localize("attrib.str_short") + " " + system.attributes["str"].pool;
        system.attackrating.physical.pool = system.attackrating.physical.base + system.attackrating.physical.mod;
        if (system.attackrating.physical.mod) {
            system.attackrating.physical.pool += system.attackrating.physical.mod;
            system.attackrating.physical.modString += "\n+" + system.attackrating.physical.mod;
        }
        if (system.tradition) {
            var traditionAttr = system.attributes[system.tradition.attribute];
            system.attackrating.astral.base = system.attributes["mag"].pool + traditionAttr.pool;
            system.attackrating.astral.modString = game.i18n.localize("attrib.mag_short") + " " + system.attributes["mag"].pool + "\n";
            system.attackrating.astral.modString +=
                game.i18n.localize("attrib." + system.tradition.attribute + "_short") + " " + system.attributes[system.tradition.attribute].pool;
            system.attackrating.astral.pool = system.attackrating.astral.base;
        }
        if (system.attackrating.astral.mod) {
            system.attackrating.astral.pool += system.attackrating.astral.mod;
            system.attackrating.astral.modString += "\n+" + system.attackrating.astral.mod;
        }
        if (isMatrixUser(system)) {
            console.log("prepareAttackRatings:", system.persona.used);
            if (system.persona && system.persona.used) {
                // Matrix attack rating (Angriff + Schleicher)
                system.attackrating.matrix.base = system.persona.used.a + system.persona.used.s;
                system.attackrating.matrix.pool = system.attackrating.matrix.base;
                if (system.attackrating.matrix.mod) {
                    system.attackrating.matrix.pool += system.attackrating.matrix.mod;
                    system.attackrating.matrix.modString += "\n+" + system.attackrating.matrix.mod;
                }
                switch (system.matrixIni) {
                    case "ar":
                        system.initiative.matrix.base = system.attributes["rea"].pool + system.attributes["int"].pool;
                        system.initiative.matrix.dice = 1;
                        break;
                    case "vrcold":
                        system.initiative.matrix.base = system.attributes["int"].pool + ((_a = system.persona.used.d) !== null && _a !== void 0 ? _a : system.persona.device.base.d);
                        system.initiative.matrix.dice = 2;
                        break;
                    case "vrhot":
                        system.initiative.matrix.base = system.attributes["int"].pool + ((_b = system.persona.used.d) !== null && _b !== void 0 ? _b : system.persona.device.base.d);
                        system.initiative.matrix.dice = 3;
                        break;
                }
                system.initiative.matrix.pool = system.initiative.matrix.base + system.initiative.matrix.mod;
                system.initiative.matrix.dicePool = system.initiative.matrix.dice + system.initiative.matrix.diceMod;
            }
            // Resonance attack rating (Electronics + Resonance)
            system.attackrating.resonance.base = system.persona.used.a + system.attributes["res"].pool;
            system.attackrating.resonance.modString = game.i18n.localize("skill.electronics") + " + ";
            system.attackrating.resonance.modString += game.i18n.localize("attrib.res_short");
            system.attackrating.resonance.pool = system.attackrating.resonance.base;
            if (system.attackrating.resonance.mod) {
                system.attackrating.resonance.pool += system.attackrating.resonance.mod;
                system.attackrating.resonance.modString += "\n+" + system.attackrating.resonance.mod;
            }
        }
        else {
            system.attackrating.matrix.base = 0;
        }
        // Vehicle combat attack rating (Pilot + Sensor)
        system.attackrating.vehicle.base = 0; //data.attributes["rea"].pool + data.attributes["str"].pool;
        system.attackrating.vehicle.pool = system.attackrating.vehicle.base;
        if (system.attackrating.vehicle.mod) {
            system.attackrating.vehicle.pool += system.attackrating.vehicle.mod;
            system.attackrating.vehicle.modString += "\n+" + system.attackrating.vehicle.mod;
        }
        // Social value
        system.attackrating.social.base = system.attributes["cha"].pool;
        system.attackrating.social.modString = game.i18n.localize("attrib.cha_short") + " " + system.attributes["cha"].pool;
        system.attackrating.social.pool = system.attackrating.social.base;
        if (system.attackrating.social.mod) {
            system.attackrating.social.pool += system.attackrating.social.mod;
            system.attackrating.social.modString += "\n+" + system.attackrating.social.mod;
        }
        /*
        items.forEach(function (item, key) {
            if (item.type == "gear" && item.data.data.type == "ARMOR") {
                if (item.data.data.usedForPool) {
                    data.attackrating.social.pool += item.data.data.social;
                    data.attackrating.social.modString += "\n+" + item.data.data.social + " " + item.name;
                }
            }
        });
        */
    };
    //---------------------------------------------------------
    /*
     * Calculate the attributes like Initiative
     */
    Shadowrun6Actor.prototype._prepareDefenseRatings = function () {
        var actorData = getActorData(this);
        var system = getSystemData(this);
        if (!isLifeform(system))
            return;
        var data = system;
        var items = actorData.items;
        if (!isLifeform(data))
            return;
        if (!data.defenserating)
            data.defenserating = new ActorTypes_js_1.Ratings();
        if (!data.defenserating.physical)
            data.defenserating.physical = new ActorTypes_js_1.Attribute();
        if (!data.defenserating.astral)
            data.defenserating.astral = new ActorTypes_js_1.Attribute();
        if (!data.defenserating.vehicle)
            data.defenserating.vehicle = new ActorTypes_js_1.Attribute();
        if (!data.defenserating.matrix)
            data.defenserating.matrix = new ActorTypes_js_1.Attribute();
        if (!data.defenserating.social)
            data.defenserating.social = new ActorTypes_js_1.Attribute();
        if (!data.defenserating.resonance)
            data.defenserating.resonance = new ActorTypes_js_1.Attribute();
        // Store volatile
        // Physical Defense Rating
        data.defenserating.physical.base = data.attributes["bod"].pool;
        data.defenserating.physical.modString = game.i18n.localize("attrib.bod_short") + " " + data.attributes["bod"].pool;
        data.defenserating.physical.pool = data.defenserating.physical.base;
        if (data.defenserating.physical.mod) {
            data.defenserating.physical.pool += data.defenserating.physical.mod;
            data.defenserating.physical.modString += "<br/>\n+" + data.defenserating.physical.mod;
        }
        items.forEach(function (item) {
            var itemSystem = getSystemData(item);
            if (item.type == "gear" && itemSystem.type == "ARMOR" && isArmor(itemSystem)) {
                if (itemSystem.usedForPool) {
                    data.defenserating.physical.pool += itemSystem.defense;
                    data.defenserating.physical.modString += "\n+" + itemSystem.defense + " " + item.name;
                }
            }
        });
        // Astral Defense Rating
        data.defenserating.astral.base = data.attributes["int"].pool;
        data.defenserating.astral.modString = game.i18n.localize("attrib.int_short") + " " + data.attributes["int"].pool;
        data.defenserating.astral.pool = data.defenserating.astral.base;
        if (data.defenserating.astral.mod) {
            data.defenserating.astral.pool += data.defenserating.astral.mod;
            data.defenserating.astral.modString += "\n+" + data.defenserating.astral.mod;
        }
        // Matrix defense
        if (isMatrixUser(data)) {
            console.log("prepareDefenseRatings:", data.persona.used);
            data.defenserating.matrix.base = data.persona.used.d + data.persona.used.f;
            data.defenserating.matrix.modString = ""; //(game as Game).i18n.localize("attrib.int_short") + " " + data.attributes["int"].pool;
            data.defenserating.matrix.pool = data.defenserating.matrix.base;
            if (data.defenserating.matrix.mod) {
                data.defenserating.matrix.pool += data.defenserating.matrix.mod;
                data.defenserating.matrix.modString += "\n+" + data.defenserating.matrix.mod;
            }
        }
        // Vehicles Defense Rating (Pilot + Armor)
        data.defenserating.vehicle.base = data.skills["piloting"].pool;
        data.defenserating.vehicle.modString = game.i18n.localize("skill.piloting") + " " + data.skills["piloting"].pool;
        //data.defenserating.vehicle.modString += "\n"+(game as Game).i18n.localize("attrib.int_short") + " " + data.attributes["int"].pool;
        data.defenserating.vehicle.pool = data.defenserating.vehicle.base;
        if (data.defenserating.vehicle.mod) {
            data.defenserating.vehicle.pool += data.defenserating.vehicle.mod;
            data.defenserating.vehicle.modString += "\n+" + data.defenserating.vehicle.mod;
        }
        // Social Defense Rating
        data.defenserating.social.base = data.attributes["cha"].pool;
        data.defenserating.social.modString = game.i18n.localize("attrib.cha_short") + " " + data.attributes["cha"].pool;
        data.defenserating.social.pool = data.defenserating.social.base;
        if (data.defenserating.social.mod) {
            data.defenserating.social.pool += data.defenserating.social.mod;
            data.defenserating.social.modString += "\n+" + data.defenserating.social.mod;
        }
        /*
            items.forEach(function (item, key) {
                if (item.type == "gear" && item.data.data.type == "ARMOR") {
                    if (item.data.data.usedForPool) {
                        data.defenserating.social.pool += item.data.data.social;
                        data.defenserating.social.modString += "\n+" + item.data.data.social + " " + item.name;
                    }
                }
            });
            */
    };
    //---------------------------------------------------------
    /*
     * Calculate the final attribute values
     */
    Shadowrun6Actor.prototype._prepareSkills = function () {
        var actorData = getActorData(this);
        var system = getSystemData(this);
        if (!isLifeform(system))
            return;
        var data = system;
        // Only calculate for PCs - ignore for NPCs/Critter
        if (actorData.type === "Player" || actorData.type === "NPC") {
            CONFIG.SR6.ATTRIB_BY_SKILL.forEach(function (skillDef, id) {
                var attr = skillDef.attrib;
                var attribVal = data.attributes[attr].pool;
                data.skills[id].pool = attribVal + data.skills[id].points;
                if (data.skills[id].points == 0 && !skillDef.useUntrained) {
                    data.skills[id].pool--;
                }
                data.skills[id].poolS = attribVal + data.skills[id].points;
                data.skills[id].poolE = attribVal + data.skills[id].points;
                if (data.skills[id].specialization)
                    data.skills[id].poolS = data.skills[id].pool + 2;
                if (data.skills[id].expertise)
                    data.skills[id].poolE = data.skills[id].pool + 3;
                if (data.skills[id].pool < 0) {
                    data.skills[id].pool = 0;
                }
                if (data.skills[id].poolS < 0) {
                    data.skills[id].poolS = 0;
                }
                if (data.skills[id].poolE < 0) {
                    data.skills[id].poolE = 0;
                }
            });
        }
    };
    //---------------------------------------------------------
    /*
     * Calculate the attributes like Initiative
     */
    Shadowrun6Actor.prototype._prepareDefensePools = function () {
        var system = getSystemData(this);
        if (!isLifeform(system))
            return;
        var data = system;
        if (!data.defensepool)
            data.defensepool = new ActorTypes_js_1.DefensePool();
        if (!data.defensepool.physical)
            data.defensepool.physical = new ActorTypes_js_1.Pool();
        if (!data.defensepool.astral)
            data.defensepool.astral = new ActorTypes_js_1.Pool();
        if (!data.defensepool.spells_direct)
            data.defensepool.spells_direct = new ActorTypes_js_1.Pool();
        if (!data.defensepool.spells_indirect)
            data.defensepool.spells_indirect = new ActorTypes_js_1.Pool();
        if (!data.defensepool.spells_other)
            data.defensepool.spells_other = new ActorTypes_js_1.Pool();
        if (!data.defensepool.vehicle)
            data.defensepool.vehicle = new ActorTypes_js_1.Pool();
        if (!data.defensepool.toxin)
            data.defensepool.toxin = new ActorTypes_js_1.Pool();
        if (!data.defensepool.damage_physical)
            data.defensepool.damage_physical = new ActorTypes_js_1.Pool();
        if (!data.defensepool.damage_astral)
            data.defensepool.damage_astral = new ActorTypes_js_1.Pool();
        if (!data.defensepool.drain)
            data.defensepool.drain = new ActorTypes_js_1.Pool();
        if (!data.defensepool.fading)
            data.defensepool.fading = new ActorTypes_js_1.Pool();
        // Physical Defense Test
        data.defensepool.physical.base = data.attributes["rea"].pool + data.attributes["int"].pool;
        data.defensepool.physical.modString = "\n" + game.i18n.localize("attrib.rea_short") + " " + data.attributes["rea"].pool;
        data.defensepool.physical.modString += "\n" + game.i18n.localize("attrib.int_short") + " " + data.attributes["int"].pool;
        data.defensepool.physical.pool = data.defensepool.physical.base;
        if (data.defensepool.physical.mod) {
            data.defensepool.physical.pool += data.defensepool.physical.mod;
            data.defensepool.physical.modString += "\n+" + data.defensepool.physical.mod;
        }
        // Astral(Combat) Defense Test
        data.defensepool.astral.base = data.attributes["log"].pool + data.attributes["int"].pool;
        data.defensepool.astral.modString = "\n" + game.i18n.localize("attrib.log_short") + " " + data.attributes["log"].pool;
        data.defensepool.astral.modString += "\n" + game.i18n.localize("attrib.int_short") + " " + data.attributes["int"].pool;
        data.defensepool.astral.pool = data.defensepool.astral.base;
        if (data.defensepool.astral.mod) {
            data.defensepool.astral.pool += data.defensepool.astral.mod;
            data.defensepool.astral.modString += "\n+" + data.defensepool.astral.mod;
        }
        // Direct combat spell defense test
        data.defensepool.spells_direct.base = data.attributes["wil"].pool + data.attributes["int"].pool;
        data.defensepool.spells_direct.modString = "\n" + game.i18n.localize("attrib.wil_short") + " " + data.attributes["wil"].pool;
        data.defensepool.spells_direct.modString += "\n" + game.i18n.localize("attrib.int_short") + " " + data.attributes["int"].pool;
        data.defensepool.spells_direct.pool = data.defensepool.spells_direct.base;
        if (data.defensepool.spells_direct.mod) {
            data.defensepool.spells_direct.pool += data.defensepool.spells_direct.mod;
            data.defensepool.spells_direct.modString += "\n+" + data.defensepool.spells_direct.mod;
        }
        // Indirect combat spell defense test
        data.defensepool.spells_indirect.base = data.attributes["rea"].pool + data.attributes["wil"].pool;
        data.defensepool.spells_indirect.modString = "\n" + game.i18n.localize("attrib.rea_short") + " " + data.attributes["rea"].pool;
        data.defensepool.spells_indirect.modString += "\n" + game.i18n.localize("attrib.wil_short") + " " + data.attributes["wil"].pool;
        data.defensepool.spells_indirect.pool = data.defensepool.spells_indirect.base;
        if (data.defensepool.spells_indirect.mod) {
            data.defensepool.spells_indirect.pool += data.defensepool.spells_indirect.mod;
            data.defensepool.spells_indirect.modString += "\n+" + data.defensepool.spells_indirect.mod;
        }
        // Other spell defense test
        data.defensepool.spells_other.base = data.attributes["log"].pool + data.attributes["wil"].pool;
        data.defensepool.spells_other.modString = "\n" + game.i18n.localize("attrib.log_short") + " " + data.attributes["log"].pool;
        data.defensepool.spells_other.modString += "\n" + game.i18n.localize("attrib.wil_short") + " " + data.attributes["wil"].pool;
        data.defensepool.spells_other.pool = data.defensepool.spells_other.base;
        if (data.defensepool.spells_other.mod) {
            data.defensepool.spells_other.pool += data.defensepool.spells_other.mod;
            data.defensepool.spells_other.modString += "\n+" + data.defensepool.spells_other.mod;
        }
        // Vehicle combat defense
        data.defensepool.vehicle.base = data.skills["piloting"].pool + data.attributes["rea"].pool;
        data.defensepool.vehicle.modString = "\n" + game.i18n.localize("skill.piloting") + " " + data.skills["piloting"].pool;
        data.defensepool.vehicle.modString += "\n" + game.i18n.localize("attrib.rea_short") + " " + data.attributes["rea"].pool;
        data.defensepool.vehicle.pool = data.defensepool.vehicle.base;
        if (data.defensepool.vehicle.mod) {
            data.defensepool.vehicle.pool += data.defensepool.vehicle.mod;
            data.defensepool.vehicle.modString += "\n+" + data.defensepool.vehicle.mod;
        }
        // Resist toxin
        data.defensepool.toxin.base = data.attributes["bod"].pool + data.attributes["wil"].pool;
        data.defensepool.toxin.modString = "\n" + game.i18n.localize("attrib.bod_short") + " " + data.attributes["bod"].pool;
        data.defensepool.toxin.modString += "\n" + game.i18n.localize("attrib.wil_short") + " " + data.attributes["wil"].pool;
        data.defensepool.toxin.pool = data.defensepool.toxin.base;
        if (data.defensepool.toxin.mod) {
            data.defensepool.toxin.pool += data.defensepool.toxin.mod;
            data.defensepool.toxin.modString += "\n+" + data.defensepool.toxin.mod;
        }
        // Resist physical damage
        data.defensepool.damage_physical.base = data.attributes["bod"].pool;
        data.defensepool.damage_physical.modString = "\n" + game.i18n.localize("attrib.bod_short") + " " + data.attributes["bod"].pool;
        data.defensepool.damage_physical.pool = data.defensepool.damage_physical.base;
        if (data.defensepool.damage_physical.mod) {
            data.defensepool.damage_physical.pool += data.defensepool.damage_physical.mod;
            data.defensepool.damage_physical.modString += "\n+" + data.defensepool.damage_physical.mod;
        }
        // Resist astral damage
        data.defensepool.damage_astral.base = data.attributes["wil"].pool;
        data.defensepool.damage_astral.modString = "\n" + game.i18n.localize("attrib.wil_short") + " " + data.attributes["wil"].pool;
        data.defensepool.damage_astral.pool = data.defensepool.damage_astral.base;
        if (data.defensepool.damage_astral.mod) {
            data.defensepool.damage_astral.pool += data.defensepool.damage_astral.mod;
            data.defensepool.damage_astral.modString += "\n+" + data.defensepool.damage_astral.mod;
        }
        // Resist drain
        if (data.tradition) {
            var traditionAttr = data.attributes[data.tradition.attribute];
            data.defensepool.drain.base = traditionAttr.pool + data.attributes["wil"].pool;
            data.defensepool.drain.modString =
                "\n" + game.i18n.localize("attrib." + data.tradition.attribute + "_short") + " " + traditionAttr.pool;
            data.defensepool.drain.modString += "\n" + game.i18n.localize("attrib.wil_short") + " " + data.attributes["wil"].pool;
            data.defensepool.drain.pool = data.defensepool.drain.base;
            if (data.defensepool.drain.mod) {
                data.defensepool.drain.pool += data.defensepool.drain.mod;
                data.defensepool.drain.modString += "\n+" + data.defensepool.drain.mod;
            }
        }
        // Resist fading
        data.defensepool.fading.base = data.attributes["wil"].pool + data.attributes["log"].pool;
        data.defensepool.fading.modString = "\n" + game.i18n.localize("attrib.wil_short") + " " + data.attributes["wil"].pool;
        data.defensepool.fading.modString += "\n" + game.i18n.localize("attrib.log_short") + " " + data.attributes["log"].pool;
        data.defensepool.fading.pool = data.defensepool.fading.base;
        if (data.defensepool.fading.mod) {
            data.defensepool.fading.pool += data.defensepool.fading.mod;
            data.defensepool.fading.modString += "\n+" + data.defensepool.fading.mod;
        }
    };
    //---------------------------------------------------------
    /*
     * Calculate the pool when using items with assigned skills
     */
    Shadowrun6Actor.prototype._prepareItemPools = function () {
        var _this = this;
        var actorData = getActorData(this);
        var system = getSystemData(this);
        if (!isLifeform(system))
            return;
        var itemUser = system;
        actorData.items.forEach(function (tmpItem) {
            var item = getItemData(tmpItem);
            var system = getSystemData(tmpItem);
            if (item.type == "gear" && system && isGear(system)) {
                var gear = system;
                if (gear.skill && gear.skill != "") {
                    //item.data.pool = tmpItem.actor.data.data.skills[item.data.skill].pool;
                    gear.pool = _this._getSkillPool(gear.skill, gear.skillSpec, itemUser.skills[gear.skill].attrib);
                    gear.pool = gear.pool + +gear.modifier;
                }
            }
            if (tmpItem.type == "gear" && isWeapon(system)) {
                if (system.stun) {
                    if (system.stun === "false") {
                        system.stun = false;
                    }
                    else if (system.stun === "true") {
                        system.stun = true;
                    }
                }
                var suffix = system.stun
                    ? game.i18n.localize("shadowrun6.item.stun_damage")
                    : game.i18n.localize("shadowrun6.item.physical_damage");
                system.dmgDef = system.dmg + suffix;
            }
            if (tmpItem.type == "complexform" && isComplexForm(system)) {
                if (!system.skill) {
                    var cform = CONFIG.SR6.COMPLEX_FORMS[system.genesisID];
                    if (cform && cform.skill) {
                        system.skill = cform.skill;
                        system.oppAttr1 = cform.opposedAttr1;
                        system.oppAttr2 = cform.opposedAttr2;
                        system.threshold = cform.threshold;
                    }
                }
            }
        });
    };
    //---------------------------------------------------------
    /*
     * Calculate the pool when using items with assigned skills
     */
    Shadowrun6Actor.prototype._prepareVehiclePools = function () {
        var _this = this;
        var actorData = getActorData(this);
        var systemRaw = getSystemData(this);
        if (!isLifeform(systemRaw))
            return;
        var system = systemRaw;
        if (!system.controlRig) {
            system.controlRig = 0;
        }
        actorData.items.forEach(function (tmpItem) {
            // Any kind of gear
            if (tmpItem.type == "gear" && isVehicle(getSystemData(tmpItem))) {
                var vehicleData = getSystemData(tmpItem);
                if (!vehicleData.vehicle) {
                    vehicleData.vehicle = new ActorTypes_js_1.CurrentVehicle();
                }
                var current = vehicleData.vehicle;
                //if (!current.attrib)  current.attrib="rea";
                if (!current.ar)
                    current.ar = new ActorTypes_js_1.Pool();
                if (!current.dr)
                    current.dr = new ActorTypes_js_1.Pool();
                if (!current.handling)
                    current.handling = new ActorTypes_js_1.Pool();
                var specialization = vehicleData.vtype;
                if ("GROUND" === specialization) {
                    specialization = "ground_craft";
                }
                if ("WATER" === specialization) {
                    specialization = "watercraft";
                }
                if ("AIR" === specialization) {
                    specialization = "aircraft";
                }
                // Set specialization if none exists
                if (!vehicleData.skillSpec && specialization) {
                    vehicleData.skillSpec = specialization;
                }
                var opMode = current.opMode;
                var rigRating = system.controlRig;
                var modRig = "";
                if (rigRating > 0) {
                    modRig = " + " + game.i18n.localize("shadowrun6.item.vehicle.rigRating.long") + " (" + rigRating + ")";
                }
                switch (opMode) {
                    case "manual":
                        rigRating = 0;
                        modRig = "";
                    case "riggedAR":
                        current.ar.pool = system.skills.piloting.points + vehicleData.sen + +rigRating;
                        current.ar.modString =
                            game.i18n.localize("skill.piloting") +
                                "(" +
                                system.skills.piloting.points +
                                ") +" +
                                game.i18n.localize("shadowrun6.item.vehicle.sensor.long") +
                                " (" +
                                vehicleData.sen +
                                ")" +
                                modRig;
                        current.dr.pool = system.skills.piloting.points + vehicleData.arm + +rigRating;
                        current.dr.modString =
                            game.i18n.localize("skill.piloting") +
                                "(" +
                                system.skills.piloting.points +
                                ") +" +
                                game.i18n.localize("shadowrun6.item.vehicle.armor.long") +
                                " (" +
                                vehicleData.arm +
                                ")" +
                                modRig;
                        current.handling.pool = _this._getSkillPool("piloting", specialization, "rea") + +rigRating;
                        current.handling.modString =
                            game.i18n.localize("skill.piloting") +
                                "(" +
                                system.skills.piloting.points +
                                ") +" +
                                game.i18n.localize("attrib.rea_short") +
                                "(" +
                                system.attributes.rea.pool +
                                ")" +
                                modRig;
                        break;
                    case "riggedVR":
                        //item.data.vehicle.attrib="int";
                        current.ar.pool = system.skills.piloting.points + vehicleData.sen + +rigRating;
                        current.ar.modString =
                            game.i18n.localize("skill.piloting") +
                                "(" +
                                system.skills.piloting.points +
                                ") +" +
                                game.i18n.localize("shadowrun6.item.vehicle.sensor.long") +
                                " (" +
                                vehicleData.sen +
                                ")" +
                                modRig;
                        current.dr.pool = system.skills.piloting.points + vehicleData.arm + +rigRating;
                        current.dr.modString =
                            game.i18n.localize("skill.piloting") +
                                "(" +
                                system.skills.piloting.points +
                                ") +" +
                                game.i18n.localize("shadowrun6.item.vehicle.armor.long") +
                                " (" +
                                vehicleData.arm +
                                ")" +
                                modRig;
                        current.handling.pool = _this._getSkillPool("piloting", specialization, "int") + +rigRating;
                        current.handling.modString =
                            game.i18n.localize("skill.piloting") +
                                "(" +
                                system.skills.piloting.points +
                                ") +" +
                                game.i18n.localize("attrib.int_short") +
                                "(" +
                                system.attributes.int.pool +
                                ")" +
                                modRig;
                        break;
                    default:
                }
            }
        });
    };
    //---------------------------------------------------------
    /*
     * Calculate the attributes like Initiative
     */
    Shadowrun6Actor.prototype._prepareDerivedVehicleAttributes = function () {
        var system = getSystemData(this);
        // Monitors
        if (system.physical) {
            if (!system.physical.mod)
                system.physical.mod = 0;
            var base = 8 + Math.round(system.bod / 2);
            system.physical.max = +base + system.physical.mod;
            system.physical.value = system.physical.max - system.physical.dmg;
        }
        // Use "stun" as matrix condition
        if (system.stun) {
            if (!system.stun.mod)
                system.stun.mod = 0;
            // 8 + (Device Rating / 2) where Dev.Rat. is Sensor
            var base = 8 + Math.round(system.sen / 2);
            system.stun.max = +base + system.stun.mod;
            system.stun.value = system.stun.max - system.stun.dmg;
        }
        // Test modifier depending on speed
        var interval = system.vehicle.offRoad ? system.spdiOff : system.spdiOn;
        if (interval <= 1)
            interval = 1;
        var modifier = Math.floor(system.vehicle.speed / interval);
        // Modify with physical monitor
        modifier += Math.floor(system.physical.dmg / 3);
        system.vehicle.modifier = modifier;
        system.vehicle.kmh = system.vehicle.speed * 1.2;
    };
    //---------------------------------------------------------
    Shadowrun6Actor.prototype._prepareVehicleActorSkills = function () {
        var system = getSystemData(this);
        if (!system.skills)
            system.skills = new ActorTypes_js_1.VehicleSkills();
        if (!system.skills.piloting)
            system.skills.piloting = new ActorTypes_js_1.VehicleSkill();
        if (!system.skills.evasion)
            system.skills.evasion = new ActorTypes_js_1.VehicleSkill();
        var controllerActorId = system.vehicle.belongs;
        if (!controllerActorId) {
            console.log("No actor is controlling this vehicle");
            return;
        }
        console.log("_prepareVehicleActorSkills1 ", game.actors);
        var actor = game.actors.get(controllerActorId);
        if (!controllerActorId) {
            throw new Error("Controlled by unknown actor " + controllerActorId);
        }
        var person = getSystemData(actor);
        console.log("_prepareVehicleActorSkills", system.vehicle.opMode);
        switch (system.vehicle.opMode) {
            case ActorTypes_js_1.VehicleOpMode.MANUAL:
                console.log("  Get MANUAL skills from ", person);
                system.skills.piloting.points = person.skills.piloting.pool;
                system.skills.piloting.pool = system.skills.piloting.points + system.skills.piloting.modifier;
                system.skills.evasion.points = person.skills.piloting.pool;
                system.skills.evasion.pool = system.skills.evasion.points + system.skills.evasion.modifier;
                break;
            case ActorTypes_js_1.VehicleOpMode.RIGGED_AR:
                console.log("  Get RIGGED_AR skills from ", person);
                system.skills.piloting.points = person.skills.piloting.pool;
                system.skills.piloting.pool = system.skills.piloting.points + system.skills.piloting.modifier;
                system.skills.evasion.points = person.skills.piloting.pool;
                system.skills.evasion.pool = system.skills.evasion.points + system.skills.evasion.modifier;
                break;
        }
    };
    //---------------------------------------------------------
    /*
     *
     */
    Shadowrun6Actor.prototype._preparePersona = function () {
        var actorData = getActorData(this);
        var system = getSystemData(this);
        if (!system.persona)
            system.persona = new ItemTypes_js_1.Persona();
        if (!system.persona.used)
            system.persona.used = new ItemTypes_js_1.MatrixDevice();
        if (!system.persona.device)
            system.persona.device = new ItemTypes_js_1.DevicePersona();
        if (!system.persona.device.base)
            system.persona.device.base = new ItemTypes_js_1.MatrixDevice();
        if (!system.persona.device.mod)
            system.persona.device.mod = new ItemTypes_js_1.MatrixDevice();
        if (!system.persona.living)
            system.persona.living = new ItemTypes_js_1.LivingPersona();
        if (!system.persona.living.mod)
            system.persona.living.mod = new ItemTypes_js_1.MatrixDevice();
        if (!system.persona.monitor)
            system.persona.monitor = new ActorTypes_js_1.Monitor();
        if (!system.persona.initiative)
            system.persona.initiative = new ActorTypes_js_1.Initiative();
        actorData.items.forEach(function (tmpItem) {
            var systemItem = getSystemData(tmpItem);
            if (tmpItem.type == "gear" && isMatrixDevice(systemItem)) {
                var item = getSystemData(tmpItem);
                if (item.subtype == "COMMLINK" || item.subtype == "CYBERJACK") {
                    if (item.usedForPool) {
                        system.persona.device.base.d = item.d;
                        system.persona.device.base.f = item.f;
                        if (!system.persona.monitor.max) {
                            system.persona.monitor.max = (item.subtype == "COMMLINK" ? item.devRating : item.devRating) / 2 + 8;
                        }
                    }
                }
                if (item.subtype == "CYBERDECK") {
                    if (item.usedForPool) {
                        system.persona.device.base.a = item.a;
                        system.persona.device.base.s = item.s;
                        system.persona.monitor.max = item.devRating / 2 + 8;
                    }
                }
            }
        });
        console.log("preparePersona: device=", system.persona.device);
        system.persona.used.a = system.persona.device.mod.a;
        system.persona.used.s = system.persona.device.mod.s;
        system.persona.used.d = system.persona.device.mod.d;
        system.persona.used.f = system.persona.device.mod.f;
        // Living persona
        if (system.mortype == "technomancer") {
            if (!system.persona.living)
                system.persona.living = new ItemTypes_js_1.LivingPersona();
            if (!system.persona.living.base)
                system.persona.living.base = new ItemTypes_js_1.MatrixDevice();
            if (!system.persona.living.mod)
                system.persona.living.mod = new ItemTypes_js_1.MatrixDevice();
            system.persona.living.base.a = system.attributes["cha"].pool;
            system.persona.living.base.s = system.attributes["int"].pool;
            system.persona.living.base.d = system.attributes["log"].pool;
            system.persona.living.base.f = system.attributes["wil"].pool;
            system.persona.living.base.devRating = system.attributes["res"].pool;
            // Initiative: Data processing + Intuition
            system.persona.initiative = new ActorTypes_js_1.Initiative();
            system.persona.initiative.base = system.persona.living.base.d + system.attributes["int"].pool;
            system.persona.used.a = system.persona.living.base.a + system.persona.living.mod.a;
            system.persona.used.s = system.persona.living.base.s + system.persona.living.mod.s;
            system.persona.used.d = system.persona.living.base.d + system.persona.living.mod.d;
            system.persona.used.f = system.persona.living.base.f + system.persona.living.mod.f;
        }
        /*
        if (actorData.skills) {
            // Attack pool
            actorData.persona.attackPool = actorData.skills["cracking"].points + actorData.skills["cracking"].modifier;
            if (actorData.skills.expertise=="cybercombat") { actorData.persona.attackPool+=3} else
            if (actorData.skills.specialization=="cybercombat") { actorData.persona.attackPool+=2}
            actorData.persona.attackPool += actorData.attributes["log"].pool;
        }

        // Damage
        actorData.persona.damage = Math.ceil(actorData.persona.used.a/2);
        */
    };
    //---------------------------------------------------------
    /*
     * Calculate the attributes like Initiative
     */
    Shadowrun6Actor.prototype._calculateEssence = function () {
        var data2 = getSystemData(this);
        var actorData = getActorData(this);
        if (!isLifeform(data2))
            return;
        var system = data2;
        var essence = 6.0;
        actorData.items.forEach(function (tmpItem) {
            var item = getItemData(tmpItem);
            var itemSystem = getSystemData(tmpItem);
            if (item.type == "gear" && itemSystem && itemSystem.essence) {
                essence -= itemSystem.essence;
            }
        });
        system.essence = Number(essence.toFixed(2));
    };
    //---------------------------------------------------------
    Shadowrun6Actor.prototype._getWoundModifierPerMonitor = function (monitor) {
        /* Get the penalties for physical and stun damage. Every 3 boxes = -1 penalty */
        var remain = monitor.max - monitor.dmg;
        var modifier = Math.floor(monitor.dmg / 3);
        // In the last row, if the last box is full the modifier is increased by one
        if (remain > 0 && monitor.max % 3 == remain)
            modifier++;
        return modifier;
    };
    //---------------------------------------------------------
    Shadowrun6Actor.prototype.getWoundModifier = function () {
        console.log("Current Wound Penalties");
        var data = getSystemData(this);
        /* Return the combined penalties from physical and stun damage */
        return (this._getWoundModifierPerMonitor(data.physical) + this._getWoundModifierPerMonitor(data.stun));
    };
    //---------------------------------------------------------
    /**
     * Convert skill, optional skill specialization and optional threshold
     * into a roll name for display
     * @param {string} skillId      The skill id (e.g. "con")
     * @param {string} spec         The skill specialization
     * @param {int}    threshold    Optional threshold
     * @return Roll name
     */
    Shadowrun6Actor.prototype._getSkillCheckText = function (roll) {
        // Build test name
        var rollName = game.i18n.localize("skill." + roll.skillId);
        if (roll.skillSpec) {
            rollName += "/" + game.i18n.localize("shadowrun6.special." + roll.skillId + "." + roll.skillSpec);
        }
        rollName += " + ";
        // Attribute
        var useAttrib = roll.attrib != undefined ? roll.attrib : CONFIG.SR6.ATTRIB_BY_SKILL.get(roll.skillId).attrib;
        var attrName = game.i18n.localize("attrib." + useAttrib);
        rollName += attrName;
        if (roll.threshold && roll.threshold > 0) {
            rollName += " (" + roll.threshold + ")";
        }
        return rollName;
    };
    //---------------------------------------------------------
    Shadowrun6Actor.prototype._getVehicleCheckText = function (roll) {
        // Build test name
        var rollName = game.i18n.localize("skill." + roll.skillId);
        if (roll.threshold && roll.threshold > 0) {
            rollName += " (" + roll.threshold + ")";
        }
        return rollName;
    };
    //---------------------------------------------------------
    /**
     * Calculate the skill pool
     * @param {string} skillId      The skill id (e.g. "con")
     * @param {string} spec         Optional: The skill specialization
     * @return Roll name
     */
    Shadowrun6Actor.prototype._getSkillPool = function (skillId, spec, attrib) {
        if (attrib === void 0) { attrib = undefined; }
        var system = getSystemData(this);
        if (!skillId)
            throw "Skill ID may not be undefined";
        var skl = system.skills[skillId];
        if (!skillId) {
            throw "Unknown skill '" + skillId + "'";
        }
        var skillDef = CONFIG.SR6.ATTRIB_BY_SKILL.get(skillId);
        if (!attrib) {
            attrib = skillDef.attrib;
        }
        // Calculate pool
        var value = skl.points + skl.modifier;
        if (skl.points == 0) {
            if (skillDef.useUntrained) {
                value -= 1;
            }
            else
                return 0;
        }
        if (spec) {
            if (spec == skl.expertise) {
                value += 3;
            }
            else if (spec == skl.specialization) {
                value += 2;
            }
        }
        // Add attribute
        value = parseInt("" + value);
        value += parseInt(system.attributes[attrib].pool);
        return value;
    };
    //---------------------------------------------------------
    /**
     * Return a translated complex form name
     * @param {Object} spell      The spell to cast
     * @return Roll name
     */
    Shadowrun6Actor.prototype._getComplexFormName = function (complex, item) {
        if (complex.genesisID) {
            var key = "shadowrun6.compendium.complexform." + complex.genesisID;
            var name = game.i18n.localize(key);
            if (key != name)
                return name;
        }
        if (item)
            return item.name;
        throw new Error("Spell: No genesisID and no item");
    };
    //---------------------------------------------------------
    /**
     * Return a translated spell name
     * @param {Object} spell      The spell to cast
     * @return Roll name
     */
    Shadowrun6Actor.prototype._getSpellName = function (spell, item) {
        if (spell.genesisID) {
            var key = "shadowrun6.compendium.spell." + spell.genesisID;
            var name = game.i18n.localize(key);
            if (key != name)
                return name;
        }
        if (item)
            return item.name;
        throw new Error("Spell: No genesisID and no item");
    };
    //---------------------------------------------------------
    /**
     * Return a translated gear name
     * @param {Object} item   The gear to use
     * @return Display name
     */
    Shadowrun6Actor.prototype._getGearName = function (gear, item) {
        if (gear.genesisID) {
            var key = "shadowrun6.compendium.gear." + gear.genesisID;
            var name = game.i18n.localize(key);
            if (key != name)
                return name;
        }
        if (item)
            return item.name;
        throw new Error("Gear: No genesisID and no item");
    };
    //---------------------------------------------------------
    /**
     * @param {Function} func   function to return value from actor
     * @return Value
     */
    Shadowrun6Actor.prototype._getHighestDefenseRating = function (map) {
        var highest = 0;
        for (var it = game.user.targets.values(), val = null; (val = it.next().value);) {
            //console.log("_getHighestDefenseRating: Target Token: val = ", val);
            var token = val;
            var actor = token.actor;
            var here = map(actor);
            console.log("Defense Rating of ", token.data._id, " is ", here);
            if (here > highest)
                highest = here;
        }
        return highest;
    };
    //---------------------------------------------------------
    /**
     * @param roll	Skill roll to manipulate
     */
    Shadowrun6Actor.prototype.updateSkillRoll = function (roll, attrib) {
        // Prepare check text
        roll.checkText = this._getSkillCheckText(roll);
        // Calculate pool
        roll.pool = this._getSkillPool(roll.skillId, roll.skillSpec, attrib);
        roll.calcPool = roll.pool;
        console.log("updateSkillRoll()", roll);
    };
    //---------------------------------------------------------
    /**
     * Roll a simple skill test
     * Prompt the user for input regarding Advantage/Disadvantage and any Situational Bonus
     * @param {string} skillId      The skill id (e.g. "con")
     * @param {string} spec         The skill specialization
     * @param {int}    threshold    Optional threshold
     * @return {Promise<Roll>}      A Promise which resolves to the created Roll instance
     */
    Shadowrun6Actor.prototype.rollSkill = function (roll) {
        console.log("rollSkill(", roll, ")");
        roll.actor = this;
        // Prepare check text
        roll.checkText = this._getSkillCheckText(roll);
        // Find attribute
        var skillDef = CONFIG.SR6.ATTRIB_BY_SKILL.get(roll.skillId);
        if (!roll.attrib)
            roll.attrib = skillDef.attrib;
        roll.actionText = roll.checkText; // (game as Game).i18n.format("shadowrun6.roll.actionText.skill");
        // Calculate pool
        roll.pool = this._getSkillPool(roll.skillId, roll.skillSpec);
        console.log("rollSkill(", roll, ")");
        roll.allowBuyHits = true;
        roll.speaker = ChatMessage.getSpeaker({ actor: this });
        return Rolls_js_1.doRoll(roll);
    };
    //-------------------------------------------------------------
    /*
     *
     */
    Shadowrun6Actor.prototype.rollItem = function (roll) {
        console.log("rollItem(", roll, ")");
        roll.actor = this;
        // Prepare check text
        roll.checkText = this._getSkillCheckText(roll);
        // Calculate pool
        if (roll.pool == 0) {
            roll.pool = this._getSkillPool(roll.skillId, roll.skillSpec);
        }
        console.log("rollItem(", roll, ")");
        var item = roll.gear;
        roll.allowBuyHits = true;
        // If present, replace item name, description and source references from compendium
        roll.itemName = roll.item.name;
        if (roll.gear.description) {
            roll.itemDesc = roll.gear.description;
        }
        if (roll.gear.genesisID) {
            var key = "item." + roll.gear.genesisID + ".";
            if (!game.i18n.localize(key + "name").startsWith(key)) {
                // A translation exists
                roll.itemName = game.i18n.localize(key + "name");
                roll.itemDesc = game.i18n.localize(key + "desc");
                roll.itemSrc = game.i18n.localize(key + "src");
            }
        }
        switch (game.user.targets.size) {
            case 0:
                roll.actionText = game.i18n.format("shadowrun6.roll.actionText.attack_target_none", { name: roll.itemName });
                break;
            case 1:
                var targetName = game.user.targets.values().next().value.name;
                roll.actionText = game.i18n.format("shadowrun6.roll.actionText.attack_target_one", { name: roll.itemName, target: targetName });
                break;
            default:
                roll.actionText = game.i18n.format("shadowrun6.roll.actionText.attack_target_multiple", { name: roll.itemName });
        }
        // Prepare check text
        var checkText = this._getSkillCheckText(roll);
        roll.targets = Array.from(game.user.targets.values(), function (token) { return new RollTypes_js_1.TokenData(token); });
        console.log("ääääääääääääääääää targets ", roll.targets);
        var highestDefenseRating = this._getHighestDefenseRating(function (a) {
            console.log("Determine defense rating of ", a);
            return a.data.data.defenserating.physical.pool;
        });
        console.log("Highest defense rating of targets: " + highestDefenseRating);
        if (highestDefenseRating > 0)
            roll.defenseRating = highestDefenseRating;
        roll.speaker = ChatMessage.getSpeaker({ actor: this });
        return Rolls_js_1.doRoll(roll);
    };
    //-------------------------------------------------------------
    /**
     * Roll a spell test. Some spells are opposed, some are simple tests.
     * @param {string} itemId       The item id of the spell
     * @param {boolean} ritual      TRUE if ritual spellcasting is used
     * @return {Promise<Roll>}      A Promise which resolves to the created Roll instance
     */
    Shadowrun6Actor.prototype.rollSpell = function (roll, ritual) {
        console.log("rollSpell( roll=" + roll + ", ritual=" + ritual + ")");
        roll.skillSpec = ritual ? "ritual_spellcasting" : "spellcasting";
        roll.threshold = 0;
        // If present, replace spell name, description and source references from compendium
        roll.spellName = this._getSpellName(roll.spell, roll.item);
        if (roll.spell.description) {
            roll.spellDesc = roll.spell.description;
        }
        if (roll.spell.genesisID) {
            var key = (ritual ? "ritual." : "spell.") + roll.spell.genesisID + ".";
            if (!game.i18n.localize(key + "name").startsWith(key)) {
                // A translation exists
                roll.spellName = game.i18n.localize(key + "name");
                roll.spellDesc = game.i18n.localize(key + "desc");
                roll.spellSrc = game.i18n.localize(key + "src");
            }
        }
        // Prepare action text
        switch (game.user.targets.size) {
            case 0:
                roll.actionText = game.i18n.format("shadowrun6.roll.actionText.cast_target_none", { name: roll.spellName });
                break;
            case 1:
                var targetName = game.user.targets.values().next().value.name;
                roll.actionText = game.i18n.format("shadowrun6.roll.actionText.cast_target_one", { name: roll.spellName, target: targetName });
                break;
            default:
                roll.actionText = game.i18n.format("shadowrun6.roll.actionText.cast_target_multiple", { name: roll.spellName });
        }
        roll.actor = this;
        // Prepare check text
        roll.checkText = this._getSkillCheckText(roll);
        // Calculate pool
        roll.pool = this._getSkillPool(roll.skillId, roll.skillSpec);
        // Determine whether or not the spell is an opposed test
        // and what defense eventually applies
        var hasDamageResist = !ritual;
        roll.attackRating = roll.performer.attackrating.astral.pool;
        var highestDefenseRating = this._getHighestDefenseRating(function (a) { return a.data.data.defenserating.physical.pool; });
        console.log("Highest defense rating of targets: " + highestDefenseRating);
        if (highestDefenseRating > 0)
            roll.defenseRating = highestDefenseRating;
        roll.canAmpUpSpell = roll.spell.category === "combat";
        roll.canIncreaseArea = roll.spell.range === "line_of_sight_area" || roll.spell.range === "self_area";
        if (roll.spell.category === "combat") {
            if (roll.spell.type == "mana") {
                roll.defendWith = config_js_1.Defense.SPELL_DIRECT;
                hasDamageResist = false;
            }
            else {
                roll.defendWith = config_js_1.Defense.SPELL_INDIRECT;
            }
        }
        else if (roll.spell.category === "manipulation") {
            roll.defendWith = config_js_1.Defense.SPELL_OTHER;
        }
        else if (roll.spell.category === "heal") {
            if (roll.spell.withEssence && isLifeform(this.data.data)) {
                roll.threshold = 5 - Math.ceil(this.data.data.essence);
            }
        }
        roll.speaker = ChatMessage.getSpeaker({ actor: this });
        return Rolls_js_1.doRoll(roll);
    };
    //-------------------------------------------------------------
    /**
     */
    Shadowrun6Actor.prototype.rollDefense = function (defendWith, threshold, damage) {
        console.log("ToDo rollDefense(" + defendWith + ", " + threshold + "," + damage + ")");
        var data = getSystemData(this);
        if (!isLifeform(data)) {
            throw "Can only roll defenses for lifeforms";
        }
        var defensePool = undefined;
        var rollData = new RollTypes_js_1.DefenseRoll(threshold);
        var gameI18n = game.i18n;
        switch (defendWith) {
            case config_js_1.Defense.PHYSICAL:
                defensePool = data.defensepool.physical;
                rollData.actionText = gameI18n.format("shadowrun6.roll.actionText.defense." + defendWith, { threshold: 0 });
                rollData.checkText = gameI18n.localize("attrib.rea") + " + " + gameI18n.localize("attrib.int") + " (" + threshold + ")";
                break;
            case config_js_1.Defense.SPELL_INDIRECT:
                defensePool = data.defensepool.spells_indirect;
                rollData.actionText = gameI18n.localize("shadowrun6.roll.actionText.defense." + defendWith);
                rollData.checkText = gameI18n.localize("attrib.rea") + " + " + gameI18n.localize("attrib.wil") + " (" + threshold + ")";
                break;
            case config_js_1.Defense.SPELL_DIRECT:
                defensePool = data.defensepool.spells_direct;
                rollData.actionText = gameI18n.localize("shadowrun6.roll.actionText.defense." + defendWith);
                rollData.checkText = gameI18n.localize("attrib.wil") + " + " + gameI18n.localize("attrib.int") + " (" + threshold + ")";
                break;
            case config_js_1.Defense.SPELL_OTHER:
                defensePool = data.defensepool.spells_other;
                rollData.actionText = gameI18n.localize("shadowrun6.roll.actionText.defense." + defendWith);
                rollData.checkText = gameI18n.localize("attrib.wil") + " + " + gameI18n.localize("attrib.int");
                break;
            default:
                console.log("Error! Don't know how to handle defense pool for " + defendWith);
                throw "Error! Don't know how to handle defense pool for " + defendWith;
        }
        console.log("Defend with pool ", defensePool);
        // Prepare action text
        console.log("before ", rollData);
        rollData.threshold = threshold;
        console.log("after ", rollData);
        rollData.damage = damage;
        rollData.actor = this;
        rollData.allowBuyHits = false;
        rollData.pool = defensePool.pool;
        rollData.rollType = RollTypes_js_1.RollType.Defense;
        rollData.performer = data;
        rollData.speaker = ChatMessage.getSpeaker({ actor: this });
        console.log("Defend roll config ", rollData);
        return Rolls_js_1.doRoll(rollData);
    };
    //-------------------------------------------------------------
    /**
     */
    Shadowrun6Actor.prototype.rollSoak = function (soak, damage) {
        console.log("rollSoak: " + damage + " " + soak);
        var data = this.data.data;
        if (!isLifeform(data)) {
            throw "Can only roll defenses for lifeforms";
        }
        var defensePool = undefined;
        var rollData = new RollTypes_js_1.SoakRoll(damage);
        var gameI18n = game.i18n;
        switch (soak) {
            case RollTypes_js_1.SoakType.DAMAGE_PHYSICAL:
                defensePool = data.defensepool.physical;
                rollData.monitor = config_js_1.MonitorType.PHYSICAL;
                rollData.actionText = gameI18n.format("shadowrun6.roll.actionText.soak." + soak, { damage: damage });
                rollData.checkText = gameI18n.localize("attrib.bod") + " + ? (" + damage + ")";
                break;
            case RollTypes_js_1.SoakType.DAMAGE_STUN:
                defensePool = data.defensepool.physical;
                rollData.monitor = config_js_1.MonitorType.STUN;
                rollData.actionText = gameI18n.format("shadowrun6.roll.actionText.soak." + soak, { damage: damage });
                rollData.checkText = gameI18n.localize("attrib.bod") + " + ? (" + damage + ")";
                break;
            case RollTypes_js_1.SoakType.DRAIN:
                defensePool = data.defensepool.drain;
                rollData.monitor = config_js_1.MonitorType.STUN;
                rollData.actionText = gameI18n.format("shadowrun6.roll.actionText.soak." + soak, { damage: damage });
                rollData.checkText = gameI18n.localize("attrib.wil") + " + ? (" + damage + ")";
                if (data.tradition != null) {
                    rollData.checkText =
                        gameI18n.localize("attrib.wil") + " + " + gameI18n.localize("attrib." + data.tradition.attribute) + " (" + damage + ")";
                }
                break;
            default:
                console.log("Error! Don't know how to handle soak pool for " + soak);
                throw "Error! Don't know how to handle soak pool for " + soak;
        }
        console.log("Defend with pool ", defensePool);
        // Prepare action text
        console.log("before ", rollData);
        rollData.threshold = damage;
        console.log("after ", rollData);
        rollData.actor = this;
        rollData.allowBuyHits = false;
        rollData.pool = defensePool.pool;
        rollData.performer = data;
        rollData.speaker = ChatMessage.getSpeaker({ actor: this });
        console.log("Soak roll config ", rollData);
        return Rolls_js_1.doRoll(rollData);
    };
    //---------------------------------------------------------
    /**
     */
    Shadowrun6Actor.prototype.rollVehicle = function (roll) {
        console.log("rollVehicle(", roll, ")");
        roll.actor = this;
        // Prepare check text
        roll.checkText = this._getVehicleCheckText(roll);
        roll.actionText = roll.checkText; // (game as Game).i18n.format("shadowrun6.roll.actionText.skill");
        // Calculate pool
        roll.pool = roll.skillValue.pool;
        console.log("rollVehicle(", roll, ")");
        roll.allowBuyHits = true;
        roll.speaker = ChatMessage.getSpeaker({ actor: this });
        return Rolls_js_1.doRoll(roll);
    };
    //---------------------------------------------------------
    /**
     */
    Shadowrun6Actor.prototype.performMatrixAction = function (roll) {
        console.log("ToDo performMatrixAction:", roll);
        if (!isLifeform(this.data.data)) {
            throw new Error("Must be executed by an Actor with Lifeform data");
        }
        var action = roll.action;
        roll.attrib = action.attrib;
        roll.skillId = action.skill;
        roll.skillSpec = action.spec;
        roll.threshold = action.threshold;
        // Prepare action text
        roll.actionText = game.i18n.localize("shadowrun6.matrixaction." + action.id);
        // Prepare check text
        if (!action.skill) {
            console.log("ToDo: matrix actions without a test");
            return;
        }
        roll.checkText = this._getSkillCheckText(roll);
        // Calculate pool
        roll.pool = this._getSkillPool(action.skill, action.spec, action.attrib);
        /*
        // Roll and return
        let data = mergeObject(options, {
            pool: value,
            actionText: actionText,
            checkText  : checkText,
            attackRating : this.data.data.attackrating.matrix.pool,
            matrixAction: action,
            skill: action.skill,
            spec: action.spec,
            threshold: action.threshold,
            isOpposed: action.opposedAttr1!=null,
            rollType: "matrixaction",
            isAllowDefense: action.opposedAttr1!=null,
            useThreshold: action.threshold!=0,
            buyHits: true
        });
        */
        roll.speaker = ChatMessage.getSpeaker({ actor: this });
        return Rolls_js_1.doRoll(roll);
    };
    //-------------------------------------------------------------
    /**
     * Roll a complex form test. Some complex forms are opposed, some are simple tests.
     * @param {string} itemId       The item id of the spell
     * @return {Promise<Roll>}      A Promise which resolves to the created Roll instance
     */
    Shadowrun6Actor.prototype.rollComplexForm = function (roll) {
        console.log("rollComplexForm( roll=" + roll + ")");
        roll.threshold = 0;
        // If present, replace spell name, description and source references from compendium
        roll.formName = this._getComplexFormName(roll.form, roll.item);
        if (roll.form.description) {
            roll.formDesc = roll.form.description;
        }
        if (roll.form.genesisID) {
            var key = "complex_form." + roll.form.genesisID + ".";
            if (!game.i18n.localize(key + "name").startsWith(key)) {
                // A translation exists
                roll.formName = game.i18n.localize(key + "name");
                roll.formDesc = game.i18n.localize(key + "desc");
                roll.formSrc = game.i18n.localize(key + "src");
            }
        }
        // Prepare action text
        switch (game.user.targets.size) {
            case 0:
                roll.actionText = game.i18n.format("shadowrun6.roll.actionText.cast_target_none", { name: roll.formName });
                break;
            case 1:
                var targetName = game.user.targets.values().next().value.name;
                roll.actionText = game.i18n.format("shadowrun6.roll.actionText.cast_target_one", { name: roll.formName, target: targetName });
                break;
            default:
                roll.actionText = game.i18n.format("shadowrun6.roll.actionText.cast_target_multiple", { name: roll.formName });
        }
        roll.actor = this;
        // Prepare check text
        roll.checkText = this._getSkillCheckText(roll);
        // Calculate pool
        roll.pool = this._getSkillPool(roll.skillId, roll.skillSpec);
        // Determine whether or not the spell is an opposed test
        // and what defense eventually applies
        var hasDamageResist = true;
        roll.attackRating = roll.performer.attackrating.astral.pool;
        var highestDefenseRating = this._getHighestDefenseRating(function (a) { return a.data.data.defenserating.physical.pool; });
        console.log("Highest defense rating of targets: " + highestDefenseRating);
        if (highestDefenseRating > 0)
            roll.defenseRating = highestDefenseRating;
        roll.speaker = ChatMessage.getSpeaker({ actor: this });
        return Rolls_js_1.doRoll(roll);
    };
    //-------------------------------------------------------------
    Shadowrun6Actor.prototype.applyDamage = function (monitor, damage) {
        var _a, _b;
        console.log("ToDo: applyDamage(" + monitor + ", " + damage + ")");
        var data = this.data.data;
        var damageObj = data[monitor];
        console.log("damageObj = ", damageObj);
        var newDmg = damageObj.dmg + damage;
        // Did damage overflow the monitor?
        var overflow = Math.max(0, newDmg - damageObj.max);
        console.log("newDmg=", newDmg, "   overflow=", overflow);
        // Ensure actual damage is not higher than pool
        newDmg = Math.min(Math.max(0, newDmg), damageObj.max);
        this.data.updateSource((_a = {}, _a["data.overflow.dmg"] = overflow, _a));
        this.data.updateSource((_b = {}, _b["data." + monitor + ".dmg"] = newDmg, _b));
        console.log("Added " + damage + " to monitor " + monitor + " of " + this.data.name + " which results in overflow " + overflow + " on " + this.name);
        this._prepareDerivedAttributes();
        console.log("ToDo: update tokens ", this.data.token);
    };
    //-------------------------------------------------------------
    /*
     *
     */
    Shadowrun6Actor.prototype.rollCommonCheck = function (roll, dialogConfig, options) {
        if (options === void 0) { options = {}; }
        console.log("rollCommonCheck");
        roll.actor = this;
        roll.speaker = ChatMessage.getSpeaker({ actor: this });
        return Rolls_js_1.doRoll(roll);
    };
    /***************************************
     *
     **************************************/
    Shadowrun6Actor.prototype.getMaxEdgeGainThisRound = function () {
        return 2;
    };
    //-------------------------------------------------------------
    Shadowrun6Actor.prototype.importFromJSON = function (json) {
        return __awaiter(this, void 0, void 0, function () {
            var data, newData;
            return __generator(this, function (_a) {
                console.log("importFromJSON");
                data = JSON.parse(json);
                // If Genesis-JSON-Export
                if (data.jsonExporterVersion && data.system === "SHADOWRUN6") {
                    newData = this.toObject();
                    newData.data.sex = data.gender;
                }
                return [2 /*return*/, _super.prototype.importFromJSON.call(this, json)];
            });
        });
    };
    return Shadowrun6Actor;
}(Actor));
exports.Shadowrun6Actor = Shadowrun6Actor;
