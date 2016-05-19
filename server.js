var http = require("http");
var url = require("url");
var querystring = require("querystring");
var cookedData = [];



http.createServer(function(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("Petició per a  " + pathname + " rebuda.");

    if (pathname == '/twittertop') {

        twitterKey = 'Arr7YbSyFAKz7ihqkPQcqrF4B';
        twitterSecret = 'qEVFCWd3yojuvaYCXyyPEC2anHts0k5WsIaxEk8TFtWOGjUNad';
        token = '249649477-cFiAfHIpjOItU5fez7SFtkr3R9oedfMeII7y6vRd';
        secret = '0BAo0bZxTKOEIg9TpPoZdafazAxm68kycErwL2fIALkgk';

        var OAuth = require('oauth');
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
              }catch (err) {
                console.error(err);
              }
                console.log(cookedData);

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

        var SpotifyWebApi = require('spotify-web-api-node');
        var spotifyApi = new SpotifyWebApi({
            clientId: '310da85c32b946a4846b5b8fea802eae',
            clientSecret: '47cbf950a59b46bb8c82b08e8817e284',
            redirectUri: 'http://localhost:8888/spotifytop'
        });
        spotifyApi.setAccessToken('BQB_-OWvOeOXVigRWdhzerEs-jTQ98JQ1H92ncRvzdFqoT6ruqvIucVF9fLkIhTFI8WR1ezOI0UvVQu9BH4oBb1ydyVgZ-yfvDJ05Itl5GD5ixf_jjKnhZUbUTRwDEccpx4xOJsAPDHdbVwrs3hgHrNXd0UoHqR_OkYNtl6nfoAic5lnm1n1Jt44oVff-1whJCfYIrOkUMo1VFlX6xLZ-1mTtLKW_UEA25poqBx4GocGIqQQMP1lxzklxI4Kj-6KbwmVEKvn9tzZaThvyk9gZHW-jrbAlnTvqC7pDm8a96CivecQ');
        spotifyApi.getPlaylistTracks('spotify', '0JvRcIxfujqdEYN3a1aYOw', {
            limit: 10,
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
                console.log(cookedData);

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
