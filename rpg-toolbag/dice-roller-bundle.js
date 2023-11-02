(function(){"use strict";var __webpack_modules__={892:function(__unused_webpack_module,__webpack_exports__,__webpack_require__){__webpack_require__.d(__webpack_exports__,{w:function(){return Component}});class RpgData{SUM_LIST=[];D_LIST=[];historyLines=[];$MINIMUM=null;set MINIMUM(t){this.$MINIMUM=t,this.save()}get MINIMUM(){return this.$MINIMUM}$FLAT=null;set FLAT(t){this.$FLAT=t,this.save()}get FLAT(){return this.$FLAT}$SKILL=null;set SKILL(t){this.$SKILL=t,this.save()}get SKILL(){return this.$SKILL}$TABSVIEW=null;set TABSVIEW(t){this.$TABSVIEW=t,this.save()}get TABSVIEW(){return this.$TABSVIEW}$W40MODE=null;set W40MODE(t){this.$W40MODE=t,this.save()}get W40MODE(){return this.$W40MODE}$SUM=null;set SUM(t){this.$SUM=t,this.save()}get SUM(){return this.$SUM}$DEGREESV_MIN=null;set DEGREESV_MIN(t){this.$DEGREESV_MIN=t,this.save()}get DEGREESV_MIN(){return this.$DEGREESV_MIN}$REROLLLOWEST=null;set REROLLLOWEST(t){this.$REROLLLOWEST=t,this.save()}get REROLLLOWEST(){return this.$REROLLLOWEST}$SHOWFORMULA=null;set SHOWFORMULA(t){this.$SHOWFORMULA=t,this.save()}get SHOWFORMULA(){return this.$SHOWFORMULA}$LASMASTERY=null;set LASMASTERY(t){this.$LASMASTERY=t,this.save()}get LASMASTERY(){return this.$LASMASTERY}$DEGREE_CALC_TYPE=null;set DEGREE_CALC_TYPE(t){this.$DEGREE_CALC_TYPE=t,this.save()}get DEGREE_CALC_TYPE(){return this.$DEGREE_CALC_TYPE}save(){localStorage.setItem("rpg-data",JSON.stringify(this))}}const rpgData=new RpgData,SUCCESSTEXT="SUCCESS",FAILTEXT="FAIL";class Component{$ROLL;$SKILL;$MINIMUM;$FLAT;$TABSVIEW;$REROLLLOWEST;$FORMULA;$SHOWFORMULA;$LASMASTERY;$DEGREESV_MIN;$RESULT;$ACCURATE_ROLL;$LAST_HISTORY;$FULL_HISTORY;$FORMULAPARENT;$TABSVIEW_PARENT;$W40MODE;$MINIMUMVal;$FLATVal;$SUM;$FORMULA_RESULT;$DEGREESV;$DEGREE_CALC_TYPE;init(){this.$ROLL=$("#ROLL"),this.$SKILL=$("#SKILL"),this.$MINIMUM=$("#MINIMUM"),this.$FLAT=$("#FLAT"),this.$TABSVIEW=$("#TABSVIEW"),this.$REROLLLOWEST=$("#REROLLLOWEST"),this.$FORMULA=$("#FORMULA"),this.$SHOWFORMULA=$("#SHOWFORMULA"),this.$LASMASTERY=$("#LASMASTERY"),this.$DEGREESV_MIN=$("#DEGREESV_MIN"),this.$RESULT=$("#RESULT"),this.$ACCURATE_ROLL=$("#ACCURATE_ROLL"),this.$LAST_HISTORY=$("#LAST_HISTORY"),this.$FULL_HISTORY=$("#FULL_HISTORY"),this.$FORMULAPARENT=$("#FORMULAPARENT"),this.$TABSVIEW_PARENT=$("#TABSVIEW_PARENT"),this.$W40MODE=$("#W40MODE"),this.$MINIMUMVal=$("#MINIMUMVal"),this.$FLATVal=$("#FLATVal"),this.$SUM=$("#SUM"),this.$FORMULA_RESULT=$("#FORMULA_RESULT"),this.$DEGREESV=$("#DEGREESV"),this.$DEGREE_CALC_TYPE=$("#DEGREE_CALC_TYPE");const t=localStorage.getItem("rpg-data");if(t){const a=JSON.parse(t);rpgData.SUM_LIST=a.SUM_LIST,rpgData.D_LIST=a.D_LIST,rpgData.$MINIMUM=a.$MINIMUM,rpgData.$FLAT=a.$FLAT,rpgData.$SKILL=a.$SKILL,rpgData.$TABSVIEW=a.$TABSVIEW,rpgData.$W40MODE=a.$W40MODE,rpgData.$SUM=a.$SUM,rpgData.$DEGREESV_MIN=a.$DEGREESV_MIN,rpgData.$REROLLLOWEST=a.$REROLLLOWEST,rpgData.$SHOWFORMULA=a.$SHOWFORMULA,rpgData.$LASMASTERY=a.$LASMASTERY,rpgData.$DEGREE_CALC_TYPE=a.$DEGREE_CALC_TYPE,rpgData.historyLines=a.historyLines,rpgData.historyLines&&rpgData.historyLines.length>0&&(this.$LAST_HISTORY.html(rpgData.historyLines[rpgData.historyLines.length-1]),rpgData.historyLines.forEach((t=>{this.$FULL_HISTORY.prepend("<li class='list-group-item' data-type='array-item'>"+t+"</li>")})))}null!=rpgData.DEGREE_CALC_TYPE&&this.$DEGREE_CALC_TYPE.val(rpgData.DEGREE_CALC_TYPE),this.$DEGREE_CALC_TYPE.change((t=>{rpgData.DEGREE_CALC_TYPE=this.$DEGREE_CALC_TYPE.val()})),null!=rpgData.MINIMUM&&+rpgData.MINIMUM>0&&(this.$MINIMUM.val(rpgData.MINIMUM),this.$MINIMUM.attr("data-slider-value",rpgData.MINIMUM),this.$MINIMUMVal.text(rpgData.MINIMUM)),this.$MINIMUM.slider(),this.$MINIMUM.on("slide",(t=>{this.$MINIMUMVal.text(t.value)})),null!=rpgData.FLAT&&+rpgData.FLAT>0&&(this.$FLAT.val(rpgData.FLAT),this.$FLAT.attr("data-slider-value",rpgData.FLAT),this.$FLATVal.text(rpgData.FLAT)),this.$FLAT.slider(),this.$FLAT.on("slide",(t=>{this.$FLATVal.text(t.value)})),null!=rpgData.SKILL&&this.$SKILL.val(rpgData.SKILL),this.$TABSVIEW.prop("checked",!1),this.$TABSVIEW_PARENT.addClass("tabsviewoff"),null!=rpgData.W40MODE&&"true"==rpgData.W40MODE?(this.$W40MODE.prop("checked",!0),this.$TABSVIEW_PARENT.addClass("w40kmode")):(this.$W40MODE.prop("checked",!1),this.$TABSVIEW_PARENT.removeClass("w40kmode")),this.$SUM.prop("checked",null!=rpgData.SUM&&"true"==rpgData.SUM),this.$DEGREESV_MIN.prop("checked",null!=rpgData.DEGREESV_MIN&&"true"==rpgData.DEGREESV_MIN),this.$REROLLLOWEST.prop("checked",null!=rpgData.REROLLLOWEST&&"true"==rpgData.REROLLLOWEST),null!=rpgData.SHOWFORMULA&&"true"==rpgData.SHOWFORMULA?(this.$SHOWFORMULA.prop("checked",!0),this.$FORMULAPARENT.css({display:"inherit"})):(this.$SHOWFORMULA.prop("checked",!1),this.$FORMULAPARENT.css({display:"none"})),this.$LASMASTERY.prop("checked",null!=rpgData.$LASMASTERY&&"true"==rpgData.$LASMASTERY),this.$SHOWFORMULA.change((t=>{rpgData.SHOWFORMULA=this.$SHOWFORMULA.prop("checked")?"true":"false",this.$SHOWFORMULA.prop("checked")?this.$FORMULAPARENT.css({display:"inherit"}):this.$FORMULAPARENT.css({display:"none"})})),this.$FLAT.change((t=>{const a=this.$FLAT.val();a&&(rpgData.FLAT=a.toString())})),this.$MINIMUM.change((t=>{const a=this.$MINIMUM.val();a&&(rpgData.MINIMUM=a.toString())})),this.$REROLLLOWEST.change((t=>{rpgData.REROLLLOWEST=this.$REROLLLOWEST.prop("checked")?"true":"false"})),this.$LASMASTERY.change((t=>{rpgData.$LASMASTERY=this.$LASMASTERY.prop("checked")?"true":"false"})),this.$SUM.change((t=>{rpgData.SUM=this.$SUM.prop("checked")?"true":"false"})),this.$DEGREESV_MIN.change((t=>{rpgData.DEGREESV_MIN=this.$DEGREESV_MIN.prop("checked")?"true":"false"})),this.$TABSVIEW.change((t=>{this.$TABSVIEW_PARENT.toggleClass("tabsviewoff"),rpgData.TABSVIEW=this.$TABSVIEW.prop("checked")?"true":"false"})),this.$W40MODE.change((t=>{this.$TABSVIEW_PARENT.toggleClass("w40kmode"),rpgData.W40MODE=this.$W40MODE.prop("checked")?"true":"false"})),$('[data-toggle="popover"]').popover({trigger:"focus",html:!0}),$("#clearLatest").confirmation({rootSelector:"#clearLatest",onConfirm:()=>{this.clearLatest()}}),$("#clearSum").confirmation({rootSelector:"#clearSum",onConfirm:()=>{this.clearSum()}}),$("#clearHistory").confirmation({rootSelector:"#clearHistory",onConfirm:()=>{this.clearHistory()}}),this.$SKILL.change((t=>{this.change(),this.saveSkill()})),this.$SKILL.keyup((t=>{this.change(),this.saveSkill()})),this.$ROLL.change((t=>{const a=this.$ROLL.val();a&&this.rollSet100(Number(a))})),this.$ROLL.keyup((t=>{if(null==t||"Enter"!==t.key&&13!==t.keyCode)this.change();else{const t=this.$ROLL.val();t&&this.rollSet100(Number(t))}})),this.$FORMULA.change((t=>{this.calcFormula()})),this.$FORMULA.keyup((t=>{this.calcFormula()})),document.getElementById("rollRandom100")?.addEventListener("click",(t=>{this.rollRandom100(t)})),document.getElementById("saveFormulaResult")?.addEventListener("click",(t=>{this.saveFormulaResult()})),document.getElementById("ACCURATE_ROLL")?.addEventListener("click",(t=>{this.rollRandomAccurate(10,"i10")})),$("[rollRandom]").click((t=>{const a=t.target.getAttribute("rollRandom");if(a){const e=t.originalEvent;e&&this.rollRandom(e,Number(a),"i"+a)}}))}saveSkill(){const t=this.$SKILL.val();t&&(rpgData.SKILL=t.toString())}calcFormula(){try{let FORMULA=this.$FORMULA.val();if(FORMULA){FORMULA=FORMULA.toString().replace("x","*").replace(":","/").replace("×","*").replace("÷","/").replace("+","+").replace(",",".");const FORMULA_EVAL=eval(FORMULA);this.$FORMULA_RESULT.text(FORMULA_EVAL)}}catch(t){console.error(t),this.$FORMULA_RESULT.text("?")}}saveFormulaResult(){this.$SKILL.val(this.$FORMULA_RESULT.text()),this.saveSkill()}clearSum(){rpgData.SUM_LIST.splice(0,rpgData.SUM_LIST.length),rpgData.D_LIST.splice(0,rpgData.D_LIST.length),rpgData.historyLines.splice(0,rpgData.historyLines.length),rpgData.save()}clearHistory(){this.clearSum(),this.$FULL_HISTORY.html("\x3c!-- --\x3e")}clearLatest(){const t=$("#FULL_HISTORY li:first-of-type");"array-item"==t.attr("data-type")&&(rpgData.SUM_LIST.pop(),rpgData.D_LIST.pop(),rpgData.historyLines.pop(),rpgData.save()),t.remove()}rollRandomAccurate(t,a){const e=this.$ACCURATE_ROLL.attr("accurate-dice");for(let s=0;s<Number(e);s++)this.rollRandom(null,t,a)}rollRandom(t,a,e){let s=1;t&&(t.ctrlKey&&t.shiftKey?s=20:t.ctrlKey?s=10:t.shiftKey&&(s=5));for(let t=0;t<s;t++)this._rollRandom(a,e)}_rollRandom(t,a){const e=this.getRandomInt(t)+1;document.getElementById(a).value=e.toString(),this.$SUM.prop("checked")||this.clearSum(),rpgData.SUM_LIST.push(e),rpgData.D_LIST.push(t),rpgData.save();const s=this.checkSameValues(rpgData.D_LIST),r=s&&10==rpgData.D_LIST[0]&&this.$RESULT.val()==SUCCESSTEXT&&this.$W40MODE.prop("checked"),i=r&&this.$DEGREESV_MIN.prop("checked"),l=this.$REROLLLOWEST.prop("checked"),L=r&&this.$LASMASTERY.prop("checked"),o=Number(this.$MINIMUM.val())>0,h=Number(this.$FLAT.val())>0;let E=0,S="";const n=[...rpgData.SUM_LIST];if(l){let t=9999999,a=9999999;n.forEach(((e,s,r)=>{e<t&&(t=e,a=s)})),n[a]=-1}if(o){const t=Number(this.$MINIMUM.val());n.forEach(((a,e,s)=>{a<t&&-1!=a&&(n[e]=t)}))}if(i){let t=9999999,a=9999999;n.forEach(((e,s,r)=>{e<t&&-1!=e&&(t=e,a=s)}));const e=Math.min(10,1+Number(this.$DEGREESV.val()));t<e&&(n[a]=e)}if(S="",E=0,n.forEach(((t,a,e)=>{a>0&&(S+=" + "),-1==t?S=s?S+"<span class='cross'>"+rpgData.SUM_LIST[a]+"</span>":S+"<span class='cross'>"+rpgData.SUM_LIST[a]+"/[D"+rpgData.D_LIST[a]+"]</span>":(rpgData.SUM_LIST[a]!=t?S=s?S+rpgData.SUM_LIST[a]+"&#x21E8;"+t:S+rpgData.SUM_LIST[a]+"&#x21E8;"+t+"/[D"+rpgData.D_LIST[a]+"]":s?S+=t:S=S+t+"/[D"+rpgData.D_LIST[a]+"]",this.$W40MODE.prop("checked")?0==a&&10==rpgData.SUM_LIST[a]&&(S+="<i style='margin-left:2px;' class='fas fa-meteor text-warning'></i>"):20==rpgData.SUM_LIST[a]&&20==rpgData.D_LIST[a]&&(S+="<i style='margin-left:2px;' class='fas fa-meteor text-warning'></i>"),E+=t)})),L){const t=Math.floor(Number(this.$DEGREESV.val())/2);console.log("LASMASTERYVAL",this.$DEGREESV.val(),Number(this.$DEGREESV.val())/2,Math.floor(Number(this.$DEGREESV.val())/2)),t>0&&(E+=t)}if(h&&(E+=Number(this.$FLAT.val())),S="<span style='width:35px;' class='badge badge-pill badge-info'>"+E+"</span> = &Sigma;[#"+rpgData.SUM_LIST.length+"]("+S+")",s&&(S=S+"/[D"+rpgData.D_LIST[0]+"]"),h&&(S=S+" + "+Number(this.$FLAT.val())+" (Flat Bonus)"),L){const t=Math.floor(Number(this.$DEGREESV.val())/2);t>0&&(S=S+" + "+t+" (Las Mastery)")}const c="<span style='display:inline;color:inherit;font-family:monospace;'>",p=(new Date).toLocaleTimeString(this.getNavigatorLanguages()[0])+" &#8669; roll "+c+"<span style='width:35px;' class='badge badge-pill badge-info'>"+(""+e).padStart(3," ")+"</span></span> "+c+(" on D"+t).padStart(6," ")+" &#8669; </span> "+S;this.$LAST_HISTORY.html(p),this.$FULL_HISTORY.prepend("<li class='list-group-item' data-type='array-item'>"+p+"</li>"),rpgData.historyLines.push(p),rpgData.save()}checkSameValues(t){return 1==new Set(t).size}rollRandom100(t){let a;if(t.ctrlKey&&t.shiftKey)for(a=0;a<20;a++)this._rollRandom100();else if(t.ctrlKey)for(a=0;a<10;a++)this._rollRandom100();else if(t.shiftKey)for(a=0;a<5;a++)this._rollRandom100();else this._rollRandom100()}_rollRandom100(){const t=this.getRandomInt(100)+1;this.$ROLL.val(t),this.rollSet100(t)}rollSet100(t){this.clearSum(),this.change();const a=Number(this.$SKILL.val()),e=this.$RESULT.val()==SUCCESSTEXT,s=this.$DEGREESV.val(),r="<span style='display:inline;color:inherit;font-family:monospace;'>",i=(new Date).toLocaleTimeString(this.getNavigatorLanguages()[0])+" &#8669; roll <span style='width:35px;' class='badge badge-pill badge-info'>"+r+"</span>"+(""+t).padStart(3," ")+"</span> on skill "+r+(""+a).padStart(3," ")+"</span> &#8669; "+(e?" <span style='width:65px;' class='badge badge-pill badge-success'>"+SUCCESSTEXT+"</span>":"<span style='width:65px;' class='badge badge-pill badge-warning'>"+FAILTEXT+"</span>")+" with <span style='width:35px;' class='badge badge-pill badge-dark'>"+s+"</span> additional degrees";this.$LAST_HISTORY.html(i),this.$FULL_HISTORY.prepend("<li class='list-group-item' data-type='roll-item'>"+i+"</li>")}getRandomInt(t){return Math.floor(Math.random()*Math.floor(t))}change(){const t=Number(this.$SKILL.val()),a=Number(this.$ROLL.val());let e,s;const r="(T/10-R/10)"==this.$DEGREE_CALC_TYPE.val();if(a<=t)if(s=!0,r){const s=Math.floor(t/10)-Math.floor(a/10);console.log("SKILL",t,t/10,Math.floor(t/10)),console.log("ROLL",a,a/10,Math.floor(a/10)),console.log("success",s),e=s}else{const s=Math.floor((t-a)/10);console.log("SKILL",t),console.log("ROLL",a),console.log("success","(SKILL - ROLL)",t-a,"(SKILL - ROLL) / 10.0",(t-a)/10,"Math.floor((SKILL - ROLL) / 10.0))",Math.floor((t-a)/10)),e=s}else if(s=!1,r){const s=Math.floor(a/10)-Math.floor(t/10);console.log("SKILL",t,t/10,Math.floor(t/10)),console.log("ROLL",a,a/10,Math.floor(a/10)),console.log("fail",s),e=s}else{const s=Math.floor((a-t-1)/10);console.log("SKILL",t),console.log("ROLL",a),console.log("fail","(ROLL - SKILL - 1)",a-t-1,"(ROLL - SKILL - 1) / 10.0",(a-t-1)/10,"Math.floor((ROLL - SKILL - 1) / 10.0))",Math.floor((a-t-1)/10)),e=s}if(this.$RESULT.val(s?SUCCESSTEXT:FAILTEXT),s){this.$RESULT.addClass("bg-success"),this.$RESULT.removeClass("bg-warning"),this.$RESULT.addClass("text-white");const t=Math.min(2,Math.floor(e/2));this.$ACCURATE_ROLL.html("+"+t+"D"),this.$ACCURATE_ROLL.attr("accurate-dice",1+t)}else this.$RESULT.removeClass("bg-success"),this.$RESULT.addClass("bg-warning"),this.$RESULT.addClass("text-white"),this.$ACCURATE_ROLL.html("-"),this.$ACCURATE_ROLL.attr("accurate-dice",0);this.$DEGREESV.val(e)}getNavigatorLanguages(){return navigator.language.split("-")}}}},__webpack_module_cache__={};function __webpack_require__(t){var a=__webpack_module_cache__[t];if(void 0!==a)return a.exports;var e=__webpack_module_cache__[t]={exports:{}};return __webpack_modules__[t](e,e.exports,__webpack_require__),e.exports}__webpack_require__.d=function(t,a){for(var e in a)__webpack_require__.o(a,e)&&!__webpack_require__.o(t,e)&&Object.defineProperty(t,e,{enumerable:!0,get:a[e]})},__webpack_require__.o=function(t,a){return Object.prototype.hasOwnProperty.call(t,a)};var __webpack_exports__={};(new(__webpack_require__(892).w)).init()})();
//# sourceMappingURL=dice-roller-bundle.js.map