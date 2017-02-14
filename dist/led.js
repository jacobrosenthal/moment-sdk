'use strict';(function(){function a(d,a,c){this.red=d;this.green=a;this.blue=c}function e(d){return 255<d?255:0>d?0:Math.round(d)}var c=Function("return this")().Moment;a.prototype.clone=function(){return new a(this.red,this.green,this.blue)};a.prototype.intensify=function(d){this.red=e(d*this.red);this.green=e(d*this.green);this.blue=e(d*this.blue);return this};a.prototype.blend=function(d,a){var b=1-a;this.red=e(a*d.red+b*this.red);this.green=e(a*d.green+b*this.green);this.blue=e(a*d.blue+b*this.blue);
return this};a.ORANGE=new a(253,170,0);a.RED=new a(230,48,20);a.PINK=new a(184,0,143);a.GREEN=new a(185,241,0);a.BLUE=new a(0,126,237);a.BLACK=new a(0,0,0);a.GRAY=new a(100,100,100);a.WHITE=new a(255,255,255);c.Color=a})();(function(){function a(a,b,c){this.color=a;this.c=b;this.duration=c}var e=Function("return this")().Moment,c=e.LED={};a.prototype.scale=function(a){this.duration=Math.round(a*this.duration);return this};a.prototype.clone=function(){return new a(this.color,this.c,this.duration)};c.Transition=a;c.setColor=function(a){e._set_led_color(a.red,a.green,a.blue)};c.tweenColor=function(a){var b=a.color;e._tween_led_color(b.red,b.green,b.blue,a.c,a.duration)};c.loopColor=function(a,b){var d=a.color;e._tween_led_color(d.red,
d.green,d.blue,a.c,a.duration);d=b.color;e._loop_led_color(d.red,d.green,d.blue,b.c,b.duration)}})();
