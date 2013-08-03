Ext.define('Sample.controller.Login', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
            loginView: 'loginview',
            mainMenuView: 'mainmenuview',
			registerView: 'registerview'
        },
        control: {
            loginView: {
                signInCommand: 'onSignInCommand',
				registerPageTap:'onRegisterClick'
            },
            mainMenuView: {
                onSignOffCommand: 'onSignOffCommand'
            }
        }
    },

    // Session token

    sessionToken: null,

    // Transitions
    getSlideLeftTransition: function () {
        return { type: 'slide', direction: 'left' };
    },

    getSlideRightTransition: function () {
        return { type: 'slide', direction: 'right' };
    },
	
	onRegisterClick: function (view, username, password) {
	var me = this,
            registerView = me.getRegisterView();
	Ext.Viewport.animateActiveItem(registerView, me.getSlideLeftTransition())
	},

    onSignInCommand: function (view, username, password) {

        console.log('Username: ' + username + '\n' + 'Password: ' + password);

        var me = this,
            loginView = me.getLoginView();

        if (username.length === 0 || password.length === 0) {

            loginView.showSignInFailedMessage('Please enter your username and password.');
            return;
        }

        loginView.setMasked({
            xtype: 'loadmask',
            message: 'Signing In...'
        });
		
		// Authentication With App42  
		var uName = username;
		var pwd = password;
		new App42User().authenticate(uName, pwd,{
                    success: function(object) {
                        console.log('Signed in.');
						var loginView = me.getLoginView();
						mainMenuView = me.getMainMenuView();
						loginView.setMasked(false);
						setUserLogin(object);
						Ext.Viewport.animateActiveItem(mainMenuView, me.getSlideLeftTransition());
						
                    },
                    error: function(error) {
						var loginView = me.getLoginView();
						loginView.showSignInFailedMessage('Login failed. Please try again later.');
						loginView.setMasked(false);
                    }
                }); 
        
    },

	onSignOffCommand: function () {
		var me = this;
		$.session.clear();
		var loginView = me.getLoginView();
		Ext.Viewport.animateActiveItem(loginView, me.getSlideLeftTransition());
    }
});