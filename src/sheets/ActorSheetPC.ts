import { Shadowrun6ActorSheet } from "./SR6ActorSheet.js";

/**
 * Extend the basic ActorSheet with some very simple modifications
 * @extends {ActorSheet}
 */
export class Shadowrun6ActorSheetPC extends Shadowrun6ActorSheet {
	/** @override */
	static get defaultOptions() {
		const options = super.defaultOptions;
		return foundry.utils.mergeObject(super.defaultOptions, {
			classes: ["shadowrun6", "sheet", "actor"],
			template: "systems/shadowrun6-moxou/templates/actor/shadowrun6-Player-sheet.html",
			width: 830,
			height: 900,
			tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "basics" }],
			scrollY: [".biography", ".items", ".attributes"],
			dragDrop: [{ dragSelector: ".item-list .item", dropSelector: null }]
		});
	}
}
