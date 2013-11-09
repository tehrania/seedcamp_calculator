(function(A){A.fn.extend({dialog:function(C){var B=Array.prototype.slice.call(arguments,1);return this.each(function(){if(typeof C=="string"){var E=A(this).is(".ui-dialog")?this:A(this).parents(".ui-dialog:first").find(".ui-dialog-content")[0];var D=E?A.data(E,"dialog"):{};if(D[C]){D[C].apply(D,B);}}else{if(!A(this).is(".ui-dialog-content")){new A.ui.dialog(this,C);}}});}});A.ui.dialog=function(D,L){this.options=L=A.extend({},A.ui.dialog.defaults,L);this.element=D;var K=this;A.data(this.element,"dialog",this);A(D).bind("remove",function(){K.destroy();});A(D).bind("setData.dialog",function(N,M,O){switch(M){case"draggable":J.draggable(O?"enable":"disable");break;case"dragStart":J.data("start.draggable",O);break;case"drag":J.data("drag.draggable",O);break;case"dragStop":J.data("stop.draggable",O);break;case"height":J.height(O);break;case"maxHeight":case"minHeight":case"maxWidth":case"minWidth":J.data(M+".resizable",O);break;case"position":K.position(O);break;case"resizable":J.resizable(O?"enable":"disable");break;case"resizeStart":J.data("start.resizable",O);break;case"resize":J.data("resize.resizable",O);break;case"resizeStop":J.data("stop.resizable",O);break;case"title":A(".ui-dialog-title",C).text(O);break;case"width":break;}L[M]=O;}).bind("getData.dialog",function(N,M){return L[M];});var E=A(D).addClass("ui-dialog-content");if(!E.parent().length){E.appendTo("body");}E.wrap(document.createElement("div")).wrap(document.createElement("div"));var H=E.parent().addClass("ui-dialog-container").css({position:"relative"});var J=this.uiDialog=H.parent().hide().addClass("ui-dialog").css({position:"absolute",width:L.width,height:L.height,overflow:"hidden"});var B=E.attr("className").split(" ");A.each(B,function(M,N){if(N!="ui-dialog-content"){J.addClass(N);}});if(A.fn.resizable){J.append('<div class="ui-resizable-n ui-resizable-handle"></div>').append('<div class="ui-resizable-s ui-resizable-handle"></div>').append('<div class="ui-resizable-e ui-resizable-handle"></div>').append('<div class="ui-resizable-w ui-resizable-handle"></div>').append('<div class="ui-resizable-ne ui-resizable-handle"></div>').append('<div class="ui-resizable-se ui-resizable-handle"></div>').append('<div class="ui-resizable-sw ui-resizable-handle"></div>').append('<div class="ui-resizable-nw ui-resizable-handle"></div>');
J.resizable({maxWidth:L.maxWidth,maxHeight:L.maxHeight,minWidth:L.minWidth,minHeight:L.minHeight,start:L.resizeStart,resize:L.resize,stop:function(N,M){L.resizeStop&&L.resizeStop.apply(this,arguments);A.ui.dialog.overlay.resize();}});if(!L.resizable){J.resizable("disable");}}H.prepend('<div class="ui-dialog-titlebar"></div>');var C=A(".ui-dialog-titlebar",H);var I=(L.title)?L.title:(E.attr("title"))?E.attr("title"):"";C.append('<span class="ui-dialog-title">'+I+"</span>");C.append('<a href="#" class="ui-dialog-titlebar-close"><span>X</span></a>');this.uiDialogTitlebarClose=A(".ui-dialog-titlebar-close",C).hover(function(){A(this).addClass("ui-dialog-titlebar-close-hover");},function(){A(this).removeClass("ui-dialog-titlebar-close-hover");}).mousedown(function(M){M.stopPropagation();}).click(function(){K.close();return false;}).keydown(function(M){var N=27;M.keyCode&&M.keyCode==N&&K.close();});var F=0;A.each(L.buttons,function(){F=1;return false;});if(F==1){J.append('<div class="ui-dialog-buttonpane"></div>');var G=A(".ui-dialog-buttonpane",J);A.each(L.buttons,function(M,O){var N=A(document.createElement("button")).text(M).click(O);G.append(N);});}if(A.fn.draggable){J.draggable({handle:".ui-dialog-titlebar",start:function(N,M){K.activate();L.dragStart&&L.dragStart.apply(this,arguments);},drag:L.drag,stop:function(N,M){L.dragStop&&L.dragStop.apply(this,arguments);A.ui.dialog.overlay.resize();}});if(!L.draggable){J.draggable("disable");}}J.mousedown(function(){K.activate();});C.click(function(){K.activate();});L.bgiframe&&A.fn.bgiframe&&J.bgiframe();this.position=function(Q){var M=A(window),P=A(document),O=P.scrollTop(),N=P.scrollLeft();if(Q.constructor==Array){O+=Q[1];N+=Q[0];}else{switch(Q){case"center":O+=(M.height()/2)-(J.height()/2);N+=(M.width()/2)-(J.width()/2);break;case"top":O+=0;N+=(M.width()/2)-(J.width()/2);break;case"right":O+=(M.height()/2)-(J.height()/2);N+=(M.width())-(J.width());break;case"bottom":O+=(M.height())-(J.height());N+=(M.width()/2)-(J.width()/2);
break;case"left":O+=(M.height()/2)-(J.height()/2);N+=0;break;default:O+=(M.height()/2)-(J.height()/2);N+=(M.width()/2)-(J.width()/2);}}O=O<P.scrollTop()?P.scrollTop():O;J.css({top:O,left:N});};this.open=function(){this.overlay=L.modal?new A.ui.dialog.overlay(K):null;J.appendTo("body");this.position(L.position);J.show();K.moveToTop();K.activate();var M=null;var N={options:L};this.uiDialogTitlebarClose.focus();A(this.element).triggerHandler("dialogopen",[M,N],L.open);};this.activate=function(){!L.modal&&this.moveToTop();};this.moveToTop=function(){var M=L.zIndex;A(".ui-dialog:visible").each(function(){M=Math.max(M,parseInt(A(this).css("z-index"),10)||L.zIndex);});this.overlay&&this.overlay.$el.css("z-index",++M);J.css("z-index",++M);};this.close=function(){this.overlay&&this.overlay.destroy();J.hide();var N=null;var M={options:L};A(this.element).triggerHandler("dialogclose",[N,M],L.close);A.ui.dialog.overlay.resize();};this.destroy=function(){this.overlay&&this.overlay.destroy();J.hide();A(D).unbind(".dialog").removeClass("ui-dialog-content").hide().appendTo("body");J.remove();A.removeData(this.element,"dialog");};if(L.autoOpen){this.open();}};A.extend(A.ui.dialog,{defaults:{autoOpen:true,bgiframe:false,buttons:[],draggable:true,height:200,minHeight:100,minWidth:150,modal:false,overlay:{},position:"center",resizable:true,width:300,zIndex:1000},overlay:function(B){this.$el=A.ui.dialog.overlay.create(B);}});A.extend(A.ui.dialog.overlay,{instances:[],events:A.map("focus,mousedown,mouseup,keydown,keypress,click".split(","),function(B){return B+".dialog-overlay";}).join(" "),create:function(C){if(this.instances.length===0){A("a").bind(this.events,function(){var E=false;var G=A(this).parents(".ui-dialog");if(G.length){var D=A(".ui-dialog-overlay");if(D.length){var F=parseInt(D.css("z-index"),10);D.each(function(){F=Math.max(F,parseInt(A(this).css("z-index"),10));});E=parseInt(G.css("z-index"),10)>F;}else{E=true;}}return E;});A(document).bind("keydown.dialog-overlay",function(D){var E=27;
D.keyCode&&D.keyCode==E&&C.close();});A(window).bind("resize.dialog-overlay",A.ui.dialog.overlay.resize);}var B=A("<div/>").appendTo(document.body).addClass("ui-dialog-overlay").css(A.extend({borderWidth:0,margin:0,padding:0,position:"absolute",top:0,left:0,width:this.width(),height:this.height()},C.options.overlay));C.options.bgiframe&&A.fn.bgiframe&&B.bgiframe();this.instances.push(B);return B;},destroy:function(B){this.instances.splice(A.inArray(this.instances,B),1);if(this.instances.length===0){A("a, :input").add([document,window]).unbind(".dialog-overlay");}B.remove();},height:function(){if(A.browser.msie&&A.browser.version<7){var C=Math.max(document.documentElement.scrollHeight,document.body.scrollHeight);var B=Math.max(document.documentElement.offsetHeight,document.body.offsetHeight);if(C<B){return A(window).height()+"px";}else{return C+"px";}}else{return A(document).height()+"px";}},width:function(){if(A.browser.msie&&A.browser.version<7){var B=Math.max(document.documentElement.scrollWidth,document.body.scrollWidth);var C=Math.max(document.documentElement.offsetWidth,document.body.offsetWidth);if(B<C){return A(window).width()+"px";}else{return B+"px";}}else{return A(document).width()+"px";}},resize:function(){var B=A([]);A.each(A.ui.dialog.overlay.instances,function(){B=B.add(this);});B.css({width:0,height:0}).css({width:A.ui.dialog.overlay.width(),height:A.ui.dialog.overlay.height()});}});A.extend(A.ui.dialog.overlay.prototype,{destroy:function(){A.ui.dialog.overlay.destroy(this.$el);}});})(jQuery);
