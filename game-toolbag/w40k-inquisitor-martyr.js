!function(){"use strict";(new class{emptyImage="data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";defaultSelectedId="Phosphoenic Psalm + Technomartyr Psalm + Neuralis Psalm + Binharic Psalm";init(){fetch("assets/w40k-inquisitor-martyr-code.json").then((e=>e.json())).then((e=>this.app(e)))}data;levelForPsalm(e){return this.psalmByname(e)?.level}allPsalmsOfLevels(e){return this.data.psalms.filter((t=>e.includes(t.level)))}psalmByname(e){return this.data.psalms.find((t=>t.name==e))}isPsalmChecked(e){return"true"==window.localStorage.getItem(e)}checkDoctrineChange(e){const t=e.checked,s=e.getAttribute("value");s&&window.localStorage.setItem(s,String(t));const a=e.getAttribute("data-psalm-name");a&&(t?$("."+a.replace(" ","_")).removeClass("strikeme"):$("."+a.replace(" ","_")).addClass("strikeme"))}findDoctrineById(e){return this.data.doctrines.find((t=>t.id==e))}selectDoctrineChange(){const e=$("#selectDoctrine").find("option:selected").val();if(e&&"string"==typeof e){const t=this.findDoctrineById(String(e));if(t){$("#description").html(t.description);for(let e=0;e<6;e++)$("#p"+e).attr("src",this.emptyImage).attr("title",""),$("#description"+e).attr("class","").text(" ");$.each(t.psalms,((e,t)=>{const s=this.psalmByname(t);s&&($("#p"+e).attr("src","data:image/png;base64,"+s.image).attr("title",s.name),$("#description"+e).attr("class",s.level).html("<u><b>"+s.name+"</b></u>: "+s.description))}))}}}app(e){this.data=e;for(let e=0;e<6;e++)$("#imgcontainer").append('<img id="p'+e+'" width="60" height="60" src="'+this.emptyImage+'">&nbsp;'),$("#descriptioncontainer").append('<div id="description'+e+'">&nbsp;</div>');$("#selectDoctrineContainer").append($("<select/>").attr("id","selectDoctrine").attr("size","false").attr("name","selectDoctrine").attr("data-style","btn-light").append($("<option>",{}).text(""))),$.each(e.doctrines,((e,t)=>{let s="";$.each(t.psalms,((e,t)=>{s+='<span><span class="psalm_list '+t.replace(" ","_")+" "+this.psalmByname(t)?.level+'">'+t+"</span></span>"})),$("#selectDoctrine").append($("<option>",{value:t.id,"data-content":'<div style="font-weight: bold;">'+t.description+'</div><div class="psalm_list_parent" style="font-weight: bold; font-size: smaller;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+s+"</div>"}).text(t.description))})),document.querySelector("#selectDoctrine").value=this.defaultSelectedId,$("#selectDoctrine").selectpicker(),$.each(this.allPsalmsOfLevels(["Relic","Archeotech"]),((e,t)=>{$("#pills-settings").append('<div class="imgcheck input-group input-group-sm"><label class="checkbox-inline" for="check'+e+'"><input '+(this.isPsalmChecked(t.name)?' checked="checked"':"")+' data-psalm-name="'+t.name+'" value="'+t.name+'" style="display: none;" type="checkbox" id="check'+e+'" /><img id="is'+e+'" width="60" height="60" src="data:image/png;base64, '+t.image+'">&nbsp;<span class="'+t.name.replace(" ","_")+(this.isPsalmChecked(t.name)?"":" strikeme")+'" id="lbl'+e+'">'+t.name+"</span></label></div>"),$("#check"+e).change((e=>this.checkDoctrineChange(e.target)))})),console.log("before selectDoctrineChange"),$("#selectDoctrine").change((()=>this.selectDoctrineChange())),this.selectDoctrineChange(),setTimeout((()=>{$('[data-id="selectDoctrine"]').click(),setTimeout((()=>{$('[data-id="selectDoctrine"]').click(),$.each(this.allPsalmsOfLevels(["Relic","Archeotech"]),((e,t)=>{this.isPsalmChecked(t.name)||$("."+t.name.replace(" ","_")).addClass("strikeme")}))}),500)}),1e3)}}).init()}();
//# sourceMappingURL=w40k-inquisitor-martyr.js.map