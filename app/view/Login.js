Ext.define('Sample.view.Login', {
    extend: 'Ext.form.Panel',
    alias: "widget.loginview",
    requires: ['Ext.form.FieldSet', 'Ext.form.Password', 'Ext.Label', 'Ext.Img', 'Ext.util.DelayedTask','Ext.TitleBar'],
    config: {
        title: 'Login',
        items: [
           
            {
                xtype: 'label',
                html: 'Login failed. Please enter the correct credentials.',
                itemId: 'signInFailedLabel',
                hidden: true,
                hideAnimation: 'fadeOut',
                showAnimation: 'fadeIn',
                style: 'color:#990000;margin:5px 0px;'
            },
			{
            xtype: 'titlebar',
            title: 'App42',
            docked: 'top',
            items: [
                {
                    xtype: 'button',
                    text: 'Sign In',
                    itemId: 'signInButton',
                    align: 'right'
                }
            ]
        },
            {
                xtype: 'fieldset',
                title: 'App42 Login',
                items: [
                    {
                        xtype: 'textfield',
                        placeHolder: 'Username',
                        itemId: 'userNameTextField',
                        name: 'userNameTextField',
                        required: true
                    },
                    {
                        xtype: 'passwordfield',
                        placeHolder: 'Password',
                        itemId: 'passwordTextField',
                        name: 'passwordTextField',
                        required: true
                    }
                ]
            },
            {
                xtype: 'button',
                itemId: 'logInButton',
                ui: 'action',
                padding: '10px',
                text: 'Log In'
            }
         ],
        listeners: [{
            delegate: '#logInButton',
            event: 'tap',
            fn: 'onLogInButtonTap'
        },{
            delegate: '#signInButton',
            event: 'tap',
            fn: 'onSignInButtonTap'
        }]
    },
	
	onSignInButtonTap:function (){
	var me = this;
       
	   // Using a delayed task in order to give the hide animation above
        // time to finish before executing the next steps.
        var task2 = Ext.create('Ext.util.DelayedTask', function () {

            me.fireEvent('registerPageTap', me);

         });

        task2.delay(500);
	},
	onLogInButtonTap: function () {

        var me = this,
            usernameField = me.down('#userNameTextField'),
            passwordField = me.down('#passwordTextField'),
            label = me.down('#signInFailedLabel'),
            username = usernameField.getValue(),
            password = passwordField.getValue();

        label.hide();

        // Using a delayed task in order to give the hide animation above
        // time to finish before executing the next steps.
        var task = Ext.create('Ext.util.DelayedTask', function () {

            label.setHtml('');

            me.fireEvent('signInCommand', me, username, password);

            usernameField.setValue('');
            passwordField.setValue('');
        });

        task.delay(500);

    },
    showSignInFailedMessage: function (message) {
        var label = this.down('#signInFailedLabel');
		label.setHtml(message);
        label.show();
    }
});