var express = require('express');
var router = express.Router();
var monk = require('monk');
var db = monk('localhost:27017/test');


/* GET home page. */
router.get('/', function(req, res, next) {
	var collection = db.get('videos');
	collection.find({}, function(err, videos, next){
		if(err) return next(err);
		res.json(videos);
	});
});

router.post('/', function(req, res){
    var collection = db.get('videos');
    collection.insert({
        title: req.body.title,
        description: req.body.description
    }, function(err, video){
        if (err) throw err;
        res.json(video);
    });
});

router.get('/:id', function(req, res) {
    var collection = db.get('videos');
    collection.findOne({ _id: req.params.id }, function(err, video){
        if (err) throw err;

      	res.json(video);
    });
});


router.put('/:id', function(req, res){
    var collection = db.get('videos');
    collection.update({
        _id: req.params.id
    },
    {
        title: req.body.title,
        description: req.body.description
    }, function(err, video){
        if (err) throw err;

        res.json(video);
    });
});


router.delete('/:id', function(req, res){
    var collection = db.get('videos');
    collection.remove({ _id: req.params.id }, function(err, video){
        if (err) throw err;

        res.json(video);
    });
});


router.get('/images/:id', function(req, res, next) {
    var id = req.params.id;
    console.log(id);
    var content = fs.readFileSync(id+'.jpg');
    res.write(content, 'binary');
});

module.exports = router;