'use strict'



const Telegram = require('telegram-node-bot')
const TelegramBaseController = Telegram.TelegramBaseController
const TextCommand = Telegram.TextCommand
const dotenv = require('dotenv');
dotenv.config();
const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
const tg = new Telegram.Telegram(TELEGRAM_TOKEN, {workers: 2})
var ImageJS = require('imagejs');
var sleep = require('system-sleep');
var inimage = 'png1.png';
var spareimage = 'png2.png';



class options extends TelegramBaseController {
    /**
     * @param {Scope} $
     */
    Program($) {
		$.sendMessage("اختر أحد المهام التالية:"+"\n"+'لتلوين المحاضرات على الجدول وإرسالها على المجموعة /color'+"\n"+'للتراجع عن آخر تعديل على الجدول /reverse'+"\n"+'لعرض التعليمات /instructions')
	}
    get routes() {
        return {
            'text': 'Program'
        }
    }
}


class instructions extends TelegramBaseController {
    /**
     * @param {Scope} $
     */
    Program($) {
	    $.sendMessage('جاري تحميل التعليمات، انتظر رسالة اكتمال التحميل')
		$.sendPhoto({ path: 'introduction 01.png'})
		.then(function (message) {
			console.log("help11");
			$.sendMessage("للتواصل: facebook.com/omarhammami96")
			$.sendMessage("في الصورة التالية سترى برنامج المحاضرات قبل أي تعديل")
		    $.sendPhoto({ path: 'png.png'})
		    .then(function (message) {
                console.log("help22");;
		        $.sendPhoto({ path: 'introduction 02.png'})
				.then(function (message) {
                    console.log("help33");;
		            $.sendPhoto({ path: 'introduction 03.png'})
		            .then(function (message) {
                        console.log("help44");
		                $.sendMessage('اكتمل التحميل')
		            });
		        });
			});
		}); 
	}
    get routes() {
        return {
            'text': 'Program'
        }
    }
}

class reverse extends TelegramBaseController {
    /**
     * @param {Scope} $
     */
    Program($) {
          var bitmap = new ImageJS.Bitmap();
          bitmap.readFile(spareimage)
	      .then(function() {
              return bitmap.writeFile(inimage, { quality:100 })
	          .then(function() {
	       	    console.log("reversed");
			    $.sendPhoto({ path: inimage})
	            $.sendMessage("تم التراجع");
	    });
	});

}

    get routes() {
        return {
            'start': 'Program'
        }
    }
}


class startimage extends TelegramBaseController {
    /**
     * @param {Scope} $
     */
    Program($) {
		//$.sendMessage($.message.text);
		
      const form = {
        img: {
            q: 'أرسل جدول المحاضرات الذي تريد استخدامه',
            error: 'sorry, wrong input',
            validator: (message, callback) => {
                if(message) {
                    callback(true)
                    return
                }
                callback(false)
              }
           }
        }
	    $.runForm(form, (result) => {
			$.sendPhoto('AAQEABOgpqoZAAShG2cZAw4zAAF9NAACAg')
			   }); 

	}

    get routes() {
        return {
            'start': 'Program'
        }
    }
}

