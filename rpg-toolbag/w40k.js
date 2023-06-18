!function(){"use strict";var e;!function(e){e.General="General",e.Weapon_Skill="Weapon Skill",e.Ballistic_Skill="Ballistic Skill",e.Strength="Strength",e.Toughness="Toughness",e.Agility="Agility",e.Intelligence="Intelligence",e.Perception="Perception",e.Willpower="Willpower",e.Fellowship="Fellowship",e.Offence="Offence",e.Finesse="Finesse",e.Defence="Defence",e.Psyker="Psyker",e.Tech="Tech",e.Knowledge="Knowledge",e.Leadership="Leadership",e.Fieldcraft="Fieldcraft",e.Social="Social"}(e||(e={}));class t{class=null;matches=0;constructor(e,t){this.class=e,this.matches=t}}class s{role=null;matches=0;constructor(e,t){this.role=e,this.matches=t}}class n{world=null;matches=0;constructor(e,t){this.world=e,this.matches=t}}class l{background=null;matches=0;constructor(e,t){this.background=e,this.matches=t}}(new class{init(){const e=window.location.search,t=new URLSearchParams(e);let s=t.get("source");s||(s="ow"),console.log(t,s,"ow"==s),fetch("assets/w40k-"+s+".json").then((e=>e.json())).then((e=>this.app(e)))}data;selectedAptitudes=[];app(e){this.data=e;const t=document.getElementById("classSelectContainer");if(this.data.classes&&this.data.classes.length>0){const e=document.getElementById("classSelect");{const t=document.createElement("option");t.text="None",e.add(t)}for(let t=0;t<this.data.classes.length;t++){const s=document.createElement("option"),n=this.data.classes[t].aptitudes,{apt:l,aptalt:d}=this.commonFunc2(n);s.text=this.data.classes[t].class+" ("+l.trim()+")",s.setAttribute("data-content",this.data.classes[t].class+" "+d),s.value=this.data.classes[t].class,e.add(s)}e.addEventListener("change",(e=>{this.triggerRecalc(e)}))}else t.style.display="none";const s=document.getElementById("worldSelectContainer");if(this.data.worlds&&this.data.worlds.length>0){const e=document.getElementById("worldSelect");{const t=document.createElement("option");t.text="None",e.add(t)}for(let t=0;t<this.data.worlds.length;t++){const s=document.createElement("option");s.text=this.data.worlds[t].world+" ("+this.data.worlds[t].aptitude+")",s.setAttribute("data-content",this.data.worlds[t].world+" <span class='badge badge-pill badge-secondary "+this.data.worlds[t].aptitude.replace(" ","_")+"'>"+this.data.worlds[t].aptitude+"</span>"),s.value=this.data.worlds[t].world,e.add(s)}e.addEventListener("change",(e=>{this.triggerRecalc(e)}))}else s.style.display="none";const n=document.getElementById("backgroundSelectContainer");if(this.data.backgrounds&&this.data.backgrounds.length>0){const e=document.getElementById("backgroundSelect");{const t=document.createElement("option");t.text="None",e.add(t)}for(let t=0;t<this.data.backgrounds.length;t++){const s=document.createElement("option");s.text=this.data.backgrounds[t].background+" ("+this.data.backgrounds[t].aptitude+")",s.setAttribute("data-content",this.data.backgrounds[t].background+" <span class='badge badge-pill badge-secondary "+this.data.backgrounds[t].aptitude.replace(" ","_")+"'>"+this.data.backgrounds[t].aptitude+"</span>"),s.value=this.data.backgrounds[t].background,e.add(s)}e.addEventListener("change",(e=>{this.triggerRecalc(e)}))}else n.style.display="none";const l=document.getElementById("roleSelectContainer");if(this.data.roles&&this.data.roles.length>0){const e=document.getElementById("roleSelect");{const t=document.createElement("option");t.text="None",e.add(t)}for(let t=0;t<this.data.roles.length;t++){const s=document.createElement("option"),n=this.data.roles[t].aptitudes,{apt:l,aptalt:d}=this.commonFunc2(n);s.text=this.data.roles[t].role+" ("+l.trim()+")",s.setAttribute("data-content",this.data.roles[t].role+" "+d),s.value=this.data.roles[t].role,e.add(s)}e.addEventListener("change",(e=>{this.triggerRecalc(e)}))}else l.style.display="none";const d=document.getElementById("aptitudeSelect");for(let e=0;e<this.data.optional.length;e++){const t=document.createElement("option");t.text=this.data.optional[e],t.value=this.data.optional[e],d.add(t)}d.addEventListener("change",(e=>{this.triggerRecalc(e)}));const c=document.getElementById("aptitudeWishlistSelect");for(let e=0;e<this.data.optional.length;e++){const t=document.createElement("option");t.text=this.data.optional[e],t.value=this.data.optional[e],c.add(t)}c.addEventListener("change",(t=>{this.logMatchingClasses(t,e),this.logMatchingWorlds(t,e),this.logMatchingBackgrounds(t,e),this.logMatchingRoles(t,e),this.styleAptitudeMatches(t,e)})),document.getElementById("skip0Cb").addEventListener("change",(e=>{this.triggerRecalc(e)}));const a=document.getElementById("wishlist");a.addEventListener("change",(e=>{this.triggerRecalc(e)})),document.getElementById("export_characteristic").addEventListener("click",(e=>{this.copyToClipboard("characteristic")})),document.getElementById("export_skill").addEventListener("click",(e=>{this.copyToClipboard("skill")})),document.getElementById("export_talent").addEventListener("click",(e=>{this.copyToClipboard("talent")})),document.getElementById("export_talent_wishlist").addEventListener("click",(e=>{this.copyToClipboardWishlist()})),document.getElementById("export_all").addEventListener("click",(e=>{this.exportAllTableToExcelDef("characteristic","skill","talent")})),document.getElementById("wishlist_clear").addEventListener("click",(e=>{a.value="",this.triggerRecalc(e)})),$("._selectpicker").selectpicker(),this.triggerRecalc(null)}commonFunc2(e){let t="",s="";for(let n=0;n<e.length;n++)t+=e[n],s+="<span class='badge badge-pill badge-secondary "+e[n].replace(" ","_")+"'>"+e[n]+"</span>",n<e.length-1&&(t+=", ");return{apt:t,aptalt:s}}triggerRecalc(e){const t=document.getElementById("wishlist").value.split("\n");for(let e=0;e<t.length;e++)""===t[e]&&(t.splice(e,1),e--);for(let e=0;e<t.length;e++)t[e]=t[e].toLowerCase().trim();this.selectedAptitudes=[];const s=document.getElementById("skip0Cb").checked;this.selectedAptitudes.push(this.data.free);const n=[],l=document.getElementById("classSelect");if(l.selectedIndex>0){const e=this.data.classes[l.selectedIndex-1].aptitudes;for(let t=0;t<e.length;t++)console.log("classSelect",e[t]),this.selectedAptitudes.includes(e[t])?n.push(e[t]):this.selectedAptitudes.push(e[t])}const d=document.getElementById("worldSelect");if(d.selectedIndex>0){const e=this.data.worlds[d.selectedIndex-1].aptitude;console.log("worldSelect",e),this.selectedAptitudes.includes(e)?n.push(e):this.selectedAptitudes.push(e)}const c=document.getElementById("roleSelect");if(c.selectedIndex>0){const e=this.data.roles[c.selectedIndex-1].aptitudes;for(let t=0;t<e.length;t++)console.log("roleSelect",e[t]),this.selectedAptitudes.includes(e[t])?n.push(e[t]):this.selectedAptitudes.push(e[t])}const a=document.getElementById("backgroundSelect");if(a.selectedIndex>0){const e=this.data.backgrounds[a.selectedIndex-1].aptitude;console.log("backgroundSelect",e),this.selectedAptitudes.includes(e)?n.push(e):this.selectedAptitudes.push(e)}const i=document.getElementById("aptitudeSelect");if(i.selectedIndex>=0){const e=i.selectedOptions;for(let t=0;t<e.length;t++){const s=this.data.optional[e[t].index];console.log("aptitudeSelect",s),this.selectedAptitudes.includes(s)?n.push(s):this.selectedAptitudes.push(s)}}const o=document.getElementById("selectedAptitudes");o.innerHTML="";for(let e=0;e<this.selectedAptitudes.length;e++)o.innerHTML+="<span class='badge badge-pill badge-secondary "+this.selectedAptitudes[e].replace(" ","_")+"'>"+this.selectedAptitudes[e]+"</span>&nbsp;";for(let e=0;e<n.length;e++)o.innerHTML+="<span class='badge badge-pill badge-danger'>"+n[e]+" (duplicate)</span>";const r=document.getElementById("characteristic");r.innerHTML="";const h=this.data.characteristic.sort(((e,t)=>{let s=0;this.selectedAptitudes.includes(e.name)&&s++,this.selectedAptitudes.includes(e.aptitude)&&s++;let n=0;return this.selectedAptitudes.includes(t.name)&&n++,this.selectedAptitudes.includes(t.aptitude)&&n++,-s+n}));for(let e=0;e<h.length;e++){const t=document.createElement("div"),n=document.createElement("div");let l=!1;for(let d=0;d<this.data.costs.length;d++)if("characteristic"===this.data.costs[d].type){let c=0;this.selectedAptitudes.includes(h[e].name)&&c++,this.selectedAptitudes.includes(h[e].aptitude)&&c++,l=this.commonFunc1(t,d,c,n,s,l)}if(l)continue;const d=document.createElement("div");r.appendChild(d),d.appendChild(t),d.appendChild(n);const c=document.createElement("div");c.innerHTML=h[e].name,this.selectedAptitudes.includes(h[e].name)&&c.classList.add("m2"),d.appendChild(c);const a=document.createElement("div");a.innerHTML=h[e].aptitude,this.selectedAptitudes.includes(h[e].aptitude)&&a.classList.add("m2"),d.appendChild(a)}const p=document.getElementById("talent");p.innerHTML="";const u=this.data.talents.sort(((e,t)=>{let s=0;this.selectedAptitudes.includes(e.apt1)&&s++,this.selectedAptitudes.includes(e.apt2)&&s++;let n=0;return this.selectedAptitudes.includes(t.apt1)&&n++,this.selectedAptitudes.includes(t.apt2)&&n++,s===n?e.tier-t.tier:-s+n}));for(let e=0;e<u.length;e++){if(0!=t.length&&!t.includes(u[e].talent.toLowerCase().trim()))continue;const n=document.createElement("div"),l=document.createElement("div");let d=!1;for(let t=0;t<this.data.costs.length;t++)if("talent"===this.data.costs[t].type){let c=0;this.selectedAptitudes.includes(u[e].apt1)&&c++,this.selectedAptitudes.includes(u[e].apt2)&&c++,n.innerHTML=""+this.data.costs[t].cost[2-c][u[e].tier-1],n.classList.add("m"+c),l.innerHTML=""+c,l.classList.add("m"+c),0===c&&s&&(d=!0)}if(d)continue;const c=document.createElement("div");p.appendChild(c),c.appendChild(n),c.appendChild(l);const a=document.createElement("div");a.innerHTML="T"+u[e].tier,c.appendChild(a);const i=document.createElement("div");i.innerHTML=u[e].talent,c.appendChild(i),i.title=u[e].benefit,u[e].ref&&(i.title+=" ( "+u[e].ref.replace("PG","").trim()+" )");const o=document.createElement("div");o.innerHTML=u[e].apt1,c.appendChild(o),this.selectedAptitudes.includes(u[e].apt1)&&o.classList.add("m2");const r=document.createElement("div");r.innerHTML=u[e].apt2,c.appendChild(r),this.selectedAptitudes.includes(u[e].apt2)&&r.classList.add("m2");const h=document.createElement("div");h.innerHTML=u[e].prerequisites,c.appendChild(h);const g=document.createElement("div");g.innerHTML=u[e].benefit,g.style.display="none",c.appendChild(g)}const g=document.getElementById("skill");g.innerHTML="";const m=this.data.skills.sort(((e,t)=>{let s=0;this.selectedAptitudes.includes(e.aptitudes[0])&&s++,this.selectedAptitudes.includes(e.aptitudes[1])&&s++;let n=0;return this.selectedAptitudes.includes(t.aptitudes[0])&&n++,this.selectedAptitudes.includes(t.aptitudes[1])&&n++,-s+n}));for(let e=0;e<m.length;e++){let t=!1;const n=document.createElement("div"),l=document.createElement("div");for(let d=0;d<this.data.costs.length;d++)if("skill"===this.data.costs[d].type){let c=0;this.selectedAptitudes.includes(m[e].aptitudes[0])&&c++,this.selectedAptitudes.includes(m[e].aptitudes[1])&&c++,t=this.commonFunc1(n,d,c,l,s,t)}if(t)continue;const d=document.createElement("div");g.appendChild(d),d.appendChild(n),d.appendChild(l);const c=document.createElement("div");c.innerHTML=m[e].name,d.appendChild(c);for(let t=0;t<m[e].aptitudes.length;t++){const s=document.createElement("div");s.innerHTML=m[e].aptitudes[t],this.selectedAptitudes.includes(m[e].aptitudes[t])&&s.classList.add("m2"),d.appendChild(s)}}$("[title]:not(.dropdown-toggle)").tooltip()}commonFunc1(e,t,s,n,l,d){return e.innerHTML=""+this.data.costs[t].cost[2-s][0],e.classList.add("m"+s),n.innerHTML=""+s,n.classList.add("m"+s),0===s&&l&&(d=!0),d}exportAllTableToExcelDef(e,t,s){document.getElementById("exportTableToExcelDef")?.remove();const n=this.exportDivToTable(e),l=this.exportDivToTable(t),d=this.exportDivToTable(s);if(!n)return;if(!l)return;if(!d)return;const c=document.createElement("div");c.innerHTML="<table><tr><td>Characteristics</td></tr>\t<tr>\n\t\t<td>cost</td>\n\t\t<td>m</td>\n\t\t<td>skill</td>\n\t\t<td>aptitude</td>\n\t</tr>"+n.replace("<table>","").replace("</table>","")+"<tr><td> </td></tr><tr><td> </td></tr><tr><td>Skills</td></tr>\t<tr>\n\t\t<td>cost</td>\n\t\t<td>m</td>\n\t\t<td>characteristic</td>\n\t\t<td>aptitude</td>\n\t\t<td>aptitude</td>\n\t</tr>"+l.replace("<table>","").replace("</table>","")+"<tr><td> </td></tr><tr><td> </td></tr><tr><td>Talents</td></tr>\t<tr>\n\t\t<td>cost</td>\n\t\t<td>m</td>\n\t\t<td>tier</td>\n\t\t<td>talent</td>\n\t\t<td>aptitude</td>\n\t\t<td>aptitude</td>\n\t\t<td>requirement</td>\n\t\t<td>description</td>\n\t</tr>"+d.replace("<table>","").replace("</table>","")+"</table>",c.style.display="none",c.id="exportTableToExcelDef",document.body.appendChild(c),this.exportTableToExcel("exportTableToExcelDef","all")}exportTableToExcelDef(e){document.getElementById("exportTableToExcelDef")?.remove();const t=this.exportDivToTable(e);if(!t)return;const s=document.createElement("div");s.innerHTML=t,s.style.display="none",s.id="exportTableToExcelDef",document.body.appendChild(s),this.exportTableToExcel("exportTableToExcelDef",e)}exportDivToTable(e,t=!1){const s=document.getElementById(e);if(!s)return;let n="";t||(n+="<table>");for(let e=0;e<s.children.length;e++){t||(n+="<tr>");const l=s.children[e];for(let e=0;e<l.children.length;e++)t||(n+="<td>"),n+=l.children[e].innerHTML,n+=t?"\t":"</td>";n+=t?"\n":"</tr>"}return t||(n+="</table>"),n}exportTableToExcel(e,t=""){const s="application/vnd.ms-excel",n=document.getElementById(e);if(!n)return;const l=n.outerHTML.replace(/ /g,"%20");t=t?t+".xls":"excel_data.xls",document.getElementById("a789")?.remove();const d=document.createElement("a");if(d.id="a789",document.body.appendChild(d),navigator.msSaveOrOpenBlob){const e=new Blob(["\ufeff",l],{type:s});navigator.msSaveOrOpenBlob(e,t)}else d.href="data:"+s+", "+l,d.download=t,d.click()}copyToClipboard(e){const t=this.exportDivToTable(e,!0);if(!t)return;document.getElementById("textarea123")?.remove();const s=document.createElement("textarea");s.innerHTML=t,s.style.display="none",s.id="textarea123",document.body.appendChild(s),s.select(),s.setSelectionRange(0,99999),navigator.clipboard.writeText(s.value)}copyToClipboardWishlist(){const e=document.getElementById("talent");if(!e)return;let t="";for(let s=0;s<e.children.length;s++){const n=e.children[s];("0"==n.children[1].innerHTML||"1"==n.children[1].innerHTML)&&(t+=n.children[3].innerHTML+"\n")}document.getElementById("textarea456aa")?.remove();const s=document.createElement("textarea");s.innerHTML=t,s.style.display="none",s.id="textarea456aa",document.body.appendChild(s),s.select(),s.setSelectionRange(0,99999),console.log(s.value),navigator.clipboard.writeText(s.value)}logMatchingWorlds(e,t){if(!t.worlds||0==t.worlds.length)return;const s=document.getElementById("aptitudeWishlistSelect");if(s.selectedIndex>=0){console.log("logMatchingWorlds");const e=s.selectedOptions,l=[],d=[];for(let t=0;t<e.length;t++){const s=this.data.optional[e[t].index];l.push(s)}console.log(l);for(let e=0;e<t.worlds.length;e++){const s=t.worlds[e];let c=0;const a=s.aptitude;for(let e=0;e<l.length;e++)a==l[e]&&c++;const i=new n(s,c);d.push(i)}d.sort(((e,t)=>t.matches-e.matches));for(let e=0;e<d.length;e++)console.log(d[e].world?.world,d[e].matches,d[e].world?.aptitude)}}logMatchingBackgrounds(e,t){if(!t.backgrounds||0==t.backgrounds.length)return;const s=document.getElementById("aptitudeWishlistSelect");if(s.selectedIndex>=0){console.log("logMatchingBackgrounds");const e=s.selectedOptions,n=[],d=[];for(let t=0;t<e.length;t++){const s=this.data.optional[e[t].index];n.push(s)}console.log(n);for(let e=0;e<t.backgrounds.length;e++){const s=t.backgrounds[e];let c=0;const a=s.aptitude;for(let e=0;e<n.length;e++)a==n[e]&&c++;const i=new l(s,c);d.push(i)}d.sort(((e,t)=>t.matches-e.matches));for(let e=0;e<d.length;e++)console.log(d[e].background?.background,d[e].matches,d[e].background?.aptitude)}}logMatchingRoles(e,t){if(!t.roles||0==t.roles.length)return;const n=document.getElementById("aptitudeWishlistSelect");if(n.selectedIndex>=0){console.log("logMatchingRoles");const e=n.selectedOptions,l=[],d=[];for(let t=0;t<e.length;t++){const s=this.data.optional[e[t].index];l.push(s)}console.log(l);for(let e=0;e<t.roles.length;e++){const n=t.roles[e];let c=0;for(let e=0;e<n.aptitudes.length;e++){const t=n.aptitudes[e];for(let e=0;e<l.length;e++)t==l[e]&&c++}const a=new s(n,c);d.push(a)}d.sort(((e,t)=>t.matches-e.matches));for(let e=0;e<d.length;e++)console.log(d[e].role?.role,d[e].matches,d[e].role?.aptitudes)}}logMatchingClasses(e,s){if(!s.classes||0==s.classes.length)return;const n=document.getElementById("aptitudeWishlistSelect");if(n.selectedIndex>=0){console.log("logMatchingClasses");const e=n.selectedOptions,l=[],d=[];for(let t=0;t<e.length;t++){const s=this.data.optional[e[t].index];l.push(s)}console.log(l);for(let e=0;e<s.classes.length;e++){const n=s.classes[e];let c=0;for(let e=0;e<n.aptitudes.length;e++){const t=n.aptitudes[e];for(let e=0;e<l.length;e++)t==l[e]&&c++}const a=new t(n,c);d.push(a)}d.sort(((e,t)=>t.matches-e.matches));for(let e=0;e<d.length;e++)console.log(d[e].class?.class,d[e].matches,d[e].class?.aptitudes)}}styleAptitudeMatches(e,t){for(let e=0;e<t.optional.length;e++){const s=t.optional[e];let n=document.getElementById("style-"+s.replace(" ","_"));n?n.disabled=!0:(n=document.createElement("style"),n.id="style-"+s.replace(" ","_"),n.innerHTML=".badge.badge-pill.badge-secondary."+s.replace(" ","_")+"{background-color:#1cc88a !important}",document.body.appendChild(n),n.disabled=!0,console.log(n))}const s=document.getElementById("aptitudeWishlistSelect");if(s.selectedIndex>=0){const e=s.selectedOptions;for(let t=0;t<e.length;t++){const s=this.data.optional[e[t].index],n=document.getElementById("style-"+s.replace(" ","_"));n.disabled=!1,console.log(n)}}}}).init()}();
//# sourceMappingURL=w40k.js.map