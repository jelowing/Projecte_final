var http = require("http");
var url = require("url");
var querystring = require("querystring");
var OAuth = require('oauth');
var SpotifyWebApi = require('spotify-web-api-node');
var cookedData = [];



http.createServer(function(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Petició per a  " + pathname + " rebuda.");

    if (pathname == '/twittertop') {

        twitterKey = 'Arr7YbSyFAKz7ihqkPQcqrF4B';
        twitterSecret = 'qEVFCWd3yojuvaYCXyyPEC2anHts0k5WsIaxEk8TFtWOGjUNad';
        token = '249649477-cFiAfHIpjOItU5fez7SFtkr3R9oedfMeII7y6vRd';
        secret = '0BAo0bZxTKOEIg9TpPoZdafazAxm68kycErwL2fIALkgk';

        var oauth = new OAuth.OAuth(
            'https://api.twitter.com/oauth/request_token',
            'https://api.twitter.com/oauth/access_token',
            twitterKey,
            twitterSecret,
            '1.0A',
            null,
            'HMAC-SHA1'
        );
        oauth.get(
            'https://api.twitter.com/1.1/trends/place.json?id=1',
            token,
            secret,
            function(error, data) {
                cookedData = [];
                if (error) console.error(error);
                var dataObject = JSON.parse(data);
                try {
                    for (var index in dataObject[0].trends) {
                        if (dataObject[0].trends[index].tweet_volume != null) {
                            cookedData.push({
                                name: dataObject[0].trends[index].name,
                                y: dataObject[0].trends[index].tweet_volume,
                                drilldown: dataObject[0].trends[index].name
                            });
                        }

                    }

                } catch (err) {
                    console.error(err);
                }


                sortByKey(cookedData, 'y');

                response.writeHead(200, {
                    "Content-Type": "text/html; charset=utf-8",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "Accept, Access-Control-Allow-Headers, Access-Control-Allow-Origin, Content-Type",
                    "Access-Control-Allow-Methods": "GET,POST,OPTIONS"
                });
                response.end(JSON.stringify(cookedData));
            }
        );
    } else if (pathname == '/spotifytop') {

        var spotifyApi = new SpotifyWebApi({
            clientId: '310da85c32b946a4846b5b8fea802eae',
            clientSecret: '47cbf950a59b46bb8c82b08e8817e284',
            redirectUri: 'http://localhost:8888/spotifytop'
        });
        spotifyApi.setAccessToken('BQAgk1wQsNvJjemSgTDrjTWYLp2vfOs0VB_UhViRPoGDES0EfLntaLSE-LSs_njSmLV1eY8fKbNu460cKSpbD_bKIhvbGVZzrYTkgRgCDaCaiHJLOVpz4WcMoG-UAirqPhVgzn2vnK-UQKe03Xu-PUeIvEskIK_zabSqjnFjj3B0FoMhFjVUuJhIQSLcEFOuvfNGUx63nscAvG05g24z-s48hWSQCYDHPxiAa_qU5trv1wONwPkMGmon4KOvq5GIRraSH6uFJV1wt0KGPeTizeazmCgxGR3hXZDQgTj3oGlS8kdQ');
        spotifyApi.getPlaylistTracks('spotify', '4hOKQuZbraPDIfaGbM3lKI', {
            limit: 20,
            offset: 5
        }, function(err, data) {
            if (err) {
                console.error(err);
            } else {
                cookedData = [];
                for (var index in data.body.items) {
                    cookedData.push({
                        name: data.body.items[index].track.name,
                        y: data.body.items[index].track.popularity,
                        drilldown: data.body.items[index].track.name
                    });
                }


                sortByKey(cookedData, 'y');

                response.writeHead(200, {
                    "Content-Type": "text/html; charset=utf-8",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "Accept, Access-Control-Allow-Headers, Access-Control-Allow-Origin, Content-Type",
                    "Access-Control-Allow-Methods": "GET,POST,OPTIONS"
                });
                response.end(JSON.stringify(cookedData));
            }
        });

    } else {
        console.log("PATH ERROR");
    }
}).listen(8888);


function sortByKey(array, key) {
    return array.sort(function(a, b) {
        var x = a[key];
        var y = b[key];
        return ((x < y) ? 1 : ((x > y) ? -1 : 0));
    });
}
