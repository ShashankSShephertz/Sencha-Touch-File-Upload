Ext.define('Sample.view.MainMenu', {
    extend: 'Ext.List',
    requires: ['Ext.TitleBar'],
    alias: 'widget.mainmenuview',
    config: {
        layout: {
            type: 'fit'
			
        },
        fullscreen: true,
        itemTpl: createTpl(),
        store: getListView(),
        items: [{
            xtype: 'titlebar',
            title: '',
            docked: 'top',
            items: [
            {
                xtype: 'button',
                text: 'Add New',
                itemId: 'album',
                align: 'left',
                action: 'showPopup'
            },

            {
                xtype: 'button',
                text: 'Log Off',
                itemId: 'logOffButton',
                align: 'right'
            }
            ]
        }],
        listeners: [{
            delegate: '#logOffButton',
            event: 'tap',
            fn: 'onLogOffButtonTap'
        },
        {
            delegate: '#imgSrc',
            event: 'tap',
            fn: 'getUsersTap'
        },	
        {
            event: 'itemtap',
            fn: 'itemtap'
        },
        {
            event: 'activate',
            fn: 'activate'
        },{
            delegate: '#selecter',
            event: 'change',
            fn: 'onchange'
        }
        ]
    },
    onLogOffButtonTap: function () {
        this.fireEvent('onSignOffCommand');
    },
    itemtap: function (data,index) {
        var rec = data.getStore().getAt(index);
        var current = this;
        current.fireEvent('onitemtap',rec.data);
	  
    },
    getUsersTap:function(){
        this.fireEvent('onGetUsersTap');
    },
    activate:function(){
        
		var isUser = $.session.get("userName"),
        me = this;
        if((!isUser == "" || !isUser == undefined)){
             me.getStore().removeAll();
			 new App42Upload().getAllFilesByUser(isUser,{
                    success: function(object) {
                        var uploadObj = JSON.parse(object)
									var getData = uploadObj.app42.response.upload.files.file
									me.getStore().add(getData)
								},
                            error: function(error) {
							Ext.Msg.alert("No Image Please Add ")
							}
                        }); 
        }
    },
    onchange:function(select, newValue, oldValue){
        console.log(newValue)
    }
});