var sliderPxMax=200;var sliderPxMin=0;var sliderPxTick=1;var loadedCharts=[];var tempFounders=[];var founderColors=["1B2A4D ","698BB8","C1D2EA","EBF1F6","DCE4F1","9DB8D4"];var poolColor="F6BD0E";var invColor="D54545";var valColor="4A7A4A";Function.prototype.method=function(A,B){this.prototype[A]=B;return this;};Function.method("inherits",function(B){var D={},C=(this.prototype=new B());this.method("uber",function A(F){if(!(F in D)){D[F]=0;}var I,H,G=D[F],E=B.prototype;if(G){while(G){E=E.constructor.prototype;G-=1;}I=E[F];}else{I=C[F];if(I==this[F]){I=E[F];}}D[F]+=1;H=I.apply(this,Array.prototype.slice.apply(arguments,[1]));D[F]-=1;return H;});return this;});Function.method("swiss",function(C){for(var B=1;B<arguments.length;B+=1){var A=arguments[B];this.prototype[A]=C.prototype[A];}return this;});function _build3DPieChartXML(B,F){var E=B.calcInvestment();var A=B.calcEmployeeOwnershipValue();var G,I="<chart slicingDistance='10' animation='0' pieSliceDepth='20' showBorder='0' formatNumberScale='1' numberPrefix='$' decimals='0' showPercentInToolTip='1' showPercentValues='1' showZeroPies='0' chartRightMargin='0' chartLeftMargin='0' captionPadding='0' pieRadius='130'>";I+="<set color='"+invColor+"' label='Investors: "+_formatNumberTruncate(E)+"' value='"+E+"'/>";I+="<set color='"+poolColor+"' label='Option Pool: "+_formatNumberTruncate(A)+"' value='"+A+"'/>";for(var D=0;D<F.length;D++){G=F[D];var H=G.getName();var C=B.calcFounderValue(G);if(C>0){I+="<set color='"+founderColors[D]+"' label='"+H+": "+_formatNumberTruncate(C)+"' value='"+C+"'/>";}}return I+="</chart>";}function appendSliderDiv(C,D){if(!D){D="green";}var E=_ce("div");E.id=C+"-bg";E.className="slider-bg";var F=_ce("div");F.id=C+"-thumb";F.className="slider-thumb";F.innerHTML='<img src="images/thumb-n.gif"/>';E.appendChild(F);var B=_ce("div");B.id=C+"-val";B.className="slider-val "+D;var I=_ce("span");I.id=C+"-val-dec";I.className="slider-val-inc left "+D;I.innerHTML="&nbsp;&minus;&nbsp;";I.title="Click to decrease";
B.appendChild(I);var H=_ce("span");H.id=C+"-val-txt";H.innerHTML="�";B.appendChild(H);var G=_ce("span");G.id=C+"-val-inc";G.className="slider-val-inc right "+D;G.innerHTML="&nbsp;+&nbsp;";G.title="Click to increase";B.appendChild(G);var A=_g(C);A.appendChild(E);A.appendChild(B);}function buildSlider(cntr,rnd,sId,maxVal,ref,perc,color){appendSliderDiv(sId,color);var Event=YAHOO.util.Event,slider,scaleFactor=_gsf(maxVal),maxSlider=maxSlider?maxSlider/scaleFactor:sliderPxMax,minSlider=minSlider?minSlider/scaleFactor:sliderPxMin;Event.onDOMReady(function(){slider=YAHOO.widget.Slider.getHorizSlider(sId+"-bg",sId+"-thumb",-minSlider,maxSlider,sliderPxTick);if(rnd){slider.setValue(eval("rnd.get"+ref+"()")/scaleFactor,false);}slider.getRealValue=function(){return this.getValue()*scaleFactor;};var change_to,mouse_to;slider.subscribe("change",function(ofs){clearTimeout(change_to);var realValue=Math.round(slider.getRealValue());eval("rnd.set"+ref+"(realValue,false)");_g(sId+"-val-txt").innerHTML=(perc?realValue+"%":"$"+_formatNumber(realValue));cntr.init(rnd,true);var f=function(){cntr.init(rnd,false);};change_to=setTimeout(f,500);});Event.on(sId+"-val-inc","click",function(e){slider.setValue(inc(slider,perc,scaleFactor,sliderPxTick,1));});Event.on(sId+"-val-dec","click",function(e){slider.setValue(inc(slider,perc,scaleFactor,sliderPxTick,-1));});Event.on(sId+"-val-inc","mousedown",function(e){clearInterval(mouse_to);mouse_to=setInterval(function(){slider.setValue(inc(slider,perc,scaleFactor,sliderPxTick,1),false);},75);});Event.on(sId+"-val-dec","mousedown",function(e){clearInterval(mouse_to);mouse_to=setInterval(function(){slider.setValue(inc(slider,perc,scaleFactor,sliderPxTick,-1),false);},75);});Event.on(sId+"-val-inc","mouseup",function(e){clearInterval(mouse_to);});Event.on(sId+"-val-dec","mouseup",function(e){clearInterval(mouse_to);});});}function _formatNumber(B){B+="";x=B.split(".");x1=x[0];x2=x.length>1?"."+x[1]:"";var A=/(\d+)(\d{3})/;while(A.test(x1)){x1=x1.replace(A,"$1,$2");
}return x1+x2;}function _formatNumberTruncate(E){if(E==0){return"$0";}if(E<1000000&&E>995000){E=1000000;}var C,D=_formatNumber(E,"##").split(","),A=D.length,B="$";if(A==2){B+=(Math.round(D[0]/10)*10)+"K";}else{if(A==3){B+=D[0];C=(Math.round(D[1]/10)*10)+"";if(C.length!=2){C=C.replace(/^0*/,"").replace(/0*$/,"");}else{C="0"+C.replace(/0*$/,"");}B+=C.length>0?".":"";B+=C.length>2?C.substring(0,2):C;B+="M";}}return B;}function inc(B,D,F,E,A){var G=B.getRealValue(),C=D?Math.round(G+(1*A)):G+(F*E*A);return(C/F);}function _gsf(A){return A/sliderPxMax;}function _r(A){return Math.round(A);}function getRoundByIdPrefix(C){for(var B=0;B<controller.rounds.length;B++){var A=controller.rounds[B];if(A.getIdPrefix()==C){return A;}}return null;}function isChartDivDisplayed(A){var C=_g("round"+A);var B=C.className;return B.indexOf("detail")>0;}function getChart(A){return new FusionCharts("charts/Pie3D.swf",A,"575","220","0","1");}function addChart(A){var B=getChart(A.getChartId());B.setDataXML("<chart></chart>");B.render(A.getChartDivId());controller.charts.push(A.getChartId());}function removeChart(C){var A=new Array();for(var B=0;B<loadedCharts.length;B++){var D=loadedCharts[B];if(D!=C.getChartId()){A.push(D);}}loadedCharts=A;controller.charts=A;}function FC_Rendered(B){var A=getRoundByIdPrefix(B.substring(0,1));loadedCharts.push(B);controller.init(A);}function sendCntrState(A){window.location=A+"?json="+controller.getStateJSON();}function getURLParam(E){var D="";var C=window.location.href;if(C.indexOf("?")>-1){var B=C.substr(C.indexOf("?"));var G=B.split("&");for(var A=0;A<G.length;A++){if(G[A].indexOf(E+"=")>-1){var H=G[A].split("=");D=H[1];break;}}}var F=D.lastIndexOf("#");if(F==D.length-1){D=D.slice(0,F);}return unescape(D);}function insertFounder(C,A){var E=YAHOO.util.Dom;if(!C){C=defaultFounderPerc();}var G,F=_g("fndrs"),B=_getFounderChildren(F),I=B.length,D=B[I-1];if(I==5){E.get("addBtn").disabled=true;}A=A?A:"Founder "+(I+1);nodeString="<span>";nodeString+='<input type="text" size="15" maxlength="25" name="f'+I+'Name" id="f'+I+'Name" value="'+A+'" />';
nodeString+=": ";nodeString+='<input type="text" size="2" maxlength="4" name="f'+I+'" id="f'+I+'" value="'+C+'" onkeyup="totalFounders()"/>%</span>';G=_ce("p");G.innerHTML=nodeString;if(D){_insertRemoveButton(G);E.insertAfter(G,D);if(I>1){D.removeChild(E.getLastChild(D));}var J=totalFounders(),H;if(J==66){H=33;}else{H=100-J;}G.childNodes[0].childNodes[2].value=C?C:H;}else{E.insertBefore(G,_g("founderWarning"));G.childNodes[0].childNodes[2].value=C?C:100;}totalFounders();}function removeFounder(D){var B=YAHOO.util.Dom;var E=D.parentNode,A,C=B.get("fndrs");E.parentNode.removeChild(E);A=_getFounderChildren(C),cl=A.length,lastFounder=A[cl-1];B.get("addBtn").disabled=false;if(cl>1){_insertRemoveButton(lastFounder);}totalFounders();}function totalFounders(){var E=YAHOO.util.Dom;var D=0,B,A,G,C,F=_getFounderChildren(E.get("fndrs"));tempFounders=[];for(C=0;C<F.length;C++){B=F[C].childNodes[0];A=F[C].childNodes[0].childNodes[0].value;G=parseInt(B.childNodes[2].value);tempFounders.push(new Founder(A,G,(C+A)));D+=G;}E.get("saveBtn").disabled=(D>=99&&D<=100)?false:true;E.get("founderWarning").style.display=(D>=99&&D<=100)?"none":"";return D;}function defaultFounderPerc(){var A=totalFounders();if(A>=100){return 0;}if(A==66){return 33;}return 100-A;}function _insertRemoveButton(A){A.innerHTML+='&nbsp;<button type="button" onclick="removeFounder(this);" title="Remove founder">&minus;</button>';}function _getFounderChildren(A){return YAHOO.util.Dom.getChildrenBy(A,function(B){return B.firstChild.tagName=="SPAN";});}function save(A){var B=totalFounders();if(B>=99&&B<=100){A.setFounders(tempFounders);}}function _g(A){return document.getElementById(A);}function _ce(A){return document.createElement(A);}function edit(A,B){$("#"+B).toggleClass("edit").hasClass("edit")?$(A).html("Save"):$(A).html("Edit");}function buildMasterSumXml(C){C=C?"0":"1";var B="<?xml version='1.0' encoding='utf-8'?><chart caption='Master Summary' showvalues='0' numberSuffix='%2525' sNumberPrefix='$' PYAxisName='Ownership %25' SYAxisName='Total Valuation' sFormatNumberScale='1' decimals='0' showPercentInToolTip='1' showPercentValues='1' adjustDiv='0' animation='"+C+"'>";
B+="<categories>";B+="<category label='Pre-investment' />";B+="<category label='Round 1' />";B+="<category label='Round 2' />";B+="<category label='Round 3' />";B+="</categories>";var G=controller.getRounds();var F=controller.getFounders();for(var E=0;E<F.length;E++){var D=F[E];B+="<dataset color='"+founderColors[E]+"' seriesName='"+D.getName()+"'>";var A=_ftt(D.getName(),null,D.getOwnership()*100);B+="<set color='"+founderColors[E]+"' toolText='"+A+"' value='"+D.getOwnership()*100+"' />";if(G[0].isConvertableDebt()){B+="<set color='"+founderColors[E]+"' toolText='NA' value='"+D.getOwnership()*100+"' />";}else{A=_ftt(D.getName(),G[0].calcFounderValue(D),G[0].calcFounderOwnership(D));B+="<set color='"+founderColors[E]+"' toolText='"+A+"' value='"+G[0].calcFounderOwnership(D)+"' />";}A=_ftt(D.getName(),G[1].calcFounderValue(D),G[1].calcFounderOwnership(D));B+="<set color='"+founderColors[E]+"' toolText='"+A+"' value='"+G[1].calcFounderOwnership(D)+"' />";A=_ftt(D.getName(),G[2].calcFounderValue(D),G[2].calcFounderOwnership(D));B+="<set color='"+founderColors[E]+"' toolText='"+A+"' value='"+G[2].calcFounderOwnership(D)+"' />";B+="</dataset>";}B+="<dataset color='"+poolColor+"' seriesName='Option Pool'>";B+="<set color='"+poolColor+"' value='0' />";if(G[0].isConvertableDebt()){B+="<set color='"+poolColor+"' toolText='NA' value='0' />";}else{A=_ftt("Option Pool",G[0].calcEmployeeOwnershipValue(),G[0].getEmployeeOwnership());B+="<set color='"+poolColor+"' toolText='"+A+"' value='"+G[0].getEmployeeOwnership()+"' />";}A=_ftt("Option Pool",G[1].calcEmployeeOwnershipValue(),G[1].getEmployeeOwnership());B+="<set color='"+poolColor+"' toolText='"+A+"' value='"+G[1].getEmployeeOwnership()+"' />";A=_ftt("Option Pool",G[2].calcEmployeeOwnershipValue(),G[2].getEmployeeOwnership());B+="<set color='"+poolColor+"' toolText='"+A+"' value='"+G[2].getEmployeeOwnership()+"' />";B+="</dataset>";B+="<dataset color='"+invColor+"' seriesName='Investors'>";B+="<set color='"+invColor+"' value='0' />";
if(G[0].isConvertableDebt()){B+="<set color='"+poolColor+"' toolText='NA' value='0' />";}else{A=_ftt("Investors",G[0].calcInvestment(),G[0].calcInvestmentOwnership());B+="<set color='"+invColor+"' toolText='"+A+"' value='"+G[0].calcInvestmentOwnership()+"' />";}A=_ftt("Investors",G[1].calcInvestment(),G[1].calcInvestmentOwnership());B+="<set color='"+invColor+"' toolText='"+A+"' value='"+G[1].calcInvestmentOwnership()+"' />";A=_ftt("Investors",G[2].calcInvestment(),G[2].calcInvestmentOwnership());B+="<set color='"+invColor+"' toolText='"+A+"' value='"+G[2].calcInvestmentOwnership()+"' />";B+="</dataset>";B+="<dataset color='"+valColor+"' seriesName='Valuation' parentYAxis='S'>";B+="<set value='0' />";if(G[0].isConvertableDebt()){B+="<set value='0' />";}else{B+="<set value='"+G[0].calcPostValuation()+"' />";}B+="<set value='"+G[1].calcPostValuation()+"' />";B+="<set value='"+G[2].calcPostValuation()+"' />";B+="</dataset>";B+="</chart>";return B;}function loadMasterSummary(){$("#dialog").dialog({width:800,height:525,modal:true,autoOpen:false,draggable:false,resizable:false,title:"Master Summary",overlay:detectMacXFF2()?{backgroundColor:"#FFF"}:{backgroundColor:"#FFF",opacity:0.6},buttons:{Print:function(){getChartFromId("masterSumChart").print();},Close:function(){$("#dialog").dialog("close");}}});$("#dialog").dialog("open");var A=new FusionCharts("res/1.0.0/charts/StackedColumn3DLineDY.swf","masterSumChart","700","450","0","1");A.setDataXML(buildMasterSumXml());A.render("dialog");pageTracker._trackPageview("/masterSummary");}function _ftt(A,C,B){var D=A;if(C){D+=", "+_formatNumberTruncate(_r(C));}if(B){D+=", "+_r(B)+"%25";}return A+", "+_formatNumberTruncate(_r(C))+", "+_r(B)+"%25";}Number.formatFunctions={count:0};Number.prototype.NaN="NaN";Number.prototype.posInfinity="Infinity";Number.prototype.negInfinity="-Infinity";Number.prototype.numberFormat=function(B,A){if(isNaN(this)){return Number.prototype.NaNstring;}else{if(this==+Infinity){return Number.prototype.posInfinity;
}else{if(this==-Infinity){return Number.prototype.negInfinity;}else{if(Number.formatFunctions[B]==null){Number.createNewFormat(B);}}}}return this[Number.formatFunctions[B]](A);};Number.createNewFormat=function(format){var funcName="format"+Number.formatFunctions.count++;Number.formatFunctions[format]=funcName;var code="Number.prototype."+funcName+" = function(context){\n";var formats=format.split(";");switch(formats.length){case 1:code+=Number.createTerminalFormat(format);break;case 2:code+='return (this < 0) ? this.numberFormat("'+String.escape(formats[1])+'", 1) : this.numberFormat("'+String.escape(formats[0])+'", 2);';break;case 3:code+='return (this < 0) ? this.numberFormat("'+String.escape(formats[1])+'", 1) : ((this == 0) ? this.numberFormat("'+String.escape(formats[2])+'", 2) : this.numberFormat("'+String.escape(formats[0])+'", 3));';break;default:code+="throw 'Too many semicolons in format string';";break;}eval(code+"}");};Number.createTerminalFormat=function(I){if(I.length>0&&I.search(/[0#?]/)==-1){return"return '"+String.escape(I)+"';\n";}var A="var val = (context == null) ? new Number(this) : Math.abs(this);\n";var F=false;var E=I;var G="";var J=0;var K=0;var B=0;var H=false;var C="";D=I.match(/\..*(e)([+-]?)(0+)/i);if(D){C=D[1];H=(D[2]=="+");B=D[3].length;I=I.replace(/(e)([+-]?)(0+)/i,"");}var D=I.match(/^([^.]*)\.(.*)$/);if(D){E=D[1].replace(/\./g,"");G=D[2].replace(/\./g,"");}if(I.indexOf("%")>=0){A+="val *= 100;\n";}D=E.match(/(,+)(?:$|[^0#?,])/);if(D){A+="val /= "+Math.pow(1000,D[1].length)+"\n;";}if(E.search(/[0#?],[0#?]/)>=0){F=true;}if((D)||F){E=E.replace(/,/g,"");}D=E.match(/0[0#?]*/);if(D){J=D[0].length;}D=G.match(/[0#?]*/);if(D){K=D[0].length;}if(B>0){A+="var sci = Number.toScientific(val,"+J+", "+K+", "+B+", "+H+");\nvar arr = [sci.l, sci.r];\n";}else{if(I.indexOf(".")<0){A+="val = (val > 0) ? Math.ceil(val) : Math.floor(val);\n";}A+="var arr = val.round("+K+").toFixed("+K+").split('.');\n";A+="arr[0] = (val < 0 ? '-' : '') + String.leftPad((val < 0 ? arr[0].substring(1) : arr[0]), "+J+", '0');\n";
}if(F){A+="arr[0] = Number.addSeparators(arr[0]);\n";}A+="arr[0] = Number.injectIntoFormat(arr[0].reverse(), '"+String.escape(E.reverse())+"', true).reverse();\n";if(K>0){A+="arr[1] = Number.injectIntoFormat(arr[1], '"+String.escape(G)+"', false);\n";}if(B>0){A+="arr[1] = arr[1].replace(/(\\d{"+K+"})/, '$1"+C+"' + sci.s);\n";}return A+"return arr.join('.');\n";};Number.toScientific=function(C,G,H,B,D){var I={l:"",r:"",s:""};var E="";var F=Math.abs(C).toFixed(G+H+1).trim("0");var A=Math.round(new Number(F.replace(".","").replace(new RegExp("(\\d{"+(G+H)+"})(.*)"),"$1.$2"))).toFixed(0);if(A.length>=G){A=A.substring(0,G)+"."+A.substring(G);}else{A+=".";}I.s=(F.indexOf(".")-F.search(/[1-9]/))-A.indexOf(".");if(I.s<0){I.s++;}I.l=(C<0?"-":"")+String.leftPad(A.substring(0,A.indexOf(".")),G,"0");I.r=A.substring(A.indexOf(".")+1);if(I.s<0){E="-";}else{if(D){E="+";}}I.s=E+String.leftPad(Math.abs(I.s).toFixed(0),B,"0");return I;};Number.prototype.round=function(B){if(B>0){var A=this.toFixed(B+1).match(new RegExp("(-?\\d*).(\\d{"+B+"})(\\d)\\d*$"));if(A&&A.length){return new Number(A[1]+"."+String.leftPad(Math.round(A[2]+"."+A[3]),B,"0"));}}return this;};Number.injectIntoFormat=function(G,F,B){var D=0;var C=0;var A="";var E=G.charAt(G.length-1)=="-";if(E){G=G.substring(0,G.length-1);}while(D<F.length&&C<G.length&&F.substring(D).search(/[0#?]/)>=0){if(F.charAt(D).match(/[0#?]/)){if(G.charAt(C)!="-"){A+=G.charAt(C);}else{A+="0";}C++;}else{A+=F.charAt(D);}++D;}if(E&&C==G.length){A+="-";}if(C<G.length){if(B){A+=G.substring(C);}if(E){A+="-";}}if(D<F.length){A+=F.substring(D);}return A.replace(/#/g,"").replace(/\?/g," ");};Number.addSeparators=function(A){return A.reverse().replace(/(\d{3})/g,"$1,").reverse().replace(/^(-)?,/,"$1");};String.prototype.reverse=function(){var B="";for(var A=this.length;A>0;--A){B+=this.charAt(A-1);}return B;};String.prototype.trim=function(A){if(!A){A=" ";}return this.replace(new RegExp("^"+A+"+|"+A+"+$","g"),"");};String.leftPad=function(D,B,C){var A=new String(D);
if(C==null){C=" ";}while(A.length<B){A=C+A;}return A;};String.escape=function(A){return A.replace(/('|\\)/g,"\\$1");};function cancelBubble(A){A=window.event||A;if(!A){return ;}if(A.stopPropagation){A.stopPropagation();}else{A.cancelBubble=true;}}var waitingHTML='<div style="text-align:center;"><img src="images/wait.gif" alt="Loading. Please wait." style="padding:2em;"/></div>';function helpTip(D,A){var B=$("#helpTip"),C=B[0].style;D=D||window.event;if(A&&A.tagName=="A"){var E=$(A).offset();C.top=E.top+$(A).height()+"px";C.left=E.left>($(document.body).width()/2)?E.left-B.width()+"px":E.left+"px";C.display="block";$(document.body).bind("click",helpTip);B.load(A.href,function(F,G){if(G=="error"){B.html('<p style="color:red">This page ("'+A.href+'") cannot be loaded.</p>');}if($(document).scrollTop()+$(window).height()-E.top<B.height()){scrollBy(0,B.height()-($(document).scrollTop()+$(window).height()-E.top)+50);}var H=$(B.html()).filter("h1");H.append($('<a class="helpTip-close" href="#" onclick="helpTip();return false"><span>X</span></a>'));$(H).replaceAll("h1");});cancelBubble(D);return false;}C.display="none";B.html(waitingHTML);$(document.body).unbind();return false;}function helpTipDialog(A){helpTip();$("#infoDialog").dialog({width:800,height:525,modal:true,autoOpen:false,draggable:false,resizable:false,title:"More Information",overlay:{backgroundColor:"#FFF",opacity:0.6},buttons:{Close:function(){$("#infoDialog").dialog("close").html(waitingHTML);}}});$("#infoDialog").dialog("open");$("#infoDialog").load(A.href);return false;}function detectMacXFF2(){var B=navigator.userAgent.toLowerCase();if(/firefox[\/\s](\d+\.\d+)/.test(B)){var A=new Number(RegExp.$1);if(A<3&&B.indexOf("mac")!=-1){return true;}}}
