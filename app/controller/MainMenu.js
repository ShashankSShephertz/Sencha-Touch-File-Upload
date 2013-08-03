Ext.define('Sample.controller.MainMenu', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
            loginView: 'loginview',
            mainMenuView: 'mainmenuview'
        },
        control: {
            mainMenuView: {
                onGetUsersTap:'onGetUsersTap'
            }
        }
    },
    
	onBackTap: function () {
        var me = this;
        var mainMenuView = me.getMainMenuView();
        Ext.Viewport.setActiveItem(mainMenuView);
    },
    logOffButton2: function () {
        var me = this;
        $.session.clear();
        var loginView = me.getLoginView();
        Ext.Viewport.setActiveItem(loginView);
    }
    
    
	
	
});