


var courseEditor=function (course,generateCallback)
{
	this.course=null;
	this.givenCourse=course;
	//this.givenCourse=null;
	this.courseEditor=null;
	this.generatedCourseCallback=generateCallback;
	this.chapterType=["select content type","web page","text","youtube video","iframe embed code"];
	this.chapterTypeSys=["","webpage","text","youtubeiframeembed","iframeembed"];
	this.questionType=["select question type","Q&A","choose the right one","fill the blanks"];
	this.questionTypeSys=["","qanda","options","fillblanks"];
	this.init=function()
	{
		self=this;
		if($("#courseEditor").length>0)
			self.flush();

		$("<ul id=\"courseEditor\" ></ul>").appendTo($($("body")[0]));
		self.courseEditor=$("#courseEditor");
		self.courseEditor.width($(document).width()).height($(document).height());

		//self.courseEditor.width($(document).width()).height($(document).height()*0.90);

		self.courseEditor.css({'position':'absolute','top':'0px','left':'0px','border':'4px dashed #888','text-align':'center','z-index':'9999','background-color':'#ededed','overflow':'auto','list-style':'none','margin':'0px','padding':'0px'});


		/*self.courseEditor.css({'position':'absolute','top':(self.courseEditor.height()*0.05)+'px','border':'4px dashed #888','text-align':'center','z-index':'9999','background-color':'#ededed','overflow':'auto','list-style':'none','margin':'0px','padding':'0px'});
		if($(window).width()>self.courseEditor.width())
		{
			self.courseEditor.css({'left':(($(document).width()-self.courseEditor.width())/2)+'px'});
		}
		else
		{
			self.courseEditor.css({'left':'0px'});
			self.courseEditor.width($(window).width());
		}*/

		$("<li><button id=\"courseEditorClose\" style=\"border:2px solid red;color:white;padding:5px;float:right;background-color:red;\">close</button></li>").appendTo(self.courseEditor);
			self.editorClose=$("#courseEditorClose").click(function(){

				self.destroy();
			});
		
			self.setupCourseOutline();

			
		
	};

	this.setupCourseOutline=function()
	{
		self=this;
		$("<li class=\"courseName\"><input type=\"text\" style=\"width:"+(self.courseEditor.width()*0.95)+"px;height:30px;\" placeholder=\"course name\" value=\"\"/></li>").appendTo(self.courseEditor);
		$("<li class=\"welcomeMessage\"><input type=\"text\" style=\"width:"+(self.courseEditor.width()*0.95)+"px;height:30px;\" placeholder=\"welcome msg\" value=\"\"/></li>").appendTo(self.courseEditor);
		$("<li class=\"courseActions\"><button class=\"addChapterButton\" style=\"border:1px solid #4cc33b;color:white;background-color:#4cc33b;padding:5px;\">+ add chapter</button><button class=\"generateButton\" style=\"border:1px solid #4cc33b;color:white;background-color:#4cc33b;padding:5px;\">generate</button></li>").appendTo(self.courseEditor);
		$("<li class=\"courseJson\"><textarea style=\"width:"+(self.courseEditor.width()*0.95)+"px;height:100px;\" placeholder=\"course json content\"></textarea></li>").appendTo(self.courseEditor);

			if(self.givenCourse && self.givenCourse.courseName.length>0)
			{
				self.courseEditor.children("li.courseName").children("input").val(self.givenCourse.courseName);
			}

			if(self.givenCourse && self.givenCourse.welcomeMessage.length>0)
			{
				self.courseEditor.children("li.welcomeMessage").children("input").val(self.givenCourse.welcomeMessage);
			}

			self.courseEditor.children(".courseActions").children(".addChapterButton").click(function(){


				self.addChapter();
			});

			self.courseEditor.children(".courseActions").children(".generateButton").click(function(){


				self.getCourse();

				if(self.course)
				{
					self.courseEditor.children("li.courseJson").children("textarea").text(JSON.stringify(self.course));
					self.generatedCourseCallback(self.course);
				}
				
			});

			self.loadChapters();
			self.endSetup();
	};

	this.loadChapters=function()
	{
		self=this;
		if(self.givenCourse && self.givenCourse.chapters.length>0)
		{
			$.each(self.givenCourse.chapters,function(){

				self.loadChapter(this);

			});
			
				
			
		}
		
		
	};

	this.addChapter=function()
	{

		self=this;
		var li=document.createElement("li");
		$(li).attr('class','chapter').width(self.courseEditor.width()*0.95);
		$(li).css({'border':'3px dashed #4cc33b','background-color':'#cceec8'});
		$(li).insertBefore(self.courseEditor.children("li.courseActions"));
		
			$("<input type=\"text\" class=\"chapterName\" style=\"width:"+($(li).width()*0.98)+"px;height:30px;\" placeholder=\"chapter name\" value=\"\"/>").appendTo(li);
		





		var chapterTypes=document.createElement("select");
		$.each(self.chapterType,function(i,v){

			$("<option value=\""+self.chapterTypeSys[i]+"\">"+v+"</option>").appendTo($(chapterTypes));
		});
		$(chapterTypes).width(($(li).width()*0.98)).height(30).attr("class","chapterType");
		$(chapterTypes).appendTo($(li));
		$(chapterTypes).change(function(){

			


			if($(this).parent().children(".chapterTypeContent").length==1  && !$(this).parent().children(".chapterTypeContent").hasClass($(this).children("option:selected").attr("value")))
			{
				if($(this).children("option:selected").attr("value")=="webpage")
			{
				$("<input class=\"webpage chapterTypeContent\" type=\"text\" style=\"width:"+($(li).width()*0.98)+"px;height:30px;\" placeholder=\"page url\" value=\"\"/>").insertBefore($(this).parent().children(".chapterTypeContent"));
				
			}
			else if($(this).children("option:selected").attr("value")=="text")
			{
				$("<textarea class=\"text chapterTypeContent\" style=\"width:"+($(li).width()*0.98)+"px;height:50px;\" placeholder=\"text content\" ></textarea>").insertBefore($(this).parent().children(".chapterTypeContent"));
				
			}
			else if($(this).children("option:selected").attr("value")=="youtubeiframeembed")
			{
				$("<textarea class=\"youtubeiframeembed chapterTypeContent\" style=\"width:"+($(li).width()*0.98)+"px;height:50px;\" placeholder=\"youtube embed code\" ></textarea>").insertBefore($(this).parent().children(".chapterTypeContent"));	
				
			}
			else if($(this).children("option:selected").attr("value")=="iframeembed")
			{
				$("<textarea class=\"iframeembed chapterTypeContent\" style=\"width:"+($(li).width()*0.98)+"px;height:50px;\" placeholder=\"embed code\" ></textarea>").insertBefore($(this).parent().children(".chapterTypeContent"));	
				
			}
				if($(this).parent().children(".chapterTypeContent").length>0)
					$(this).parent().children(".chapterTypeContent").last().remove();
			}

			if($(this).parent().children(".chapterTypeContent").length==0 )
			{
				if($(this).children("option:selected").attr("value")=="webpage")
			{
				$("<input class=\"webpage chapterTypeContent\" type=\"text\" style=\"width:"+($(li).width()*0.98)+"px;height:30px;\" placeholder=\"page url\" value=\"\"/>").insertBefore($(this).parent().children(".questionsHeading"));
				
			}
			else if($(this).children("option:selected").attr("value")=="text")
			{
				$("<textarea class=\"text chapterTypeContent\" style=\"width:"+($(li).width()*0.98)+"px;height:50px;\" placeholder=\"text content\" ></textarea>").insertBefore($(this).parent().children(".questionsHeading"));
				
			}
			else if($(this).children("option:selected").attr("value")=="youtubeiframeembed")
			{
				$("<textarea class=\"youtubeiframeembed chapterTypeContent\" style=\"width:"+($(li).width()*0.98)+"px;height:50px;\" placeholder=\"youtube embed code\" ></textarea>").insertBefore($(this).parent().children(".questionsHeading"));	
				
			}
			else if($(this).children("option:selected").attr("value")=="iframeembed")
			{
				$("<textarea class=\"iframeembed chapterTypeContent\" style=\"width:"+($(li).width()*0.98)+"px;height:50px;\" placeholder=\"embed code\" ></textarea>").insertBefore($(this).parent().children(".questionsHeading"));	
				
			}
				
			}

		

		});

		

		
		

		$("<div class=\"questionsHeading\" style=\"width:"+($(li).width()*0.98)+"px;border:2px dashed #db8b89;background-color:#eec9c8;\"><label style=\"color:#333;font-weight:bold;margin:10px;\">Questions</label><button class=\"addQuestion\" style=\"border:1px solid #4cc33b;color:white;background-color:#4cc33b;padding:5px;\">+ add question</button></div>").appendTo($(li));

		$(li).children(".questionsHeading").children(".addQuestion").click(function(){

			var div=document.createElement("div");

			$(div).width(($(li).children(".questionsHeading").width()*0.98)).css({'background-color':'#aad9f2','border':'2px dashed #63b9e7','margin':'5px'}).attr("class","question");
			var questionType=document.createElement("select");

			$(questionType).change(function()
				{
						var val=$(this).children("option:selected").attr("value");
						$(this).parent().attr("questiontype",val);

						$(this).parent().children().each(function(){

							if($(this).prop("tagName").toLowerCase()!='button' && $(this).prop("tagName").toLowerCase()!='select')
							{
								$(this).remove();
							}

						});
						if(val=='qanda')
						{
							$("<textarea class=\"questionQuestion\" style=\"width:"+($(li).children(".questionsHeading").width()*0.97)+"px;height:50px;\" placeholder=\"question\" ></textarea>").insertBefore($(div).children(".questionUp"));
							$("<input class=\"answer\" style=\"width:"+($(li).children(".questionsHeading").width()*0.97)+"px;height:30px;\" value=\"\" placeholder=\"answer\" />").insertBefore($(div).children(".questionUp"));
						}
						else if(val=='options')
						{
							$("<textarea class=\"questionQuestion\" style=\"width:"+($(li).children(".questionsHeading").width()*0.97)+"px;height:50px;\" placeholder=\"question\"></textarea>").insertBefore($(div).children(".questionUp"));
							$("<input class=\"options\" style=\"width:"+($(li).children(".questionsHeading").width()*0.97)+"px;height:30px;\" placeholder=\"options comma separated\" value=\"\"/>").insertBefore($(div).children(".questionUp"));
							$("<input class=\"answer\" style=\"width:"+($(li).children(".questionsHeading").width()*0.97)+"px;height:30px;\" placeholder=\"answer\" value=\"\"/>").insertBefore($(div).children(".questionUp"));
						}
						else if(val=='fillblanks')
						{

							$("<textarea class=\"questionQuestion\" style=\"width:"+($(li).children(".questionsHeading").width()*0.97)+"px;height:50px;\" placeholder=\"question -use daaash in place of blanks\"></textarea>").insertBefore($(div).children(".questionUp"));
							
							$("<input class=\"answer\" style=\"width:"+($(li).children(".questionsHeading").width()*0.97)+"px;height:30px;\" value=\"\" placeholder=\"answers comma separated\" />").insertBefore($(div).children(".questionUp"));

						}

						$(div).children().css({'margin-top':'5px','margin-bottom':'5px'});

				});

			$(questionType).width(($(li).children(".questionsHeading").width()*0.98));
				$.each(self.questionType,function(i,v){
					var option=document.createElement("option");
					$(option).attr("value",self.questionTypeSys[i]).html(v);
					

					$(option).appendTo(questionType);

				});

				$(questionType).appendTo(div);
				$(questionType).css({'height':'30px','border':'1px solid #888'});

				var qtupBtn=document.createElement("button");
			var qtdownBtn=document.createElement("button");
			var removeqtBtn=document.createElement("button");

			$(removeqtBtn).html("- remove question").attr("class","removeQuestion").css({'color':'white','border':'1px solid red','background-color':'red','padding':'5px'}).click(function(){

			$(this).parent().remove();
			

		});

		$(qtupBtn).html("question move up").attr("class","questionUp").css({'color':'white','border':'1px solid #4cc33b','background-color':'#4cc33b','padding':'5px'}).click(function(){

			if($(this).parent().prev().hasClass("question"))
			{
				$($(this).parent()).insertBefore($(this).parent().prev());
			}

		});

		$(qtdownBtn).html("question move down").attr("class","questionDown").css({'color':'white','border':'1px solid #4cc33b','background-color':'#4cc33b','padding':'5px'}).click(function(){
			if($(this).parent().next().hasClass("question"))
			{
				$($(this).parent()).insertAfter($(this).parent().next());
			}
			
		});

		$(qtupBtn).appendTo($(div));
		$(qtdownBtn).appendTo($(div));
		$(removeqtBtn).appendTo($(div));

		$(div).children().css({'margin-top':'5px','margin-bottom':'5px'});


			$(div).insertBefore($(li).children(".questionsHeading").children(".addQuestion"));

		});


		


		var upBtn=document.createElement("button");
		var downBtn=document.createElement("button");
		var removeChapterBtn=document.createElement("button");
		var chapterActionsLi=document.createElement("div");
		
		$(removeChapterBtn).html("- remove chapter").css({'color':'white','border':'1px solid red','background-color':'red','padding':'5px'}).click(function(){

			$(this).parent().parent().remove();
			

		});

		$(upBtn).html("chapter move up").css({'color':'white','border':'1px solid #4cc33b','background-color':'#4cc33b','padding':'5px'}).click(function(){

			if($(this).parent().parent().prev().hasClass("chapter"))
			{
				$($(this).parent().parent()).insertBefore($(this).parent().parent().prev());
			}

		});

		$(downBtn).html("chapter move down").css({'color':'white','border':'1px solid #4cc33b','background-color':'#4cc33b','padding':'5px'}).click(function(){
			if($(this).parent().parent().next().hasClass("chapter"))
			{
				$($(this).parent().parent()).insertAfter($(this).parent().parent().next());
			}
			
		});

		$(upBtn).appendTo($(chapterActionsLi));
		$(downBtn).appendTo($(chapterActionsLi));
		$(removeChapterBtn).appendTo($(chapterActionsLi));

		$(chapterActionsLi).width(($(li).width()*0.98));
		//$(chapterActionsLi).css({'border':'1px dashed #eee','background-color':'#ddd'});
		$(chapterActionsLi).appendTo($(li));

		
		self.endSetup();


	};
	this.loadChapter=function(chapter)
	{
		self=this;
		var li=document.createElement("li");
		$(li).attr('class','chapter').width(self.courseEditor.width()*0.95);
		$(li).css({'border':'3px dashed #4cc33b','background-color':'#cceec8'});
		$(li).insertBefore(self.courseEditor.children("li.courseActions"));
		if(chapter.chapterName && chapter.chapterName.length>0)
		{
			$("<input type=\"text\" class=\"chapterName\" style=\"width:"+($(li).width()*0.98)+"px;height:30px;\" placeholder=\"chapter name\" value=\""+chapter.chapterName+"\"/>").appendTo(li);
		}
		else
		{
			$("<input type=\"text\" class=\"chapterName\" style=\"width:"+($(li).width()*0.98)+"px;height:30px;\" placeholder=\"chapter name\" value=\"\"/>").appendTo(li);
		}





		var chapterTypes=document.createElement("select");
		$.each(self.chapterType,function(i,v){

			$("<option value=\""+self.chapterTypeSys[i]+"\">"+v+"</option>").appendTo($(chapterTypes));
		});
		$(chapterTypes).width(($(li).width()*0.98)).height(30).attr("class","chapterType");
		$(chapterTypes).appendTo($(li));
		$(chapterTypes).change(function(){

			


			if($(this).parent().children(".chapterTypeContent").length==1  && !$(this).parent().children(".chapterTypeContent").hasClass($(this).children("option:selected").attr("value")))
			{
				if($(this).children("option:selected").attr("value")=="webpage")
			{
				$("<input class=\"webpage chapterTypeContent\" type=\"text\" style=\"width:"+($(li).width()*0.98)+"px;height:30px;\" placeholder=\"page url\" value=\"\"/>").insertBefore($(this).parent().children(".chapterTypeContent"));
				
			}
			else if($(this).children("option:selected").attr("value")=="text")
			{
				$("<textarea class=\"text chapterTypeContent\" style=\"width:"+($(li).width()*0.98)+"px;height:50px;\" placeholder=\"text content\" ></textarea>").insertBefore($(this).parent().children(".chapterTypeContent"));
				
			}
			else if($(this).children("option:selected").attr("value")=="youtubeiframeembed")
			{
				$("<textarea class=\"youtubeiframeembed chapterTypeContent\" style=\"width:"+($(li).width()*0.98)+"px;height:50px;\" placeholder=\"youtube embed code\" ></textarea>").insertBefore($(this).parent().children(".chapterTypeContent"));	
				
			}
			else if($(this).children("option:selected").attr("value")=="iframeembed")
			{
				$("<textarea class=\"iframeembed chapterTypeContent\" style=\"width:"+($(li).width()*0.98)+"px;height:50px;\" placeholder=\"embed code\" ></textarea>").insertBefore($(this).parent().children(".chapterTypeContent"));	
				
			}
				if($(this).parent().children(".chapterTypeContent").length>0)
					$(this).parent().children(".chapterTypeContent").last().remove();
			}

			if($(this).parent().children(".chapterTypeContent").length==0 )
			{
				if($(this).children("option:selected").attr("value")=="webpage")
			{
				$("<input class=\"webpage chapterTypeContent\" type=\"text\" style=\"width:"+($(li).width()*0.98)+"px;height:30px;\" placeholder=\"page url\" value=\"\"/>").insertBefore($(this).parent().children(".questionsHeading"));
				
			}
			else if($(this).children("option:selected").attr("value")=="text")
			{
				$("<textarea class=\"text chapterTypeContent\" style=\"width:"+($(li).width()*0.98)+"px;height:50px;\" placeholder=\"text content\" ></textarea>").insertBefore($(this).parent().children(".questionsHeading"));
				
			}
			else if($(this).children("option:selected").attr("value")=="youtubeiframeembed")
			{
				$("<textarea class=\"youtubeiframeembed chapterTypeContent\" style=\"width:"+($(li).width()*0.98)+"px;height:50px;\" placeholder=\"youtube embed code\" ></textarea>").insertBefore($(this).parent().children(".questionsHeading"));	
				
			}
			else if($(this).children("option:selected").attr("value")=="iframeembed")
			{
				$("<textarea class=\"iframeembed chapterTypeContent\" style=\"width:"+($(li).width()*0.98)+"px;height:50px;\" placeholder=\"embed code\" ></textarea>").insertBefore($(this).parent().children(".questionsHeading"));	
				
			}
				
			}

		

		});

		$.each(self.chapterTypeSys,function(i,v){

			if(chapter.type==v)
			{
				$($(chapterTypes).children("option")[i]).attr("selected","selected");
				return false;
			}

		});


		$.each(self.chapterTypeSys,function(i,v){

			if(chapter.type=="webpage")
			{
				$("<input class=\"webpage chapterTypeContent\" type=\"text\" style=\"width:"+($(li).width()*0.98)+"px;height:30px;\" placeholder=\"page url\" value=\""+chapter.url+"\"/>").appendTo($(li));
				return false;
			}
			else if(chapter.type=="text")
			{
				$("<textarea class=\"text chapterTypeContent\" style=\"width:"+($(li).width()*0.98)+"px;height:50px;\" placeholder=\"text content\" >"+chapter.text+"</textarea>").appendTo($(li));
				return false;
			}
			else if(chapter.type=="youtubeiframeembed")
			{
				$("<textarea class=\"youtubeiframeembed chapterTypeContent\" style=\"width:"+($(li).width()*0.98)+"px;height:50px;\" placeholder=\"youtube embed code\" >"+chapter.text+"</textarea>").appendTo($(li));	
				return false;
			}
			else if(chapter.type=="iframeembed") 
			{
				$("<textarea class=\"iframeembed chapterTypeContent\" style=\"width:"+($(li).width()*0.98)+"px;height:50px;\" placeholder=\"embed code\" >"+chapter.text+"</textarea>").appendTo($(li));	
				return false;
			}

		});
		

		$("<div class=\"questionsHeading\" style=\"width:"+($(li).width()*0.98)+"px;border:2px dashed #db8b89;background-color:#eec9c8;\"><label style=\"margin:10px;font-weight:bold;\">Questions</label><button class=\"addQuestion\" style=\"color:white;border:1px solid #4cc33b;background-color:#4cc33b;padding:5px;\">+ add question</button></div>").appendTo($(li));

		$(li).children(".questionsHeading").children(".addQuestion").click(function(){

			var div=document.createElement("div");

			$(div).width(($(li).children(".questionsHeading").width()*0.98)).css({'background-color':'#aad9f2','border':'2px dashed #63b9e7','margin':'5px'}).attr("class","question");
			var questionType=document.createElement("select");

			$(questionType).change(function()
				{
						var val=$(this).children("option:selected").attr("value");
						$(this).parent().attr("questiontype",val);

						$(this).parent().children().each(function(){

							if($(this).prop("tagName").toLowerCase()!='button' && $(this).prop("tagName").toLowerCase()!='select')
							{
								$(this).remove();
							}

						});
						if(val=='qanda')
						{
							$("<textarea class=\"questionQuestion\" style=\"width:"+($(li).children(".questionsHeading").width()*0.97)+"px;height:50px;\" placeholder=\"question\" ></textarea>").insertBefore($(div).children(".questionUp"));
							$("<input class=\"answer\" style=\"width:"+($(li).children(".questionsHeading").width()*0.97)+"px;height:30px;\" value=\"\" placeholder=\"answer\" />").insertBefore($(div).children(".questionUp"));
						}
						else if(val=='options')
						{
							$("<textarea class=\"questionQuestion\" style=\"width:"+($(li).children(".questionsHeading").width()*0.97)+"px;height:50px;\" placeholder=\"question\"></textarea>").insertBefore($(div).children(".questionUp"));
							$("<input class=\"options\" style=\"width:"+($(li).children(".questionsHeading").width()*0.97)+"px;height:30px;\" placeholder=\"options comma separated\" value=\"\"/>").insertBefore($(div).children(".questionUp"));
							$("<input class=\"answer\" style=\"width:"+($(li).children(".questionsHeading").width()*0.97)+"px;height:30px;\" placeholder=\"answer\" value=\"\"/>").insertBefore($(div).children(".questionUp"));
						}
						else if(val=='fillblanks')
						{

							$("<textarea class=\"questionQuestion\" style=\"width:"+($(li).children(".questionsHeading").width()*0.97)+"px;height:50px;\" placeholder=\"question -use daaash in place of blanks\"></textarea>").insertBefore($(div).children(".questionUp"));
							
							$("<input class=\"answer\" style=\"width:"+($(li).children(".questionsHeading").width()*0.97)+"px;height:30px;\" value=\"\" placeholder=\"answers comma separated\" />").insertBefore($(div).children(".questionUp"));

						}

						$(div).children().css({'margin-top':'5px','margin-bottom':'5px'});

				});

				
				$.each(self.questionType,function(i,v){
					var option=document.createElement("option");
					$(option).attr("value",self.questionTypeSys[i]).html(v);
					

					$(option).appendTo(questionType);

				});

				$(questionType).appendTo(div);

				$(questionType).width(($(li).children(".questionsHeading").width()*0.98));

				$(questionType).css({'height':'30px','border':'1px solid #888'});

				var qtupBtn=document.createElement("button");
			var qtdownBtn=document.createElement("button");
			var removeqtBtn=document.createElement("button");

			$(removeqtBtn).html("- remove question").attr("class","removeQuestion").css({'color':'white','border':'1px solid red','background-color':'red','padding':'5px'}).click(function(){

			$(this).parent().remove();
			

		});

		$(qtupBtn).html("question move up").attr("class","questionUp").css({'color':'white','border':'1px solid #4cc33b','background-color':'#4cc33b','padding':'5px'}).click(function(){

			if($(this).parent().prev().hasClass("question"))
			{
				$($(this).parent()).insertBefore($(this).parent().prev());
			}

		});

		$(qtdownBtn).html("question move down").attr("class","questionDown").css({'color':'white','border':'1px solid #4cc33b','background-color':'#4cc33b','padding':'5px'}).click(function(){
			if($(this).parent().next().hasClass("question"))
			{
				$($(this).parent()).insertAfter($(this).parent().next());
			}
			
		});

		$(qtupBtn).appendTo($(div));
		$(qtdownBtn).appendTo($(div));
		$(removeqtBtn).appendTo($(div));

		$(div).children().css({'margin-top':'5px','margin-bottom':'5px'});


			//$(div).appendTo($(li).children(".questionsHeading"));
			$(div).insertBefore($(li).children(".questionsHeading").children(".addQuestion"));

		});


		if(chapter.questions && chapter.questions.length>0)
		{
			$.each(chapter.questions,function(){
				qu=this;
				var div=document.createElement("div");
				$(div).width(($(li).children(".questionsHeading").width()*0.98)).css({'background-color':'#aad9f2','border':'2px dashed #63b9e7','margin':'5px'}).attr("class","question").attr("questiontype",qu.type);

				var questionType=document.createElement("select");

				$(questionType).change(function()
				{
						var val=$(this).children("option:selected").attr("value");
						$(this).parent().attr("questiontype",val);

						$(this).parent().children().each(function(){

							if($(this).prop("tagName").toLowerCase()!='button' && $(this).prop("tagName").toLowerCase()!='select')
							{
								$(this).remove();
							}

						});
						if(val=='qanda')
						{
							$("<textarea class=\"questionQuestion\" style=\"width:"+($(li).children(".questionsHeading").width()*0.97)+"px;height:50px;\" placeholder=\"question\" ></textarea>").insertBefore($(div).children(".questionUp"));
							$("<input class=\"answer\" style=\"width:"+($(li).children(".questionsHeading").width()*0.97)+"px;height:30px;\" value=\"\" placeholder=\"answer\" />").insertBefore($(div).children(".questionUp"));
						}
						else if(val=='options')
						{
							$("<textarea class=\"questionQuestion\" style=\"width:"+($(li).children(".questionsHeading").width()*0.97)+"px;height:50px;\" placeholder=\"question\"></textarea>").insertBefore($(div).children(".questionUp"));
							$("<input class=\"options\" style=\"width:"+($(li).children(".questionsHeading").width()*0.97)+"px;height:30px;\" placeholder=\"options comma separated\" value=\"\"/>").insertBefore($(div).children(".questionUp"));
							$("<input class=\"answer\" style=\"width:"+($(li).children(".questionsHeading").width()*0.97)+"px;height:30px;\" placeholder=\"answer\" value=\"\"/>").insertBefore($(div).children(".questionUp"));
						}
						else if(val=='fillblanks')
						{

							$("<textarea class=\"questionQuestion\" style=\"width:"+($(li).children(".questionsHeading").width()*0.97)+"px;height:50px;\" placeholder=\"question -use daaash in place of blanks\"></textarea>").insertBefore($(div).children(".questionUp"));
							
							$("<input class=\"answer\" style=\"width:"+($(li).children(".questionsHeading").width()*0.97)+"px;height:30px;\" value=\"\" placeholder=\"answers comma separated\" />").insertBefore($(div).children(".questionUp"));

						}

						$(div).children().css({'margin-top':'5px','margin-bottom':'5px'});

				});

				$(questionType).width(($(li).children(".questionsHeading").width()*0.98));
				$(questionType).css({'height':'30px','border':'1px solid #888'});
				$.each(self.questionType,function(i,v){
					var option=document.createElement("option");
					$(option).attr("value",self.questionTypeSys[i]).html(v);
					if(qu.type==self.questionTypeSys[i])
						$(option).attr("selected","selected");

					$(option).appendTo(questionType);

				});

				$(questionType).appendTo(div);

				if(qu.type=='qanda')
				{
					$("<textarea class=\"questionQuestion\" style=\"width:"+($(li).children(".questionsHeading").width()*0.97)+"px;height:50px;\" placeholder=\"question\" >"+qu.question+"</textarea>").appendTo(div);
					$("<input class=\"answer\" style=\"width:"+($(li).children(".questionsHeading").width()*0.98)+"px;height:30px;\" value=\""+qu.answer+"\" placeholder=\"answer\" />").appendTo(div);
				}
				else if(qu.type=='options')
				{
					$("<textarea class=\"questionQuestion\" style=\"width:"+($(li).children(".questionsHeading").width()*0.97)+"px;height:50px;\" placeholder=\"question\">"+qu.question+"</textarea>").appendTo(div);
					$("<input class=\"options\" style=\"width:"+($(li).children(".questionsHeading").width()*0.98)+"px;height:30px;\" placeholder=\"options comma separated\" value=\""+qu.options.join(",")+"\"/>").appendTo(div);
					$("<input class=\"answer\" style=\"width:"+($(li).children(".questionsHeading").width()*0.98)+"px;height:30px;\" placeholder=\"answer\" value=\""+qu.answer+"\"/>").appendTo(div);
				}
				else if(qu.type=='fillblanks')
				{

					$("<textarea class=\"questionQuestion\" style=\"width:"+($(li).children(".questionsHeading").width()*0.97)+"px;height:50px;\" placeholder=\"question -use daaash in place of blanks\">"+qu.question+"</textarea>").appendTo(div);
					
					$("<input class=\"answer\" style=\"width:"+($(li).children(".questionsHeading").width()*0.98)+"px;height:30px;\" value=\""+qu.answer+"\" placeholder=\"answers comma separated\" />").appendTo(div);

				}

				
				$(div).insertBefore($(li).children(".questionsHeading").children(".addQuestion"));


			var qtupBtn=document.createElement("button");
			var qtdownBtn=document.createElement("button");
			var removeqtBtn=document.createElement("button");

			$(removeqtBtn).html("- remove question").attr("class","removeQuestion").css({'color':'white','border':'1px solid red','background-color':'red','padding':'5px'}).click(function(){

			$(this).parent().remove();
			

		});

		$(qtupBtn).html("question move up").attr("class","questionUp").css({'color':'white','border':'1px solid #4cc33b','background-color':'#4cc33b','padding':'5px'}).click(function(){

			if($(this).parent().prev().hasClass("question"))
			{
				$($(this).parent()).insertBefore($(this).parent().prev());
			}

		});

		$(qtdownBtn).html("question move down").attr("class","questionDown").css({'color':'white','border':'1px solid #4cc33b','background-color':'#4cc33b','padding':'5px'}).click(function(){
			if($(this).parent().next().hasClass("question"))
			{
				$($(this).parent()).insertAfter($(this).parent().next());
			}
			
		});

		$(qtupBtn).appendTo($(div));
		$(qtdownBtn).appendTo($(div));
		$(removeqtBtn).appendTo($(div));

		$(div).children().css({'margin-top':'5px','margin-bottom':'5px'});


			});
		}


		var upBtn=document.createElement("button");
		var downBtn=document.createElement("button");
		var removeChapterBtn=document.createElement("button");
		var chapterActionsLi=document.createElement("div");
		
		$(removeChapterBtn).html("- remove chapter").css({'color':'white','border':'1px solid red','background-color':'red','padding':'5px'}).click(function(){

			$(this).parent().parent().remove();
			

		});

		$(upBtn).html("chapter move up").css({'color':'white','border':'1px solid #4cc33b','background-color':'#4cc33b','padding':'5px'}).click(function(){

			if($(this).parent().parent().prev().hasClass("chapter"))
			{
				$($(this).parent().parent()).insertBefore($(this).parent().parent().prev());
			}

		});

		$(downBtn).html("chapter move down").css({'color':'white','border':'1px solid #4cc33b','background-color':'#4cc33b','padding':'5px'}).click(function(){
			if($(this).parent().parent().next().hasClass("chapter"))
			{
				$($(this).parent().parent()).insertAfter($(this).parent().parent().next());
			}
			
		});

		$(upBtn).appendTo($(chapterActionsLi));
		$(downBtn).appendTo($(chapterActionsLi));
		$(removeChapterBtn).appendTo($(chapterActionsLi));

		$(chapterActionsLi).width(($(li).width()*0.98));
		//$(chapterActionsLi).css({'border':'1px dashed #eee','background-color':'#ddd'});
		$(chapterActionsLi).appendTo($(li));

		



	};
	this.endSetup=function()
	{
		self=this;
		self.courseEditor.children("li").css({'margin':'15px'});
		self.courseEditor.children("li").children().css({'margin':'5px'});
		self.courseEditor.children("li").children("select").css({'border':'1px solid #888'});
		self.courseEditor.children("li").children(".questionsHeading").children("div.question").children("select").height(30);
		//self.courseEditor.children("li.chapter").css({'margin':'10px'});

	};

	this.flush=function()
	{
		$("#courseEditor").empty();
		$("#courseEditor").remove();

	};

	this.destroy=function()
	{
		self=this;
		self.getCourse();
		//self.generatedCourseCallback(self.course);
		//self.editorClose.remove();
		self.courseEditor.empty();
		self.courseEditor.remove();
	};

	this.getCourse=function()
	{
		self=this;
			
			if(self.trimString(self.courseEditor.children("li.courseName").children("input").val()).length>0)
			{
				self.course=new Object();

				self.course.courseName=self.trimString(self.courseEditor.children("li.courseName").children("input").val());
				if(self.trimString(self.courseEditor.children("li.welcomeMessage").children("input").val()).length>0)
				{
					self.course.welcomeMessage=self.trimString(self.courseEditor.children("li.welcomeMessage").children("input").val());
				}

				if(self.courseEditor.children("li.chapter").length>0)
				{
					self.course.chapters=new Array();

						self.courseEditor.children("li.chapter").each(function(){

							var chap=new Object();

							if(self.trimString($(this).children("input.chapterName").val()).length>0)
							{
								chap.chapterName=self.trimString($(this).children("input.chapterName").val());

							}
							if($(this).children("select.chapterType").children("option:selected").length>0 && self.trimString($(this).children("select.chapterType").children("option:selected").attr("value")).length>0)
							{
								chap.type=self.trimString(self.trimString($(this).children("select.chapterType").children("option:selected").attr("value")));

							}
							chap.lockState=true;

							//"webpage","text","youtubeiframeembed","iframeembed"

							if(chap.type=='webpage')
							{

								chap.url=self.trimString($(this).children(".chapterTypeContent").val());
							}
							else if(chap.type=='text')
							{
								chap.text=self.trimString($(this).children(".chapterTypeContent").val());
							}
							else if(chap.type=='youtubeiframeembed')
							{
								chap.text=self.trimString($(this).children(".chapterTypeContent").val());
							}
							else if(chap.type=='iframeembed')
							{
								chap.text=self.trimString($(this).children(".chapterTypeContent").val());
							}


							if($(this).children(".questionsHeading").children(".question").length>0)
							{
								questions=new Array();
								$(this).children(".questionsHeading").children(".question").each(function(){


									var qu=new Object();
									//"qanda","options","fillblanks"
									if($(this).attr("questiontype")=='qanda')
									{

										qu.type='qanda';
										qu.question=$(this).children(".questionQuestion").val();
										qu.answer=$(this).children(".answer").val();
										qu.answered=false;
										qu.isCorrect=false;
										qu.userAnswer="";

									}
									else if($(this).attr("questiontype")=='options')
									{
										qu.type='options';
										qu.question=$(this).children(".questionQuestion").val();
										qu.answer=$(this).children(".answer").val();
										qu.options=$(this).children(".options").val().split(",");
										qu.answered=false;
										qu.isCorrect=false;
										qu.userAnswer="";
									}
									else if($(this).attr("questiontype")=='fillblanks')
									{
										qu.type='fillblanks';
										qu.question=$(this).children(".questionQuestion").val();
										qu.answer=$(this).children(".answer").val().split(",");
										qu.answered=false;
										qu.isCorrect=false;
										qu.userAnswer=[];
									}





									questions.push(qu);

								});
								chap.questions=questions;
							}



							self.course.chapters.push(chap);


						});




				}


			}

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
	
 	this.init();

};