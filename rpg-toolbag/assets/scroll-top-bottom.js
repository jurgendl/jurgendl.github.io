addEventListener("DOMContentLoaded",(o=>{const t=document.createElement("style");function n(){(window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop)>50?$(".scrolltop:hidden").stop(!0,!0).fadeIn():$(".scrolltop").stop(!0,!0).fadeOut(),window.innerHeight+window.scrollY>=document.body.offsetHeight-50?$(".scrollbottom").stop(!0,!0).fadeOut():$(".scrollbottom:hidden").stop(!0,!0).fadeIn()}t.innerHTML="\n\t\t\t.scrolltop,\n            .scrollbottom {\n            \tdisplay: none;\n            \twidth: 100%;\n            \tmargin: 0 auto;\n            \tposition: fixed;\n            \tright: 10px;\n            }\n\n            .scrolltop {\n            \tbottom: 10px;\n            }\n\n            .scrollbottom {\n            \ttop: 10px;\n            }\n\n            .scrolltop .scroll,\n            .scrollbottom .scroll {\n            \tposition: absolute;\n            \tright: 0px;\n            \tpadding: 5px;\n            \ttext-align: center;\n            \tmargin: 0 0 0 0;\n            \tcursor: pointer;\n            \tz-index: 999;\n            }\n\n            .scrolltop .scroll {\n            \tbottom: 0px;\n            }\n\n            .scrollbottom .scroll {\n            \ttop: 0px;\n            }\n\n            .scrolltop .scroll *,\n            .scrollbottom .scroll * {\n            \tfont-size: 28px;\n            }\n\t\t",document.head.appendChild(t),document.body.insertAdjacentHTML("afterbegin","<div class='thetop'></div>\n<div class='scrollbottom'>\n\t<div class='scroll icon'>\n\t\t<i class=\"icon-as-button fa-solid fa-circle-arrow-down\"></i>\n\t</div>\n</div>"),document.body.insertAdjacentHTML("beforeend","<div class='scrolltop'>\n\t<div class='scroll icon'>\n\t\t<i class=\"icon-as-button fa-solid fa-circle-arrow-up\"></i>\n\t</div>\n</div>\n<div class='thebottom'></div>"),n(),$(window).scroll((()=>{n()})),$(".scrolltop .scroll").click((()=>($("html,body").animate({scrollTop:$(".thetop").offset().top},"0"),!1))),$(".scrollbottom .scroll").click((()=>($("html, body").animate({scrollTop:$(document).height()},"slow"),!1)))}));