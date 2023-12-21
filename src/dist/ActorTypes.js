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
exports.VehicleActor = exports.VehicleSkills = exports.VehicleSkill = exports.CurrentVehicle = exports.VehicleOpMode = exports.Player = exports.MatrixUser = exports.Spirit = exports.Lifeform = exports.SR6Actor = exports.DefensePool = exports.Pool = exports.Ratings = exports.Initiative = exports.Derived = exports.Monitor = exports.Skills = exports.Skill = exports.Attributes = exports.Attribute = void 0;
var ItemTypes_js_1 = require("./ItemTypes.js");
var Attribute = /** @class */ (function () {
    function Attribute() {
        this.base = 0;
        this.mod = 0;
        this.modString = "";
        this.augment = 0;
        this.pool = 0;
    }
    return Attribute;
}());
exports.Attribute = Attribute;
var Attributes = /** @class */ (function () {
    function Attributes() {
        this.bod = new Attribute();
        this.agi = new Attribute();
        this.rea = new Attribute();
        this.str = new Attribute();
        this.wil = new Attribute();
        this.log = new Attribute();
        this.int = new Attribute();
        this.cha = new Attribute();
        this.mag = new Attribute();
        this.res = new Attribute();
    }
    return Attributes;
}());
exports.Attributes = Attributes;
var Skill = /** @class */ (function () {
    function Skill() {
    }
    return Skill;
}());
exports.Skill = Skill;
var Skills = /** @class */ (function () {
    function Skills() {
        this.astral = new Skill();
        this.athletics = new Skill();
        this.biotech = new Skill();
        this.close_combat = new Skill();
        this.con = new Skill();
        this.conjuring = new Skill();
        this.cracking = new Skill();
        this.electronics = new Skill();
        this.enchanting = new Skill();
        this.engineering = new Skill();
        this.exotic_weapons = new Skill();
        this.firearms = new Skill();
        this.influence = new Skill();
        this.outdoors = new Skill();
        this.perception = new Skill();
        this.piloting = new Skill();
        this.sorcery = new Skill();
        this.stealth = new Skill();
        this.tasking = new Skill();
    }
    return Skills;
}());
exports.Skills = Skills;
var Monitor = /** @class */ (function () {
    function Monitor() {
        this.value = 9;
    }
    return Monitor;
}());
exports.Monitor = Monitor;
var Derived = /** @class */ (function () {
    function Derived() {
        this.composure = new Attribute();
        this.judge_intentions = new Attribute();
        this.memory = new Attribute();
        this.lift_carry = new Attribute();
        this.matrix_perception = new Attribute();
        this.resist_damage = new Attribute();
        this.resist_toxin = new Attribute();
    }
    return Derived;
}());
exports.Derived = Derived;
var Initiative = /** @class */ (function () {
    function Initiative() {
    }
    return Initiative;
}());
exports.Initiative = Initiative;
var Ratings = /** @class */ (function () {
    function Ratings() {
        this.astral = new Attribute();
        this.matrix = new Attribute();
        this.physical = new Attribute();
        this.resonance = new Attribute();
        this.social = new Attribute();
        this.vehicle = new Attribute();
    }
    return Ratings;
}());
exports.Ratings = Ratings;
var Pool = /** @class */ (function () {
    function Pool() {
        this.pool = 0;
        this.mod = 0;
    }
    return Pool;
}());
exports.Pool = Pool;
var DefensePool = /** @class */ (function () {
    function DefensePool() {
        this.physical = new Pool();
        this.astral = new Pool();
        this.spells_direct = new Pool();
        this.spells_indirect = new Pool();
        this.spells_other = new Pool();
        this.vehicle = new Pool();
        this.toxin = new Pool();
        this.damage_physical = new Pool();
        this.damage_astral = new Pool();
        this.drain = new Pool();
        this.fading = new Pool();
    }
    return DefensePool;
}());
exports.DefensePool = DefensePool;
var Tradition = /** @class */ (function () {
    function Tradition() {
        this.attribute = "log";
    }
    return Tradition;
}());
var SR6Actor = /** @class */ (function () {
    function SR6Actor() {
        this.attackrating = new Ratings();
        this.defenserating = new Ratings();
    }
    return SR6Actor;
}());
exports.SR6Actor = SR6Actor;
var Lifeform = /** @class */ (function (_super) {
    __extends(Lifeform, _super);
    function Lifeform() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.attributes = new Attributes();
        _this.derived = new Derived();
        _this.physical = new Monitor();
        _this.stun = new Monitor();
        _this.overflow = new Monitor();
        _this.edge = new Monitor();
        _this.defensepool = new DefensePool();
        _this.tradition = new Tradition();
        _this.skills = new Skills();
        _this.essence = 6.0;
        _this.controlRig = 0;
        return _this;
    }
    return Lifeform;
}(SR6Actor));
exports.Lifeform = Lifeform;
var Spirit = /** @class */ (function (_super) {
    __extends(Spirit, _super);
    function Spirit() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Spirit;
}(Lifeform));
exports.Spirit = Spirit;
var MatrixUser = /** @class */ (function (_super) {
    __extends(MatrixUser, _super);
    function MatrixUser() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.persona = new ItemTypes_js_1.Persona();
        return _this;
    }
    return MatrixUser;
}(Lifeform));
exports.MatrixUser = MatrixUser;
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Player;
}(MatrixUser));
exports.Player = Player;
var VehicleOpMode;
(function (VehicleOpMode) {
    VehicleOpMode["MANUAL"] = "manual";
    VehicleOpMode["RIGGED_AR"] = "riggedAR";
    VehicleOpMode["RIGGED_VR"] = "riggedVR";
    VehicleOpMode["RCC"] = "rcc";
    VehicleOpMode["AUTONOMOUS"] = "autonomous";
})(VehicleOpMode = exports.VehicleOpMode || (exports.VehicleOpMode = {}));
var CurrentVehicle = /** @class */ (function () {
    function CurrentVehicle() {
        this.opMode = VehicleOpMode.MANUAL;
    }
    return CurrentVehicle;
}());
exports.CurrentVehicle = CurrentVehicle;
var VehicleSkill = /** @class */ (function () {
    function VehicleSkill() {
    }
    return VehicleSkill;
}());
exports.VehicleSkill = VehicleSkill;
var VehicleSkills = /** @class */ (function () {
    function VehicleSkills() {
    }
    return VehicleSkills;
}());
exports.VehicleSkills = VehicleSkills;
var VehicleActor = /** @class */ (function () {
    function VehicleActor() {
        this.physical = new Monitor();
        this.stun = new Monitor();
        this.edge = new Monitor();
        this.skills = new VehicleSkills();
        this.vehicle = new CurrentVehicle();
    }
    return VehicleActor;
}());
exports.VehicleActor = VehicleActor;
