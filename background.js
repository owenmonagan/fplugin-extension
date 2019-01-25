chrome.runtime.onInstalled.addListener(function() {
});
chrome.storage.sync.get('leagueID', function(data) {
  if (data.leagueID != null){
    chrome.browserAction.setIcon({
      path : {
        "16": "images/fplugin16.png",
        "32": "images/fplugin32.png",
        "48": "images/fplugin48.png",
        "128": "images/fplugin128.png"
      }
    });
    console.log("something");
  } else{
    console.log("naada");
  }
});
//Read the header to find the league id and then store it
chrome.webRequest.onBeforeSendHeaders.addListener(function (details){
  if ((details.url.includes('https://draft.premierleague.com/api/league', 0) == true)  && (details.url.includes('details', 0) == true )){
    var reg = /\d/g;
    var matchedValues = details.url.match(reg);
    var id ="";
    for (var i = 0; i < matchedValues.length; i++){
      id = id + matchedValues[i]
    }
    chrome.storage.sync.get('leagueID', function(data) {
      if (data.leagueID  != id){
        console.log('The league id of: "'+ data.leagueID+'" has changed');
        chrome.tabs.create({url:"http://draft.fplugin.com/?leagueid="+id});
      }
    });
    chrome.storage.sync.set({leagueID: id}, function() {
      console.log('Saved the league id of : '+ id);
      chrome.browserAction.setIcon({
        path : {
          "16": "images/fplugin16.png",
          "32": "images/fplugin32.png",
          "48": "images/fplugin48.png",
          "128": "images/fplugin128.png"
        }
      });
    });
  }
},
{urls: ["<all_urls>"]},
["requestHeaders"]
);

//if the league id is stored send the user to the live score, else send them to the fantasy pl website
chrome.browserAction.onClicked.addListener(function(activeTab){
chrome.storage.sync.get('leagueID', function(data) {
  console.log(data);
  if (data.leagueID != null){
    var newURL = "http://draft.fplugin.com/?leagueid="+data.leagueID;
    console.log("sending the user to: "+ newURL)
    chrome.tabs.create({ url: newURL });
  } else{
    var newURL = "https://draft.premierleague.com";
    console.log("there is not a league id saved, send them to draft.premierleague.com website to retrive it")
    chrome.tabs.create({ url: newURL });
  }
});
});
