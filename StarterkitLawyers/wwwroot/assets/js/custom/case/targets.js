"use strict";
var KTModalCreateProjectTargets = function () {
    var e, t, a, r, o;
    return {
        init: function () {
            r = KTModalCreateProject.getForm(),
                o = KTModalCreateProject.getStepperObj(),
                e = KTModalCreateProject.getStepper().querySelector('[data-kt-element="targets-next"]'),
                t = KTModalCreateProject.getStepper().querySelector('[data-kt-element="targets-previous"]'),

                // Removed Tagify initialization and change event handler
                // Removed flatpickr initialization
                // Removed change event handler for target_assign

                e.addEventListener("click", (function (t) {
                    t.preventDefault(),
                        e.disabled = !0,
                        e.setAttribute("data-kt-indicator", "on"),
                        setTimeout((function () {
                            e.removeAttribute("data-kt-indicator"),
                                e.disabled = !1,
                                o.goNext()
                        }), 1500)
                })),
                t.addEventListener("click", (function () {
                    o.goPrevious()
                }))
        }
    }
}();
"undefined" != typeof module && void 0 !== module.exports && (window.KTModalCreateProjectTargets = module.exports = KTModalCreateProjectTargets);
