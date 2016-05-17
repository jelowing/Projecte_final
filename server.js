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
  function (error, data, response){
    var cookedData = [];
    if (error) console.error(error);
     var dataObject = JSON.parse(data);
     //var stringify = JSON.stringify(data, 0, 2);

     for( var index in dataObject[0].trends){
      cookedData.push([dataObject[0].trends[index].name,dataObject[0].trends[index].tweet_volume])        
        //console.log(dataObject[0].trends[index].tweet_volume);
     }

     console.log(cookedData);
     //console.log(JSON.stringify(data, 0, 2));
    //console.log(response);
    
});