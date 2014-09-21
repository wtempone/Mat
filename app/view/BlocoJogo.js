Ext.define("Mat.view.BlocoJogo",{
    extend: "Ext.Component",
    xtype: "BlocoJogo",
    layout : "center",

    config: {
        hidden: true,
        label: 1,
        // parametros do blovo
        valor: 0,
        texto: "",
        classe: "",
        classeSelecionado: "",
        tipo: 1,
        // controles do bloco
        parado: false,
        selcionado: false,
        bloqueado: false,
        posicao: 0,
        //informacoes do game
        demo: false,
        listeners: {
            tap: {
                fn: function() {
                    // muda aparencia do boto
                    if (!this.getSelcionado()) {
    
                        this.setSelcionado(true);
                        if (!this.getDemo()) {
                            // Operacao.push(''+this.valor);
                        } 
                        /*
                        if (txtOperacao.getHtml() == null) {
                            txtOperacao.setHtml(this.getHtml()); //this.getHtml()) ;
                        } else {
                            txtOperacao.setHtml(txtOperacao.getHtml() + this.getHtml()); //this.getHtml()) ;
                        };
                        */
                        this.setCls(this.getClasseSelecionado());
                        this.setStyle('font-size:' + Math.round((this.getWidth() * 40/100)) + 'px;');
                    };
                },
                element: 'element'
            }
            ,
            topchange: {
                fn: function () {
                    this.fireEvent("topchangeBloco",this);        
                }
            }
        }

    },
    initialize: function() {
        //console.log("Cria bloco");
        // cria novo conjunto de parametros randomicamente
        var parm = new Param();
        if (this.getValor()) {
            parm = ValorCarta[this.getValor()];
        } else {
            parm = ValorCarta[Math.floor((Math.random()*ValorCarta.length))];
        } 
        this.setHtml(parm.texto);
        // inicializa paramtros 
        this.setTexto(parm.texto);
        this.setClasse("x-button "+parm.classe);
        this.setClasseSelecionado("x-button "+parm.classeSelecionado);
        this.setValor(parm.valor);
        this.setTipo(parm.tipo);
        // inicializa com classe padrao
        this.setCls(this.getClasse());
        // redimensiona tamanho da fonte 
        this.setStyle('font-size:' + Math.round((this.getWidth() * 40/100)) + 'px;');
    },
});
