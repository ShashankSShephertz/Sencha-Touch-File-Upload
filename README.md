Sencha-Touch-File-Upload
=======================

App42 Client SDK sample for Sencha-touch.

# Running Sample:

1. [Register] (https://apphq.shephertz.com/register) with App42 platform
2. Go to dashboard and click on the App Create .
3. Fill all the mandatory fields and get your APIKey and SecretKey.

__Initialize App42 :__

Edit index.html file and put your APIKey and SecretKey overhere.

```
App42.initialize("Your APIKey","Your SecretKey");

```

Uploading files using App42 Javascript SDK:

1. Add requires statment in your sencha touch view part.

```
requires: ['Ext.field.File']

```

2. Add file tag in your view part child items.

```
xtype: 'file',
name: 'fileId'

```

3. Upload file using App42

```
var filePath = document.getElementsByName("fileId"),
file = filePath[0].files[0],
upload  = new App42Upload(),
name = "image name",
userName = "Nick"
fileType = "IMAGE",
description = "image description";
upload.uploadFileForUser(name,userName,file, fileType,description,{
  success: function(object) {
    var uploadObj = JSON.parse(object)
    var getData = uploadObj.app42.response.upload.files.file
    // do your code....
  },
  error: function(error) {
    // do your code....
    console.log("error is: " + error)
  }
});

```

