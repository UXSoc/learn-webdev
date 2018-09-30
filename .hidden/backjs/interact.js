var colors = require('colors');
var options = require('../config.json');
var emoji_engine = require('node-emoji');
var path = require('path');

var uniqueRandomArray = require('unique-random-array');
var rand_color = uniqueRandomArray(options.colors);
var rand_emoji = uniqueRandomArray(options.emojis);

//return - string of folder name
function get_current_folder() {
    if (options.modules.length === 0) {
        console.log("Error: ".red.bold + "not modules found");
        console.log("Serving default template as a result");
        //returns the current dir, which is just '.' in unix
        //this is not just a period
        //when plugged into get_current_json, this allows it to get the default template path
        return ".";
    }

    var current_folder = options.modules[options.current - 1].folder;
    return current_folder;
}

function get_current_json() {
    return require('../modules/' + get_current_folder() + '/template.json');
}

function special_requests(app) {
    app.get('/on-load', function(req, res) {
    var color = rand_color();
    var emoji = emoji_engine.get(rand_emoji());

     var output = {
       color,
       emoji
     };
     res.json(output);
    });

    app.get('/current', function (req, res) {
        var current_config = get_current_json();

        const send_data = {
            title: current_config.title,
            number: options.current,
        };

        res.json(send_data);
        console.log("Loading module " + current_config.title.green.bold + ' #' + options.current + " successfully");
    });

    app.get('/home', function (req, res) {
        console.log("Going home".dim);
        res.sendFile(path.join(__dirname + '/../html/home.html'));
    });
}

module.exports = {
    run: function(app) {
        console.log("Starting Front End UI".bold + " Version: ".dim + process.env.npm_package_version.dim);

        special_requests(app);
    }
};
