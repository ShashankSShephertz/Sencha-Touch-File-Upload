Ext.define('Sample.controller.Popup',{  
    extend: 'Ext.app.Controller',  
    config:{  
        refs:  
        {  
            popup: {  
                selector: 'formpanel #popbox',  
                xtype: 'popupbox',  
                autoCreate: true  
            }  ,
			 mainMenuView: 'mainmenuview',
            
        }  
    }, 
    init: function() {  
        this.control({  
            'button[action=showPopup]': {  
                tap: 'showPopup'  
            },  

            'button[action=hide]':{  
                tap: 'hide'  
            },
            'button[action=App42FileUpload]':{  
                tap: 'fileUpload'  
            }			  
        });  
    },
    showPopup: function(){  
        var popup = this.getPopup();  
        Ext.Viewport.add(popup);  
        popup.show(); 
        var label = popup.down('#description');
        label.setValue('')		  
       
    },  
        
    hide: function(){  
        var popup = this.getPopup();  
        popup.hide({
            type: 'slideOut', 
            direction: 'right'
        });  
    },
    fileUpload: function(){  
        var menuView = this;
		var popup = this.getPopup(),
         filePath = document.getElementsByName("fileId"),
		 file = filePath[0].files[0],
		 upload  = new App42Upload(),
                 name = "name"+ new Date().getTime(),
				 fileType = "IMAGE",
                 description = popup.down("#description").getValue();
				 popup.setMasked({
            xtype: 'loadmask',
            message: 'Please wait...'
        });
                upload.uploadFileForUser(name,$.session.get("userName"),file, fileType,description || "App42 Upload..",{
                    success: function(object) {
                      popup.setMasked(false);
							var uploadObj = JSON.parse(object)
							var getData = uploadObj.app42.response.upload.files.file
									menuView.getMainMenuView().getStore().add(getData)
									popup.hide({
            type: 'slideOut', 
            direction: 'right'
        });
                    },
                    error: function(error) {
                    popup.setMasked(false);
					console.log("error")
					}
                });
				
        
        }
          
    	  
}); 	  