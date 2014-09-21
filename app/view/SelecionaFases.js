Ext.define("Mat.view.SelecionaFases",{
    extend: "Ext.Panel",
    xtype: "SelecionaFases",
    requires: ["Ext.carousel.Carousel","Ext.Label", 'Mat.model.NiveisLocal'],
    config: {
        layout: 'vbox', //defines layout inside config
        items: [
            {
                xtype: 'carousel',
                flex: 1,
                itemId: 'caroselFases'
                //itemLength: window.innerWidth * 0.80
            }
        ]
    },
    initialize: function() {
        var store = Ext.getStore('FasesLocal');
        var pan = this;
        var caFases = this.down('#caroselFases');
        caFases.removeAll();
        store.load(function() {                              
            store.each(function(record){    // Essa parte percorre o meu store
                var storeNiveis = Ext.getStore('NiveisLocal');
                //console.log('Codigo da fase:'+record.get('cd_fase'))
                storeNiveis.filter('cd_fase', record.get('cd_fase'));
                var Niveis = [];
                var posLeft = 0, posTop = 0;
                storeNiveis.each(function(record,index){
                        //console.log("nivel:"+record.get('nr_nivel')+"  record.index:"+index);
                        Niveis.push(
                            {
                                valor: record.get('nr_nivel'), 
                                xtype: "BlocoJogo",
                                //margin: '1em',
                                hidden: false,
                                left: (window.innerWidth * 0.03) + (posLeft * (window.innerWidth * 0.19)) + (posLeft * (window.innerWidth * 0.03)),
                                top: (window.innerWidth * 0.03)+ (posTop * (window.innerWidth * 0.19)) + (posTop * (window.innerWidth * 0.03)),
                                width: window.innerWidth * 0.19,
                                height: window.innerWidth * 0.19
                            }
                        );
                        posLeft += 1;
                        if (posLeft > 3) {
                            posLeft = 0;
                            posTop += 1;
                        }
                    }
                );
                //console.log ('Numero de niveis:'+storeNiveis.getCount());
                caFases.add(                            
                    {   xtype: 'panel',
                        layout:  'vbox',
                        cls: 'x-carta-b-'+(record.get('nr_fase')-1),

                        items: [
                            {
                                xtype: "container",
                                layout: "hbox",
                                //cls: 'x-carta-'+record.get('nr_fase'),      
                                items: [
                                        {
                                            xtype: "container",
                                            //itemId: "nomejogo",
                                            margin: ".5em",
                                            padding: ".5em",
                                            //html: record.get('nm_fase'),
                                            layout: 'hbox',
                                            //style: 'font-size:' + Math.round(((window.innerHeight * 0.09) * 30/100)) + 'px;',                                                                           
                                            //center: true,
                                            cls: 'drop-shadow  x-carta-'+(record.get('nr_fase')-1),
                                            flex: 1,
                                            items: [
                                                    {
                                                        xtype: "button",
                                                        iconCls: "home",      
                                                        cls: 'x-trasparentize-button',
                                                        margin: '1px',
                                                        padding: '.2em',
                                                        style: 'font-size:' + Math.round(((window.innerHeight * 0.09) * 30/100)) + 'px;' ,
                                                        handler: function() {
                                                            console.log('passa no botao');

                                                            pan.cmdMenuJogo();
                                                        }                               
                                                    },
                                                    {
                                                        xtype: "spacer"
                                                    },
                                                    {
                                                        xtype: "container",
                                                        itemId: "nomejogo",
                                                        //margin: "1em 1em 1em 1em",
                                                        //padding: "1em 1em 1em 1em",
                                                        html: record.get('nm_fase'),
                                                        //layout: 'hbox',
                                                        style: 'font-size:' + Math.round(((window.innerHeight * 0.09) * 40/100)) + 'px;',                                                                           
                                                        center: true,
                                                        //cls: 'drop-shadow  x-carta-'+record.get('nr_fase')
                                                    },
                                                    {
                                                        xtype: 'spacer'
                                                    }

                                            ]

                                        }
                                
                                ]
                            },
                            {
                                xtype: 'container',
                                //html: 'panel interno',
                                layout: "hbox",
                                margin: "1.5em 1em 1em 1em",
                                            padding: ".5em",

                                left: window.innerWidth * 0.02,
                                top: (window.innerHeight * 0.09) + 2 * (window.innerWidth * 0.02),
                                width: window.innerWidth * 0.91,
                                height:(window.innerWidth * 0.22)*5,
                                                                            flex: 1,

                                //style: 'font-size:' + Math.round(((window.innerHeight * 0.09) * 30/100)) + 'px;',   
                                cls: 'x-carta-'+(record.get('nr_fase')-1),                           
                                items: Niveis
                            }
                        ]
                    }
                )
            });
        });
    },
    cmdMenuJogo: function() {
        console.log( "passa  na chamda");
        this.fireEvent("cmdMenuJogo", this);
    }
});