Ext.define("Mat.controller.MainJogo",{
    extend: "Ext.app.Controller",
    config: {
        limiteBotton: 0,
        refs: {
            MainJogo: "MainJogo",
            SelecionaFases: "SelecionaFases",
            MenuJogo: "MenuJogo",
            EditorJogo: "EditorJogo"
        },
        control: {
            MenuJogo: {
                cmdSelecionaFases: "onSelecionaFases",
                cmdEditarJogo: "onEditarJogo"            
            },
            SelecionaFases: {
                cmdMenuJogo: "onMenuJogo"
            }
        }
    },
    onSelecionaFases:function () {
        console.log(this.getMainJogo());
        this.getMainJogo().animateActiveItem(this.getSelecionaFases(), { type: "flip", direction: "left" });
    },
    onMenuJogo:function () {
        this.getMainJogo().animateActiveItem(this.getMenuJogo(), { type: "flip", direction: "left" });
    },
    onEditarJogo:function () {
        this.getMainJogo().animateActiveItem(this.getEditorJogo(), { type: "flip", direction: "left" });
    },
    init: function () {
        this.callParent(arguments);
    }
});
