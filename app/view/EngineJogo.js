Ext.define("Mat.view.EngineJogo",{
    extend: "Ext.Component",
    xtype: "EngineJogo",
    requires: ["Mat.view.Fases.ListFases","Mat.view.Fases.SearchBarFases"],
    config: {
        //Congiguracoes de aparencia
        //Parametros de geração do Jogo
        nr_nivel: 0,
        nm_nivel: 0,
        nr_blocos: 0,
        nr_gravid: 0,
        nr_tempo_ger: 0, 
        nr_tempo: 0,
        nr_pontos: 0,
        tx_excluir: "",
        in_random: false,
        demo: true,
        //Dados da Engine
        framesPorSegundo: 60,
        blocos: [],
        tempoAtual: 0, 
        tempoGeracao: 0,
        //leftBloco: 0,
        posicao:0,
        intervalo: null,
        tamanhoBlocos: 0,
        //Parametros do Painel
        modal: true,
        //centered: true,
        hideOnMaskTap: true,
        showAnimation: "pop",
        hidden: true,
        hideAnimation: {
            type: 'popOut',
            easing: 'ease-out'
        }
    },
    initialize: function() {
        this.setFramesPorSegundo(60);
        this.setBlocos(new Array());
        this.setTempoAtual(0);
        this.setTempoGeracao(0);
        console.log("Excluir"+this.getTx_excluir());
        //this.setLeftBloco(999999999);
        this.setPosicao(this.getNr_blocos());
        this.setIntervalo(null);
        this.setTamanhoBlocos(Math.round(this.getWidth() / this.getNr_blocos()));
        //console.log("Chama evento do controle")
        this.fireEvent("setEngineJogo", true);
        this.callParent(arguments);
        this.setCls("x-button "+"x-carta-"+(this.getNr_nivel()-1));
        this.addListener({
            tap: function(evt) {
                console.log('ta batendo')
                this.sair();
                //Ext.Viewport.remove(Ext.getCmp('EngineJogo'));                
            }
        });
    },
    sair: function() {
        this.fireEvent("destroyEngine");        
    }
});