document.addEventListener('keydown',function(e){switch(e.keyCode){
case 38: ko.push('U'); break;case 40: ko.push('D'); break;case 37: ko.push('L'); break;
case 39: ko.push('R'); break;case 66: ko.push('B'); break;case 65: ko.push('A'); break;
case 13: check(); break;}});function check(){var c=true;for(var i=0;i<k.length;i++){
if(ko[i]!=k[i]){c=false;}}if(c)go();ko=[];}var ko=[];var k=['U','U','D','D','L','R','L','R','B','A'];
var a=0;function go(){if(++a%10==0){document.body.style.backgroundColor=rc();}
requestAnimationFrame(go);}function r(min,max){return Math.round(min+Math.random()*(max-min));}
function rc(){return 'rgb('+r(0,255)+','+r(0,255)+','+r(0,255)+')';}
document.body.style.transition='background-color .5s';