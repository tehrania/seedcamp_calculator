var initString=getURLParam("json").replace(/\\/g, "");if(!initString||initString.length<=0){initString="{'r1':{'o':20,'pi':2000000,'i':2000000,'c':false,'d':false},'r2':{'o':12,'pi':10000000,'i':7000000,'c':false,'d':false},'r3':{'o':7,'pi':40000000,'i':30000000,'c':false,'d':false},'f':[{'n':'Founder 1','o':'33'},{'n':'Founder 2','o':'33'},{'n':'Founder 3','o':'33'}]}";}else{edit(_g("r1ValSave"),"round1");edit(_g("r2ValSave"),"round2");edit(_g("r3ValSave"),"round3");}var json=eval("("+initString+")");var founders=[];var round1=new Round1("r1",json.r1.o,json.r1.i,json.r1.pi,20000000);if(json.r1.c){round1.setConversionPerc(json.r1.cp);}var round2=new RoundN("r2",json.r2.i,json.r2.pi,100000000,round1);round2.setEmployeeOwnership(json.r2.o);var round3=new RoundN("r3",json.r3.i,json.r3.pi,200000000,round2);round3.setEmployeeOwnership(json.r3.o);var controller=new Controller([round1,round2,round3]);round1.addSliders(controller);round2.addSliders(controller);round3.addSliders(controller);for(i=0;i<json.f.length;i++){var f=json.f[i];insertFounder(f.o,f.n);}save(controller);if(json.r1.d||json.r1.c){$("#r1Opt").toggle("fast");}if(json.r1.d){_g("r1DownRnd").click();}if(json.r1.c){_g("r1ConDebt").click();}if(json.r2.d){_g("r2DownRnd").click();$("#r2Opt").toggle("fast");}$(document).ready(function(){$("#printDialogBtn").click(function(){$("#printDialog").dialog({width:800,height:525,modal:true,autoOpen:false,draggable:false,resizable:false,title:"Printing Instructions",overlay:{backgroundColor:"#FFF",opacity:0.6},buttons:{Print:function(){sendCntrState("printseed_calculator.html");},Close:function(){$("#printDialog").dialog("close");}}});$("#printDialog").dialog("open").load("content/dialogs/printing.html");});$("#partnerDialogBtn").click(function(){$("#partnerDialog").dialog({width:800,height:525,modal:true,autoOpen:false,draggable:false,resizable:false,title:"Email Scenario",overlay:{backgroundColor:"#FFF",opacity:0.6},buttons:{Close:function(){$("#partnerDialog").dialog("close");}}});$("#partnerDialog").dialog("open").load("content/dialogs/emailScenario.html?v=1.1");
});$('#r1Opt').toggle('fast')});

