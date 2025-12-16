sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    
], (Controller,JSONModel) => {
    "use strict";

    return Controller.extend("odatacrud.controller.odata_crud", {
        onInit() {
            this.onReadAll();
        },
        onReadAll: function(){
            var that = this;
            var oModel = this.getOwnerComponent().getModel(); 
            oModel.read("/Products", {
                success: function (odata){
                    //console.log(odata); 
                    var jModel = new JSONModel(odata);
                    that.getView().byId("idProducts").setModel(jModel);
            }, error: function (oError) {
                    console.log(oError); 
            }  });
        }
    });
});