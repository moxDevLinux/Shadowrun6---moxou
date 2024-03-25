import { VehicleActor, VehicleSkill, VehicleState} from "../ActorTypes.js";
import { SkillRoll, VehicleRoll } from "../dice/RollTypes.js";
import { Shadowrun6Actor } from "../Shadowrun6Actor.js";
import { Shadowrun6ActorSheet } from "./SR6ActorSheet.js";
import { Gear,VehicleItem} from "../ItemTypes.js"

function getSystemData(obj: any): any {
	if ((game as any).release.generation >= 10) return obj.system;
	return obj.data.data;
}
function getActorData(obj: any): Shadowrun6Actor {
	if ((game as any).release.generation >= 10) return obj;
	return obj.data;
}

/**
 * Sheet for Vehicle actors
 * @extends {ActorSheet}
 */
export class Shadowrun6ActorSheetVehicle extends Shadowrun6ActorSheet {
	/** @override */
	static get defaultOptions() {
		return mergeObject(super.defaultOptions, {
			classes: ["shadowrun6", "sheet", "actor"],
			template: "systems/shadowrun6-moxou/templates/actor/shadowrun6-Vehicle-sheet.html",
			width: 600,
			height: 800,
			tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "overview" }],
			scrollY: [".items", ".attributes"],
			dragDrop: [{ dragSelector: ".item-list .item", dropSelector: null }],
			allVehicleUser: (game as Game).actors!.filter((actor) => actor.type == "Player" || actor.type == "NPC"),
			allVehicleModel: (game as Game).items!.filter((Item) => Item.type == "gear")
		});
	}

	

	activateListeners(html) {
		super.activateListeners(html);
		//	   if (this.actor && this.actor.isOwner) { console.log("is owner"); } else { console.log("is not owner");}

		// Owner Only Listeners
		if (this.actor.isOwner) {
			html.find(".vehicle-Model").change((ev) => this._changeModel(ev, html));
			html.find(".vehicle-slower").click((ev) => this._onDecelerate(ev, html));
			html.find(".vehicle-faster").click((ev) => this._onAccelerate(ev, html));
			html.find(".vehicleskill-roll").click(this._onRollVehicleSkillCheck.bind(this));
		}
	}

	_changeModel(event, html) {
		const element = event.currentTarget;
		let value = element.value;
		let system: VehicleActor = getSystemData(this.actor) as VehicleActor;

//		console.log("ActorSheetVehicle._changeModel with new model id ", value);
		let allVehicleModel =  (game as Game).items!.filter((Item) => Item.type == "gear");
		let item = allVehicleModel.find((element) => element.id == value);
		let itemSystem: VehicleItem = getSystemData(item) as VehicleItem;
		console.log("here is the new model item : ", itemSystem, "for ",system);
		(this.actor as any).update({ ["system.vehicleItem"]: itemSystem });
	}

	_onDecelerate(event, html) {
		console.log("ActorSheetVehicle_onDecelerate");
		let system: VehicleActor = getSystemData(this.actor) as VehicleActor;
		let currentSpeed = system.vehicleState.speed;
		let newSpeed = currentSpeed - (system.vehicleState.offRoad ? system.vehicleItem.accOff : system.vehicleItem.accOn);
		console.log("new speed : ",newSpeed);
//		if (newSpeed < 0) newSpeed = 0;
		const field = "system.vehicleState.speed";
		(this.actor as any).update({ ["system.vehicleState.speed"]: newSpeed });
	}

	_onAccelerate(event, html) {
		console.log("ActorSheetVehicle_onAccelerate");
		let system: VehicleActor = getSystemData(this.actor) as VehicleActor;
		let currentSpeed = system.vehicleState.speed;
		let newSpeed = currentSpeed + (system.vehicleState.offRoad ? system.vehicleItem.accOff : system.vehicleItem.accOn);
		console.log("new speed : ",newSpeed);
//		if (newSpeed > system.vehicleItem.tspd) newSpeed = system.vehicleItem.tspd;
		const field = "system.vehicleState.speed";
		(this.actor as any).update({ [field]: newSpeed });
	}

	//-----------------------------------------------------
	/**
	 * Handle rolling a Skill check
	 * @param {Event} event   The originating click event
	 * @private
	 */
	_onRollVehicleSkillCheck(event: Event, html) {
		console.log("ActorSheetVehicle_onRollVehicleSkillCheck");
		event.preventDefault();
		if (!event.currentTarget) return;
		if (!(event.currentTarget as any).dataset) return;
		let dataset: any = (event.currentTarget as any).dataset;
		const skillId: string = dataset.skill;

		let actorData: VehicleActor = getSystemData(this.actor) as VehicleActor;
		let vSkill: VehicleSkill = actorData.skills[skillId];

		console.log("Roll skill " + skillId + " with pool " + vSkill.pool + " and a threshold " + actorData.vehicleState.modifier);
		let roll: VehicleRoll = new VehicleRoll(actorData, skillId);
		roll.threshold = actorData.vehicleState.modifier;

		console.log("onRollSkillCheck before ", roll);
		(this.actor as Shadowrun6Actor).rollVehicle(roll);
	}
}
