Ext.application({
    name: 'Sample',
    views: ['Login','MainMenu','Register','Popup'],
    controllers:['Login','Register','Popup','MainMenu'],
    launch: function () {
        if($.session.get("session")){
            Ext.Viewport.add([
            {
                xtype: 'mainmenuview'
            },
            {
                xtype: 'loginview'
            },
            {
                xtype: 'registerview'
            }
            ]);
        }else{
            Ext.Viewport.add([
            {
                xtype: 'loginview'
            },
            {
                xtype: 'mainmenuview'
            },
            {
                xtype: 'registerview'
            }
            ]);
        }
		 
    }
});