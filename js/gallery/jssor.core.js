﻿$Jssor$=window.$Jssor$=window.$Jssor$||{};var $JssorDebug$=new function(){this.$DebugMode=!1,this.$Log=function(e,r){var t=window.console||{},n=this.$DebugMode;n&&t.log?t.log(e):n&&r&&alert(e)},this.$Error=function(e,r){var t=window.console||{},n=this.$DebugMode;if(n&&t.error?t.error(e):n&&alert(e),n)throw r||new Error(e)},this.$Fail=function(e){throw new Error(e)},this.$Assert=function(e,r){var t=this.$DebugMode;if(t&&!e)throw new Error("Assert failed "+r||"")},this.$Trace=function(e){var r=window.console||{},t=this.$DebugMode;t&&r.log&&r.log(e)},this.$Execute=function(e){var r=this.$DebugMode;r&&e()},this.$LiveStamp=function(e,r){var t=document.createElement("DIV");t.setAttribute("id",r),e.$Live=t}},$JssorEventManager$=function(){var e=this,r={};e.$On=e.addEventListener=function(e,t){"function"==typeof t&&(r[e]||(r[e]=[]),r[e].push(t))},e.$Off=e.removeEventListener=function(e,t){var n=r[e];if("function"==typeof t&&n)for(var o=0;o<n.length;o++)if(t==n[o])return void n.splice(o,1)},e.$ClearEventListeners=function(e){r[e]&&delete r[e]},e.$TriggerEvent=function(e){var t=r[e],n=[];if(t){for(var o=1;o<arguments.length;o++)n.push(arguments[o]);for(var o=0;o<t.length;o++)try{t[o].apply(window,n)}catch(i){$JssorDebug$.$Error(i.name+" while executing "+e+" handler: "+i.message,i)}}}};