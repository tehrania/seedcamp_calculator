if(typeof infosoftglobal=="undefined"){var infosoftglobal=new Object();}if(typeof infosoftglobal.FusionChartsUtil=="undefined"){infosoftglobal.FusionChartsUtil=new Object();}infosoftglobal.FusionCharts=function(C,A,I,F,K,D,G,J,B,E,H){if(!document.getElementById){return ;}this.initialDataSet=false;this.params=new Object();this.variables=new Object();this.attributes=new Array();if(C){this.setAttribute("swf",C);}if(A){this.setAttribute("id",A);}if(I){this.setAttribute("width",I);}if(F){this.setAttribute("height",F);}if(G){this.addParam("bgcolor",G);}this.addParam("quality","high");this.addParam("allowScriptAccess","always");this.addVariable("chartWidth",I);this.addVariable("chartHeight",F);K=K?K:0;this.addVariable("debugMode",K);this.addVariable("DOMId",A);D=D?D:0;this.addVariable("registerWithJS",D);J=J?J:"noScale";this.addVariable("scaleMode",J);B=B?B:"EN";this.addVariable("lang",B);this.detectFlashVersion=E?E:1;this.autoInstallRedirect=H?H:1;this.installedVer=infosoftglobal.FusionChartsUtil.getPlayerVersion();if(!window.opera&&document.all&&this.installedVer.major>7){infosoftglobal.FusionCharts.doPrepUnload=true;}};infosoftglobal.FusionCharts.prototype={setAttribute:function(A,B){this.attributes[A]=B;},getAttribute:function(A){return this.attributes[A];},addParam:function(A,B){this.params[A]=B;},getParams:function(){return this.params;},addVariable:function(A,B){this.variables[A]=B;},getVariable:function(A){return this.variables[A];},getVariables:function(){return this.variables;},getVariablePairs:function(){var A=new Array();var B;var C=this.getVariables();for(B in C){A.push(B+"="+C[B]);}return A;},getSWFHTML:function(){var D="";if(navigator.plugins&&navigator.mimeTypes&&navigator.mimeTypes.length){D='<embed type="application/x-shockwave-flash" src="'+this.getAttribute("swf")+'" width="'+this.getAttribute("width")+'" height="'+this.getAttribute("height")+'"  ';D+=' id="'+this.getAttribute("id")+'" name="'+this.getAttribute("id")+'" ';var C=this.getParams();for(var A in C){D+=[A]+'="'+C[A]+'" ';
}var B=this.getVariablePairs().join("&");if(B.length>0){D+='flashvars="'+B+'"';}D+="/>";}else{D='<object id="'+this.getAttribute("id")+'" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="'+this.getAttribute("width")+'" height="'+this.getAttribute("height")+'">';D+='<param name="movie" value="'+this.getAttribute("swf")+'" />';var C=this.getParams();for(var A in C){D+='<param name="'+A+'" value="'+C[A]+'" />';}var B=this.getVariablePairs().join("&");if(B.length>0){D+='<param name="flashvars" value="'+B+'" />';}D+="</object>";}return D;},setDataURL:function(A){if(this.initialDataSet==false){this.addVariable("dataURL",A);this.initialDataSet=true;}else{var B=infosoftglobal.FusionChartsUtil.getChartObject(this.getAttribute("id"));B.setDataURL(A);}},setDataXML:function(A){if(this.initialDataSet==false){this.addVariable("dataXML",A);this.initialDataSet=true;}else{var B=infosoftglobal.FusionChartsUtil.getChartObject(this.getAttribute("id"));B.setDataXML(A);}},setTransparent:function(A){if(typeof A=="undefined"){A=true;}if(A){this.addParam("WMode","transparent");}else{this.addParam("WMode","Opaque");}},render:function(A){if((this.detectFlashVersion==1)&&(this.installedVer.major<8)){if(this.autoInstallRedirect==1){var B=window.confirm("You need Adobe Flash Player 8 (or above) to view the charts. It is a free and lightweight installation from Adobe.com. Please click on Ok to install the same.");if(B){window.location="http://www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash";}else{return false;}}else{return false;}}else{var C=(typeof A=="string")?document.getElementById(A):A;C.innerHTML=this.getSWFHTML();if(!document.embeds[this.getAttribute("id")]&&!window[this.getAttribute("id")]){window[this.getAttribute("id")]=document.getElementById(this.getAttribute("id"));}return true;}}};infosoftglobal.FusionChartsUtil.getPlayerVersion=function(){var C=new infosoftglobal.PlayerVersion([0,0,0]);if(navigator.plugins&&navigator.mimeTypes.length){var A=navigator.plugins["Shockwave Flash"];
if(A&&A.description){C=new infosoftglobal.PlayerVersion(A.description.replace(/([a-zA-Z]|\s)+/,"").replace(/(\s+r|\s+b[0-9]+)/,".").split("."));}}else{if(navigator.userAgent&&navigator.userAgent.indexOf("Windows CE")>=0){var D=1;var B=3;while(D){try{B++;D=new ActiveXObject("ShockwaveFlash.ShockwaveFlash."+B);C=new infosoftglobal.PlayerVersion([B,0,0]);}catch(E){D=null;}}}else{try{var D=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");}catch(E){try{var D=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");C=new infosoftglobal.PlayerVersion([6,0,21]);D.AllowScriptAccess="always";}catch(E){if(C.major==6){return C;}}try{D=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");}catch(E){}}if(D!=null){C=new infosoftglobal.PlayerVersion(D.GetVariable("$version").split(" ")[1].split(","));}}}return C;};infosoftglobal.PlayerVersion=function(A){this.major=A[0]!=null?parseInt(A[0]):0;this.minor=A[1]!=null?parseInt(A[1]):0;this.rev=A[2]!=null?parseInt(A[2]):0;};infosoftglobal.FusionChartsUtil.cleanupSWFs=function(){var C=document.getElementsByTagName("OBJECT");for(var B=C.length-1;B>=0;B--){C[B].style.display="none";for(var A in C[B]){if(typeof C[B][A]=="function"){C[B][A]=function(){};}}}};if(infosoftglobal.FusionCharts.doPrepUnload){if(!infosoftglobal.unloadSet){infosoftglobal.FusionChartsUtil.prepUnload=function(){__flash_unloadHandler=function(){};__flash_savedUnloadHandler=function(){};window.attachEvent("onunload",infosoftglobal.FusionChartsUtil.cleanupSWFs);};window.attachEvent("onbeforeunload",infosoftglobal.FusionChartsUtil.prepUnload);infosoftglobal.unloadSet=true;}}if(!document.getElementById&&document.all){document.getElementById=function(A){return document.all[A];};}if(Array.prototype.push==null){Array.prototype.push=function(A){this[this.length]=A;return this.length;};}infosoftglobal.FusionChartsUtil.getChartObject=function(B){var A=null;if(navigator.appName.indexOf("Microsoft Internet")==-1){if(document.embeds&&document.embeds[B]){A=document.embeds[B];}else{A=window.document[B];
}}else{A=window[B];}if(!A){A=document.getElementById(B);}return A;};var getChartFromId=infosoftglobal.FusionChartsUtil.getChartObject;var FusionCharts=infosoftglobal.FusionCharts;
