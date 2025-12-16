/*global QUnit*/

sap.ui.define([
	"odatacrud/controller/odata_crud.controller"
], function (Controller) {
	"use strict";

	QUnit.module("odata_crud Controller");

	QUnit.test("I should test the odata_crud controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
