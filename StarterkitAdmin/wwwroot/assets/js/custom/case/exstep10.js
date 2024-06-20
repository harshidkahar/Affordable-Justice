
"use strict";
var KTModalstep10=function(){
    var e,t,o;
    return{
        init:function(){
            KTModalCreateProject.getForm(),
            o=KTModalCreateProject.getStepperObj(),
            e=KTModalCreateProject.getStepper().querySelector('[data-kt-element="bmind-next"]'),
            t=KTModalCreateProject.getStepper().querySelector('[data-kt-element="bmind-previous"]'),
            e.addEventListener("click",(function(t){t.preventDefault(),e.disabled=!0,e.setAttribute("data-kt-indicator","on"),setTimeout((function(){e.disabled=!1,e.removeAttribute("data-kt-indicator"),o.goNext()}),1500)})),t.addEventListener("click",(function(){o.goPrevious()}))}}}();"undefined"!=typeof module&&void 0!==module.exports&&(window.KTModalstep10=module.exports=KTModalstep10);






                