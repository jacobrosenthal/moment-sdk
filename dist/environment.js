(function(){
'use strict';(function(){function a(b,e,a){this.red=b;this.green=e;this.blue=a}function c(b){return 255<b?255:0>b?0:Math.round(b)}var d=Function("return this")();d.a=d.a||{};a.prototype.intensify=function(b){this.red=c(b*this.red);this.green=c(b*this.green);this.blue=c(b*this.blue)};a.prototype.blend=function(b,e){var a=1-e;this.red=c(e*b.red+a*this.red);this.green=c(e*b.green+a*this.green);this.blue=c(e*b.blue+a*this.blue)};a.m=new a(253,170,0);a.s=new a(230,48,20);a.o=new a(184,0,143);a.l=new a(185,
241,0);a.i=new a(0,126,237);a.h=new a(0,0,0);a.j=new a(100,100,100);a.u=new a(255,255,255);d.a.Color=a})();(function(){var a=Function("return this")();a.a=a.a||{};var c=a.a,d={};c.on=function(b,a){d.hasOwnProperty(b)?d[b].push(a):d[b]=[a]};c.off=function(b,a){d.hasOwnProperty(b)&&(b=d[b],a=b.indexOf(a),0<=a&&b.splice(a,1))};c.once=function(b,a){function d(){a();c.off(b,d)}c.on(b,d)};c.trigger=function(a){var b,c;if(d.hasOwnProperty(a))for(a=d[a],c=a.length,b=0;b<c;b+=1)a[b]()}})();(function(){var a=Function("return this")();a.a=a.a||{};var c=a.a;c.Color.Transition=function(a,b,c){this.color=a;this.b=b;this.duration=c};c.setColor=function(a){c.g(a.red,a.green,a.blue)};c.tweenColor=function(a){var b=a.color;c.c(b.red,b.green,b.blue,a.b,a.duration)};c.loopColor=function(a,b){var d=a.color;c.c(d.red,d.green,d.blue,a.b,a.duration);d=b.color;c.f(d.red,d.green,d.blue,b.b,b.duration)}})();
}).call(this)
