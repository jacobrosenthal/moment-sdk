(function(){
'use strict';var d=window.Moment=window.Moment||{};d.a={};d.on=function(a,b){var c=d.a;c.hasOwnProperty(a)?c[a].push(b):c[a]=[b]};d.off=function(a,b){var c=d.a;c.hasOwnProperty(a)&&(a=c[a],b=a.indexOf(b),0<=b&&a.splice(b,1))};d.once=function(a,b){function c(){b();d.off(a,c)}d.on(a,c)};d.trigger=function(a){var b=d.a,c;if(b.hasOwnProperty(a))for(a=b[a],c=a.length,b=0;b<c;b+=1)a[b]()};
}).call(this)
