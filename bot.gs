var ACCESS_TOKEN = '貼上你的哈哈姆特ACCESS_TOKEN'; //引號內貼上你的ACCESS_TOKEN
var CName = '貼上你的哈哈姆特指令代號'; //引號內貼上你的指令代號

function doPost(e) {

  var data = JSON.parse(e.postData.contents);
  console.log(data);
  var webhook_event = data.messaging[0];
  var senderID = data.messaging[0].sender_id; //把使用者id抓出來
  var reciveMessage = data.messaging[0].message.text; //把使用者丟給bot的文字抓出來
  
  replyMessage(senderID, reciveMessage); //呼叫判斷
  
  return ContentService.createTextOutput("200 OK");
}

//送出前的判斷寫在這裡
function replyMessage(senderID, reciveMessage)
{
  var endReply = "May the force be with you";
  
  
  if(reciveMessage == CName)
  {
    sendTextMessage(senderID, "來聊天吧");
  }
  else if(reciveMessage == "車圖")
  {
    // 圖片資訊
    var imageID = "貼上你的圖片id";  //引號內貼上你的圖片id
    var imageExt = "貼上你的圖片ext";  //引號內貼上你的圖片ext
    var imageWidth = "貼上你的圖片width";  //引號內貼上你的圖片width
    var imageHeight = "貼上你的圖片height";  //引號內貼上你的圖片height
  
   sendImageMessage(senderID, imageID, imageExt, imageWidth, imageHeight)
  }
  else
  {
   sendTextMessage(senderID, Olami(reciveMessage));
  }
}

//送出文字訊息給哈哈姆特
function sendTextMessage(recipientId, messageText) 
{
   var url = "https://us-central1-hahamut-8888.cloudfunctions.net/messagePush?access_token="+ACCESS_TOKEN;
  
    var response = UrlFetchApp.fetch(url, {
      'headers': {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      'method': 'post',
      'payload': JSON.stringify({
        'recipient':{
          'id': recipientId
        },
        'message':{
          'type': 'text',
          'text': messageText
        }
      }),
    });
    
    if(response.getResponseCode() === 200)
    {
      Logger.log("response: "+response);
     }
}

//送出圖片訊息給哈哈姆特
function sendImageMessage(recipientId, imageID, imageExt, imageWidth, imageHeight) 
{
   var url = "https://us-central1-hahamut-8888.cloudfunctions.net/messagePush?access_token="+ACCESS_TOKEN;
  
    var response = UrlFetchApp.fetch(url, {
      'headers': {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      'method': 'post',
      'payload': JSON.stringify({
        'recipient':{
          'id': recipientId
        },
        'message':{
          'type': 'img',
          'id':imageID,
          'ext':imageExt,
          'width':imageWidth,
          'height':imageHeight
        }
      }),
    });
    
    Logger.log("response: "+response);

}
