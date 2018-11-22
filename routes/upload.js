const Router = require('koa-router');
const multer = require('koa-multer');

const router = new Router({
    prefix: '/wxapi' // 前缀
});

//以下是配置
var storage = multer.diskStorage({
    //定义文件保存路径
    destination: function (req, file, cb) {
        cb(null, './Images/');//路径根据具体而定。如果不存在的话会自动创建一个路径
    },                       //注意这里有个，
    //修改文件名
    filename: function (req, file, cb) {
        var fileFormat = (file.originalname).split('.');
        cb(null, Date.now() + '.' + fileFormat[fileFormat.length - 1]);
    }
});

var upload = multer({storage: storage});


var ExifImage = require('exif').ExifImage;

router.post('/file', upload.single('file'), async (ctx, next) => {

    console.log(ctx.req.body);

    try {
        ExifImage({image: `./Images/${ctx.req.file.filename}`}, function (error, exifData) {
            if (error)
                console.log('Error: ' + error.message);
            else {
                console.log(exifData); // Do something with your data! });
            }
        });
    } catch (error) {
        console.log('Error: ' + error.message);
    }

    ctx.body = {
        filename: ctx.req.file.filename  //返回文件名
    };
});

router.get('/file2', function (ctx) {
    ctx.body = 'successful!'
});


module.exports = router;