class color extends TelegramBaseController {
    /**
     * @param {Scope} $
     */
    Program($) {
	    const form = {
        name: {
            q: 'اكتب قيم المحاضرة',
            error: 'الإدخال ليس رقماً',
            validator: (message, callback) => {
                if(message.text) {
                    callback(true, message.text) //you must pass the result also
                    return
                }
                callback(false)
            }
        }
    }

    $.runForm(form, (result) => {
        var input = result.name
		console.log(input)
	    colorlecture(input);
		$.sendPhoto({ path: inimage})
		function pad(a,b){return(1e15+a+"").slice(-b)}
		var result = "تجدون على الموقع محاضرة: "
		for (var s = 0; s < Lectures.length;  s++){
	      if(typeof Lectures[s] != "undefined" && Lectures[s] != null && Lectures[s].length > 0) {result +="\n"+getenames(s)+" ";
			for (var l = 0; l < Lectures[s].length;  l++){
			   if (l>0 && l<Lectures[s].length){result += " + "}
			   result += pad(Lectures[s][l],2)+" ";
			}
	      }
		}
		tg.api.sendMessage(-214831062,result)
		.then(function (message){
		    $.sendMessage("تم الإرسال على المجموعة"+"\n"+"جاري تحميل الصورة..")});
		result = null;		
    })
	
var x = 0;		
var color;

// year=3, semester=2
var y1 = 40;
var y3 = 69;
var y9 = 72.25;//+ 0.25
var x1 = 931;
var x3 = 897;
var x9 = 893.3;//+0.3

var SquareH = Math.abs(y1-y3);
var SquareW = Math.abs(x1-x3);

var LineH = Math.abs(y3-y9);
var LineW = Math.abs(x3-x9);

var DistanceH = SquareH + LineH;
var DistanceW = SquareW + LineW;

var Subject = 0;
var Section = 0;
var Lecture = 0;
var Lectures = [[],[],[],[],[],[],[],[],[]];
var currindex = 0;

var Subjectname = ['التشريح المرضي العام','الجراحة الصغرى','الطفيليات','الكيمياء السريرية','علم المناعة','آداب الطب','عملي الجراحة الصغرى','عملي الطفيليات','عملي التشريح المرضي'];


function FindSubject(text) {
    var SpI = text.indexOf(" ", currindex);
    check(parseInt(text.substring(currindex, SpI)));
    
    Subject = parseInt(text.substring(currindex, SpI));
    currindex = SpI + 1;
    FindSection(text);
     }

function FindSection(text) {
    var SpI = text.indexOf(" ", currindex);
    check(parseInt(text.substring(currindex, SpI)));
    Section = parseInt(text.substring(currindex, SpI));
    currindex = SpI + 1;
    FindLecture(text);
     }

function FindLecture(text) {
    var SpI = text.indexOf(" ", currindex);
    if (SpI === -1){
        check(parseInt(text.substring(currindex, text.length)));
        parseInt(text.substring(currindex, text.length));
        Lecture = parseInt(text.substring(currindex, text.length));
        currindex = text.length;
    }else{
       check(parseInt(text.substring(currindex, SpI)));
       Lecture = parseInt(text.substring(currindex, SpI));
       currindex = SpI + 1;
      }
    Color(Subject,Section,Lecture);
	if (Lectures[Subject-1][Lectures[Subject-1].length-1] != Lecture){Lectures[Subject-1].push(Lecture);};
     }


function Color(SubjectV, SectionV, LectureV){
  var ZPcolorH = y1 + ((SubjectV-1) * 2 * DistanceH);
  var ZPcolorW = x3 + ((LectureV-1) * -DistanceW);
  if (LectureV > 20){ZPcolorH += DistanceH; ZPcolorW += 20 * DistanceW;}
  getcolor(SubjectV, SectionV);
  var EPcolorH = ZPcolorH + SquareH;
  var EPcolorW = ZPcolorW + SquareW;
  
  
    var bitmap = new ImageJS.Bitmap();
    bitmap.readFile(inimage)
	.then(function() {
        return bitmap.writeFile(spareimage, { quality:100 })
	    .then(function() {
		    console.log("saved a copy");
	    });
	});
	
	

    var bitmapx = new ImageJS.Bitmap();
    bitmapx.readFile(inimage)
	.then(function() {
        for (var H = Math.round(ZPcolorH); H <= EPcolorH; H++){
            for (var W = Math.round(ZPcolorW); W <= EPcolorW; W++){
				var pcolor = {};

                pcolor = bitmapx.getPixel(W,H, pcolor);
				var red = Math.min(pcolor.r,color[0]);		
				var green = Math.min(pcolor.g,color[1]);
				var blue = Math.min(pcolor.b,color[2]);
				
                bitmapx.setPixel(W,H, red,green,blue);
            }
        }
     return bitmapx.writeFile(inimage, { quality:100 })
	     .then(function() {
		    console.log("sending "+x);
			x = x + 1;
    });
  });

}
     
function FindWhat(text){
	
    var SpI = text.indexOf(" ", currindex);
    var PI = text.indexOf(".", currindex);
    var DPI = text.indexOf(":", currindex);
	
    if (SpI === -1){SpI = text.length;}
    if (PI === -1){PI = text.length;}
    if (DPI === -1){DPI = text.length;}
	
    var min = Math.min(SpI,Math.min(PI,DPI));
	
    if(min === SpI){
        FindLecture(text);
    }else{
         if(min === PI){
            currindex += 2;
            FindSection(text);
            Color(Subject,Section,Lecture);
         }else{
            currindex += 2;
            FindSubject(text);
            Color(Subject,Section,Lecture);
        }
    }
}		


function check(num){
     if (num == '-1') {$.sendMessage("الإدخال -1");sleep(1*1000);currindex = 0;process.exit();}
     if (num == "") {$.sendMessage("الإدخال فارغ"); sleep(1*1000);currindex = 0;process.exit();}
     if (isNaN(num)) {$.sendMessage("الإدخال ليس رقماً");sleep(1*1000);currindex = 0;process.exit();}
     if (num == 0) {$.sendMessage("الإدخال صفر!"); sleep(1*1000);currindex = 0;process.exit();}
     if (num > 40) {$.sendMessage("الإدخال رقم خاطئ");sleep(1*1000);currindex = 0;process.exit();}
}		


var nc;

function choosecolor(){
    if (nc === 1){color =  [246,125,75];}else{
    if (nc === 2){color =  [212,64,138];}else{
    if (nc === 3){color =  [238,156,156];}else{
    if (nc === 4){color =  [238,237,108];}else{
    if (nc === 5){color =  [47,131,184];}else{
    if (nc === 6){color =  [83,235,126];}else{
    if (nc === 7){color =  [133,110,100];}else{
    if (nc === 8){color =  [24,158,62];}else{
    if (nc === 9){color =  [212,86,64];}else{
    if (nc === 10){color = [248,88,88];}else{
    if (nc === 11){color = [246,75,246];}else{
    if (nc === 12){color = [95,184,47];}else{
    if (nc === 13){color = [171,60,60];}else{
    if (nc === 14){color = [246,75,246];}else{
    if (nc === 15){color = [48,116,158];}else{
    if (nc === 16){color = [158,40,40];}else{
    if (nc === 17){color = [95,184,47];}else{
    if (nc === 18){color = [209,74,74];}else{
    //if (nc === 19){color = [95,184,47];}else{//Rn
    //if (nc === 20){color = [171,60,60];}else{
    //if (nc === 21){color = [107,38,38];}else{
    //if (nc === 22){color = [248,88,88];}else{
    //if (nc === 23){color = [48,116,158];}else{
    //if (nc === 24){color = [209,74,74];}
}}}}}}}}}}}}}}}}}}//}}}}}
}

function getenames(S){
	var thisSubjectname = Subjectname[S];
	return thisSubjectname;
}


function colorlecture(input){
    FindSubject(input);
    sleep(3*1000);
    while(currindex < input.length){
      FindWhat(input);
	  sleep(3*1000);
    }
	currindex = 0;
}


function getcolor(Subject, Section){
    nc = Subject + Section - 1;
    choosecolor();
}		
    }

    get routes() {
        return {
            'start': 'Program'
        }
    }
}



tg.router
    .when(
        new TextCommand('/instructions', 'text'),
        new instructions()
	)

	.when(
        new TextCommand('/color', 'start'),
        new color()
	)

	//.when(
    //    new TextCommand('/image', 'start'),
    //    new startimage()
	//)
	
	.when(
        new TextCommand('/reverse', 'start'),
        new reverse()
	)
	
	.when(
        new TextCommand('/start', 'text'),
        new options()
	)

	
