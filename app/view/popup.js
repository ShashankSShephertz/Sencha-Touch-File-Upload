Ext.define('Sample.view.Popup',{  
    extend: 'Ext.form.Panel',  
      requires: ['Ext.field.File'],
    xtype: 'popupbox',  
      
    config:{  
        itemId: 'popbox',  
        floating: true,  
        centered: true,  
        modal: true,  
        height: 300,  
        width: 500,  
        showAnimation: {
            type: 'slide', 
            direction: 'left'
        },  
        items:[  
        {
                xtype: 'label',
                html: 'Please fill all fields.',
                itemId: 'checkInFaild',
                hidden: true,
                hideAnimation: 'fadeOut',
                showAnimation: 'fadeIn',
                style: 'color:#990000;margin:5px 0px;'
            },{
            xtype: 'fieldset',
            title: 'Upload Photo',
            items: [
            {
                xtype: 'file',
				name: 'fileId'
                
            },
            {
                xtype: 'textfield',
                placeHolder: 'Description..',
                itemId: 'description',
                name: 'description'
            }
            ]
        },
        {  
            xtype: 'button',  
            action: 'App42FileUpload',  
            text: 'Upload',  
            ui: 'confirm',  
            docked: 'bottom' 
        } ,{  
            xtype: 'button',  
            action: 'hide',  
            text: 'Close',  
            docked: 'top'  
        }
        ]  
    }  
});  