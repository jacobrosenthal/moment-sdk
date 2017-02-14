(function(){
'use strict';var l=Function("return this")();l.Moment=l.Moment||{};(function(){var a=Function("return this")().Moment,b={};a.on=function(a,d){b.hasOwnProperty(a)?b[a].push(d):b[a]=[d]};a.off=function(a,d){b.hasOwnProperty(a)&&(a=b[a],d=a.indexOf(d),0<=d&&a.splice(d,1))};a.once=function(b,d){function c(){d();a.off(b,c)}a.on(b,c)};a.trigger=function(a){var d,c;if(b.hasOwnProperty(a))for(a=b[a],c=a.length,d=0;d<c;d+=1)a[d]()}})();(function(){function a(a,c,f){this["in"]=a;this.out=c;this.combined=f}var b=Function("return this")().Moment,e={Step:new a(1,0,0),Linear:new a(2,2,2),Quadratic:new a(3,4,5),Cubic:new a(6,7,8),Quartic:new a(9,10,11),Quintic:new a(12,13,14),Sine:new a(15,16,17),Circle:new a(18,19,20),Exponential:new a(21,22,23),Elastic:new a(24,25,26),Back:new a(27,28,29),Bounce:new a(30,31,32)};b.Easing=e})();(function(){function a(a){this.pin=a}Function("return this")().Moment.Actuators={topLeft:new a(0),topRight:new a(1),bottomRight:new a(3),bottomLeft:new a(2)}})();(function(){var a=Function("return this")().Moment;a.Battery={isCharging:function(){return a._is_battery_charging()},isConnected:function(){return a._is_charger_connected()},getCharge:function(){return a._get_battery_charge()}}})();(function(){function a(a,c,f){this.red=a;this.green=c;this.blue=f}function b(a){return 255<a?255:0>a?0:Math.round(a)}var e=Function("return this")().Moment;a.prototype.clone=function(){return new a(this.red,this.green,this.blue)};a.prototype.intensify=function(a){this.red=b(a*this.red);this.green=b(a*this.green);this.blue=b(a*this.blue);return this};a.prototype.blend=function(a,c){var d=1-c;this.red=b(c*a.red+d*this.red);this.green=b(c*a.green+d*this.green);this.blue=b(c*a.blue+d*this.blue);return this};
a.ORANGE=new a(253,170,0);a.RED=new a(230,48,20);a.PINK=new a(184,0,143);a.GREEN=new a(185,241,0);a.BLUE=new a(0,126,237);a.BLACK=new a(0,0,0);a.GRAY=new a(100,100,100);a.WHITE=new a(255,255,255);e.Color=a})();(function(){function a(a,c,b,e,g){this.start=a;this.end=c;this.b=b;this.duration=e;this.position=g||0}function b(a,c,b){a.hasOwnProperty("pin")&&(a=a.pin);this.g=a;this.a=c;this.c=b||0}var e=Function("return this")().Moment;a.OFF=new a(0,0,e.Easing.Step.out,10);a.prototype.scale=function(a){this.duration=Math.round(a*this.duration);this.position=Math.round(a*this.position);return this};a.prototype.clone=function(){return new a(this.start,this.end,this.b,this.duration,this.position)};a.prototype.invert=
function(){var a=this.start;this.start=this.end;this.end=a;return this};e.Effect=a;b.prototype.start=function(){var a=this.a;e._add_transition(this.g,a.start,a.end,a.b,a.duration,a.position,this.c);return this};b.prototype.clone=function(){return new b(this.g,this.a,this.c)};b.prototype.scale=function(a){this.a=this.a.clone().scale(a);return this};b.prototype.invert=function(){this.a=this.a.clone().invert();return this};b.prototype.totalTime=function(){return this.c-this.a.position+this.a.duration};
e.Vibration=b})();(function(){function a(){}var b=Function("return this")().Moment;a.prototype.x=0;a.prototype.y=0;a.prototype.z=0;b.Accelerometer=new a;b.Gyroscope=new a;b.Magnetometer=new a;b.AHRS=new a})();(function(){function a(a,c,b){this.color=a;this.b=c;this.duration=b}var b=Function("return this")().Moment,e=b.LED={};a.prototype.scale=function(a){this.duration=Math.round(a*this.duration);return this};a.prototype.clone=function(){return new a(this.color,this.b,this.duration)};e.Transition=a;e.setColor=function(a){b._set_led_color(a.red,a.green,a.blue)};e.tweenColor=function(a){var c=a.color;b._tween_led_color(c.red,c.green,c.blue,a.b,a.duration)};e.loopColor=function(a,c){var f=a.color;b._tween_led_color(f.red,
f.green,f.blue,a.b,a.duration);f=c.color;b._loop_led_color(f.red,f.green,f.blue,c.b,c.duration)}})();(function(){function a(a,b){this.f=a;this.timeout=b}var b=Function("return this")().Moment,e=[],d=[];b.setTimeout=function(c,f){f+=b.uptime();c=new a(c,f);f=0;for(var d=e.length;f<d&&e[f].timeout<=c.timeout;)f+=1;e.splice(f,0,c);return c};b.setInterval=function(c,f){c=new a(c,f);var e=0,g=d.length;for(c.next=b.uptime()+f;e<g&&d[e].next<=c.next;)e+=1;d.splice(e,0,c);return c};b.clearTimeout=function(a){var c,b=e.length;for(c=0;c<b;c+=1)if(e[c]==a){e.splice(c,1);break}};b.clearInterval=function(a){var c,
b=d.length;for(c=0;c<b;c+=1)if(d[c]==a){d.splice(c,1);break}};b._run_timers=function(){var a,f,k,g,h;g=b.uptime();a=0;for(k=e.length;a<k;a+=1)if(g>e[a].timeout)e[a].f();else break;e.splice(0,a);a=0;for(k=d.length;a<k;a+=1)if(g>d[a].next){h=d[a];h.f();h.next=g+h.timeout;for(f=a;f<k&&d[a].next<=h.next;)f+=1;d.splice(a,1);d.splice(f,0,h)}else break}})();
}).call(this)
