var your_app_key = '貼上你歐拉蜜應用的appkey'; //引號內貼上你的appkey
var your_app_secret = '貼上你歐拉蜜應用的appsecret'; //引號內貼上你的appsecret
var apiBaseUrl = 'https://tw.olami.ai/cloudservice/api?';

function Olami(messageText) 
{  
  var api_parameter = "nli";  // nli 是歐拉蜜的自然語言服務種類
  
  // 產生Sign key 需要時間參數
  var start = new Date();
  var current_timestamp = Number(start.getTime()).toFixed(0);
  var sign = SignGen(api_parameter,current_timestamp);
  
  var input_type =1; //１代表文字，因為歐拉蜜支援語音，這裡設１就好ＸＤ
  var rq = preRequest(input_type,messageText);  
  	
  //把key 填進去
  var formData = {
     'appkey': your_app_key,
     'api': api_parameter,
     'timestamp': current_timestamp,
     'sign': sign,
     'rq': rq,
   };
   
  var options = {
  'method' : 'post',
  'payload' : formData
  };
  
  var response = UrlFetchApp.fetch(apiBaseUrl, options);  
  var data = JSON.parse(response.getContentText());
  var reply = data.data.nli[0].desc_obj.result;
  
  return reply;
}

//按照歐拉蜜他的request需求去產生一個Sign key
function SignGen(api_parameter,current_timestamp)
{
  
  var preSignMsg = your_app_secret+"api="+api_parameter+"appkey="+your_app_key+"timestamp="+current_timestamp+your_app_secret;
  var signMsg = MD5(preSignMsg,false);
  return signMsg;
}

//把要發送給歐拉蜜的文字包成歐拉蜜api吃的樣子
function preRequest(input_type,messageText)
{
 var rq = JSON.stringify({
   'data_type':'stt',
   'data':{
     'input_type': input_type,
     'text':messageText
   },
   'nli_config':{
     'slotname': ''
   },      
 });
  
  return rq;
}
