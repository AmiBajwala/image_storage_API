var express = require('express')
var multer  = require('multer')
var app = express()
var port = 3000;

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null,  + Date.now()+'_'+file.originalname)
    }
})
var upload = multer({ storage: storage })

app.use('/uploads', express.static('uploads'));

app.post('/profile-upload-single', upload.single('file'), function (req, res, next) {
  
    console.log(JSON.stringify(req.file.filename))
    let response = {Status : "Success" , Message : "File uploaded successfully" ,"FileName" : req.file.filename}
    return res.send(response)
  })


  app.post('/profile-upload-multiple', upload.array('files', 12), function (req, res, next) {

    let array = [];
    for(let i = 0 ; i<req.files.length ; i++)
    {
      array.push( {"file " : req.files[i].filename})
    }
    let response = {Status : "Success" , Message : "Files uploaded successfully" ,"FileName" : array}
    
    return res.send(response)
})


app.listen(port,() => console.log(`Server running on port ${port}!`))
