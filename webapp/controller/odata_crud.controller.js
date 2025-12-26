sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",

], (Controller, JSONModel) => {
    "use strict";

    return Controller.extend("odatacrud.controller.odata_crud", {
        onInit() {
            //this.onReadAll();
            //this.onReadFilters();            
            //this.onReadSorter();
            //this.onReadParameters();
            //this.onReadKey(); 
            //},
        },
        onReadAll: function () {
            var that = this;
            var oModel = this.getOwnerComponent().getModel();
            oModel.read("/Products", {
                success: function (odata) {
                    //console.log(odata); 
                    var jModel = new JSONModel(odata);
                    that.getView().byId("idProducts").setModel(jModel);
                }, error: function (oError) {
                    console.log(oError);
                }
            });
        },
        onReadFilters: function () {
            var that = this;
            var oModel = this.getOwnerComponent().getModel();
            //var oFilter = new sap.ui.model.Filter('Rating', 'EQ', '4')
            var oFilter = new sap.ui.model.Filter('ID', 'EQ', '106')
            oModel.read("/Products", {
                filters: [oFilter], success: function (odata) {
                    //console.log(odata); 
                    var jModel = new JSONModel(odata);
                    that.getView().byId("idProducts").setModel(jModel);
                }, error: function (oError) {
                    console.log(oError);
                }
            });
        },
        onReadSorter: function () {
            var that = this;
            var oModel = this.getOwnerComponent().getModel();
            var oSorter = new sap.ui.model.Sorter('Price', true);
            oModel.read("/Products", {
                sorters: [oSorter], success: function (odata) {
                    //console.log(odata); 
                    var jModel = new JSONModel(odata);
                    that.getView().byId("idProducts").setModel(jModel);
                }, error: function (oError) {
                    console.log(oError);
                }
            });
        },
        onReadParameters: function () {
            var that = this;
            var oModel = this.getOwnerComponent().getModel();
            oModel.read("/Products", {
                urlParameters: { $skip: 3, $top: 4 },
                success: function (odata) {
                    var jModel = new JSONModel(odata);
                    that.getView().byId("idProducts").setModel(jModel);
                }, error: function (oError) {
                    console.log(oError);
                }
            });
        },
        onReadKey: function () {
            var that = this;
            var oModel = this.getOwnerComponent().getModel();
            oModel.read("/Products(2)", {
                success: function (odata) {
                    var jModel = new JSONModel({ results: [odata] });
                    that.getView().byId("idProducts").setModel(jModel);
                }, error: function (oError) {
                    console.log(oError);
                }
            });
        },
        onEdit: function (oEvent) {
            var that = this;
            var oModel = this.getOwnerComponent().getModel();
            oModel.setUseBatch(false);

            if (oEvent.getSource().getText() === "Edit") {
                oEvent.getSource().setText("Submit");
                oEvent.getSource().getParent().getParent().getCells()[3].setEditable(true);

            } else {
                oEvent.getSource().setText("Edit");
                oEvent.getSource().getParent().getParent().getCells()[3].setEditable(false);
                var oInout = oEvent.getSource().getParent().getParent().getCells()[3].getValue();
                var oID = oEvent.getSource().getBindingContext().getProperty("ID");

                oModel.update("/Products(" + oID + ")", { Rating: oInout }, {
                    success: function (odata) {
                        //that.onReadAll();
                        that.getView().byId("idProducts").getModel().refresh();
                    },
                    error: function (oError) {
                        console.log(oError);
                    }                    
                });
                
            }
        },
        onDuplicate: function (oEvent) {
            var that = this;
            var oModel = this.getOwnerComponent().getModel();
            oModel.setUseBatch(false);
            var oDuplicateData = oEvent.getSource().getBindingContext().getObject();
            oDuplicateData.ID = 100 + oDuplicateData.ID;
            oModel.create("/Products", oDuplicateData, {
                success: function (odata) {
                    //that.onReadAll();
                    that.getView().byId("idProducts").getModel().refresh();
                },
                error: function (oError) {
                    console.log(oError);
                }
            });
        },
        onDelete: function (oEvent) {
            var that = this;
            var oModel = this.getOwnerComponent().getModel();
            //oModel.setUseBatch(false);
            //var oID = oEvent.getSource().getBindingContext().getProperty("ID");
            var oContext = oEvent.getSource().getBindingContext();

            oModel.remove(oContext.getPath(), {
                success: function (odata) {
                    //that.onReadAll();
                    that.getView().byId("idProducts").getModel().refresh();
                },
                error: function (oError) {
                    console.log(oError);
                }
            });
        },
        onUpdateFinished: function(oEvent) {
            sap.ui.core.BusyIndicator.hide();
        }
    });
});