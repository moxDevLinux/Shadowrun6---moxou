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
exports.Persona = exports.LivingPersona = exports.DevicePersona = exports.MatrixDevice = exports.Armor = exports.Weapon = exports.Spell = exports.Vehicle = exports.Gear = exports.CritterPower = exports.ComplexForm = exports.AdeptPower = exports.GenesisData = void 0;
var ActorTypes_js_1 = require("./ActorTypes.js");
/**
 * Items
 */
var Duration;
(function (Duration) {
    Duration[Duration["instantaneous"] = 0] = "instantaneous";
    Duration[Duration["sustained"] = 1] = "sustained";
})(Duration || (Duration = {}));
var Activation;
(function (Activation) {
    Activation[Activation["MINOR_ACTION"] = 0] = "MINOR_ACTION";
    Activation[Activation["MAJOR_ACTION"] = 1] = "MAJOR_ACTION";
    Activation[Activation["PASSIVE"] = 2] = "PASSIVE";
})(Activation || (Activation = {}));
var EffectRange;
(function (EffectRange) {
    EffectRange[EffectRange["self"] = 0] = "self";
    EffectRange[EffectRange["los"] = 1] = "los";
})(EffectRange || (EffectRange = {}));
var GenesisData = /** @class */ (function () {
    function GenesisData() {
        this.genesisID = "";
        this.description = "";
    }
    return GenesisData;
}());
exports.GenesisData = GenesisData;
var AdeptPower = /** @class */ (function (_super) {
    __extends(AdeptPower, _super);
    function AdeptPower() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hasLevel = false;
        _this.activation = Activation.MAJOR_ACTION;
        _this.cost = 0.0;
        // For AdeptPowerValue
        _this.choice = "";
        _this.level = 0;
        return _this;
    }
    return AdeptPower;
}(GenesisData));
exports.AdeptPower = AdeptPower;
var ComplexForm = /** @class */ (function (_super) {
    __extends(ComplexForm, _super);
    function ComplexForm(skill, attr1, attr2, threshold) {
        if (threshold === void 0) { threshold = 0; }
        var _this = _super.call(this) || this;
        _this.duration = Duration.sustained;
        _this.fading = 3;
        _this.skill = "";
        _this.attrib = "res";
        _this.threshold = 0;
        _this.oppAttr1 = "";
        _this.oppAttr2 = "";
        _this.skill = skill;
        _this.oppAttr1 = attr1;
        _this.oppAttr2 = attr2;
        _this.threshold = threshold;
        return _this;
    }
    return ComplexForm;
}(GenesisData));
exports.ComplexForm = ComplexForm;
var CritterPower = /** @class */ (function (_super) {
    __extends(CritterPower, _super);
    function CritterPower() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.duration = Duration.instantaneous;
        _this.action = Activation.MINOR_ACTION;
        _this.range = EffectRange.self;
        return _this;
    }
    return CritterPower;
}(GenesisData));
exports.CritterPower = CritterPower;
var Gear = /** @class */ (function (_super) {
    __extends(Gear, _super);
    function Gear() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = "";
        _this.subtype = "";
        /** Identifier of skill associated with this item */
        _this.skill = "";
        /** Identifier of a skill specialization */
        _this.skillSpec = "";
        /** Dicepool modifier only used when using this item */
        _this.modifier = 0;
        /** Shall the wild die be used? */
        _this.wild = false;
        /** Amount of dice to use. Calculated when preparing actor */
        _this.pool = 0;
        return _this;
    }
    return Gear;
}(GenesisData));
exports.Gear = Gear;
var Vehicle = /** @class */ (function (_super) {
    __extends(Vehicle, _super);
    function Vehicle() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.vehicle = new ActorTypes_js_1.CurrentVehicle();
        return _this;
    }
    return Vehicle;
}(Gear));
exports.Vehicle = Vehicle;
var Spell = /** @class */ (function (_super) {
    __extends(Spell, _super);
    function Spell() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.category = "health";
        _this.duration = "instantaneous";
        _this.drain = 1;
        _this.type = "physical";
        _this.range = "self";
        _this.damage = "";
        _this.multiSense = false;
        _this.threshold = 0;
        _this.sustained = false;
        return _this;
    }
    return Spell;
}(Gear));
exports.Spell = Spell;
var Weapon = /** @class */ (function (_super) {
    __extends(Weapon, _super);
    function Weapon() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** Is stun damage */
        _this.stun = false;
        /** Damage representation string */
        _this.dmgDef = "";
        /** Attack rating for 5 ranges */
        _this.attackRating = [0, 0, 0, 0, 0];
        return _this;
    }
    return Weapon;
}(Gear));
exports.Weapon = Weapon;
var Armor = /** @class */ (function (_super) {
    __extends(Armor, _super);
    function Armor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Armor;
}(Gear));
exports.Armor = Armor;
var MatrixDevice = /** @class */ (function (_super) {
    __extends(MatrixDevice, _super);
    function MatrixDevice() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MatrixDevice;
}(Gear));
exports.MatrixDevice = MatrixDevice;
var DevicePersona = /** @class */ (function () {
    function DevicePersona() {
        /** Built from devices Commlink/Cyberjack + Cyberdeck */
        this.base = new MatrixDevice();
        /** Final distribution */
        this.mod = new MatrixDevice();
    }
    return DevicePersona;
}());
exports.DevicePersona = DevicePersona;
var LivingPersona = /** @class */ (function () {
    function LivingPersona() {
        /** Defined from attributes */
        this.base = new MatrixDevice();
        /** Resonance distribution */
        this.mod = new MatrixDevice();
    }
    return LivingPersona;
}());
exports.LivingPersona = LivingPersona;
var Persona = /** @class */ (function (_super) {
    __extends(Persona, _super);
    function Persona() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /** */
        _this.device = new DevicePersona();
        /** Calculated living persona */
        _this.living = new LivingPersona();
        /** The decision which (virtual) Matrix persona to use */
        _this.used = new MatrixDevice();
        /** Living persona -  */
        _this.monitor = new ActorTypes_js_1.Monitor();
        _this.initiative = new ActorTypes_js_1.Initiative();
        return _this;
    }
    return Persona;
}(Gear));
exports.Persona = Persona;
