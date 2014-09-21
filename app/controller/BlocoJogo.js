Ext.define("Mat.controller.BlocoJo",{
    extend: "Ext.app.Controller",
    config: {
        refs: {
            BlocoJogo: "BlocoJogo",
        },
        control: {
            BlocoJogo: {
                addCommandAudios: "onAddAudios"
            }
        }
    }
});
