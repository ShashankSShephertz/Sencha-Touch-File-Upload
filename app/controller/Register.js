Ext.define('Sample.controller.Register', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
            registerView: 'registerview',
            loginView: 'loginview',
			mainMenuView: 'mainmenuview',
        },
        control: {
            loginView: {
                loginCommand: 'loginCommand'
            },
            registerView: {
                onRegisterCommand: 'onRegisterCommand',
				onlogIn: 'onlogIn'
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
	onlogIn: function (view, username, password, email) {
		var me = this,
            loginView = me.getLoginView();
	Ext.Viewport.animateActiveItem(loginView, me.getSlideLeftTransition())
	},
    onRegisterCommand: function (view, username, password, email) {

        console.log('Username: ' + username + '\n' + 'Password: ' + password);

        var me = this,
            registerView = me.getRegisterView();

        if (username.length === 0 || password.length === 0  || email.length ===0) {

            registerView.showSignInFailedMessage('Please fill all fields.');
            return;
        }

        registerView.setMasked({
            xtype: 'loadmask',
            message: 'Please wait...'
        });
		
		// Registretion using App42  
		var uNameText = username;
		var pwdText = password;
		var emailText = email;
		new App42User().createUser(uNameText, pwdText,emailText,{
                    success: function(object) {
                        console.log('Signed in.');
						var loginView = me.getLoginView();
						var registerView = me.getRegisterView();
						mainMenuView = me.getMainMenuView();
						registerView.setMasked(false);

						Ext.Viewport.animateActiveItem(loginView, me.getSlideLeftTransition());
                    },
                    error: function(error) {
						var registerView = me.getRegisterView();
						registerView.showRegisterFailedMessage('Register failed. Please try again later.');
						registerView.setMasked(false);
                    }
                }); 
        
    }
});