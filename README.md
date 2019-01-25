ideas for implementation



check if the url is draft draft.premierleague.com

using the webRequest api's OnBeforeSendHeadersOptions, check for https://draft.premierleague.com/api/league/.....
  chrome.webRequest.onBeforeSendHeaders.addListener(function callback)
  url
  using "requestHeaders", parse the header league id value


if so then check for the network file

and set the color of the extension to be highlighted




### Future Plans

have the extension check if the users team is winning and losing and display accordingly instead of higlighting the color
