Ext.define('Sample.view.Register', {
    extend: 'Ext.form.Panel',
    alias: "widget.registerview",
    requires: ['Ext.form.FieldSet', 'Ext.form.Password', 'Ext.Label', 'Ext.Img', 'Ext.util.DelayedTask','Ext.TitleBar'],
    config: {
        title: 'Login',
        items: [
           
            {
                xtype: 'label',
                html: 'User name already registered.',
                itemId: 'registerFailedLabel',
                hidden: true,
                hideAnimation: 'fadeOut',
                showAnimation: 'fadeIn',
                style: 'color:#990000;margin:5px 0px;'
            },
			{
            xtype: 'titlebar',
            title: 'Register',
            docked: 'top',
            items: [
                {
                    xtype: 'button',
                    text: 'Log In',
                    itemId: 'logIn',
                    align: 'right'
                }
            ]
        },
            {
                xtype: 'fieldset',
                title: 'App42 Register',
                items: [
                    {
                        xtype: 'textfield',
                        placeHolder: 'Username',
                        itemId: 'getUserName',
                        name: 'getUserName',
                        required: true
                    },
                    {
                        xtype: 'passwordfield',
                        placeHolder: 'Password',
                        itemId: 'getPassword',
                        name: 'getPassword',
                        required: true
                    },
					{
                        xtype: 'textfield',
                        placeHolder: 'Email',
                        itemId: 'getEmail',
                        name: 'getEmail',
                        required: true
                    }
                ]
            },
            {
                xtype: 'button',
                itemId: 'registerButton',
                ui: 'action',
                padding: '10px',
                text: 'Submit'
            }
         ],
        listeners: [{
            delegate: '#registerButton',
            event: 'tap',
            fn: 'onRegisterButtonTap'
        },{
            delegate: '#logIn',
            event: 'tap',
            fn: 'onlogIn'
        }]
    },
	onlogIn:function (){
		var me = this;
       
	   // Using a delayed task in order to give the hide animation above
        // time to finish before executing the next steps.
        var task2 = Ext.create('Ext.util.DelayedTask', function () {

            me.fireEvent('onlogIn', me);

         });

        task2.delay(500);
	},
	onRegisterButtonTap: function () {

        var me = this,
            u = me.down('#getUserName'),
            p = me.down('#getPassword'),
			e = me.down('#getEmail'),
            label = me.down('#registerFailedLabel'),
            uName = u.getValue(),
            pwd = p.getValue(),
			email = e.getValue();
			
			label.hide();

        // Using a delayed task in order to give the hide animation above
        // time to finish before executing the next steps.
        var task = Ext.create('Ext.util.DelayedTask', function () {

            label.setHtml('');

            me.fireEvent('onRegisterCommand', me, uName, pwd, email);

            u.setValue('');
            p.setValue('');
			e.setValue('');
        });

        task.delay(500);

    },
    showRegisterFailedMessage: function (message) {
        var label = this.down('#registerFailedLabel');
        label.setHtml(message);
        label.show();
    }
});