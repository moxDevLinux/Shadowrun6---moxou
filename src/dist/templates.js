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
exports.preloadHandlebarsTemplates = void 0;
/**
 * Define a set of template paths to pre-load
 * Pre-loaded templates are compiled and cached for fast access when rendering
 * @return {Promise}
 */
exports.preloadHandlebarsTemplates = function () {
    return __awaiter(this, void 0, void 0, function () {
        var templatePaths;
        return __generator(this, function (_a) {
            templatePaths = [
                "systems/shadowrun6-eden/templates/combat-tracker.html",
                "systems/shadowrun6-eden/templates/combat-trackerv9.html",
                "systems/shadowrun6-eden/templates/dialog/partRollDialogEdge.html",
                "systems/shadowrun6-eden/templates/dialog/partRollDialogOpposed.html",
                "systems/shadowrun6-eden/templates/dialog/partRollDialogSpell.html",
                "systems/shadowrun6-eden/templates/dialog/partRollDialogWeapon.html",
                "systems/shadowrun6-eden/templates/parts/npc_edit_critter.html",
                "systems/shadowrun6-eden/templates/parts/npc_edit_grunt.html",
                "systems/shadowrun6-eden/templates/parts/npc_edit_spirit.html",
                "systems/shadowrun6-eden/templates/parts/npc_full_edit_sheet.html",
                "systems/shadowrun6-eden/templates/parts/npc_usage_sheet.html",
                "systems/shadowrun6-eden/templates/parts/npc_usage_spirit.html",
                "systems/shadowrun6-eden/templates/parts/attributes.html",
                "systems/shadowrun6-eden/templates/parts/edge-token.html",
                "systems/shadowrun6-eden/templates/parts/initiatives.html",
                "systems/shadowrun6-eden/templates/parts/nuyen-token.html",
                "systems/shadowrun6-eden/templates/parts/attributes-augmented.html",
                "systems/shadowrun6-eden/templates/parts/monitors.html",
                "systems/shadowrun6-eden/templates/parts/npc-attributes.html",
                "systems/shadowrun6-eden/templates/parts/npc-attributes-ro.html",
                "systems/shadowrun6-eden/templates/parts/npc-augmentations.html",
                "systems/shadowrun6-eden/templates/parts/npc-complex-forms.html",
                "systems/shadowrun6-eden/templates/parts/npc-critterpowers.html",
                "systems/shadowrun6-eden/templates/parts/npc-gear.html",
                "systems/shadowrun6-eden/templates/parts/npc-metamagics.html",
                "systems/shadowrun6-eden/templates/parts/npc-powers.html",
                "systems/shadowrun6-eden/templates/parts/npc-skills.html",
                "systems/shadowrun6-eden/templates/parts/npc-spells.html",
                "systems/shadowrun6-eden/templates/parts/npc-echoes.html",
                "systems/shadowrun6-eden/templates/parts/npc-weapons.html",
                "systems/shadowrun6-eden/templates/parts/tab-combat.html",
                "systems/shadowrun6-eden/templates/parts/tab-magic.html",
                "systems/shadowrun6-eden/templates/parts/tab-matrix.html",
                "systems/shadowrun6-eden/templates/parts/tab-biography.html",
                "systems/shadowrun6-eden/templates/parts/tab-vehicles.html",
                "systems/shadowrun6-eden/templates/parts/pc-derived.html",
                "systems/shadowrun6-eden/templates/parts/pc-skills.html",
                "systems/shadowrun6-eden/templates/parts/pc-skillvalues.html",
                "systems/shadowrun6-eden/templates/parts/programs.html",
                "systems/shadowrun6-eden/templates/parts/section-adeptpowers.html",
                "systems/shadowrun6-eden/templates/parts/section-ammo.html",
                "systems/shadowrun6-eden/templates/parts/section-armor.html",
                "systems/shadowrun6-eden/templates/parts/section-bodyware.html",
                "systems/shadowrun6-eden/templates/parts/section-complexforms.html",
                "systems/shadowrun6-eden/templates/parts/section-drones.html",
                "systems/shadowrun6-eden/templates/parts/section-echoes.html",
                "systems/shadowrun6-eden/templates/parts/section-gear.html",
                "systems/shadowrun6-eden/templates/parts/section-magicbase.html",
                "systems/shadowrun6-eden/templates/parts/section-martialart.html",
                "systems/shadowrun6-eden/templates/parts/section-matrixactions.html",
                "systems/shadowrun6-eden/templates/parts/section-matrixbase.html",
                "systems/shadowrun6-eden/templates/parts/section-matrixdevices.html",
                "systems/shadowrun6-eden/templates/parts/section-metamagics.html",
                "systems/shadowrun6-eden/templates/parts/section-notes.html",
                "systems/shadowrun6-eden/templates/parts/section-rituals.html",
                "systems/shadowrun6-eden/templates/parts/section-focus.html",
                "systems/shadowrun6-eden/templates/parts/section-qualities.html",
                "systems/shadowrun6-eden/templates/parts/section-riggingbase.html",
                "systems/shadowrun6-eden/templates/parts/section-skills-action.html",
                "systems/shadowrun6-eden/templates/parts/section-skills-knowledge.html",
                "systems/shadowrun6-eden/templates/parts/section-skills-language.html",
                "systems/shadowrun6-eden/templates/parts/section-soakresist.html",
                "systems/shadowrun6-eden/templates/parts/section-spells.html",
                "systems/shadowrun6-eden/templates/parts/section-weapons.html",
                "systems/shadowrun6-eden/templates/parts/section-sins.html",
                "systems/shadowrun6-eden/templates/parts/section-contacts.html",
                "systems/shadowrun6-eden/templates/parts/section-lifestyles.html",
                "systems/shadowrun6-eden/templates/parts/section-vehicles.html",
                "systems/shadowrun6-eden/templates/parts/vehicle-accessories.html",
                "systems/shadowrun6-eden/templates/parts/vehicle-brain.html",
                "systems/shadowrun6-eden/templates/parts/vehicle-monitor.html",
                "systems/shadowrun6-eden/templates/parts/vehicle-piloting.html",
                "systems/shadowrun6-eden/templates/parts/vehicle-software.html",
                "systems/shadowrun6-eden/templates/parts/vehicle-speed.html",
                "systems/shadowrun6-eden/templates/parts/vehicle-stats.html",
                "systems/shadowrun6-eden/templates/parts/vehicle-weapons.html"
            ];
            console.log("Load templates");
            return [2 /*return*/, loadTemplates(templatePaths)];
        });
    });
};
