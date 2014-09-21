/* teste do git */
/*
    This file is generated and updated by Sencha Cmd. You can edit this file as
    needed for your application, but these edits will have to be merged by
    Sencha Cmd when it performs code generation tasks such as generating new
    models, controllers or views and when running "sencha app upgrade".
    Ideally changes to this file would be limited and most work would be done
    in other places (such as Controllers). If Sencha Cmd cannot merge your
    changes and its generated code, it will produce a "merge conflict" that you
    will need to resolve manually.
*/
// DO NOT DELETE - this directive is required for Sencha Cmd packages to work.
//@require @packageOverrides
//<debug>
Ext.Loader.setPath({
    'Ext': 'touch/src',
    'Ext.ux':   './ux'
});
//</debug>
Ext.application({
name:     'Mat',
    requires: [
        'Ext.MessageBox', 'Ext.device.Connection','Ext.Anim'
    ],
    stores: [
        'Classes',
        'Fases',
        'FasesLocal',
        'Jogo',
        'JogoLocal',
        'Niveis',
        'NiveisLocal',
        'Ranking',
        'Usuarios'
    ],
    views: [
        'Classes.ListClasses',
        'Classes.SearchBarClasses',
        'Classes.ContainerClasses',
        'Classes.EditorClasses',
        'Classes.Classes',
        'Fases.ListFases',
        'Fases.SearchBarFases',
        'Fases.ContainerFases',
        'Fases.EditorFases',
        'Fases.Fases',
        'Jogo.ListJogo',
        'Jogo.SearchBarJogo',
        'Jogo.ContainerJogo',
        'Jogo.EditorJogo',
        'Jogo.Jogo',
        'Niveis.ListNiveis',
        'Niveis.SearchBarNiveis',
        'Niveis.ContainerNiveis',
        'Niveis.EditorNiveis',
        'Niveis.Niveis',
        'Ranking.ListRanking',
        'Ranking.SearchBarRanking',
        'Ranking.ContainerRanking',
        'Ranking.EditorRanking',
        'Ranking.Ranking',
        'Usuarios.ListUsuarios',
        'Usuarios.SearchBarUsuarios',
        'Usuarios.ContainerUsuarios',
        'Usuarios.EditorUsuarios',
        'Usuarios.Usuarios',
        'Main',
        'EngineJogo',
        'BlocoJogo',
        'MenuJogo',
        'MainJogo',
        'SelecionaFases',
        'SelecionaNiveis'
    ],

    controllers: [
        'Classes',
        'Fases',
        'Jogo',
        'Niveis',
        'Ranking',
        'Usuarios',
        'EngineJogo',
        'MainJogo'
    ],
    icon: {
        '57': 'resources/icons/Icon.png',
        '72': 'resources/icons/Icon~ipad.png',
        '114': 'resources/icons/Icon@2x.png',
        '144': 'resources/icons/Icon~ipad@2x.png'
    },
    isIconPrecomposed: true,
    startupImage: {
        '320x460': 'resources/startup/320x460.jpg',
        '640x920': 'resources/startup/640x920.png',
        '768x1004': 'resources/startup/768x1004.png',
        '748x1024': 'resources/startup/748x1024.png',
        '1536x2008': 'resources/startup/1536x2008.png',
        '1496x2048': 'resources/startup/1496x2048.png'
    },
    launch: function() {
        // Destroy the #appLoadingIndicator element
        //Ext.Viewport.add(Ext.create('Mat.view.Jogo.Jogo'));
        this.loadGame();
        // Initialize the main view
        //Ext.Viewport.add(Ext.create('Mat.view.Niveis.Niveis'));
    },
    loadGame: function() {
        if (Ext.device.Connection.isOnline()) {
            decisao = confirm("Versão de Edição\nEditar parametros agora.");
            if (decisao){
                /*var nome;
                do {
                    nome = prompt ("Senha:");
                    if (nome!="upgrade") {
                        alert: "Senha invalida!"
                    }
                } while (nome == null || nome == ""|| nome != "upgrade");*/
                Ext.Viewport.add(Ext.create('Mat.view.Jogo.Jogo'));
                return;
            }
        }
        var precisaAtualizar = null;
        // obtem dados salvos localmente
        var storeLocal = Ext.getStore("JogoLocal");
        storeLocal.load({
            callback: function(records, operation, success) {
                if (success == true) {
                    // verifica se foram baixados registros
                    if (storeLocal.getCount() == 0) {
                        // necessario buxcar registros
                        precisaAtualizar = true;
                    } else {
                        // checa conexao
                        if (Ext.device.Connection.isOnline()) {
                            var storeOn = Ext.getStore("Jogo");
                            storeOn.load({
                                callback: function(records, operation, success) {
                                    //verifica se jogo foi iniciado.
                                    if (success == true) {
                                        if (storeOn.getCount() == 0) {
                                            alert("Dados do Jogo nao encontrado na rede, necesario definir novos parametros.");
                                            Ext.Viewport.add(Ext.create('Mat.view.Jogo.Jogo'));
                                            return;
                                        } else {
                                            // necessario buxcar registros
                                            if (storeLocal.getAt(0).get("versao") != records[0].get("versao")) {
                                                precisaAtualizar = true;
                                            } else {
                                                precisaAtualizar = false;
                                               //alert("Versao atualizada.");
                                            }
                                        }
                                    }
                                }
                            });
                        } else {
                            alert("Para primeiro acesso você precisa estar conectado na internets.");
                            return;

                        }
                    }    
                }   
            }
        });
        var atualizStore = this.atualizaStore;
        var intervalCheck = setInterval(
            function(){ 
                if (precisaAtualizar!=null) {
                    clearInterval(intervalCheck);
                    if (precisaAtualizar) {
                        atualizStore("Jogo");
                        atualizStore("Fases");
                        atualizStore("Niveis");
                    }
                    setTimeout(function(){ 
                        Ext.Viewport.add(Ext.create('Mat.view.MainJogo'));
                        Ext.fly('appLoadingIndicator').destroy();
                    }, 500);
                }
            }, 
            100);
    },
    atualizaStore: function(st) { 

        if (Ext.device.Connection.isOnline()) {
            // obtem store local "localstorage"
            var storeLocal = Ext.getStore(st+"Local");
            // obtem store on-line PHP
            var store = Ext.getStore(st);
            // Limpa store local
            storeLocal.each(function(record,index){
                storeLocal.remove(record); // may not even be necessary
                record.erase();
            });
            var iniciar = false;
            storeLocal.sync();

            //var store = Ext.getStore(st);
            store.load({
                callback: function(records, operation, success) {
                    //verifica se jogo foi iniciado.
                    if (success) {
                        var ct = records.length, it = 0;
                        while (it < ct) {
                            storeLocal.add(records[it]);
                            it++;
                        }
                    }
                    storeLocal.sync();
                }
            });
        }
    },
    onUpdated: function() {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function(buttonId) {
                if (buttonId === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
//========funcoes globais =============//
var  Param = function(valor, texto, classe, classeSelecionado, tipo) {
    this.valor = valor;
    this.texto = texto;
    this.classe = classe;
    this.classeSelecionado = classeSelecionado;   
    this.tipo = tipo;
};
var TIPO_NUMERO = 1;
var TIPO_OPERADOR = 2;

var ValorCarta = [
             new this.Param("0","0","x-carta-0","x-carta-b-0",TIPO_NUMERO),
             new this.Param("1","1","x-carta-1","x-carta-b-1",TIPO_NUMERO),
             new this.Param("2","2","x-carta-2","x-carta-b-2",TIPO_NUMERO),
             new this.Param("3","3","x-carta-3","x-carta-b-3",TIPO_NUMERO),
             new this.Param("4","4","x-carta-4","x-carta-b-4",TIPO_NUMERO),
             new this.Param("5","5","x-carta-5","x-carta-b-5",TIPO_NUMERO),
             new this.Param("6","6","x-carta-6","x-carta-b-6",TIPO_NUMERO),
             new this.Param("7","7","x-carta-7","x-carta-b-7",TIPO_NUMERO),
             new this.Param("8","8","x-carta-8","x-carta-b-8",TIPO_NUMERO),
             new this.Param("9","9","x-carta-9","x-carta-b-9",TIPO_NUMERO),
             new this.Param("/","÷","x-carta-10","x-carta-b-10",TIPO_OPERADOR),
             new this.Param("*","×","x-carta-11","x-carta-b-11",TIPO_OPERADOR),
             new this.Param("-","-","x-carta-12","x-carta-b-12",TIPO_OPERADOR),
             new this.Param("+","+","x-carta-13","x-carta-b-13",TIPO_OPERADOR)
];

var CartaSelecionada = new Param("X","X","#BFDBE6","#D8E5ED",TIPO_NUMERO);

var Colisao = function (a, b) { 
//     console.log('a.top'+a.getTop()+'b.top'+b.getTop());
     return a.getLeft() < b.getLeft() + b.getWidth() &&
             a.getLeft() + a.getWidth() > b.getLeft() &&
             a.getTop() < b.getTop() + b.getHeight() &&
             a.getTop() + a.getHeight() > b.getTop();
};

