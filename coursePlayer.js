

function onYouTubeIframeAPIReady() {

	console.log("i am here");
c.youtubePlayer=new YT.Player('player', {
          events: {
            'onReady': function(event){

            
		 			event.target.playVideo();
		 		console.log(event.target.getDuration());

		 		$("<input id=\"youtubeVideoSlider\" type=\"range\" min=\"0\" max=\""+event.target.getDuration()+"\" step=\"5\" value=\"0\" style=\"font-family: 'Strait', sans-serif;font-size:10px;position:absolute;top:96%;left:45%;\" /></div>").appendTo(c.chapterContainer);
		 		c.youtubeVideoSlider=$("#youtubeVideoSlider");
		 		c.youtubeVideoSlider.bind("change",function(){

		 			if(c.youtubePlayer)
		 			{
		 				c.youtubePlayer.seekTo(parseInt($(this).attr("value")), true);
		 			}
		 		});
            },
            'onStateChange': function(){


            }
          }
        });
 			
 }		

var coursePlayer=function (course,finishCallback)
{
	this.courseWare=course;
	this.coursePlayerWidth=0;
	this.coursePlayerHeight=0;
	this.coursePlayer=null;
	this.closeButton=null;
	this.chapterCount=0;
	this.courseTimer=null;
	this.courseSecondCount=0;
	this.playerSecondCount=0;
	this.chapterContainer=null;
	this.chapterQuestionContainer=null;
	this.chaptersBrowserContainer=null;
	this.chapterQuestionContainerButton=null;
	this.chaptersBrowserContainerButton=null;
	this.timerContainer=null;
	this.finishCallback=finishCallback;
	this.courseFinishStatus=false;
	this.courseStartStatus=false;
	this.pointsContainer=null;
	this.youtubePlayer=null;
	this.youtubePlayerButton=null;
	this.topcourseName=null;
	this.evaluateFinishButton=null;
	this.youtubeVideoSlider=null;
	this.init=function()
	{
		self=this;
	//self.courseWare=course;
	self.courseFinishStatus=false;
	self.courseStartStatus=false;
	self.coursePlayerWidth=$(document).width();
	self.coursePlayerHeight=$(document).height();
	
	self.coursePlayer=$("#coursePlayer");
	self.coursePlayer.empty();
	
	//coursePlayer.css({'background-color':'#1d1e19','position':'fixed','top':$(document).height()*0.05+'px','left':$(document).width()*0.10+'px'}).width(coursePlayerWidth).height(coursePlayerHeight);
	self.coursePlayer.css({'background-color':'#1d1e19','position':'fixed','top':'0px','left':'0px'}).width(self.coursePlayerWidth).height(self.coursePlayerHeight);
	

	$("<a id=\"closeButton\">close</a>").appendTo(self.coursePlayer);
	self.closeButton=$("#closeButton");

	self.closeButton.css({'cursor':'pointer','position':'absolute','top':self.coursePlayerHeight*0.01+'px','left':self.coursePlayerWidth*0.95+'px','color':'gray'}).click(function(){
		self.finishCourse();
		
		});



	$("<h4 class=\"topCourseName\" style=\"color:white;position:absolute;top:0px;\">"+self.courseWare.courseName.toLowerCase()+"</h4>").appendTo(self.coursePlayer);
	self.showWelcomeMsg();
	self.topcourseName=$(".topCourseName");
	$("<div id=\"chapterContainer\"  style=\"overflow:auto;color:white;background-color:#333333;position:absolute;border:1px solid gray;width:"+self.coursePlayerWidth*0.90+"px; height: "+self.coursePlayerHeight*0.80+"px;top:"+self.coursePlayer.height()+"px;left:"+self.coursePlayer.width()*0.05+"px\"></div>").appendTo(self.coursePlayer);
	$("<div id=\"chaptersBrowserContainer\"  style=\"overflow:auto;background-color:#333333;position:absolute;border:1px solid gray;width:"+self.coursePlayerWidth*0.20+"px; height: "+self.coursePlayerHeight*0.80+"px;top:"+self.coursePlayer.height()*0.12+"px;left:-"+self.coursePlayer.width()*0.22+"px\"></div>").appendTo(self.coursePlayer);
	$("<div id=\"chapterQuestionContainer\"  style=\"overflow:auto;background-color:#333333;position:absolute;border:1px solid gray;width:"+self.coursePlayerWidth*0.50+"px; height: "+self.coursePlayerHeight*0.80+"px;top:"+self.coursePlayer.height()*0.12+"px;left:"+self.coursePlayer.width()+"px\"></div>").appendTo(self.coursePlayer);
	$("<div id=\"chaptersBrowserContainerButton\"  style=\"display:none;position:absolute;width:"+self.coursePlayerWidth*0.10+"px; height: "+self.coursePlayerHeight*0.05+"px;top:"+self.coursePlayer.height()*0.08+"px;left:0px;color:white;\"><label style=\"font-size:15px;background-color:#444;padding:5px;\">Chapters</label></div>").appendTo(self.coursePlayer);
	$("<div id=\"chapterQuestionContainerButton\"  style=\"display:none;position:absolute;width:"+self.coursePlayerWidth*0.10+"px; height: "+self.coursePlayerHeight*0.05+"px;top:"+self.coursePlayer.height()*0.08+"px;left:"+self.coursePlayer.width()*0.93+"px;color:white;\"><label style=\"font-size:15px;background-color:#444;padding:5px;\">Questions</label></div>").appendTo(self.coursePlayer);

	self.chapterContainer=$("#chapterContainer");
	self.chaptersBrowserContainer=$("#chaptersBrowserContainer");
	self.chapterQuestionContainer=$("#chapterQuestionContainer");
	self.chaptersBrowserContainerButton=$("#chaptersBrowserContainerButton");
	self.chapterQuestionContainerButton=$("#chapterQuestionContainerButton");

	/*if(self.courseWare.hasTimeLimit)
	{
		self.courseSecondCount=self.courseWare.timeLimit;
		$("<h5 class=\"timerContainer\" style=\"color:white;position:absolute;top:"+self.coursePlayerHeight*0.05+"px;left:"+self.coursePlayer.width()*0.50+"px\">course time : "+self.getHHMMSSForSS(self.courseSecondCount)+"  time left: "+self.getHHMMSSForSS(self.courseSecondCount)+"</h5>").appendTo(self.coursePlayer);
		self.timerContainer=$(".timerContainer");
	}*/
	self.chapterQuestionContainerButton.click(function(){

		if(self.chapterQuestionContainer.position().left>=self.coursePlayer.width()*0.90)
			self.chapterQuestionContainer.animate({left:self.coursePlayer.width()*0.49+"px"},500);
		else
			self.chapterQuestionContainer.animate({left:self.coursePlayer.width()+"px"},500);
	});

	self.chaptersBrowserContainerButton.click(function(){
		if(self.chaptersBrowserContainer.position().left>=-self.coursePlayer.width()*0.01)
			self.chaptersBrowserContainer.animate({left:-self.coursePlayer.width()*0.30+"px"},500);
		else
			self.chaptersBrowserContainer.animate({left:self.coursePlayer.width()*0.02+"px"},500);
	});

	self.chaptersBrowserContainerButton.css({'left':self.chapterContainer.offset().left+'px'});
	self.chapterQuestionContainerButton.css({'left':(self.chapterContainer.offset().left+self.chapterContainer.width()-(self.chapterQuestionContainerButton.width()/2))+'px'});

	$(window).bind("blur",function(){
		

		if(self.youtubePlayer && self.youtubePlayer.getPlayerState()==1)
		{
			self.youtubePlayer.pauseVideo();
		}

		/*if(self.courseWare.hasTimeLimit)
		{
		clearInterval(self.courseTimer);
 			self.courseTimer=null;
 		}*/


 		}).bind("focus",function(){
			

			if(self.youtubePlayer && self.youtubePlayer.getPlayerState()==2)
			{
				self.youtubePlayer.playVideo();
			}

			

 			/*if(self.courseWare.hasTimeLimit && self.courseFinishStatus==false && self.courseStartStatus==true)
				{
 			self.courseTimer=setInterval(function(){

 				self.updateTimeCounter();

 			},1000);
 		}
		*/
 			console.log("shown");});



 		$("<h5 class=\"pointsContainer\" style=\"color:white;position:absolute;top:"+self.coursePlayerHeight*0.05+"px;left:"+self.coursePlayer.width()*0.30+"px\">total points : "+self.getTotalPointsForCourse()+"  points scored: "+self.getPointsForCourse()+"</h5>").appendTo(self.coursePlayer);

 		self.pointsContainer=$(".pointsContainer");


 		this.coursePlayer.show();


	};
	this.showWelcomeMsg=function()
	{
		self=this;
		$("<div class=\"welcomeMsgDiv\" style=\"text-align:center;display:none;position:absolute;color:white;top:"+self.coursePlayer.height()*0.40+"px;left:"+self.coursePlayer.width()*0.40+"px\"><h3 class=\"welcomeMsg\" >"+self.courseWare.welcomeMessage.toLowerCase()+"</h3><button class=\"courseStartButton\" style=\"font-family: 'Strait', sans-serif;padding:10px;font-size:20px;\">start</button></div>").appendTo(self.coursePlayer);
		$(".welcomeMsgDiv .courseStartButton").click(function(){
			$(".welcomeMsgDiv").fadeOut(500,function(){ $(this).remove(); self.loadContainers(); self.loadChaptersInBrowser();
			self.loadNextChapter();
			self.courseStartStatus=true;
				/*if(self.courseWare.hasTimeLimit)
				{
					self.startTimeCounterForCourse();
				}*/


		});
			
		});
		$(".welcomeMsgDiv").fadeIn(2000);

	};
 	this.loadNextChapter=function()
 	{
 		self=this;
 		if(self.chapterCount<self.courseWare.chapters.length)
 		{
 			var chapter=self.courseWare.chapters[self.chapterCount];
 			self.loadChapterInContainer(self.chapterCount);
 			self.chapterCount++;
 		}
 		else
 		{
 			self.showEvaluation();
 		}
 	};

 	this.loadChaptersInBrowser=function()
 	{
 		self=this;
 		self.chaptersBrowserContainer.empty();
 		$("<ul style=\"color:white;width:"+self.chaptersBrowserContainer.width()+"px;list-style:none;padding:0px;margin:0px;\" class=\"chapterList\"></ul>").appendTo(self.chaptersBrowserContainer);

 		$.each(course["chapters"],function(){
 			if(this.lockState)
 			$("<li style=\"border:1px solid #eeeeee;cursor:pointer;width:"+self.chaptersBrowserContainer.width()+"px;padding:10px;background-color:#555555;font-weight:boldl\">"+this.chapterName+"</li>").appendTo(self.chaptersBrowserContainer.children(".chapterList")[0]);
 		else
 			$("<li style=\"border:1px solid #eeeeee;cursor:pointer;width:"+self.chaptersBrowserContainer.width()+"px;padding:10px;background-color:#555555;\">"+this.chapterName+"</li>").appendTo(self.chaptersBrowserContainer.children(".chapterList")[0]);

 			$(self.chaptersBrowserContainer.children(".chapterList")[0]).children().last().click(function(){
 				self.loadChapterInContainer(self.getChapterIndex($(this).text()));
 				self.chaptersBrowserContainerButton.click();

 			});
 		});


 	};
 	this.loadChapterInContainer=function(index)
 	{
 		self=this;
 		self.chapterContainer.empty();
 		self.chapterQuestionContainer.empty();

 		if(self.chapterQuestionContainer.position().left<=self.coursePlayer.width()*0.90)
			self.chapterQuestionContainer.animate({left:self.coursePlayer.width()+"px"},500);


 		self.topcourseName.text(self.courseWare.courseName+'  -  '+self.courseWare.chapters[index].chapterName);
 		///self.removeYoutubeApis();
 		self.chapterContainer.css({'text-align':'none'});
 		$(self.chaptersBrowserContainer.children(".chapterList")[0]).children().css({'color':'white','background-color':'#555555'});
 		$($(self.chaptersBrowserContainer.children(".chapterList")[0]).children()[index]).css({'color':'yellow','background-color':'#1d1e19'});
 		if(self.courseWare.chapters[index].type=='webpage')
 		{
 			$("<iframe src=\""+self.courseWare.chapters[index].url+"\" width=\""+self.chapterContainer.width()+"\" height=\""+self.chapterContainer.height()+"\"/>").appendTo(self.chapterContainer);
 			/*$("<div id=\"mousemovediv\" style=\"width:100%;height:100%;position:absolute;top:0px;left:0px;background-color:black;display:none;opacity:0.5;\"></div>").appendTo(self.chapterContainer);
 			self.chapterContainer.mousemove(function(e){
 				if(!$("#mousemovediv").is(":visible"))
 					$("#mousemovediv").show();
 				
 			}).scroll(function(){

 				if($("#mousemovediv").is(":visible"))
 					$("#mousemovediv").hide();

 			});
*/

 			$(self.chapterContainer.children("iframe").contentWindow).live("click",function(){
 				
 				if(self.courseWare.hasTimeLimit && self.courseFinishStatus==false && self.courseStartStatus==true)
				{
 			self.courseTimer=setInterval(function(){

 				self.updateTimeCounter();

 			},1000);
 		}

 			}); 

 			
 		}
 		else if(self.courseWare.chapters[index].type=='text')
 		{
 			self.chapterContainer.text(self.courseWare.chapters[index].text);
 			self.chapterContainer.css({'text-align':'center'});
 			
 		}
 		else if(self.courseWare.chapters[index].type=='youtubeiframeembed')
 		{

 			
      		


 			self.chapterContainer.html(self.courseWare.chapters[index].text);
 			self.chapterContainer.css({'text-align':'center'});
 			$(self.chapterContainer.children("iframe")[0]).attr("id","player");
 			$(self.chapterContainer.children("iframe")[0]).attr("src",$(self.chapterContainer.children("iframe")[0]).attr("src")+"?enablejsapi=1&controls=0&showinfo=0&rel=0");
 			$("<div style=\"position:absolute;top:0px;left:0px;background-color:black;opacity:0.0;width:100%;height:100%;\"></div>").appendTo(self.chapterContainer);
 			$("<button id=\"youtubePlayerButton\" style=\"font-family: 'Strait', sans-serif;padding:10px;font-size:20px;position:absolute;top:90%;left:1%;\">pause</button>").appendTo(self.chapterContainer);
 			
 			self.youtubePlayerButton=$("#youtubePlayerButton");
 			self.youtubePlayerButton.click(function(){

 				if(self.youtubePlayer && self.youtubePlayer.getPlayerState()==2)
 				{
 					self.youtubePlayer.playVideo();
 					$(this).text("pause");

 				}
 				else
 				{
 					self.youtubePlayer.pauseVideo();
 					$(this).text("play ");
 				}
 			});
 			if(self.isYoutubeApiLoaded())
 			{
			 				c.youtubePlayer=new YT.Player('player', {
			          events: {
			            'onReady': function(event){

			            
					 			event.target.playVideo();

					 			$("<input id=\"youtubeVideoSlider\" type=\"range\" min=\"0\" max=\""+event.target.getDuration()+"\" step=\"5\" value=\"0\" style=\"font-family: 'Strait', sans-serif;font-size:10px;position:absolute;top:96%;left:45%;\" />").appendTo(self.chapterContainer);
		 		self.youtubeVideoSlider=$("#youtubeVideoSlider");
		 		self.youtubeVideoSlider.bind("change",function(){

		 			if(self.youtubePlayer)
		 			{
		 				self.youtubePlayer.seekTo(parseInt($(this).attr("value")), true);
		 			}
		 		});

					 	
			            },
			            'onStateChange': function(){


			            }
			          }
			        });
 			}
 			else
 			{
 				var tag = document.createElement('script');
      		tag.src = "http://www.youtube.com/iframe_api";
      		var firstScriptTag = document.getElementsByTagName('script')[0];
      		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);	
 			}
 			
 			
 		}
 		else if(self.courseWare.chapters[index].type=='iframeembed')
 		{
 			self.chapterContainer.html(self.courseWare.chapters[index].text);
 			self.chapterContainer.css({'text-align':'center'});
 			
 		}


 		self.loadCourseQuestionsContainer(index);

 		console.log(index);
 	};

 	this.loadCourseQuestionsContainer=function(index){

 		self=this;
 		self.chapterQuestionContainer.empty();
 		self.chapterQuestionContainerButton.hide();
 		if(self.courseWare.chapters[index].questions.length>0)
 		{
 			self.chapterQuestionContainerButton.show();

 		$("<ul class=\"questionsList\" style=\"list-style:none;padding:0px;margin:0px;width:"+self.chapterQuestionContainer.width()+"px\"></ul>").appendTo(self.chapterQuestionContainer);
 		var count=0;

 		$.each(self.courseWare.chapters[index].questions,function(){

 			if(this.answered && this.isCorrect)
 				$("<li style=\"padding:10px;color:green;border:1px solid #444;width:"+self.chapterQuestionContainer.width()+"px;\" class=\"q_"+count+"_"+index+"\"></li>").appendTo($(self.chapterQuestionContainer.children(".questionsList")[0]));
 			else
 				$("<li style=\"padding:10px;color:white;border:1px solid #444;width:"+self.chapterQuestionContainer.width()+"px;\" class=\"q_"+count+"_"+index+"\"></li>").appendTo($(self.chapterQuestionContainer.children(".questionsList")[0]));
 			

 			li=$(self.chapterQuestionContainer.children(".questionsList")[0]).children().last();
 			
 			if(this.type=='qanda')
 			{

 				var htmlStr="";
 				htmlStr+=this.question;
 				htmlStr+="<br/>";
 				if(this.answered)
 					htmlStr+="answer : <input type=\"text\" size=\"10\" value=\""+this.userAnswer+"\" />";
 				else
 					htmlStr+="answer : <input type=\"text\" size=\"10\" value=\"\"/>";


 				li.html(htmlStr);
 			}
 			else if(this.type=='options')
 			{
 				qu=this;
 				var htmlStr="";
 				htmlStr+=this.question;
 				htmlStr+="<br/>";
 				$.each(this.options,function(){
 					if(qu.answered && qu.userAnswer==this)
 					htmlStr+="<input type=\"radio\" name=\"radio_"+count+"_"+index+"\" value=\""+this+"\" checked=\"checked\" />"+this+"<br/>";
 				else
 					htmlStr+="<input type=\"radio\" name=\"radio_"+count+"_"+index+"\" value=\""+this+"\" />"+this+"<br/>";
 				});
 				li.html(htmlStr);
 				
 			}
 			else if(this.type=='fillblanks')
 			{
 				var htmlStr="";
 				htmlStr+=this.question;
 				
 				htmlStr=htmlStr.replace(/daaash/g,"<input type=\"text\" size=\"10\"/>");
 				li.html(htmlStr);
 				if(this.answered)
 				{
 					qu=this;
 					placecount=0
 					li.children("input[type='text']").each(function(){
 						if(qu.userAnswer.length>placecount)
 						{
 							$(this).val(qu.userAnswer[placecount])
 							
 						}	
 						placecount++;
 					});
 				}
 				
 				
 			}

 			
 			count++;
 		});

 		$("<li><button class=\"evalBtn_"+index+"\" style=\"font-family: 'Strait', sans-serif;padding:10px;font-size:20px;\">evaluate</button></li>").appendTo($(self.chapterQuestionContainer.children(".questionsList")[0]));

 		$(self.chapterQuestionContainer.children(".questionsList")[0]).children().last().children().first().click(function()
 		{
 			chapterIndex=parseInt($(this).attr("class").substring($(this).attr("class").lastIndexOf("_")+1,$(this).attr("class").length));


 			self.evaluateChapter(chapterIndex);
 		});

 		}


 	};
 	this.evaluateChapter=function(chapterIndex)
 	{
 		self=this;
 		var lis=self.chapterQuestionContainer.children(".questionsList").children();
 		count=0;
 		$.each(self.courseWare.chapters[chapterIndex].questions,function(){
 			if(this.type=='qanda')
 			{
 				if($(lis[count]).children("input[type='text']").length==1 && self.trimString($(lis[count]).children("input[type='text']").first().attr("value")).length>0 && self.trimString($(lis[count]).children("input[type='text']").first().attr("value"))==this.answer)
 				{
 					$(lis[count]).css({'color':'green'});
 					this.answered=true;
 					this.isCorrect=true;
 					this.userAnswer=self.trimString($(lis[count]).children("input[type='text']").first().attr("value"));
 				}
 				else if($(lis[count]).children("input[type='text']").length==1 && self.trimString($(lis[count]).children("input[type='text']").first().attr("value")).length>0 && self.trimString($(lis[count]).children("input[type='text']").first().attr("value"))!=this.answer)
 				{
 					$(lis[count]).css({'color':'white'});
 					this.answered=true;
 					this.isCorrect=false;
 					this.userAnswer=self.trimString($(lis[count]).children("input[type='text']").first().attr("value"));

 				}

 			}
 			else if(this.type=='options')
 			{
 				if($(lis[count]).children("input[type='radio']:checked").length==1 && self.trimString($(lis[count]).children("input[type='radio']:checked").first().attr("value")).length>0 && self.trimString($(lis[count]).children("input[type='radio']:checked").first().attr("value")).toLowerCase()==this.answer.toLowerCase())
 				{
 					$(lis[count]).css({'color':'green'});
 					this.answered=true;
 					this.isCorrect=true;
 					this.userAnswer=self.trimString($(lis[count]).children("input[type='radio']:checked").first().attr("value"));
 				}
 				else if($(lis[count]).children("input[type='radio']:checked").length==1 && self.trimString($(lis[count]).children("input[type='radio']:checked").first().attr("value")).length>0 && self.trimString($(lis[count]).children("input[type='radio']:checked").first().attr("value")).toUpperCase()!=this.answer.toLowerCase())
 				{
 					$(lis[count]).css({'color':'white'});
 					this.answered=true;
 					this.isCorrect=false;
 					this.userAnswer=self.trimString($(lis[count]).children("input[type='radio']:checked").first().attr("value"));

 				}
 				//console.log(self.trimString($(lis[count]).children("input[type='radio']:checked").first().attr("value")));
 			}
 			else if(this.type=='fillblanks')
 			{
 				qu=this;
 				var numberOfDashes=self.numberOfDashes(this.question);
 				console.log("1");
 				if($(lis[count]).children("input[type='text']").length==numberOfDashes )
 				{
 					var tmparr=new Array();
 					$($(lis[count]).children("input[type='text']")).each(function(){
 						if(self.trimString($(this).attr("value")).length>0)
 							tmparr.push($(this).attr("value"));
 						

 					});

 					this.userAnswer=tmparr;
 					correctAnswers=0;
 					indexx=0
 					if(this.userAnswer.length>0)
 					{
	 					$.each(this.userAnswer,function(){
	 							if(this==qu.answer[indexx])
	 							{
	 								correctAnswers++;
	 							}

	 							indexx++;
	 					});



	 					if(correctAnswers==qu.answer.length)
	 					{
	 						$(lis[count]).css({'color':'green'});
	 						qu.answered=true;
	 						qu.isCorrect=true;
	 					}
	 					else
	 					{
	 						$(lis[count]).css({'color':'white'});
	 						qu.answered=true;
	 						qu.isCorrect=false;
	 					}

 					}
 					else
 					{
 						$(lis[count]).css({'color':'white'});
 					}
 				}


 			}

 			count++;
 		});
	console.log(self.courseWare);

var total=self.getTotalPointsForCourse();
var scored=self.getPointsForCourse();
	self.pointsContainer.html("total points : "+total+"  points scored: "+scored);

	if(total==scored)
	{
		clearInterval(self.courseTimer);
 			self.courseTimer=null;
		//alert("Congratulations you completed the course");
		//self.finishCourse();
		self.showEvaluation();
	}



 	};

 	this.loadContainers=function()
 	{
 		self=this;
 		self.chaptersBrowserContainerButton.show();
 		self.chapterQuestionContainerButton.show();
 		self.chapterContainer.animate({
 			top:self.coursePlayer.height()*0.12+"px"


 		},500);

 	};

 	this.showEvaluation=function()
 	{

 		

 		if(self.chapterQuestionContainer.position().left<=self.coursePlayer.width()*0.90)
			self.chapterQuestionContainer.animate({left:self.coursePlayer.width()+"px"},500);


		if(self.chaptersBrowserContainer.position().left>=-self.coursePlayer.width()*0.01)
			self.chaptersBrowserContainer.animate({left:-self.coursePlayer.width()*0.30+"px"},500);


		self.topcourseName.text(self.courseWare.courseName);
		//self.timerContainer.empty();
 		console.log("this is evaluation");
		var total=self.getTotalPointsForCourse();
		var scored=self.getPointsForCourse();
 		var htmlStr="<p style=\" padding:20px;\">";
 		htmlStr+="Congratulations!!!<br/>";
 		htmlStr+="You have scored "+scored+"/"+total+" in this course.<br/>";
 		/*if(self.courseWare.hasTimeLimit)
		{

			htmlStr+="You have completed the test in "+self.getHHMMSSForSS(self.courseWare.timeLimit-self.courseSecondCount)+" time.<br/>";

		}*/

		htmlStr+="You are here by certified that you have undertaken the course \""+self.courseWare.courseName.toUpperCase()+"\" and successfully completed it.</p>";
		self.chapterContainer.empty();
		self.chapterContainer.html(htmlStr);

		$("<button id=\"youtubePlayerButton\" style=\"font-family: 'Strait', sans-serif;padding:10px;font-size:20px;position:absolute;top:90%;left:1%;\">done</button>").appendTo(self.chapterContainer);
 			self.evaluateFinishButton=$("#youtubePlayerButton");
 			self.evaluateFinishButton.click(function(){

 				//alert("Congratulations you completed the course");
				self.finishCourse();
 			});
 	};

 	this.startTimeCounterForCourse=function()
 	{
 			self=this;
 			
 			self.courseTimer=setInterval(function(){

 				self.updateTimeCounter();

 			},1000);
 	};

 	this.updateTimeCounter=function()
 	{
 		self=this;
 		if(self.courseSecondCount<=0)
 		{
 			
 			
 			self.finishCourse();
 			
 		}
 		else
 		{
 			self.timerContainer.text("course time : "+self.getHHMMSSForSS(self.courseWare.timeLimit)+"  time left: "+self.getHHMMSSForSS(self.courseSecondCount));
 			//console.log(self.courseSecondCount);

 			self.courseSecondCount--;
 		}


 	};

 	this.getChapterIndex=function(val)
 	{
 		var index=-1;
 		var count=0;
 		$.each(self.courseWare["chapters"],function(){

 			if(this.chapterName==val)
 			{
 				index=count;
 				return false;
 			}
 			count++;
 		});
 		return index;
 	};
 	this.getHHMMSSForSS=function(seconds)
 	{
 		var val='';
 		var hh=0;
 		var mm=0;
 		var ss=0;

 		if(seconds>=3600)
 		{
 
 				hh=parseInt(seconds/3600);

 		}

 		if(seconds>=60)
 		{
 			if(hh>0)
 				mm=parseInt((seconds-(hh*3600))/60);
 			else
 				mm=parseInt(seconds/60);
 			
 		}

 		if(seconds>=0)
 		{
 			if(hh>0 && mm>0)
 				ss=seconds-(hh*3600)-(mm*60);
 			else if(hh==0 && mm>0)
 				ss=seconds-(mm*60);
 			else if(hh==0 && mm==0)
 				ss=seconds;
 			
 		}

 		if(hh<10)
 		{
 			val+='0'+hh;
 		}
 		else
 		{
 			val+=hh;
 		}

 		val+=':';
 		if(mm<10)
 		{
 			val+='0'+mm;
 		}
 		else
 		{
 			val+=mm;
 		}
 		val+=':';
 		if(ss<10)
 		{
 			val+='0'+ss;
 		}
 		else
 		{
 			val+=ss;
 		}

 		return val;
 	};

 	this.finishCourse=function()
 	{
 		self=this;
 		self.courseFinishStatus=true;
 		clearInterval(self.courseTimer);
 			self.courseTimer=null;
 			
 		//self.closeButton.click();
 		self.finishCallback(self.courseWare);
 		if(self.youtubePlayer && self.youtubePlayer.getPlayerState()==1)
 			self.coursePlayer.empty();
 	self.coursePlayer.hide();
	self.coursePlayer.empty();
	self.coursePlayer.attr("style","");
 	self.courseWare=null;
	self.coursePlayerWidth=0;
	self.coursePlayerHeight=0;
	//self.coursePlayer=null;
	self.closeButton=null;
	self.chapterCount=0;
	self.courseTimer=null;
	self.courseSecondCount=0;
	self.playerSecondCount=0;
	self.chapterContainer=null;
	self.chapterQuestionContainer=null;
	self.chaptersBrowserContainer=null;
	self.chapterQuestionContainerButton=null;
	self.chaptersBrowserContainerButton=null;
	self.timerContainer=null;
	self.finishCallback=finishCallback;
	self.courseFinishStatus=false;
	self.courseStartStatus=false;
	self.pointsContainer=null;
	self.youtubePlayer=null;
	self.youtubePlayerButton=null;
	self.topcourseName=null;
	self.evaluateFinishButton=null;

 	};

 	this.getPointsForCourse=function()
 	{
 		self=this;
 		var retVal=0;
 		$.each(self.courseWare.chapters,function(){

 			$.each(this.questions,function(){

 					if(this.answered && this.isCorrect)
 					{
 						retVal++;
 					}

 			});

 		});
 		return retVal;
 	};

 	this.getTotalPointsForCourse=function()
 	{
 		self=this;
 		var retVal=0;
 		$.each(self.courseWare.chapters,function(){

 			retVal+=this.questions.length;
 		});
 		return retVal;
 	};
 	
 	this.removeYoutubeApis=function()
 	{
 		self=this;
 		self.youtubePlayer=null;
 		var scripts = document.getElementsByTagName('script');
	    var i = scripts.length;
	    while (i--) {
	    	if(scripts[i].src.indexOf("youtube")>0)
	      		scripts[i].parentNode.removeChild(scripts[i]);
	    }

 	};

 	this.isYoutubeApiLoaded=function()
 	{
 		self=this;
 		var retVal=false;
 		self.youtubePlayer=null;
 		var scripts = document.getElementsByTagName('script');
	    var i = scripts.length;
	    while (i--) {
	    	if(scripts[i].src.indexOf("youtube")>0)
	      		{
	      			retVal=true;
	      			break;
	      		}
	    }
	    return retVal;
 	};
 	this.trimString=function (s)
	{
		var l=0; var r=s.length -1;
		while(l < s.length && s[l] == ' ')
		{	l++; }
		while(r > l && s[r] == ' ')
		{	r-=1;	}
		return s.substring(l, r+1);
	};
	this.numberOfDashes=function(str)
	{
		var count=0;

		$.each(str.split(" "),function(){

			if(this=='daaash')
			{
				count++;
			}
		});

		return count;
	};
 	
 	this.init();

};