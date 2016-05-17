<?php
class Twitter{
 
    function getTweets($user){
        ini_set('display_errors', 1);
        require_once('TwitterAPIExchange.php');
 
       $settings = array(
		    'oauth_access_token' => "249649477-cFiAfHIpjOItU5fez7SFtkr3R9oedfMeII7y6vRd",
		    'oauth_access_token_secret' => "0BAo0bZxTKOEIg9TpPoZdafazAxm68kycErwL2fIALkgk",
		    'consumer_key' => "Arr7YbSyFAKz7ihqkPQcqrF4B",
		    'consumer_secret' => "qEVFCWd3yojuvaYCXyyPEC2anHts0k5WsIaxEk8TFtWOGjUNad"
		);

 
        $url = 'https://api.twitter.com/1.1/statuses/user_timeline.json';
        $getfield = '?screen_name='.$user.'&count=100';        
        $requestMethod = 'GET';
        $twitter = new TwitterAPIExchange($settings);
        $json =  $twitter->setGetfield($getfield)
                     ->buildOauth($url, $requestMethod)
                     ->performRequest();
        return $json;
 
    }
 

}
 
$twitterObject = new Twitter();
$jsonraw =  $twitterObject->getTweets("alex_esquiva");
 
?>