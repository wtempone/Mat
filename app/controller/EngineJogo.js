Ext.define("Mat.controller.EngineJogo",{
    extend: "Ext.app.Controller",
    requires: ["Mat.view.BlocoJogo"],
    config: {
        limiteBotton: 0,
        refs: {
            EngineJogo: "EngineJogo",
            BlocoJogo: "BlocoJogo"
        },
        control: {
            EngineJogo: {
                setEngineJogo: "setEngineJogo",
                destroyEngine: "destroyEngine"
            },
            BlocoJogo: {
                topchangeBloco: "topchangeBloco"
            }
        }
    },
    setEngineJogo: function(ativo) {
        console.log("Controller --- set engine")
        var EngineJogo = this.getEngineJogo();
        var flogJogo = this.logJogo;
        var fcriaBloco = this.criaBloco;
        console.log("Tempo: "+EngineJogo.getNr_tempo_ger());
        //Intervalo para engine
        if (ativo) {
            EngineJogo.setIntervalo(setInterval(
                function(){ 
                    flogJogo(EngineJogo);
                    fcriaBloco(EngineJogo);
                }, 
            (10*EngineJogo.getNr_tempo_ger())));
        } else {
            console.log("Clear Intervalo");
            clearInterval(EngineJogo.getIntervalo());    
        }
    },
    criaBloco: function (eng) {
        if (eng.getIn_random()) {
            //eng.setLeftBloco(eng.getLeft() + (eng.getTamanhoBlocos() * Math.floor((Math.random()*eng.getNr_blocos()))));
            eng.setPosicao(Math.floor((Math.random()*eng.getNr_blocos())));
            //console.log("eng.getPosicao(): "+eng.getPosicao());
         } else { 
            //console.log("eng.getLeftBloco():" +eng.getLeftBloco() +"eng.getWidth()"+eng.getWidth());
            if (eng.getPosicao() >= (eng.getNr_blocos()-1)) {
                eng.setPosicao(0);
                //console.log("eng.getPosicao(): "+eng.getPosicao());
            } else {
                eng.setPosicao(eng.getPosicao()+1);
                //console.log("eng.getPosicao(): "+eng.getPosicao());
            }
        }
        //Cria novo bloco
        var Bloco = new Ext.create("Mat.view.BlocoJogo",
                {
                    //xtype:'BlocoJogo',
                    left: eng.getLeft() + (eng.getPosicao()*eng.getTamanhoBlocos()),
                    posicao: eng.getPosicao(),
                    //top: eng.getTop() - eng.getTamanhoBlocos(),
                    top: eng.getTop() - eng.getTamanhoBlocos(),
                    width: eng.getTamanhoBlocos(),
                    height: eng.getTamanhoBlocos(),
                    demo: eng.getDemo()
                });
        var NovoBloco = 
            Ext.Viewport.add(Bloco
            );
        //Criando carta
        eng.getBlocos().push(NovoBloco);
        var blocosPos = eng.getBlocos().filter(function(Bloco) {return (Bloco.getPosicao()==NovoBloco.getPosicao() & Bloco.getTop()>=NovoBloco.getTop());});
        var maxBottom = (eng.getTop()+eng.getHeight()) - (blocosPos.length * NovoBloco.getHeight());
        console.log("eng top: "+eng.getTop() +" maxBottom:"+maxBottom);
        if  (Number(maxBottom) < Number(eng.getTop())) {
            //eng.setFimdeJogo();
            console.log("passa fim jogo");
            eng.fireEvent("setFimdeJogo",eng);        

        }
  
        NovoBloco.addListener({
            painted: function() {
                var tf = 'translate3d(0px, ' + maxBottom + 'px,0px)';                
                Ext.Anim.run(NovoBloco.element, new Ext.Anim({
                    autoClear: false,
                    //easing: 'ease-in',
                    duration: 1000,
                    from: {
                        '-webkit-transform': 'translate3d(0px,0px,0px)'
                    },
                    to: {
                    '-webkit-transform': tf
                    }
                }));
            }   
        });
        NovoBloco.show();
//        console.log(blocosPos[0].getHeight);
    
//        console.log("maxBottom:"+maxBottom);
/*
        Ext.Anim.run(NovoBloco, {
            //out: true,
            from: {"top": NovoBloco.getTop() + "px"},
            to: { "top": "1000px"},
            delay: 0,
            direction: 'down',
            duration: 1000,

        });
*/
    },
    engine: function(eng) {
        // descendo Blocos que estão caindo
        if (eng.getBlocos().length > 0) {
            var Caindo = eng.getBlocos().filter(function(Bloco) {return !Bloco.getParado();});
            Caindo.forEach(function(Bloco) {
                Bloco.setTop(Number(Bloco.getTop()) + Number(eng.getNr_gravid()));
            });
        }
        // contador do tempo
        eng.setTempoAtual(eng.getTempoAtual()+(1000/eng.getFramesPorSegundo()));
        //posicionando carta
        //console.log("Tempo Geracao:"+eng.tempoGeracao);
        //console.log("Parametro Tempo Geracao:"+eng.getNr_tempo_ger());
        if (eng.getTempoGeracao() >= (eng.getNr_tempo_ger()*10)) {

            //console.log("Parametro Random:"+eng.getIn_random());
            //console.log("Parametro tamanhoBlocos:"+eng.tamanhoBlocos);

            if (eng.getIn_random()) {
                //eng.setLeftBloco(eng.getLeft() + (eng.getTamanhoBlocos() * Math.floor((Math.random()*eng.getNr_blocos()))));
                eng.setPosicao(Math.floor((Math.random()*eng.getNr_blocos())));
                //console.log("eng.getPosicao(): "+eng.getPosicao());
             } else { 
                //console.log("eng.getLeftBloco():" +eng.getLeftBloco() +"eng.getWidth()"+eng.getWidth());
                if (eng.getPosicao() >= (eng.getNr_blocos()-1)) {
                    eng.setPosicao(0);
                    //console.log("eng.getPosicao(): "+eng.getPosicao());
                } else {
                    eng.setPosicao(eng.getPosicao()+1);
                    //console.log("eng.getPosicao(): "+eng.getPosicao());
                }
            }
            //Cria novo bloco
            var Bloco = new Ext.create("Mat.view.BlocoJogo",
                    {
                        //xtype:'BlocoJogo',
                        left: eng.getLeft() + (eng.getPosicao()*eng.getTamanhoBlocos()), 
                        //top: eng.getTop() - eng.getTamanhoBlocos(),
                        top: eng.getTop() - eng.getTamanhoBlocos(),
                        width: eng.getTamanhoBlocos(),
                        height: eng.getTamanhoBlocos(),
                        demo: eng.getDemo()
                    });
            var NovoBloco = 
                Ext.Viewport.add(Bloco
                );
            //Criando carta
            eng.getBlocos().push(NovoBloco);
            NovoBloco.show();
            eng.setTempoGeracao(0);
        } else {
            eng.setTempoGeracao(eng.getTempoGeracao()+(1000/eng.getFramesPorSegundo()));
        }
        //console.log("passa");
        eng.setStyle('font-size:8px;');
        //eng.setCls("x-main-fundo");
        eng.setHtml("Nivel: "+eng.getNr_nivel() + "<br>" +
            "Nome do Nivel: "+eng.getNm_nivel() + "<br>" +
            "Blocos: "+eng.getNr_blocos() + "<br>" +
            "Gravidade: "+eng.getNr_gravid() + "<br>" +
            "T. Geração: "+eng.getNr_tempo_ger() + "<br>" +
            "Tempo: "+eng.getNr_tempo() + "<br>" +
            "Pontos: "+eng.getNr_pontos() + "<br>" +
            "Randomico:"+eng.getIn_random() +"<br>" +
            "F/P/S:"+eng.getFramesPorSegundo() + "<br>" +
            "Blocos:"+eng.getBlocos().length + "<br>" +
            "Tempo Atual:"+Math.floor(eng.getTempoAtual()) +  "<br>" +
            "Tempo Geracao:"+Math.floor(eng.getTempoGeracao()) + "<br>" +
            "Posicao:"+eng.getPosicao() + "<br>" +
            "Interval:"+eng.getIntervalo() + "<br>" +
            "Tamanho Blocos:"+eng.getTamanhoBlocos());
    },
    logJogo: function (eng) {
        eng.setHtml("Nivel: "+eng.getNr_nivel() + "<br>" +
            "Nome do Nivel: "+eng.getNm_nivel() + "<br>" +
            "Blocos: "+eng.getNr_blocos() + "<br>" +
            "Gravidade: "+eng.getNr_gravid() + "<br>" +
            "T. Geração: "+eng.getNr_tempo_ger() + "<br>" +
            "Tempo: "+eng.getNr_tempo() + "<br>" +
            "Pontos: "+eng.getNr_pontos() + "<br>" +
            "Randomico:"+eng.getIn_random() +"<br>" +
            "F/P/S:"+eng.getFramesPorSegundo() + "<br>" +
            "Blocos:"+eng.getBlocos().length + "<br>" +
            "Tempo Atual:"+Math.floor(eng.getTempoAtual()) +  "<br>" +
            "Tempo Geracao:"+Math.floor(eng.getTempoGeracao()) + "<br>" +
            "Posicao:"+eng.getPosicao() + "<br>" +
            "Interval:"+eng.getIntervalo() + "<br>" +
            "Tamanho Blocos:"+eng.getTamanhoBlocos());
    },
    topchangeBloco: function (bloco) {
        var eng = this.getEngineJogo();
        var maxTop = eng.getTop();
        var maxBottom = (eng.getTop()+eng.getHeight()) - bloco.getHeight();

        // parando de cair quando chega a base
        if (bloco.getTop() > maxBottom) {
            bloco.setTop(maxBottom);
            bloco.setParado(true);
        }
        var aux = bloco;
        // parando de cair quando colide com outro box
        var BlocosParados = eng.getBlocos().filter(function(bl) {return bl.getParado();});
        var fnFimdeJogo = this.setFimdeJogo;
        var fnEngineJogo = this.setEngineJogo;

        //console.log(BlocosParados.length);
        BlocosParados.forEach(function(bl) {      
            //console.log("Colisao: "+Colisao(aux,bl));              
            if (!aux.getParado() & Colisao(aux, bl)) {                          
                aux.setParado(true);
                // chamando fim de jogo se estiver no topo
                if (aux.getTop() <= maxTop) {
                    aux.destroy();
                    fnFimdeJogo(eng);
                    //fnEngineJogo(false);
                    //var task = Ext.create('Ext.util.DelayedTask', function () {
                    //    fnEngineJogo(true);
                    //});
                    //task.delay(5000);
                } else {
                    //console.log("aux.getTop():"+aux.getTop()+"bl.getTop():"+bl.getTop());
                    aux.setTop(bl.getTop() - aux.getHeight());                           
                    //console.log("depois aux.getTop():"+aux.getTop());

                };
            };
        }); 
    },
    setFimdeJogo: function(eng,ctr) {
        //var eng = this.getEngineJogo();
        if (eng.getDemo()) {
            eng.setPosicao(eng.getNr_blocos());
           if (eng.getBlocos().length > 0) {
                eng.getBlocos().forEach(function(Bloco) {
                    Bloco.hide();
                    Bloco.destroy();
                });
            }  
            eng.setBlocos(new Array());
        }
    },
    destroyEngine: function() {

        console.log("destroy engine");
        var eng = this.getEngineJogo();
        this.setEngineJogo(false);
        if (eng.getBlocos().length > 0) {
            eng.getBlocos().forEach(function(Bloco) {
                Bloco.hide();
                Bloco.destroy();
            });
        }
        eng.destroy();
    },
    init: function () {
        this.callParent(arguments);
    }
});
