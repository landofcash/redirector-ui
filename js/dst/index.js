(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (global){
;(function(){
//
//
//
//
//
//
//
//
//
//
//
//
//
//

module.exports = 
        {
            inject: ['$validator'],
            template: '#addressSuggestBs',
            data: function () {
                return {
                    googleAddress: {
                        street_number: null,
                        street_name: null,
                        city: null,
                        state: null,
                        zipcode: null,
                        country: null,
                        url: null,
                        autocomplete: null,
                        resetAddress: function () {
                            this.street_number = null;
                            this.street_name = null;
                            this.city = null;
                            this.state = null;
                            this.zipcode = null;
                            this.country = null;
                            this.url = null;
                        }

                    }
                }
            },
            props: {
                name: {
                    type: String,
                    required: true
                },
                value: {
                    type: String,
                    default: ''
                },
                required: {
                    type: Boolean,
                    default: false
                },
                dataVvScope: {
                    type: String,
                    default: undefined
                },
                labelCols: {
                    type: Number,
                    default: 4
                }
            },
            computed: {
                validateRules: function () {
                    var res = {};
                    if (this.required) {
                        res.required = true;
                    }
                    return res;
                },
                styleLabel: function () {
                    if (this.labelCols > 0) {
                        return 'col-sm-' + this.labelCols + ' control-label';
                    }
                    return 'control-label';
                },
                styleInput: function () {
                    if (this.labelCols > 0) {
                        return 'col-sm-' + (12 - this.labelCols);
                    }
                    return '';
                }
            },
            mounted: function () {
                //get DOM input element where users will start typing addresses
                var inputElement = document.getElementById('input' + this._uid);

                //create new google maps object
                this.googleAddress.autocomplete = new google.maps.places.Autocomplete(inputElement, { types: ['geocode'] });

                //add event listener to trigger method getAddressComponents when user select an address
                this.googleAddress.autocomplete.addListener('place_changed', this.getAddressComponents);
            },
            methods: {
                updateValue: function (value) {
                    this.$emit('input', value);
                },
                getAddressComponents: function () {
                    var me = this;
                    this.googleAddress.resetAddress();
                    // Get the place details from the autocomplete object.
                    var place = this.googleAddress.autocomplete.getPlace();
                    console.log(place);
                    // Get each component of the address from the place details
                    for (var i = 0; i < place.address_components.length; i++) {
                        var addressType = place.address_components[i].types[0];
                        switch (addressType) {
                            case 'street_number':
                                this.googleAddress.street_number = place.address_components[i]['short_name'];
                                break;
                            case 'route':
                                this.googleAddress.street_name = place.address_components[i]['short_name'];
                                break;
                            case 'locality':
                                this.googleAddress.city = place.address_components[i]['long_name'];
                                break;
                            case 'administrative_area_level_1':
                                this.googleAddress.state = place.address_components[i]['short_name'];
                                break;
                            case 'postal_code':
                                this.googleAddress.zipcode = place.address_components[i]['short_name'];
                                break;
                            case 'country':
                                this.googleAddress.country = place.address_components[i]['short_name'];
                                break;
                        }
                    }
                    // Result MUST have a street_number
                    var street_number = this.googleAddress.street_number;
                    if (!street_number || street_number === '') {
                        // HERE'S THE HACK:
                        // Sometimes Google doesn't return street_number field, but address is correct in the auto-completer
                        // Use the value from autocomplete to get the street address
                        street_number = me.value.split(' ')[0];
                    }
                    else {
                        // has street number, append route for full street address
                        //street_number += this.googleAddress.street_number; //' ' + find('route');
                    }

                    // Trim street address
                    street_number = $.trim(street_number);

                    this.googleAddress.street = ((street_number || '') + ' ' + (this.googleAddress.street_name || '')).trim();

                    this.googleAddress.url = place.url;
                    this.$emit('update', this.googleAddress);
                }
            }
        }

})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"form-group",class:{'has-error': _vm.errors.has('input'+_vm._uid, _vm.dataVvScope) }},[_c('label',{class:_vm.styleLabel,attrs:{"for":'input'+_vm._uid}},[_vm._v(_vm._s(_vm.name))]),_vm._v(" "),_c('div',{class:_vm.styleInput},[(_vm.required)?_c('div',{staticClass:"input-group"},[_c('input',{directives:[{name:"validate",rawName:"v-validate",value:(_vm.validateRules),expression:"validateRules"}],ref:"input",staticClass:"form-control",attrs:{"data-vv-as":_vm.name,"data-vv-scope":_vm.dataVvScope,"type":"text","id":'input'+_vm._uid,"name":'input'+_vm._uid,"placeholder":_vm.name},domProps:{"value":_vm.value},on:{"input":function($event){return _vm.updateValue($event.target.value)}}}),_vm._v(" "),_vm._m(0)]):_vm._e(),_vm._v(" "),(!_vm.required)?_c('input',{directives:[{name:"validate",rawName:"v-validate",value:(_vm.validateRules),expression:"validateRules"}],ref:"input",staticClass:"form-control",attrs:{"data-vv-as":_vm.name,"data-vv-scope":_vm.dataVvScope,"type":"text","id":'input'+_vm._uid,"name":'input'+_vm._uid,"placeholder":_vm.name},domProps:{"value":_vm.value},on:{"input":function($event){return _vm.updateValue($event.target.value)}}}):_vm._e(),_vm._v(" "),_vm._l((_vm.errors.items.filter(function(err){return err.field==='input'+_vm._uid;})),function(err){return _c('span',{staticClass:"help-block",attrs:{"id":"helpBlock"}},[_vm._v(_vm._s(err.msg))])})],2)])}
__vue__options__.staticRenderFns = [function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',{staticClass:"input-group-addon",attrs:{"id":"basic-addon1"}},[_c('span',{staticClass:"glyphicon glyphicon-asterisk",attrs:{"title":"Required Field","aria-hidden":"true"}})])}]
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install((typeof window !== "undefined" ? window['Vue'] : typeof global !== "undefined" ? global['Vue'] : null), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7857e529", __vue__options__)
  } else {
    hotAPI.reload("data-v-7857e529", __vue__options__)
  }
})()}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"vue-hot-reload-api":23}],2:[function(require,module,exports){
"use strict";

var IMSVueComponents = {};

var addressSuggestBs = require('./addressSuggestBs.vue');

var checkboxBs = require('./checkboxBs.vue');

var inputBs = require('./inputBs.vue');

var inputNumberBs = require('./inputNumberBs.vue');

var passwordBs = require('./passwordBs.vue');

var selectBs = require('./selectBs.vue');

var selectStringBs = require('./selectStringBs.vue');

var typeahead = require('./typeahead.vue');

var textAreaBs = require('./textAreaBs.vue');

var datePicker = require('./datePicker.vue');

var dateRangePicker = require('./dateRangePicker.vue');

var phoneBs = require('./phoneBs.vue');

var ssnBs = require('./ssnBs.vue');

var moneyBs = require('./moneyBs.vue');

var errorModalBs = require('./errorModalBs.vue');

var modalBs = require('./modalBs.vue');

var maskedInput = require('vue-text-mask');

var loading = require('./vueFullLoading.vue');

var bootstrapModal = require('vue2-bootstrap-modal/dist/bootstrap-modal.min.js');

var objectToFormData = require('object-to-formdata');

var bootstrapToggle = require('vue-bootstrap-toggle');

var timepicker = require('vue2-timepicker');

var vueTruncate = require('vue-truncate-filter');

var paginate = require('vuejs-paginate');

var yesNo = require('./yesNo.vue');

IMSVueComponents.addressSuggestBs = addressSuggestBs;
IMSVueComponents.checkboxBs = checkboxBs;
IMSVueComponents.inputBs = inputBs;
IMSVueComponents.inputNumberBs = inputNumberBs;
IMSVueComponents.passwordBs = passwordBs;
IMSVueComponents.selectBs = selectBs;
IMSVueComponents.selectStringBs = selectStringBs;
IMSVueComponents.typeahead = typeahead;
IMSVueComponents.textAreaBs = textAreaBs;
IMSVueComponents.phoneBs = phoneBs;
IMSVueComponents.ssnBs = ssnBs;
IMSVueComponents.moneyBs = moneyBs;
IMSVueComponents.datePicker = datePicker;
IMSVueComponents.dateRangePicker = dateRangePicker;
IMSVueComponents.modalBs = modalBs;
IMSVueComponents.errorModalBs = errorModalBs;
IMSVueComponents.maskedInput = maskedInput["default"];
IMSVueComponents.loading = loading;
IMSVueComponents.bootstrapModal = bootstrapModal;
IMSVueComponents.bootstrapToggle = bootstrapToggle;
IMSVueComponents.timepicker = timepicker;
IMSVueComponents.paginate = paginate;
IMSVueComponents.yesNo = yesNo;
window.objectToFormData = objectToFormData;
window.IMSVueComponents = IMSVueComponents;
Vue.use(VeeValidate);
Vue.use(vueTruncate);

},{"./addressSuggestBs.vue":1,"./checkboxBs.vue":3,"./datePicker.vue":4,"./dateRangePicker.vue":5,"./errorModalBs.vue":6,"./inputBs.vue":7,"./inputNumberBs.vue":8,"./modalBs.vue":9,"./moneyBs.vue":10,"./passwordBs.vue":11,"./phoneBs.vue":12,"./selectBs.vue":13,"./selectStringBs.vue":14,"./ssnBs.vue":15,"./textAreaBs.vue":16,"./typeahead.vue":17,"./vueFullLoading.vue":18,"./yesNo.vue":19,"object-to-formdata":20,"vue-bootstrap-toggle":22,"vue-text-mask":24,"vue-truncate-filter":25,"vue2-bootstrap-modal/dist/bootstrap-modal.min.js":26,"vue2-timepicker":27,"vuejs-paginate":29}],3:[function(require,module,exports){
(function (global){
;(function(){
//
//
//
//
//
//
//
//

module.exports = 
    {
        template: '#checkboxBs',
        props: {
            name: {
                type: String,
                required: true
            },
            value: {
                type: Boolean,
                default: false
            },
            labelCols: {
                type: Number,
                default: 4
            }
    },
    computed: {
        styleLabel: function () {
            if (this.labelCols > 0) {
                return 'col-sm-offset-' + this.labelCols + ' checkbox';
            }
            return 'checkbox';
        },
    },
    methods: {
        updateValue: function (value) {
            this.$emit('input', value);
        }
    }
    }

})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"form-group"},[_c('div',{class:_vm.styleLabel},[_c('label',[_c('input',{attrs:{"type":"checkbox","id":'input'+_vm._uid,"name":'input'+_vm._uid},domProps:{"checked":_vm.value},on:{"change":function($event){return _vm.updateValue($event.target.checked)}}}),_c('span',[_vm._v(_vm._s(_vm.name))])])])])}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install((typeof window !== "undefined" ? window['Vue'] : typeof global !== "undefined" ? global['Vue'] : null), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5f6b89bc", __vue__options__)
  } else {
    hotAPI.reload("data-v-5f6b89bc", __vue__options__)
  }
})()}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"vue-hot-reload-api":23}],4:[function(require,module,exports){
(function (global){
;(function(){
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var maskedInput = require('vue-text-mask');

module.exports = {
    inject: ['$validator'],
    components: {
        maskedInput: maskedInput.default
    },
    props: {
        name: {
            type: String,
            required: true
        },
        value: {
            type: String,
            default: ''
        },
        required: {
            type: Boolean,
            default: false
        },
        datepickerOptions: {
            type: Object,
            default: function () {
                let me = this;
                return {
                    changeMonth: true,
                    changeYear: true,
                    yearRange: '1905:2016',
                    defaultDate: new Date(1970, 0, 1),
                    maxDate: new Date(),                        
                }
            }
        },
        dataVvScope: {
            type: String,
            default: undefined
        },
        labelCols: {
            type: Number,
            default: 4
        }
    },
    computed: {
        validateRules: function () {
            var res = {};
            if (this.required) {
                res.required = true;
            }
            return res;
        },
        styleLabel: function () {
            if (this.labelCols > 0) {
                return 'col-sm-' + this.labelCols + ' control-label';
            }
            return 'control-label';
        },
        styleInput: function () {
            if (this.labelCols > 0) {
                return 'col-sm-' + (12 - this.labelCols);
            }
            return '';
        }
    },
    mounted: function () {
        this.datepickerOptions.onClose = this.updateValue;
        $('#input' + this._uid).datepicker(this.datepickerOptions);
    },
    methods: {
        updateValue: function (event) {                
            this.$emit('input', event);
        }
    }
}

})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"form-group",class:{'has-error': _vm.errors.has('input'+_vm._uid, _vm.dataVvScope) }},[_c('label',{class:_vm.styleLabel,attrs:{"for":'input'+_vm._uid}},[_vm._v(_vm._s(_vm.name))]),_vm._v(" "),_c('div',{class:_vm.styleInput},[(_vm.required)?_c('div',{staticClass:"input-group"},[_c('masked-input',{directives:[{name:"validate",rawName:"v-validate",value:(_vm.validateRules),expression:"validateRules"}],ref:"input",staticClass:"form-control",attrs:{"data-vv-delay":"500","mask":[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/],"guide":true,"placeholderChar":"#","keepCharPositions":true,"data-vv-as":_vm.name,"data-vv-scope":_vm.dataVvScope,"type":"text","id":'input'+_vm._uid,"name":'input'+_vm._uid,"placeholder":_vm.name,"value":_vm.value},on:{"input":function($event){return _vm.updateValue($event)}}}),_vm._v(" "),_vm._m(0)],1):_vm._e(),_vm._v(" "),(!_vm.required)?_c('masked-input',{directives:[{name:"validate",rawName:"v-validate",value:(_vm.validateRules),expression:"validateRules"}],ref:"input",staticClass:"form-control",attrs:{"data-vv-delay":"500","mask":[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/],"guide":true,"placeholderChar":"#","keepCharPositions":true,"data-vv-as":_vm.name,"data-vv-scope":_vm.dataVvScope,"type":"text","id":'input'+_vm._uid,"name":'input'+_vm._uid,"placeholder":_vm.name,"value":_vm.value},on:{"input":function($event){return _vm.updateValue($event)}}}):_vm._e(),_vm._v(" "),_vm._l((_vm.errors.items.filter(function(err){return err.field==='input'+_vm._uid;})),function(err){return _c('span',{staticClass:"help-block",attrs:{"id":"helpBlock"}},[_vm._v(_vm._s(err.msg))])})],2)])}
__vue__options__.staticRenderFns = [function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',{staticClass:"input-group-addon",attrs:{"id":"basic-addon1"}},[_c('span',{staticClass:"glyphicon glyphicon-asterisk",attrs:{"title":"Required Field","aria-hidden":"true"}})])}]
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install((typeof window !== "undefined" ? window['Vue'] : typeof global !== "undefined" ? global['Vue'] : null), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5072c024", __vue__options__)
  } else {
    hotAPI.reload("data-v-5072c024", __vue__options__)
  }
})()}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"vue-hot-reload-api":23,"vue-text-mask":24}],5:[function(require,module,exports){
(function (global){
;(function(){
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var maskedInput = require('vue-text-mask');

module.exports = {
    inject: ['$validator'],
    components: {
        maskedInput: maskedInput.default
    },
    props: {
        name: {
            type: String,
            required: true
        },
        value: {
            type: String,
            default: ''
        },
        valueTo: {
            type: String,
            default: ''
        },
        required: {
            type: Boolean,
            default: false
        },
        dataVvScope: {
            type: String,
            default: undefined
        },
        labelCols: {
            type: Number,
            default: 4
        },
        datepickerOptionsFrom: {
            type: Object,
            default: function () {
                let me = this;
                return {
                    changeMonth: true,
                    changeYear: true,
                    yearRange: '-90:+0',
                    defaultDate: new Date(1970, 0, 1),
                    maxDate: new Date(),
                }
            }
        },
        datepickerOptionsTo: {
            type: Object,
            default: function () {
                let me = this;
                return {
                    changeMonth: true,
                    changeYear: true,
                    yearRange: '-90:+0',
                    defaultDate: new Date(1970, 0, 1),
                    maxDate: new Date(),
                }
            }
        }
    },
    computed: {
        validateRules: function () {
            var res = {};
            if (this.required) {
                res.required = true;
            }
            return res;
        },
        styleLabel: function () {
            if (this.labelCols > 0) {
                return 'col-sm-' + this.labelCols + ' control-label';
            }
            return 'control-label';
        },
        styleInput: function () {
            if (this.labelCols > 0) {
                if (this.labelCols % 2 > 0) {
                    return 'col-sm-' + ((12 - this.labelCols-1) / 2);
                }
                return 'col-sm-' + ((12 - this.labelCols)/2);
            }
            return '';
        }
    },
    mounted: function () {
        this.datepickerOptionsFrom.onClose = this.updateFrom;
        this.datepickerOptionsTo.onClose = this.updateTo;
        $('#input' + this._uid).datepicker(this.datepickerOptionsFrom);
        $('#input2' + this._uid).datepicker(this.datepickerOptionsTo);
    },
    methods: {
        updateFrom: function (event) {
            this.$emit('update-from', event);
        },
        updateTo: function (event) {
            this.$emit('update-to', event);
        }
    }
}

})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"form-group",class:{'has-error': _vm.errors.has('input'+_vm._uid, _vm.dataVvScope) || _vm.errors.has('input2'+_vm._uid, _vm.dataVvScope) }},[_c('label',{class:_vm.styleLabel,attrs:{"for":'input'+_vm._uid}},[_vm._v(_vm._s(_vm.name))]),_vm._v(" "),_c('div',{class:_vm.styleInput},[(_vm.required)?_c('div',{staticClass:"input-group"},[_c('masked-input',{directives:[{name:"validate",rawName:"v-validate",value:(_vm.validateRules),expression:"validateRules"}],ref:"input",staticClass:"form-control",attrs:{"data-vv-delay":"500","mask":[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/],"guide":true,"placeholderChar":"#","keepCharPositions":true,"data-vv-as":_vm.name,"data-vv-scope":_vm.dataVvScope,"type":"text","id":'input'+_vm._uid,"name":'input'+_vm._uid,"placeholder":'From',"value":_vm.value},on:{"input":function($event){return _vm.updateFrom($event)}}}),_vm._v(" "),_vm._m(0)],1):_vm._e(),_vm._v(" "),(!_vm.required)?_c('masked-input',{directives:[{name:"validate",rawName:"v-validate",value:(_vm.validateRules),expression:"validateRules"}],ref:"input",staticClass:"form-control",attrs:{"data-vv-delay":"500","mask":[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/],"guide":true,"placeholderChar":"#","keepCharPositions":true,"data-vv-as":_vm.name,"data-vv-scope":_vm.dataVvScope,"type":"text","id":'input'+_vm._uid,"name":'input'+_vm._uid,"placeholder":'From',"value":_vm.value},on:{"input":function($event){return _vm.updateFrom($event)}}}):_vm._e(),_vm._v(" "),_vm._l((_vm.errors.items.filter(function(err){return err.field==='input'+_vm._uid;})),function(err){return _c('span',{staticClass:"help-block",attrs:{"id":"helpBlock"}},[_vm._v(_vm._s(err.msg))])})],2),_vm._v(" "),_c('div',{class:_vm.styleInput},[(_vm.required)?_c('div',{staticClass:"input-group"},[_c('masked-input',{directives:[{name:"validate",rawName:"v-validate",value:(_vm.validateRules),expression:"validateRules"}],ref:"input2",staticClass:"form-control",attrs:{"data-vv-delay":"500","mask":[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/],"guide":true,"placeholderChar":"#","keepCharPositions":true,"data-vv-as":_vm.name,"data-vv-scope":_vm.dataVvScope,"type":"text","id":'input2'+_vm._uid,"name":'input2'+_vm._uid,"placeholder":'To',"value":_vm.valueTo},on:{"input":function($event){return _vm.updateTo($event)}}}),_vm._v(" "),_vm._m(1)],1):_vm._e(),_vm._v(" "),(!_vm.required)?_c('masked-input',{directives:[{name:"validate",rawName:"v-validate",value:(_vm.validateRules),expression:"validateRules"}],ref:"input2",staticClass:"form-control",attrs:{"data-vv-delay":"500","mask":[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/],"guide":true,"placeholderChar":"#","keepCharPositions":true,"data-vv-as":_vm.name,"data-vv-scope":_vm.dataVvScope,"type":"text","id":'input2'+_vm._uid,"name":'input2'+_vm._uid,"placeholder":'To',"value":_vm.valueTo},on:{"input":function($event){return _vm.updateTo($event)}}}):_vm._e(),_vm._v(" "),_vm._l((_vm.errors.items.filter(function(err){return err.field==='input2'+_vm._uid;})),function(err){return _c('span',{staticClass:"help-block",attrs:{"id":"helpBlock"}},[_vm._v(_vm._s(err.msg))])})],2)])}
__vue__options__.staticRenderFns = [function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',{staticClass:"input-group-addon",attrs:{"id":"basic-addon1"}},[_c('span',{staticClass:"glyphicon glyphicon-asterisk",attrs:{"title":"Required Field","aria-hidden":"true"}})])},function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',{staticClass:"input-group-addon",attrs:{"id":"basic-addon1"}},[_c('span',{staticClass:"glyphicon glyphicon-asterisk",attrs:{"title":"Required Field","aria-hidden":"true"}})])}]
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install((typeof window !== "undefined" ? window['Vue'] : typeof global !== "undefined" ? global['Vue'] : null), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-73f7f7f6", __vue__options__)
  } else {
    hotAPI.reload("data-v-73f7f7f6", __vue__options__)
  }
})()}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"vue-hot-reload-api":23,"vue-text-mask":24}],6:[function(require,module,exports){
(function (global){
;(function(){
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

module.exports = {
    data: function () {
        return {
            message: '',
            header: '',
            isHtml:false
        }            
    },
    methods: {
        show: function (message, header, isHtml) {
            this.message = message;
            this.header = header || 'Error Message';
            this.isHtml = isHtml==true;
            if (isHtml) { //set iframe
                var iframe = $('#errorIframe' + this._uid);
                var iFrameDoc = iframe[0].contentDocument || iframe[0].contentWindow.document;
                iFrameDoc.write(message);
                iFrameDoc.close();
            }

            $('#errorModal' + this._uid).modal('show');
        },
        hide: function () {
            $('#errorModal' + this._uid).modal('hide');
        }
    }
}

})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"modal fade",attrs:{"tabindex":"-1","role":"dialog","id":'errorModal'+_vm._uid}},[_c('div',{staticClass:"modal-dialog",staticStyle:{"width":"80%"},attrs:{"role":"document"}},[_c('div',{staticClass:"modal-content"},[_c('div',{staticClass:"modal-header modal-header-danger"},[_vm._m(0),_vm._v(" "),_c('h4',{staticClass:"modal-title"},[_vm._v(_vm._s(_vm.header))])]),_vm._v(" "),_c('div',{staticClass:"modal-body"},[_c('iframe',{directives:[{name:"show",rawName:"v-show",value:(_vm.isHtml),expression:"isHtml"}],staticStyle:{"width":"100%","height":"500px"},attrs:{"id":'errorIframe'+_vm._uid}}),_vm._v(" "),_c('div',{directives:[{name:"show",rawName:"v-show",value:(!_vm.isHtml),expression:"!isHtml"}]},[_vm._v(_vm._s(_vm.message))])]),_vm._v(" "),_c('div',{staticClass:"modal-footer"},[_c('button',{staticClass:"btn btn-info",attrs:{"type":"button"},on:{"click":function($event){return _vm.hide()}}},[_vm._v("Close")])])])])])}
__vue__options__.staticRenderFns = [function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('button',{staticClass:"close",attrs:{"type":"button","data-dismiss":"modal","aria-label":"Close"}},[_c('span',{attrs:{"aria-hidden":"true"}},[_vm._v("×")])])}]
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install((typeof window !== "undefined" ? window['Vue'] : typeof global !== "undefined" ? global['Vue'] : null), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6745b404", __vue__options__)
  } else {
    hotAPI.reload("data-v-6745b404", __vue__options__)
  }
})()}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"vue-hot-reload-api":23}],7:[function(require,module,exports){
(function (global){
;(function(){
//
//
//
//
//
//
//
//
//
//
//
//
//
//

module.exports = {
    inject: ['$validator'],
    props: {
        name: {
            type: String,
            required: true
        },
        value: {
            type: String,
            default: ''
        },
        required: {
            type: Boolean,
            default: false
        },
        email: {
            type: Boolean,
            default: false
        },
        password:{
            type: Boolean,
            default: false
        },
        tabindex: {                
            default:0
        },
        dataVvScope: {
            type: String,
            default: undefined
        },
        labelCols: {
            type: Number,
            default: 4
        }
    },
    computed: {
        validateRules: function () {
            var res = {};
            if (this.required) {
                res.required = true;
            }
            if (this.email) {
                res.email = true;
            }
            return res;
        },
        inputType: function () {
            if (this.password) {
                return 'password';
            }
            return 'text';
        },
        styleLabel: function () {
            if (this.labelCols > 0) {
                return 'col-sm-' + this.labelCols + ' control-label';
            }
            return 'control-label';
        },
        styleInput: function () {
            if (this.labelCols > 0) {
                return 'col-sm-' + (12 - this.labelCols);
            }
            return '';
        }
    },
    methods: {
        updateValue: function (value) {
            var formattedValue = value;
            this.$emit('input', formattedValue);
        }
    }
}

})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"form-group",class:{'has-error': _vm.errors.has('input'+_vm._uid, _vm.dataVvScope) }},[_c('label',{class:_vm.styleLabel,attrs:{"for":'input'+_vm._uid}},[_vm._v(_vm._s(_vm.name))]),_vm._v(" "),_c('div',{class:_vm.styleInput},[(_vm.required)?_c('div',{staticClass:"input-group"},[_c('input',{directives:[{name:"validate",rawName:"v-validate",value:(_vm.validateRules),expression:"validateRules"}],ref:"input",staticClass:"form-control",attrs:{"tabindex":_vm.tabindex,"data-vv-as":_vm.name,"data-vv-scope":_vm.dataVvScope,"type":_vm.inputType,"id":'input'+_vm._uid,"name":'input'+_vm._uid,"placeholder":_vm.name},domProps:{"value":_vm.value},on:{"input":function($event){return _vm.updateValue($event.target.value)}}}),_vm._v(" "),_vm._m(0)]):_vm._e(),_vm._v(" "),(!_vm.required)?_c('input',{directives:[{name:"validate",rawName:"v-validate",value:(_vm.validateRules),expression:"validateRules"}],ref:"input",staticClass:"form-control",attrs:{"tabindex":_vm.tabindex,"data-vv-as":_vm.name,"data-vv-scope":_vm.dataVvScope,"type":_vm.inputType,"id":'input'+_vm._uid,"name":'input'+_vm._uid,"placeholder":_vm.name},domProps:{"value":_vm.value},on:{"input":function($event){return _vm.updateValue($event.target.value)}}}):_vm._e(),_vm._v(" "),_vm._l((_vm.errors.items.filter(function(err){return err.field==='input'+_vm._uid;})),function(err){return _c('span',{staticClass:"help-block",attrs:{"id":"helpBlock"}},[_vm._v(_vm._s(err.msg))])})],2)])}
__vue__options__.staticRenderFns = [function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',{staticClass:"input-group-addon",attrs:{"id":"basic-addon1"}},[_c('span',{staticClass:"glyphicon glyphicon-asterisk",attrs:{"title":"Required Field","aria-hidden":"true"}})])}]
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install((typeof window !== "undefined" ? window['Vue'] : typeof global !== "undefined" ? global['Vue'] : null), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-aeab41ba", __vue__options__)
  } else {
    hotAPI.reload("data-v-aeab41ba", __vue__options__)
  }
})()}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"vue-hot-reload-api":23}],8:[function(require,module,exports){
(function (global){
;(function(){
//
//
//
//
//
//
//
//
//
//
//
//
//
//

module.exports = {
    inject: ['$validator'],
    props: {
        name: {
            type: String,
            required: true
        },
        value: {
            //type: Number,
            default: ''
        },
        required: {
            type: Boolean,
            default: false
        },
        labelCols: {
            type: Number,
            default: 4
        },
        dataVvScope: {
            type: String,
            default: undefined
        }
    },
    computed: {
        validateRules: function () {
            var res = { decimal: true};
            if (this.required) {
                res.required = true;
            }
            
            return res;
        },
        styleLabel: function () {
            if (this.labelCols > 0) {
                return 'col-sm-' + this.labelCols + ' control-label';
            }
            return 'control-label';
        },
        styleInput: function () {
            if (this.labelCols > 0) {
                return 'col-sm-' + (12 - this.labelCols);
            }
            return '';
        }
    },
    methods: {
        updateValue: function (value) {
            var formattedValue = value.trim();
            this.$emit('input', formattedValue);
        }
    }
}

})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"form-group",class:{'has-error': _vm.errors.has('input'+_vm._uid, _vm.dataVvScope) }},[_c('label',{class:_vm.styleLabel,attrs:{"for":'input'+_vm._uid}},[_vm._v(_vm._s(_vm.name))]),_vm._v(" "),_c('div',{class:_vm.styleInput},[(_vm.required)?_c('div',{staticClass:"input-group"},[_c('input',{directives:[{name:"validate",rawName:"v-validate",value:(_vm.validateRules),expression:"validateRules"}],ref:"input",staticClass:"form-control",attrs:{"data-vv-as":_vm.name,"data-vv-scope":_vm.dataVvScope,"type":"number","id":'input'+_vm._uid,"name":'input'+_vm._uid,"placeholder":_vm.name},domProps:{"value":_vm.value},on:{"input":function($event){return _vm.updateValue($event.target.value)}}}),_vm._v(" "),_vm._m(0)]):_vm._e(),_vm._v(" "),(!_vm.required)?_c('input',{directives:[{name:"validate",rawName:"v-validate",value:(_vm.validateRules),expression:"validateRules"}],ref:"input",staticClass:"form-control",attrs:{"data-vv-as":_vm.name,"data-vv-scope":_vm.dataVvScope,"type":"number","id":'input'+_vm._uid,"name":'input'+_vm._uid,"placeholder":_vm.name},domProps:{"value":_vm.value},on:{"input":function($event){return _vm.updateValue($event.target.value)}}}):_vm._e(),_vm._v(" "),_vm._l((_vm.errors.items.filter(function(err){return err.field==='input'+_vm._uid;})),function(err){return _c('span',{staticClass:"help-block",attrs:{"id":"helpBlock"}},[_vm._v(_vm._s(err.msg))])})],2)])}
__vue__options__.staticRenderFns = [function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',{staticClass:"input-group-addon",attrs:{"id":"basic-addon1"}},[_c('span',{staticClass:"glyphicon glyphicon-asterisk",attrs:{"title":"Required Field","aria-hidden":"true"}})])}]
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install((typeof window !== "undefined" ? window['Vue'] : typeof global !== "undefined" ? global['Vue'] : null), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6421d84c", __vue__options__)
  } else {
    hotAPI.reload("data-v-6421d84c", __vue__options__)
  }
})()}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"vue-hot-reload-api":23}],9:[function(require,module,exports){
(function (global){
;(function(){
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

module.exports = {
    data: function () {
        return {
            message: '',
            header: '',                
            width: '50%',
            headerClass: 'info'
        }            
    },
    methods: {
        show: function (message, header, width, headerClass) {
            this.message = message;
            this.header = header || 'Message';                
            this.width = width || '50%';
            this.headerClass = headerClass || 'info';
            $('#modal' + this._uid).modal('show');
        },
        hide: function () {
            $('#modal' + this._uid).modal('hide');
        }
    }
}

})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"modal fade",attrs:{"tabindex":"-1","role":"dialog","id":'modal'+_vm._uid}},[_c('div',{staticClass:"modal-dialog",style:('width:'+_vm.width),attrs:{"role":"document"}},[_c('div',{staticClass:"modal-content"},[_c('div',{class:'modal-header modal-header-'+_vm.headerClass},[_vm._m(0),_vm._v(" "),_c('h4',{staticClass:"modal-title"},[_vm._v(_vm._s(_vm.header))])]),_vm._v(" "),_c('div',{staticClass:"modal-body"},[_c('div',{domProps:{"innerHTML":_vm._s(_vm.message)}})]),_vm._v(" "),_c('div',{staticClass:"modal-footer"},[_vm._t("footer",[_c('button',{staticClass:"btn btn-info",attrs:{"type":"button"},on:{"click":function($event){return _vm.hide()}}},[_vm._v("Close")])])],2)])])])}
__vue__options__.staticRenderFns = [function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('button',{staticClass:"close",attrs:{"type":"button","data-dismiss":"modal","aria-label":"Close"}},[_c('span',{attrs:{"aria-hidden":"true"}},[_vm._v("×")])])}]
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install((typeof window !== "undefined" ? window['Vue'] : typeof global !== "undefined" ? global['Vue'] : null), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-38880bc6", __vue__options__)
  } else {
    hotAPI.reload("data-v-38880bc6", __vue__options__)
  }
})()}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"vue-hot-reload-api":23}],10:[function(require,module,exports){
(function (global){
;(function(){
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var createNumberMask = require('text-mask-addons/dist/createNumberMask');
var maskedInput = require('vue-text-mask');    

module.exports = {
    inject: ['$validator'],
    components: {
        maskedInput: maskedInput.default
    },
    props: {
        name: {
            type: String,
            required: true
        },
        value: {
            type: String,
            default: ''
        },
        required: {
            type: Boolean,
            default: false
        },
        labelCols: {
            type: Number,
            default: 4
        },
        dataVvScope: {
            type: String,
            default: undefined
        }
    },
    computed: {
        validateRules: function () {
            var res = {
                
            }                
            if (this.required) {
                res.required = true;
            }
            return res;
        },
        styleLabel: function () {
            if (this.labelCols > 0) {
                return 'col-sm-' + this.labelCols + ' control-label';
            }
            return 'control-label';
        },
        styleInput: function () {
            if (this.labelCols > 0) {
                return 'col-sm-' + (12 - this.labelCols);
            }
            return '';
        }
    },
    methods: {
        updateValue: function (value) {                
            this.$emit('input', value);
        },
        numberMask: createNumberMask.default({
            prefix: '$ ',
            suffix: '' // This will put the dollar sign at the end, with a space.
        })
    }
}

})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"form-group",class:{'has-error': _vm.errors.has('input'+_vm._uid, _vm.dataVvScope) }},[_c('label',{class:_vm.styleLabel,attrs:{"for":'input'+_vm._uid}},[_vm._v(_vm._s(_vm.name))]),_vm._v(" "),_c('div',{class:_vm.styleInput},[(_vm.required)?_c('div',{staticClass:"input-group"},[_c('masked-input',{directives:[{name:"validate",rawName:"v-validate",value:(_vm.validateRules),expression:"validateRules"}],ref:"input",staticClass:"form-control",attrs:{"data-vv-validate-on":"blur","data-vv-name":'input'+_vm._uid,"data-vv-as":_vm.name,"data-vv-scope":_vm.dataVvScope,"type":"text","mask":_vm.numberMask,"guide":false,"placeholderChar":"#","keepCharPositions":true,"id":'input'+_vm._uid,"name":'input'+_vm._uid,"placeholder":_vm.name,"value":_vm.value},on:{"input":function($event){return _vm.updateValue($event)}}}),_vm._v(" "),_vm._m(0)],1):_vm._e(),_vm._v(" "),(!_vm.required)?_c('masked-input',{directives:[{name:"validate",rawName:"v-validate",value:(_vm.validateRules),expression:"validateRules"}],ref:"input",staticClass:"form-control",attrs:{"data-vv-validate-on":"blur","data-vv-name":'input'+_vm._uid,"data-vv-as":_vm.name,"data-vv-scope":_vm.dataVvScope,"type":"text","mask":_vm.numberMask,"guide":false,"placeholderChar":"#","keepCharPositions":true,"id":'input'+_vm._uid,"name":'input'+_vm._uid,"placeholder":_vm.name,"value":_vm.value},on:{"input":function($event){return _vm.updateValue($event)}}}):_vm._e(),_vm._v(" "),_vm._l((_vm.errors.items.filter(function(err){return err.field==='input'+_vm._uid;})),function(err){return _c('span',{staticClass:"help-block",attrs:{"id":"helpBlock"}},[_vm._v(_vm._s(err.msg))])})],2)])}
__vue__options__.staticRenderFns = [function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',{staticClass:"input-group-addon",attrs:{"id":"basic-addon1"}},[_c('span',{staticClass:"glyphicon glyphicon-asterisk",attrs:{"title":"Required Field","aria-hidden":"true"}})])}]
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install((typeof window !== "undefined" ? window['Vue'] : typeof global !== "undefined" ? global['Vue'] : null), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-526a1799", __vue__options__)
  } else {
    hotAPI.reload("data-v-526a1799", __vue__options__)
  }
})()}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"text-mask-addons/dist/createNumberMask":21,"vue-hot-reload-api":23,"vue-text-mask":24}],11:[function(require,module,exports){
(function (global){
var __vueify_style_dispose__ = require("vueify/lib/insert-css").insert(".strength-bar {\n    height: 4px;\n    margin-top: -2px;\n}\n.strength-bar-transition {\n    height: 4px;\n    margin-top: -2px;\n    transition: all .3s ease;\n}\n\n.strength-bar.poor {\n    background-color: #d9534f;\n}\n\n.strength-bar.weak {\n    background-color: #f0ad4e;\n}\n\n.strength-bar.acceptable {\n    background-color: #5bc0de;\n}\n\n.strength-bar.good {\n    background-color: #5cb85c;\n}")
;(function(){
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

module.exports = {
    inject: ['$validator'],
    props: {
        name: {
            type: String,
            required: true
        },
        value: {
            type: String,
            default: ''
        },
        dataVvScope: {
            type: String,
            default: undefined
        },
        strengthScore: {
            type: Number,
            default:4
        },
        labelCols: {
            type: Number,
            default: 4
        }
    },
    data: function () {            
        return {
            confirmPassword: '',
            score: 0
        }            
    },
    watch:{
        value: function () {
            if (this.value === '') {
                this.confirmPassword = '';
            }
        }
    },
    beforeMount: function () {
        var me = this;
        this.confirmPassword = this.value;
        //custom validator
        this.$validator.extend('zxcvbn', {
            getMessage: function (field) { return 'The ' + field + ' is not strong enougth.' },
            validate: function (value) {
                var result = zxcvbn(value);
                return result.score >= me.strengthScore;
            }
        });
    },
    computed: {
        pwdInputName: function () {
            return 'input' + this._uid;
        },
        pwdInputConfirmName: function () {
            return 'pwd_confirm' + this._uid;
        },
        strength: function () {
            return this.score * 25;
        },
        status: function () {
            return 'strength-bar ' + ['', ' poor', ' weak', ' acceptable', ' good'][this.score];
        },
        styleLabel: function () {
            if (this.labelCols > 0) {
                return 'col-sm-' + this.labelCols + ' control-label';
            }
            return 'control-label';
        },
        styleInput: function () {
            if (this.labelCols > 0) {
                return 'col-sm-' + (12 - this.labelCols);
            }
            return '';
        }
    },
    methods: {
        updateValue: function (value) {                
            this.confirmPassword = ''; //clean confirm input
            var formattedValue = value.trim();
            this.$emit('input', formattedValue);
        },
        check: function () {
            var result = zxcvbn(this.value);
            this.score = result.score;
        }
    }
}

})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"form-group",class:{'has-error': _vm.errors.has('input'+_vm._uid, _vm.dataVvScope) }},[_c('label',{class:_vm.styleLabel,attrs:{"for":'input'+_vm._uid}},[_vm._v(_vm._s(_vm.name))]),_vm._v(" "),_c('div',{class:_vm.styleInput},[_c('input',{directives:[{name:"validate",rawName:"v-validate",value:('required|zxcvbn'),expression:"'required|zxcvbn'"}],ref:"'input'+_uid",staticClass:"form-control",attrs:{"data-vv-as":_vm.name,"data-vv-scope":_vm.dataVvScope,"type":"password","id":'input'+_vm._uid,"name":'input'+_vm._uid,"placeholder":_vm.name},domProps:{"value":_vm.value},on:{"input":function($event){return _vm.updateValue($event.target.value)},"keyup":_vm.check}}),_vm._v(" "),_c('div',{class:_vm.status,style:({width: _vm.strength + '%'}),attrs:{"transition":"strength-bar"}}),_vm._v(" "),_vm._l((_vm.errors.items.filter(function(err){return err.field===_vm.pwdInputName;})),function(err){return _c('span',{staticClass:"help-block",attrs:{"id":"helpBlock"}},[_vm._v(_vm._s(err.msg))])})],2)]),_vm._v(" "),_c('div',{staticClass:"form-group",class:{'has-error': _vm.errors.has('pwd_confirm'+_vm._uid, _vm.dataVvScope) }},[_c('label',{class:_vm.styleLabel,attrs:{"for":'input'+_vm._uid}},[_vm._v("Confirm "+_vm._s(_vm.name))]),_vm._v(" "),_c('div',{class:_vm.styleInput},[_c('input',{directives:[{name:"validate",rawName:"v-validate",value:({required:true, confirmed:_vm.value}),expression:"{required:true, confirmed:value}"},{name:"model",rawName:"v-model",value:(_vm.confirmPassword),expression:"confirmPassword"}],staticClass:"form-control",attrs:{"data-vv-as":'Confirm '+_vm.name,"data-vv-scope":_vm.dataVvScope,"id":_vm.pwdInputConfirmName,"name":_vm.pwdInputConfirmName,"type":"password","placeholder":"Password, Again","data-vv-validate-on":"blur"},domProps:{"value":(_vm.confirmPassword)},on:{"input":function($event){if($event.target.composing){ return; }_vm.confirmPassword=$event.target.value}}}),_vm._v(" "),_vm._l((_vm.errors.items.filter(function(err){return err.field===_vm.pwdInputConfirmName;})),function(err){return _c('span',{staticClass:"help-block",attrs:{"id":"helpBlock"}},[_vm._v(_vm._s(err.msg))])})],2)])])}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install((typeof window !== "undefined" ? window['Vue'] : typeof global !== "undefined" ? global['Vue'] : null), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  module.hot.dispose(__vueify_style_dispose__)
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1cada694", __vue__options__)
  } else {
    hotAPI.reload("data-v-1cada694", __vue__options__)
  }
})()}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"vue-hot-reload-api":23,"vueify/lib/insert-css":28}],12:[function(require,module,exports){
(function (global){
;(function(){
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var maskedInput = require('vue-text-mask');
module.exports = {
    inject: ['$validator'],
    components: {
        maskedInput: maskedInput.default
    },
    props: {
        name: {
            type: String,
            required: true
        },
        value: {
            type: String,
            default: ''
        },
        required: {
            type: Boolean,
            default: false
        },
        dataVvScope: {
            type: String,
            default: undefined
        },
        labelCols: {
            type: Number,
            default: 4
        }
    },
    computed: {
        validateRules: function () {                
            var res = {
                rules: { regex: /^\(([0-9]{3})\)([ ])([0-9]{3})-([0-9]{4})$/ }
            }
            if (this.required) {
                res.required = true;
            }
            return res;
        },
        styleLabel: function () {
            if (this.labelCols > 0) {
                return 'col-sm-' + this.labelCols + ' control-label';
            }
            return 'control-label';
        },
        styleInput: function () {
            if (this.labelCols > 0) {
                return 'col-sm-' + (12 - this.labelCols);
            }
            return '';
        }
    },
    methods: {
        updateValue: function (value) {
            //console.log("input event:" + value);
            var formattedValue = value.trim();
            this.$emit('input', formattedValue);
        }
    }
}

})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"form-group",class:{'has-error': _vm.errors.has('input'+_vm._uid, _vm.dataVvScope) }},[_c('label',{class:_vm.styleLabel,attrs:{"for":'input'+_vm._uid}},[_vm._v(_vm._s(_vm.name))]),_vm._v(" "),_c('div',{class:_vm.styleInput},[(_vm.required)?_c('div',{staticClass:"input-group"},[_c('masked-input',{directives:[{name:"validate",rawName:"v-validate",value:(_vm.validateRules),expression:"validateRules"}],ref:"input",staticClass:"form-control",attrs:{"data-vv-validate-on":"blur","data-vv-name":'input'+_vm._uid,"data-vv-as":_vm.name,"data-vv-scope":_vm.dataVvScope,"type":"text","mask":['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],"guide":true,"placeholderChar":"_","keepCharPositions":true,"id":'input'+_vm._uid,"name":'input'+_vm._uid,"placeholder":_vm.name,"value":_vm.value},on:{"input":function($event){return _vm.updateValue($event)}}}),_vm._v(" "),_vm._m(0)],1):_vm._e(),_vm._v(" "),(!_vm.required)?_c('masked-input',{directives:[{name:"validate",rawName:"v-validate",value:(_vm.validateRules),expression:"validateRules"}],ref:"input",staticClass:"form-control",attrs:{"data-vv-validate-on":"blur","data-vv-name":'input'+_vm._uid,"data-vv-as":_vm.name,"data-vv-scope":_vm.dataVvScope,"type":"text","mask":['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],"guide":true,"placeholderChar":"_","keepCharPositions":true,"id":'input'+_vm._uid,"name":'input'+_vm._uid,"placeholder":_vm.name,"value":_vm.value},on:{"input":function($event){return _vm.updateValue($event)}}}):_vm._e(),_vm._v(" "),_vm._l((_vm.errors.items.filter(function(err){return err.field==='input'+_vm._uid;})),function(err){return _c('span',{staticClass:"help-block",attrs:{"id":"helpBlock"}},[_vm._v(_vm._s(err.msg))])})],2)])}
__vue__options__.staticRenderFns = [function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',{staticClass:"input-group-addon",attrs:{"id":"basic-addon1"}},[_c('span',{staticClass:"glyphicon glyphicon-asterisk",attrs:{"title":"Required Field","aria-hidden":"true"}})])}]
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install((typeof window !== "undefined" ? window['Vue'] : typeof global !== "undefined" ? global['Vue'] : null), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7c4879c7", __vue__options__)
  } else {
    hotAPI.reload("data-v-7c4879c7", __vue__options__)
  }
})()}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"vue-hot-reload-api":23,"vue-text-mask":24}],13:[function(require,module,exports){
(function (global){
;(function(){
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

module.exports = 
    {
        inject: ['$validator'],            
        props: {
            name: {
                type: String,
                required: true
            },
            value: {
                type: Number
            },
            options: {
                type: Array,
                default: []
            },
            required: {
                type: Boolean,
                default: false
            },
            emptyTitle: {
                type: String,
                required: false
            },
            dataVvScope: {
                type: String,
                default: undefined
            },
            labelCols: {
                type: Number,
                default: 4
            }
        },
        computed: {
            isValid: function () {
                return this.errors.has('input' + this._uid, this.dataVvScope);
            },
            valueString: function () {                   
                if (this.value === undefined || this.value === null || isNaN(this.value)) {
                    return '';
                }
                return String(this.value);
            },
            styleLabel: function () {
                if (this.labelCols > 0) {
                    return 'col-sm-' + this.labelCols + ' control-label';
                }
                return 'control-label';
            },
            styleInput: function () {
                if (this.labelCols > 0) {
                    return 'col-sm-' + (12 - this.labelCols);
                }
                return '';
            }
        },
        methods: {
            updateValue: function (value) {
                var formattedValue = parseInt(value.trim());
                this.$emit('input', formattedValue);
            },
            isSelected: function (optionValue) {
                return String(optionValue) == this.valueString ? 'selected' : '';
            }
        }
    }

})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"form-group",class:{'has-error': _vm.errors.has('input'+_vm._uid, _vm.dataVvScope) }},[_c('label',{class:_vm.styleLabel,attrs:{"for":'input'+_vm._uid}},[_vm._v(_vm._s(_vm.name))]),_vm._v(" "),_c('div',{class:_vm.styleInput},[(_vm.required)?_c('div',{staticClass:"input-group"},[_c('select',{directives:[{name:"validate",rawName:"v-validate",value:('required'),expression:"'required'"}],ref:"input",staticClass:"form-control",attrs:{"data-vv-as":_vm.name,"data-vv-scope":_vm.dataVvScope,"id":'input'+_vm._uid,"name":'input'+_vm._uid},domProps:{"value":_vm.valueString},on:{"change":function($event){return _vm.updateValue($event.target.value)}}},_vm._l((_vm.options),function(option){return _c('option',{domProps:{"value":option.Value,"selected":_vm.isSelected(option.Value)}},[_vm._v("\n                    "+_vm._s(option.Text)+"\n                ")])}),0),_vm._v(" "),_vm._m(0)]):_vm._e(),_vm._v(" "),(!_vm.required)?_c('select',{ref:"input",staticClass:"form-control",attrs:{"data-vv-as":_vm.name,"data-vv-scope":_vm.dataVvScope,"id":'input'+_vm._uid,"name":'input'+_vm._uid},domProps:{"value":_vm.valueString},on:{"change":function($event){return _vm.updateValue($event.target.value)}}},[(!_vm.emptyTitle)?_c('option',{attrs:{"value":""}},[_vm._v("--- Select "+_vm._s(_vm.name)+" ---")]):_c('option',{attrs:{"value":""}},[_vm._v(_vm._s(_vm.emptyTitle))]),_vm._v(" "),_vm._l((_vm.options),function(option){return _c('option',{domProps:{"value":option.Value,"selected":_vm.isSelected(option.Value)}},[_vm._v(_vm._s(option.Text))])})],2):_vm._e(),_vm._v(" "),_c('span',{directives:[{name:"show",rawName:"v-show",value:(_vm.isValid),expression:"isValid"}],staticClass:"help-block",attrs:{"id":"helpBlock"}},[_vm._v(_vm._s(_vm.name)+" is required.")])])])}
__vue__options__.staticRenderFns = [function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',{staticClass:"input-group-addon",attrs:{"id":"basic-addon1"}},[_c('span',{staticClass:"glyphicon glyphicon-asterisk",attrs:{"title":"Required Field","aria-hidden":"true"}})])}]
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install((typeof window !== "undefined" ? window['Vue'] : typeof global !== "undefined" ? global['Vue'] : null), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-f1a67f96", __vue__options__)
  } else {
    hotAPI.reload("data-v-f1a67f96", __vue__options__)
  }
})()}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"vue-hot-reload-api":23}],14:[function(require,module,exports){
(function (global){
;(function(){
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

module.exports = 
    {
        inject: ['$validator'],            
        props: {
            name: {
                type: String,
                required: true
            },
            value: {
                type: String
            },
            options: {
                type: Array,
                default: []
            },
            required: {
                type: Boolean,
                default: false
            },
            emptyTitle: {
                type: String,
                required: false
            },
            dataVvScope: {
                type: String,
                default: undefined
            },
            labelCols: {
                type: Number,
                default: 4
            }
        },
        computed: {
            isValid: function () {
                return this.errors.has('input' + this._uid, this.dataVvScope);
            },
            styleLabel: function () {
                if (this.labelCols > 0) {
                    return 'col-sm-' + this.labelCols + ' control-label';
                }
                return 'control-label';
            },
            styleInput: function () {
                if (this.labelCols > 0) {
                    return 'col-sm-' + (12 - this.labelCols);
                }
                return '';
            }
        },
        methods: {
            updateValue: function (value) {                    
                this.$emit('input', value);
            },
            isSelected: function (optionValue) {
                return optionValue == this.value ? 'selected' : '';
            }
        }
    }

})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"form-group",class:{'has-error': _vm.errors.has('input'+_vm._uid, _vm.dataVvScope) }},[_c('label',{class:_vm.styleLabel,attrs:{"for":'input'+_vm._uid}},[_vm._v(_vm._s(_vm.name))]),_vm._v(" "),_c('div',{class:_vm.styleInput},[(_vm.required)?_c('div',{staticClass:"input-group"},[_c('select',{directives:[{name:"validate",rawName:"v-validate",value:('required'),expression:"'required'"}],ref:"input",staticClass:"form-control",attrs:{"data-vv-as":_vm.name,"data-vv-scope":_vm.dataVvScope,"id":'input'+_vm._uid,"name":'input'+_vm._uid},domProps:{"value":_vm.value},on:{"change":function($event){return _vm.updateValue($event.target.value)}}},_vm._l((_vm.options),function(option){return _c('option',{domProps:{"value":option.Value}},[_vm._v("\n                    "+_vm._s(option.Text)+"\n                ")])}),0),_vm._v(" "),_vm._m(0)]):_vm._e(),_vm._v(" "),(!_vm.required)?_c('select',{ref:"input",staticClass:"form-control",attrs:{"data-vv-as":_vm.name,"data-vv-scope":_vm.dataVvScope,"id":'input'+_vm._uid,"name":'input'+_vm._uid},domProps:{"value":_vm.value},on:{"change":function($event){return _vm.updateValue($event.target.value)}}},[(!_vm.emptyTitle)?_c('option',{attrs:{"value":""}},[_vm._v("--- Select "+_vm._s(_vm.name)+" ---")]):_c('option',{attrs:{"value":""}},[_vm._v(_vm._s(_vm.emptyTitle))]),_vm._v(" "),_vm._l((_vm.options),function(option){return _c('option',{domProps:{"value":option.Value,"selected":_vm.isSelected(option.Value)}},[_vm._v(_vm._s(option.Text))])})],2):_vm._e(),_vm._v(" "),_c('span',{directives:[{name:"show",rawName:"v-show",value:(_vm.isValid),expression:"isValid"}],staticClass:"help-block",attrs:{"id":"helpBlock"}},[_vm._v(_vm._s(_vm.name)+" is required.")])])])}
__vue__options__.staticRenderFns = [function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',{staticClass:"input-group-addon",attrs:{"id":"basic-addon1"}},[_c('span',{staticClass:"glyphicon glyphicon-asterisk",attrs:{"title":"Required Field","aria-hidden":"true"}})])}]
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install((typeof window !== "undefined" ? window['Vue'] : typeof global !== "undefined" ? global['Vue'] : null), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-d8a11ab4", __vue__options__)
  } else {
    hotAPI.reload("data-v-d8a11ab4", __vue__options__)
  }
})()}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"vue-hot-reload-api":23}],15:[function(require,module,exports){
(function (global){
;(function(){
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var maskedInput = require('vue-text-mask');
module.exports = {
    inject: ['$validator'],
    components: {
        maskedInput: maskedInput.default
    },
    props: {
        name: {
            type: String,
            required: true
        },
        value: {
            type: String,
            default: ''
        },
        required: {
            type: Boolean,
            default: false
        },
        labelCols: {
            type: Number,
            default: 4
        },
        dataVvScope: {
            type: String,
            default: undefined
        }
    },
    computed: {
        validateRules: function () {
            var res = {
                rules: { regex: /^(?!(000|666|9))\d{3}-(?!00)\d{2}-(?!0000)\d{4}$/} 
            }                
            if (this.required) {
                res.required = true;
            }

            return res;
        },
        styleLabel: function () {
            if (this.labelCols > 0) {
                return 'col-sm-' + this.labelCols + ' control-label';
            }
            return 'control-label';
        },
        styleInput: function () {
            if (this.labelCols > 0) {
                return 'col-sm-' + (12 - this.labelCols);
            }
            return '';
        }
    },
    methods: {
        updateValue: function (value) {                
            var formattedValue = value.trim();
            this.$emit('input', formattedValue);
        }
    }
}

})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"form-group",class:{'has-error': _vm.errors.has('input'+_vm._uid, _vm.dataVvScope) }},[_c('label',{class:_vm.styleLabel,attrs:{"for":'input'+_vm._uid}},[_vm._v(_vm._s(_vm.name))]),_vm._v(" "),_c('div',{class:_vm.styleInput},[(_vm.required)?_c('div',{staticClass:"input-group"},[_c('masked-input',{directives:[{name:"validate",rawName:"v-validate",value:(_vm.validateRules),expression:"validateRules"}],ref:"input",staticClass:"form-control",attrs:{"data-vv-validate-on":"blur","data-vv-name":'input'+_vm._uid,"data-vv-as":_vm.name,"data-vv-scope":_vm.dataVvScope,"type":"text","mask":[/\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],"guide":true,"placeholderChar":"#","keepCharPositions":true,"id":'input'+_vm._uid,"name":'input'+_vm._uid,"placeholder":_vm.name,"value":_vm.value},on:{"input":function($event){return _vm.updateValue($event)}}}),_vm._v(" "),_vm._m(0)],1):_vm._e(),_vm._v(" "),(!_vm.required)?_c('masked-input',{directives:[{name:"validate",rawName:"v-validate",value:(_vm.validateRules),expression:"validateRules"}],ref:"input",staticClass:"form-control",attrs:{"data-vv-validate-on":"blur","data-vv-name":'input'+_vm._uid,"data-vv-as":_vm.name,"data-vv-scope":_vm.dataVvScope,"type":"text","mask":[/\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],"guide":true,"placeholderChar":"#","keepCharPositions":true,"id":'input'+_vm._uid,"name":'input'+_vm._uid,"placeholder":_vm.name,"value":_vm.value},on:{"input":function($event){return _vm.updateValue($event)}}}):_vm._e(),_vm._v(" "),_vm._l((_vm.errors.items.filter(function(err){return err.field==='input'+_vm._uid;})),function(err){return _c('span',{staticClass:"help-block",attrs:{"id":"helpBlock"}},[_vm._v(_vm._s(err.msg))])})],2)])}
__vue__options__.staticRenderFns = [function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',{staticClass:"input-group-addon",attrs:{"id":"basic-addon1"}},[_c('span',{staticClass:"glyphicon glyphicon-asterisk",attrs:{"title":"Required Field","aria-hidden":"true"}})])}]
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install((typeof window !== "undefined" ? window['Vue'] : typeof global !== "undefined" ? global['Vue'] : null), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-597a5332", __vue__options__)
  } else {
    hotAPI.reload("data-v-597a5332", __vue__options__)
  }
})()}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"vue-hot-reload-api":23,"vue-text-mask":24}],16:[function(require,module,exports){
(function (global){
;(function(){
//
//
//
//
//
//
//
//
//
//
//
//
//
//

module.exports = {
    inject: ['$validator'],
    props: {
        name: {
            type: String,
            required: true
        },
        value: {
            type: String,
            default: ''
        },
        required: {
            type: Boolean,
            default: false
        },
        email: {
            type: Boolean,
            default: false
        },
        textAreaStyle: {
            type: Object,
            default: function () {
                return {};
            }
        },
        labelCols: {
            type: Number,
            default: 4
        },
        dataVvScope: {
            type: String,
            default: undefined
        }
    },
    computed: {
        validateRules: function () {
            var res = {};
            if (this.required) {
                res.required = true;
            }
            if (this.email) {
                res.email = true;
            }
            return res;
        },
        styleLabel: function () {
            if (this.labelCols > 0) {
                return 'col-sm-' + this.labelCols + ' control-label';
            }
            return 'control-label';
        },
        styleInput: function () {
            if (this.labelCols > 0) {
                return 'col-sm-' + (12 - this.labelCols);
            }
            return '';
        }
    },
    methods: {
        updateValue: function (value) {
            var formattedValue = value;
            this.$emit('input', formattedValue);
        }
    }
}

})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"form-group",class:{'has-error': _vm.errors.has('input'+_vm._uid, _vm.dataVvScope) }},[_c('label',{class:_vm.styleLabel,attrs:{"for":'input'+_vm._uid}},[_vm._v(_vm._s(_vm.name))]),_vm._v(" "),_c('div',{class:_vm.styleInput},[(_vm.required)?_c('div',{staticClass:"input-group"},[_c('textarea',{directives:[{name:"validate",rawName:"v-validate",value:(_vm.validateRules),expression:"validateRules"}],ref:"input",staticClass:"form-control",style:(_vm.textAreaStyle),attrs:{"data-vv-as":_vm.name,"data-vv-scope":_vm.dataVvScope,"type":"text","id":'input'+_vm._uid,"name":'input'+_vm._uid,"placeholder":_vm.name},domProps:{"value":_vm.value},on:{"input":function($event){return _vm.updateValue($event.target.value)}}}),_vm._v(" "),_vm._m(0)]):_vm._e(),_vm._v(" "),(!_vm.required)?_c('textarea',{directives:[{name:"validate",rawName:"v-validate",value:(_vm.validateRules),expression:"validateRules"}],ref:"input",staticClass:"form-control",style:(_vm.textAreaStyle),attrs:{"data-vv-as":_vm.name,"data-vv-scope":_vm.dataVvScope,"type":"text","id":'input'+_vm._uid,"name":'input'+_vm._uid,"placeholder":_vm.name},domProps:{"value":_vm.value},on:{"input":function($event){return _vm.updateValue($event.target.value)}}}):_vm._e(),_vm._v(" "),_vm._l((_vm.errors.items.filter(function(err){return err.field==='input'+_vm._uid;})),function(err){return _c('span',{staticClass:"help-block",attrs:{"id":"helpBlock"}},[_vm._v(_vm._s(err.msg))])})],2)])}
__vue__options__.staticRenderFns = [function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',{staticClass:"input-group-addon",attrs:{"id":"basic-addon1"}},[_c('span',{staticClass:"glyphicon glyphicon-asterisk",attrs:{"title":"Required Field","aria-hidden":"true"}})])}]
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install((typeof window !== "undefined" ? window['Vue'] : typeof global !== "undefined" ? global['Vue'] : null), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-69bb4c13", __vue__options__)
  } else {
    hotAPI.reload("data-v-69bb4c13", __vue__options__)
  }
})()}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"vue-hot-reload-api":23}],17:[function(require,module,exports){
(function (global){
;(function(){
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

module.exports = {
    inject: ['$validator'],
    props: {
        name: {
            type: String,
            required: true
        },
        required: {
            type: Boolean,
            default: false
        },            
        suggestionTemplate: {
            type: String,
            default: ''
        },            
        remote: {
            type: String,
            default: ''
        },
        limit:{
            type: Number,
            default: 15
        },
        value: {
            type: Object,
            default: function () { return { Id: null, Name: '' } }
        },
        labelCols: {
            type: Number,
            default: 4
        },
        dataVvScope: {
            type: String,
            default: undefined
        }
    },
    data: function () {
        return {                
            query: '',
            isLoading: false
        };
    },
    computed: {
        validateRules: function () {
            var res = {};
            if (this.required) {
                res.required = true;
            }                
            return res;
        },
        styleLabel: function () {
            if (this.labelCols > 0) {
                return 'col-sm-' + this.labelCols + ' control-label';
            }
            return 'control-label';
        },
        styleInput: function () {
            if (this.labelCols > 0) {
                return 'col-sm-' + (12 - this.labelCols);
            }
            return '';
        }
    },        

    mounted: function () {
        this.initTypeahead();
    },
    methods: {
        onInput: function (inputValue) {
            this.value.Id = null;
            this.value.Name = inputValue;
        },                           
        onBlur: function (v) {
            this.$validator.validate('typeahead-validate-' + this._uid, this.value.Id);
        },
        parseTemplate: function (data) {
            var res = Vue.compile(this.suggestionTemplate);
            var vm = new Vue({
                data: data,
                render: res.render,
                staticRenderFns: res.staticRenderFns
            }).$mount();

            return vm.$el;
        },

        resetTypeahead: function () {
            $(document).find('#' + 'typeahead' + this._uid).typeahead('destroy');
            this.initTypeahead();
        },

        initTypeahead: function () {
            var me = this;
            var templates = {};
            if (this.suggestionTemplate) {
                templates = { suggestion: me.parseTemplate }
            };
            var dataset = {
                name: 'Suggestion',
                display: function (data) {
                    return '(' + data.Id + ') ' + data.Name;
                },
                source: function (query, syncResults, asyncResults) {
                    let url = me.remote;
                    if (!url.includes('?')) {
                        url += '?';
                    } else {
                        url += '&';
                    }
                    $.get(url + 'query=' + query, function (data) {
                        asyncResults(data);
                    });
                },
                limit: me.limit,
                templates: templates
            };
            $(document).find('#' + 'typeahead' + me._uid).typeahead({
                minLength: 0,
                highlight: true
            }, dataset)
                .on('typeahead:select', function (event, suggession) {
                    me.value.Id = suggession.Id;
                    me.value.Name = suggession.Name;
                    me.$emit('input', suggession);
                    me.$emit('selected', suggession);
                    me.onBlur();
                })
                .on('typeahead:asyncrequest', function () {
                    console.log("loading started.")
                    me.isLoading = true;
                })
                .on('typeahead:asynccancel typeahead:asyncreceive', function () {
                    console.log("loading finished.")
                    me.isLoading = false;
                });
        }
    }
}

})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"form-group",class:{'has-error': _vm.errors.has('typeahead'+_vm._uid, _vm.dataVvScope)||_vm.errors.has('typeahead-validate-'+_vm._uid, _vm.dataVvScope) }},[_c('label',{class:_vm.styleLabel,attrs:{"for":'typeahead'+_vm._uid}},[_vm._v(_vm._s(_vm.name))]),_vm._v(" "),_c('div',{class:_vm.styleInput},[(_vm.required)?_c('div',{staticClass:"input-group"},[_c('input',{directives:[{name:"validate",rawName:"v-validate",value:(_vm.validateRules),expression:"validateRules"}],ref:"input",staticClass:"form-control",attrs:{"data-vv-as":_vm.name,"data-vv-scope":_vm.dataVvScope,"type":"text","id":'typeahead'+_vm._uid,"name":'typeahead'+_vm._uid,"placeholder":_vm.name},domProps:{"value":_vm.value.Name},on:{"input":function($event){return _vm.onInput($event.target.value)},"blur":function($event){return _vm.onBlur()}}}),_vm._v(" "),_vm._m(0)]):_vm._e(),_vm._v(" "),(!_vm.required)?_c('input',{directives:[{name:"validate",rawName:"v-validate",value:(_vm.validateRules),expression:"validateRules"}],ref:"input",staticClass:"form-control",attrs:{"data-vv-as":_vm.name,"data-vv-scope":_vm.dataVvScope,"type":"text","id":'typeahead'+_vm._uid,"name":'typeahead'+_vm._uid,"placeholder":_vm.name},domProps:{"value":_vm.value.Name},on:{"input":function($event){return _vm.onInput($event.target.value)},"blur":function($event){return _vm.onBlur()}}}):_vm._e(),_vm._v(" "),_c('input',{directives:[{name:"validate",rawName:"v-validate",value:(_vm.validateRules),expression:"validateRules"}],attrs:{"type":"hidden","id":'typeahead-validate-'+_vm._uid,"name":'typeahead-validate-'+_vm._uid},domProps:{"value":_vm.value.Id}}),_vm._v(" "),_vm._l((_vm.errors.items.filter(function(err){return err.field==='typeahead-validate-'+_vm._uid;})),function(err){return _c('span',{staticClass:"help-block",attrs:{"id":"helpBlock","data-vv-as":_vm.name+' Id '}},[_vm._v("Select an item from the list.")])}),_vm._v(" "),_vm._l((_vm.errors.items.filter(function(err){return err.field==='typeahead'+_vm._uid;})),function(err){return _c('span',{staticClass:"help-block",attrs:{"id":"helpBlock"}},[_vm._v(_vm._s(err.msg))])}),_vm._v(" "),_c('span',{directives:[{name:"show",rawName:"v-show",value:(_vm.isLoading),expression:"isLoading"}],staticStyle:{"position":"absolute","background-color":"white","border":"solid 1px #cccccc","padding":"5px","z-index":"1000"}},[_vm._v("...loading...")])],2)])}
__vue__options__.staticRenderFns = [function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',{staticClass:"input-group-addon",attrs:{"id":"basic-addon1"}},[_c('span',{staticClass:"glyphicon glyphicon-asterisk",attrs:{"title":"Required Field","aria-hidden":"true"}})])}]
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install((typeof window !== "undefined" ? window['Vue'] : typeof global !== "undefined" ? global['Vue'] : null), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-52e62a2f", __vue__options__)
  } else {
    hotAPI.reload("data-v-52e62a2f", __vue__options__)
  }
})()}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"vue-hot-reload-api":23}],18:[function(require,module,exports){
(function (global){
var __vueify_style_dispose__ = require("vueify/lib/insert-css").insert(".white-overlay[data-v-200371e2] {\n    background-color: rgba(255, 255, 255, 0.75);\n    z-index: 9999;\n    top: 0;\n    left: 0;\n    height: 100vh;\n    width: 100vw;\n    position: fixed;\n    margin: 0;\n}\n\n.loader-wrapper[data-v-200371e2] {\n    position: absolute;\n    display: inline-block;\n    right: 50vw;\n    bottom: 50vh;\n}\n\n.pulled-left[data-v-200371e2] {\n    float: left;\n}\n\n*[data-v-200371e2], *[data-v-200371e2]:before, *[data-v-200371e2]:after {\n    box-sizing: border-box;\n}\n\n.wrapper[data-v-200371e2] {\n    position: relative;\n    display: inline-block;\n    width: 40px;\n    height: 40px;\n    font-size: 0;\n}\n\n.spinner-container[data-v-200371e2] {\n    width: 100%;\n    height: 100%;\n    animation: container-rotate 1568ms linear infinite;\n    -webkit-animation: container-rotate 1568ms linear infinite;\n}")
;(function(){
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

module.exports = {
    props: {
        label: {
            default: 'Loading...'
        },
        show: {
            default: false
        },
        overlay: {
            default: true
        },
        // central event bus
        eventBus: {
            default: null
        },
        eventShow: {
            default: 'show-full-loading'
        },
        eventHide: {
            default: 'hide-full-loading'
        }
    },
    data:function() {
        return {
            showing: false
        }
    },
    watch: {
        show:function(val){
            this.showing = val;
        }
    },
    methods: {
        showMe: function() {
            this.showing = true
        },
        hideMe: function() {
            this.showing = false
        },
        // Register eventBus methods.
        registerBusMethods: function()
        {
            this.eventBus.$on(this.eventShow, this.showMe);
            this.eventBus.$on(this.eventHide, this.hideMe);
        }
    },
    mounted: function () {
        // If event bus, register methods.
        if (this.eventBus) {
            this.registerBusMethods();
        }
    }
}

})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('transition',{attrs:{"enter-active-class":"animated fadeIn","leave-active-class":"animated fadeOut"}},[(_vm.showing)?_c('div',{class:{'white-overlay': _vm.overlay}},[_c('div',{staticClass:"loader-wrapper"},[_c('div',{staticClass:"pulled-left",staticStyle:{"padding":"10px 20px"}},[_vm._v(_vm._s(_vm.label))]),_vm._v(" "),_c('div',{staticClass:"wrapper"},[_c('div',{staticClass:"spinner-container"},[_c('i',{staticClass:"fa fa-spinner fa-spin fa-3x fa-fw",staticStyle:{"font-size":"30px"}}),_vm._v(" "),_c('span',{staticClass:"sr-only"},[_vm._v("Loading...")])])])])]):_vm._e()])}
__vue__options__.staticRenderFns = []
__vue__options__._scopeId = "data-v-200371e2"
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install((typeof window !== "undefined" ? window['Vue'] : typeof global !== "undefined" ? global['Vue'] : null), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  module.hot.dispose(__vueify_style_dispose__)
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-200371e2", __vue__options__)
  } else {
    hotAPI.reload("data-v-200371e2", __vue__options__)
  }
})()}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"vue-hot-reload-api":23,"vueify/lib/insert-css":28}],19:[function(require,module,exports){
(function (global){
;(function(){
//
//
//
//
//
//
//
//
//

module.exports = {
    props: {
        value: {
            type: Boolean,
            required: true
        },
        icons: {
            type: Boolean,
            default: false
        }
    }
}

})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
if (__vue__options__.functional) {console.error("[vueify] functional components are not supported and should be defined in plain js files using render functions.")}
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[(_vm.value && !_vm.icons)?_c('span',[_vm._v("Yes")]):_vm._e(),_vm._v(" "),(!_vm.value && !_vm.icons)?_c('span',[_vm._v("No")]):_vm._e(),_vm._v(" "),(_vm.value && _vm.icons)?_c('span',{staticClass:"glyphicon glyphicon-ok",staticStyle:{"color":"forestgreen"}}):_vm._e(),_vm._v(" "),(!_vm.value && _vm.icons)?_c('span',{staticClass:"glyphicon glyphicon-remove",staticStyle:{"color":"firebrick"}}):_vm._e()])}
__vue__options__.staticRenderFns = []
if (module.hot) {(function () {  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install((typeof window !== "undefined" ? window['Vue'] : typeof global !== "undefined" ? global['Vue'] : null), true)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-89642420", __vue__options__)
  } else {
    hotAPI.reload("data-v-89642420", __vue__options__)
  }
})()}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"vue-hot-reload-api":23}],20:[function(require,module,exports){
'use strict'

function isObject (value) {
  return value === Object(value)
}

function isArray (value) {
  return Array.isArray(value)
}

function isFile (value) {
  return value instanceof File
}

function makeArrayKey (key) {
  if (key.length > 2 && key.lastIndexOf('[]') === key.length - 2) {
    return key
  } else {
    return key + '[]'
  }
}

function objectToFormData (obj, fd, pre) {
  fd = fd || new FormData()

  Object.keys(obj).forEach(function (prop) {
    var key = pre ? (pre + '[' + prop + ']') : prop

    if (isObject(obj[prop]) && !isArray(obj[prop]) && !isFile(obj[prop])) {
      objectToFormData(obj[prop], fd, key)
    } else if (isArray(obj[prop])) {
      obj[prop].forEach(function (value) {
        var arrayKey = makeArrayKey(key)

        if (isObject(value) && !isFile(value)) {
          objectToFormData(value, fd, arrayKey)
        } else {
          fd.append(arrayKey, value)
        }
      })
    } else {
      if(obj[prop]!==null && obj[prop]!==undefined) {
          fd.append(key, obj[prop])
      }
    }
  })

  return fd
}

module.exports = objectToFormData

},{}],21:[function(require,module,exports){
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.createNumberMask=t():e.createNumberMask=t()}(this,function(){return function(e){function t(n){if(o[n])return o[n].exports;var i=o[n]={exports:{},id:n,loaded:!1};return e[n].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}var o={};return t.m=e,t.c=o,t.p="",t(0)}([function(e,t,o){e.exports=o(2)},,function(e,t){"use strict";function o(){function e(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:l,t=e.length;if(e===l||e[0]===y[0]&&1===t)return y.split(l).concat([v]).concat(g.split(l));if(e===k&&M)return y.split(l).concat(["0",k,v]).concat(g.split(l));var o=e[0]===s&&q;o&&(e=e.toString().substr(1));var c=e.lastIndexOf(k),u=c!==-1,a=void 0,b=void 0,h=void 0;if(e.slice(T*-1)===g&&(e=e.slice(0,T*-1)),u&&(M||$)?(a=e.slice(e.slice(0,R)===y?R:0,c),b=e.slice(c+1,t),b=n(b.replace(f,l))):a=e.slice(0,R)===y?e.slice(R):e,P&&("undefined"==typeof P?"undefined":r(P))===p){var S="."===j?"[.]":""+j,w=(a.match(new RegExp(S,"g"))||[]).length;a=a.slice(0,P+w*Z)}return a=a.replace(f,l),E||(a=a.replace(/^0+(0$|[^0])/,"$1")),a=x?i(a,j):a,h=n(a),(u&&M||$===!0)&&(e[c-1]!==k&&h.push(m),h.push(k,m),b&&(("undefined"==typeof L?"undefined":r(L))===p&&(b=b.slice(0,L)),h=h.concat(b)),$===!0&&e[c-1]===k&&h.push(v)),R>0&&(h=y.split(l).concat(h)),o&&(h.length===R&&h.push(v),h=[d].concat(h)),g.length>0&&(h=h.concat(g.split(l))),h}var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},o=t.prefix,y=void 0===o?c:o,b=t.suffix,g=void 0===b?l:b,h=t.includeThousandsSeparator,x=void 0===h||h,S=t.thousandsSeparatorSymbol,j=void 0===S?u:S,w=t.allowDecimal,M=void 0!==w&&w,N=t.decimalSymbol,k=void 0===N?a:N,D=t.decimalLimit,L=void 0===D?2:D,O=t.requireDecimal,$=void 0!==O&&O,_=t.allowNegative,q=void 0!==_&&_,B=t.allowLeadingZeroes,E=void 0!==B&&B,I=t.integerLimit,P=void 0===I?null:I,R=y&&y.length||0,T=g&&g.length||0,Z=j&&j.length||0;return e.instanceOf="createNumberMask",e}function n(e){return e.split(l).map(function(e){return v.test(e)?v:e})}function i(e,t){return e.replace(/\B(?=(\d{3})+(?!\d))/g,t)}Object.defineProperty(t,"__esModule",{value:!0});var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};t.default=o;var c="$",l="",u=",",a=".",s="-",d=/-/,f=/\D+/g,p="number",v=/\d/,m="[]"}])});
},{}],22:[function(require,module,exports){
module.exports=function(t){function e(n){if(o[n])return o[n].exports;var i=o[n]={i:n,l:!1,exports:{}};return t[n].call(i.exports,i,i.exports,e),i.l=!0,i.exports}var o={};return e.m=t,e.c=o,e.i=function(t){return t},e.d=function(t,o,n){e.o(t,o)||Object.defineProperty(t,o,{configurable:!1,enumerable:!0,get:n})},e.n=function(t){var o=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(o,"a",o),o},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=8)}([function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=o(7),i=function(t){return t&&t.__esModule?t:{default:t}}(n);jQuery().bootstrapToggle||o(4);var r={};e.default={defaults:r,props:{value:Boolean,options:{type:Object,default:function(){return{}}},disabled:{type:Boolean,default:!1}},data:function(){return{updating:!1}},computed:{$$el:function(){return jQuery(this.$el)}},watch:{value:function(t){this.updating||this.$$el.bootstrapToggle(t?"on":"off")},disabled:function(t){this.$$el.bootstrapToggle(t?"disable":"enable")}},mounted:function(){var t=this;this.value&&(this.$el.checked=!0),this.$$el.bootstrapToggle(i.default.recursive(!0,r,this.options)),this.disabled&&this.$$el.bootstrapToggle("disable"),this.$$el.change(function(){t.updating=!0,t.$emit("input",t.$$el.prop("checked")),t.$nextTick(function(){return t.updating=!1})})},beforeDestroy:function(){this.$$el.bootstrapToggle("destroy"),this.$$el.off("change")}}},function(t,e){t.exports=function(t,e,o,n){var i,r=t=t||{},s=typeof t.default;"object"!==s&&"function"!==s||(i=t,r=t.default);var l="function"==typeof r?r.options:r;if(e&&(l.render=e.render,l.staticRenderFns=e.staticRenderFns),o&&(l._scopeId=o),n){var a=Object.create(l.computed||null);Object.keys(n).forEach(function(t){var e=n[t];a[t]=function(){return e}}),l.computed=a}return{esModule:i,exports:r,options:l}}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("input",{attrs:{type:"checkbox"}})},staticRenderFns:[]}},function(t,e,o){var n=o(5);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);o(9)("837c61fc",n,!0)},function(t,e){/*! ========================================================================
 * Bootstrap Toggle: bootstrap-toggle.js v2.2.0
 * http://www.bootstraptoggle.com
 * ========================================================================
 * Copyright 2014 Min Hur, The New York Times Company
 * Licensed under MIT
 * ======================================================================== */
+function(t){"use strict";function e(e){return this.each(function(){var n=t(this),i=n.data("bs.toggle"),r="object"==typeof e&&e;i||n.data("bs.toggle",i=new o(this,r)),"string"==typeof e&&i[e]&&i[e]()})}var o=function(e,o){this.$element=t(e),this.options=t.extend({},this.defaults(),o),this.render()};o.VERSION="2.2.0",o.DEFAULTS={on:"On",off:"Off",onstyle:"primary",offstyle:"default",size:"normal",style:"",width:null,height:null},o.prototype.defaults=function(){return{on:this.$element.attr("data-on")||o.DEFAULTS.on,off:this.$element.attr("data-off")||o.DEFAULTS.off,onstyle:this.$element.attr("data-onstyle")||o.DEFAULTS.onstyle,offstyle:this.$element.attr("data-offstyle")||o.DEFAULTS.offstyle,size:this.$element.attr("data-size")||o.DEFAULTS.size,style:this.$element.attr("data-style")||o.DEFAULTS.style,width:this.$element.attr("data-width")||o.DEFAULTS.width,height:this.$element.attr("data-height")||o.DEFAULTS.height}},o.prototype.render=function(){this._onstyle="btn-"+this.options.onstyle,this._offstyle="btn-"+this.options.offstyle;var e="large"===this.options.size?"btn-lg":"small"===this.options.size?"btn-sm":"mini"===this.options.size?"btn-xs":"",o=t('<label class="btn">').html(this.options.on).addClass(this._onstyle+" "+e),n=t('<label class="btn">').html(this.options.off).addClass(this._offstyle+" "+e+" active"),i=t('<span class="toggle-handle btn btn-default">').addClass(e),r=t('<div class="toggle-group">').append(o,n,i),s=t('<div class="toggle btn" data-toggle="toggle">').addClass(this.$element.prop("checked")?this._onstyle:this._offstyle+" off").addClass(e).addClass(this.options.style);this.$element.wrap(s),t.extend(this,{$toggle:this.$element.parent(),$toggleOn:o,$toggleOff:n,$toggleGroup:r}),this.$toggle.append(r);var l=this.options.width||Math.max(o.outerWidth(),n.outerWidth())+i.outerWidth()/2,a=this.options.height||Math.max(o.outerHeight(),n.outerHeight());o.addClass("toggle-on"),n.addClass("toggle-off"),this.$toggle.css({width:l,height:a}),this.options.height&&(o.css("line-height",o.height()+"px"),n.css("line-height",n.height()+"px")),this.update(!0),this.trigger(!0)},o.prototype.toggle=function(){this.$element.prop("checked")?this.off():this.on()},o.prototype.on=function(t){if(this.$element.prop("disabled"))return!1;this.$toggle.removeClass(this._offstyle+" off").addClass(this._onstyle),this.$element.prop("checked",!0),t||this.trigger()},o.prototype.off=function(t){if(this.$element.prop("disabled"))return!1;this.$toggle.removeClass(this._onstyle).addClass(this._offstyle+" off"),this.$element.prop("checked",!1),t||this.trigger()},o.prototype.enable=function(){this.$toggle.removeAttr("disabled"),this.$element.prop("disabled",!1)},o.prototype.disable=function(){this.$toggle.attr("disabled","disabled"),this.$element.prop("disabled",!0)},o.prototype.update=function(t){this.$element.prop("disabled")?this.disable():this.enable(),this.$element.prop("checked")?this.on(t):this.off(t)},o.prototype.trigger=function(e){this.$element.off("change.bs.toggle"),e||this.$element.change(),this.$element.on("change.bs.toggle",t.proxy(function(){this.update()},this))},o.prototype.destroy=function(){this.$element.off("change.bs.toggle"),this.$toggleGroup.remove(),this.$element.removeData("bs.toggle"),this.$element.unwrap()};var n=t.fn.bootstrapToggle;t.fn.bootstrapToggle=e,t.fn.bootstrapToggle.Constructor=o,t.fn.toggle.noConflict=function(){return t.fn.bootstrapToggle=n,this},t(function(){t("input[type=checkbox][data-toggle^=toggle]").bootstrapToggle()}),t(document).on("click.bs.toggle","div[data-toggle^=toggle]",function(e){t(this).find("input[type=checkbox]").bootstrapToggle("toggle"),e.preventDefault()})}(jQuery)},function(t,e,o){e=t.exports=o(6)(),e.push([t.i,"/*! ========================================================================\n * Bootstrap Toggle: bootstrap-toggle.css v2.2.0\n * http://www.bootstraptoggle.com\n * ========================================================================\n * Copyright 2014 Min Hur, The New York Times Company\n * Licensed under MIT\n * ======================================================================== */.checkbox-inline .toggle,.checkbox label .toggle{margin-left:-20px;margin-right:5px}.toggle{position:relative;overflow:hidden}.toggle input[type=checkbox]{display:none}.toggle-group{position:absolute;width:200%;top:0;bottom:0;left:0;transition:left .35s;-webkit-transition:left .35s;-moz-user-select:none;-webkit-user-select:none}.toggle.off .toggle-group{left:-100%}.toggle-on{left:0;right:50%}.toggle-off,.toggle-on{position:absolute;top:0;bottom:0;margin:0;border:0;border-radius:0}.toggle-off{left:50%;right:0}.toggle-handle{position:relative;margin:0 auto;padding-top:0;padding-bottom:0;height:100%;width:0;border-width:0 1px}.toggle.btn{min-width:59px;min-height:34px}.toggle-on.btn{padding-right:24px}.toggle-off.btn{padding-left:24px}.toggle.btn-lg{min-width:79px;min-height:45px}.toggle-on.btn-lg{padding-right:31px}.toggle-off.btn-lg{padding-left:31px}.toggle-handle.btn-lg{width:40px}.toggle.btn-sm{min-width:50px;min-height:30px}.toggle-on.btn-sm{padding-right:20px}.toggle-off.btn-sm{padding-left:20px}.toggle.btn-xs{min-width:35px;min-height:22px}.toggle-on.btn-xs{padding-right:12px}.toggle-off.btn-xs{padding-left:12px}",""])},function(t,e){t.exports=function(){var t=[];return t.toString=function(){for(var t=[],e=0;e<this.length;e++){var o=this[e];o[2]?t.push("@media "+o[2]+"{"+o[1]+"}"):t.push(o[1])}return t.join("")},t.i=function(e,o){"string"==typeof e&&(e=[[null,e,""]]);for(var n={},i=0;i<this.length;i++){var r=this[i][0];"number"==typeof r&&(n[r]=!0)}for(i=0;i<e.length;i++){var s=e[i];"number"==typeof s[0]&&n[s[0]]||(o&&!s[2]?s[2]=o:o&&(s[2]="("+s[2]+") and ("+o+")"),t.push(s))}},t}},function(t,e,o){(function(t){!function(e){function o(t,e){if("object"!==i(t))return e;for(var n in e)"object"===i(t[n])&&"object"===i(e[n])?t[n]=o(t[n],e[n]):t[n]=e[n];return t}function n(t,e,n){var s=n[0],l=n.length;(t||"object"!==i(s))&&(s={});for(var a=0;a<l;++a){var f=n[a];if("object"===i(f))for(var g in f){var p=t?r.clone(f[g]):f[g];s[g]=e?o(s[g],p):p}}return s}function i(t){return{}.toString.call(t).slice(8,-1).toLowerCase()}var r=function(t){return n(!0===t,!1,arguments)};r.recursive=function(t){return n(!0===t,!0,arguments)},r.clone=function(t){var e,o,n=t,s=i(t);if("array"===s)for(n=[],o=t.length,e=0;e<o;++e)n[e]=r.clone(t[e]);else if("object"===s){n={};for(e in t)n[e]=r.clone(t[e])}return n},e?t.exports=r:window.merge=r}("object"==typeof t&&t&&"object"==typeof t.exports&&t.exports)}).call(e,o(11)(t))},function(t,e,o){o(3);var n=o(1)(o(0),o(2),null,null);t.exports=n.exports},function(t,e,o){function n(t){for(var e=0;e<t.length;e++){var o=t[e],n=g[o.id];if(n){n.refs++;for(var i=0;i<n.parts.length;i++)n.parts[i](o.parts[i]);for(;i<o.parts.length;i++)n.parts.push(r(o.parts[i]));n.parts.length>o.parts.length&&(n.parts.length=o.parts.length)}else{for(var s=[],i=0;i<o.parts.length;i++)s.push(r(o.parts[i]));g[o.id]={id:o.id,refs:1,parts:s}}}}function i(){var t=document.createElement("style");return t.type="text/css",p.appendChild(t),t}function r(t){var e,o,n=document.querySelector('style[data-vue-ssr-id~="'+t.id+'"]');if(n){if(h)return c;n.parentNode.removeChild(n)}if(b){var r=u++;n=d||(d=i()),e=s.bind(null,n,r,!1),o=s.bind(null,n,r,!0)}else n=i(),e=l.bind(null,n),o=function(){n.parentNode.removeChild(n)};return e(t),function(n){if(n){if(n.css===t.css&&n.media===t.media&&n.sourceMap===t.sourceMap)return;e(t=n)}else o()}}function s(t,e,o,n){var i=o?"":n.css;if(t.styleSheet)t.styleSheet.cssText=m(e,i);else{var r=document.createTextNode(i),s=t.childNodes;s[e]&&t.removeChild(s[e]),s.length?t.insertBefore(r,s[e]):t.appendChild(r)}}function l(t,e){var o=e.css,n=e.media,i=e.sourceMap;if(n&&t.setAttribute("media",n),i&&(o+="\n/*# sourceURL="+i.sources[0]+" */",o+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(i))))+" */"),t.styleSheet)t.styleSheet.cssText=o;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(o))}}var a="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!a)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var f=o(10),g={},p=a&&(document.head||document.getElementsByTagName("head")[0]),d=null,u=0,h=!1,c=function(){},b="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());t.exports=function(t,e,o){h=o;var i=f(t,e);return n(i),function(e){for(var o=[],r=0;r<i.length;r++){var s=i[r],l=g[s.id];l.refs--,o.push(l)}e?(i=f(t,e),n(i)):i=[];for(var r=0;r<o.length;r++){var l=o[r];if(0===l.refs){for(var a=0;a<l.parts.length;a++)l.parts[a]();delete g[l.id]}}}};var m=function(){var t=[];return function(e,o){return t[e]=o,t.filter(Boolean).join("\n")}}()},function(t,e){t.exports=function(t,e){for(var o=[],n={},i=0;i<e.length;i++){var r=e[i],s=r[0],l=r[1],a=r[2],f=r[3],g={id:t+":"+i,css:l,media:a,sourceMap:f};n[s]?n[s].parts.push(g):o.push(n[s]={id:s,parts:[g]})}return o}},function(t,e){t.exports=function(t){return t.webpackPolyfill||(t.deprecate=function(){},t.paths=[],t.children||(t.children=[]),Object.defineProperty(t,"loaded",{enumerable:!0,get:function(){return t.l}}),Object.defineProperty(t,"id",{enumerable:!0,get:function(){return t.i}}),t.webpackPolyfill=1),t}}]);

},{}],23:[function(require,module,exports){
var Vue // late bind
var version
var map = Object.create(null)
if (typeof window !== 'undefined') {
  window.__VUE_HOT_MAP__ = map
}
var installed = false
var isBrowserify = false
var initHookName = 'beforeCreate'

exports.install = function (vue, browserify) {
  if (installed) { return }
  installed = true

  Vue = vue.__esModule ? vue.default : vue
  version = Vue.version.split('.').map(Number)
  isBrowserify = browserify

  // compat with < 2.0.0-alpha.7
  if (Vue.config._lifecycleHooks.indexOf('init') > -1) {
    initHookName = 'init'
  }

  exports.compatible = version[0] >= 2
  if (!exports.compatible) {
    console.warn(
      '[HMR] You are using a version of vue-hot-reload-api that is ' +
        'only compatible with Vue.js core ^2.0.0.'
    )
    return
  }
}

/**
 * Create a record for a hot module, which keeps track of its constructor
 * and instances
 *
 * @param {String} id
 * @param {Object} options
 */

exports.createRecord = function (id, options) {
  if(map[id]) { return }

  var Ctor = null
  if (typeof options === 'function') {
    Ctor = options
    options = Ctor.options
  }
  makeOptionsHot(id, options)
  map[id] = {
    Ctor: Ctor,
    options: options,
    instances: []
  }
}

/**
 * Check if module is recorded
 *
 * @param {String} id
 */

exports.isRecorded = function (id) {
  return typeof map[id] !== 'undefined'
}

/**
 * Make a Component options object hot.
 *
 * @param {String} id
 * @param {Object} options
 */

function makeOptionsHot(id, options) {
  if (options.functional) {
    var render = options.render
    options.render = function (h, ctx) {
      var instances = map[id].instances
      if (ctx && instances.indexOf(ctx.parent) < 0) {
        instances.push(ctx.parent)
      }
      return render(h, ctx)
    }
  } else {
    injectHook(options, initHookName, function() {
      var record = map[id]
      if (!record.Ctor) {
        record.Ctor = this.constructor
      }
      record.instances.push(this)
    })
    injectHook(options, 'beforeDestroy', function() {
      var instances = map[id].instances
      instances.splice(instances.indexOf(this), 1)
    })
  }
}

/**
 * Inject a hook to a hot reloadable component so that
 * we can keep track of it.
 *
 * @param {Object} options
 * @param {String} name
 * @param {Function} hook
 */

function injectHook(options, name, hook) {
  var existing = options[name]
  options[name] = existing
    ? Array.isArray(existing) ? existing.concat(hook) : [existing, hook]
    : [hook]
}

function tryWrap(fn) {
  return function (id, arg) {
    try {
      fn(id, arg)
    } catch (e) {
      console.error(e)
      console.warn(
        'Something went wrong during Vue component hot-reload. Full reload required.'
      )
    }
  }
}

function updateOptions (oldOptions, newOptions) {
  for (var key in oldOptions) {
    if (!(key in newOptions)) {
      delete oldOptions[key]
    }
  }
  for (var key$1 in newOptions) {
    oldOptions[key$1] = newOptions[key$1]
  }
}

exports.rerender = tryWrap(function (id, options) {
  var record = map[id]
  if (!options) {
    record.instances.slice().forEach(function (instance) {
      instance.$forceUpdate()
    })
    return
  }
  if (typeof options === 'function') {
    options = options.options
  }
  if (record.Ctor) {
    record.Ctor.options.render = options.render
    record.Ctor.options.staticRenderFns = options.staticRenderFns
    record.instances.slice().forEach(function (instance) {
      instance.$options.render = options.render
      instance.$options.staticRenderFns = options.staticRenderFns
      // reset static trees
      // pre 2.5, all static trees are cached together on the instance
      if (instance._staticTrees) {
        instance._staticTrees = []
      }
      // 2.5.0
      if (Array.isArray(record.Ctor.options.cached)) {
        record.Ctor.options.cached = []
      }
      // 2.5.3
      if (Array.isArray(instance.$options.cached)) {
        instance.$options.cached = []
      }

      // post 2.5.4: v-once trees are cached on instance._staticTrees.
      // Pure static trees are cached on the staticRenderFns array
      // (both already reset above)

      // 2.6: temporarily mark rendered scoped slots as unstable so that
      // child components can be forced to update
      var restore = patchScopedSlots(instance)
      instance.$forceUpdate()
      instance.$nextTick(restore)
    })
  } else {
    // functional or no instance created yet
    record.options.render = options.render
    record.options.staticRenderFns = options.staticRenderFns

    // handle functional component re-render
    if (record.options.functional) {
      // rerender with full options
      if (Object.keys(options).length > 2) {
        updateOptions(record.options, options)
      } else {
        // template-only rerender.
        // need to inject the style injection code for CSS modules
        // to work properly.
        var injectStyles = record.options._injectStyles
        if (injectStyles) {
          var render = options.render
          record.options.render = function (h, ctx) {
            injectStyles.call(ctx)
            return render(h, ctx)
          }
        }
      }
      record.options._Ctor = null
      // 2.5.3
      if (Array.isArray(record.options.cached)) {
        record.options.cached = []
      }
      record.instances.slice().forEach(function (instance) {
        instance.$forceUpdate()
      })
    }
  }
})

exports.reload = tryWrap(function (id, options) {
  var record = map[id]
  if (options) {
    if (typeof options === 'function') {
      options = options.options
    }
    makeOptionsHot(id, options)
    if (record.Ctor) {
      if (version[1] < 2) {
        // preserve pre 2.2 behavior for global mixin handling
        record.Ctor.extendOptions = options
      }
      var newCtor = record.Ctor.super.extend(options)
      record.Ctor.options = newCtor.options
      record.Ctor.cid = newCtor.cid
      record.Ctor.prototype = newCtor.prototype
      if (newCtor.release) {
        // temporary global mixin strategy used in < 2.0.0-alpha.6
        newCtor.release()
      }
    } else {
      updateOptions(record.options, options)
    }
  }
  record.instances.slice().forEach(function (instance) {
    if (instance.$vnode && instance.$vnode.context) {
      instance.$vnode.context.$forceUpdate()
    } else {
      console.warn(
        'Root or manually mounted instance modified. Full reload required.'
      )
    }
  })
})

// 2.6 optimizes template-compiled scoped slots and skips updates if child
// only uses scoped slots. We need to patch the scoped slots resolving helper
// to temporarily mark all scoped slots as unstable in order to force child
// updates.
function patchScopedSlots (instance) {
  if (!instance._u) { return }
  // https://github.com/vuejs/vue/blob/dev/src/core/instance/render-helpers/resolve-scoped-slots.js
  var original = instance._u
  instance._u = function (slots) {
    try {
      // 2.6.4 ~ 2.6.6
      return original(slots, true)
    } catch (e) {
      // 2.5 / >= 2.6.7
      return original(slots, null, true)
    }
  }
  return function () {
    instance._u = original
  }
}

},{}],24:[function(require,module,exports){
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.vueTextMask=t():e.vueTextMask=t()}(this,function(){return function(e){function t(n){if(r[n])return r[n].exports;var i=r[n]={exports:{},id:n,loaded:!1};return e[n].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}var r={};return t.m=e,t.c=r,t.p="",t(0)}([function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.conformToMask=void 0;var i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},o=r(2);Object.defineProperty(t,"conformToMask",{enumerable:!0,get:function(){return n(o).default}});var a=r(5),u=n(a);t.default={render:function(e){var t=this;return e("input",{ref:"input",domProps:{value:this.value},on:{input:function(e){return t.updateValue(e.target.value)},focus:function(e){return t.emitEvent(e)},blur:function(e){return t.emitEvent(e)}}})},name:"masked-input",props:{value:{type:String,required:!1,default:""},mask:{type:[Array,Function,Boolean,Object],required:!0},guide:{type:Boolean,required:!1},placeholderChar:{type:String,required:!1},keepCharPositions:{type:Boolean,required:!1},pipe:{type:Function,required:!1},showMask:{type:Boolean,required:!1}},mounted:function(){this.bind()},methods:{createTextMaskInputElement:u.default,bind:function(){this.textMaskInputElement=this.createTextMaskInputElement(i({inputElement:this.$refs.input},this.$options.propsData)),this.updateValue(this.value)},updateValue:function(e){var t=this.$refs.input.value;this.textMaskInputElement.update(e),this.$refs.input.value!==t&&this.$emit("input",this.$refs.input.value)},emitEvent:function(e){this.$emit(e.type,e)}},watch:{mask:function(e){this.mask!==e&&this.bind()},guide:function(){this.bind()},placeholderChar:function(){this.bind()},keepCharPositions:function(){this.bind()},pipe:function(){this.bind()},showMask:function(){this.bind()}}}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.placeholderChar="_"},function(e,t,r){"use strict";function n(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:a,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:a,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},n=r.guide,u=void 0===n||n,s=r.previousConformedValue,l=void 0===s?a:s,d=r.placeholderChar,f=void 0===d?o.placeholderChar:d,c=r.placeholder,p=void 0===c?(0,i.convertMaskToPlaceholder)(t,f):c,h=r.currentCaretPosition,v=r.keepCharPositions,m=u===!1&&void 0!==l,g=e.length,y=l.length,b=p.length,C=t.length,k=g-y,P=k>0,x=h+(P?-k:0),O=x+Math.abs(k);if(v===!0&&!P){for(var M=a,T=x;T<O;T++)p[T]===f&&(M+=f);e=e.slice(0,x)+M+e.slice(x,g)}for(var w=e.split(a).map(function(e,t){return{char:e,isNew:t>=x&&t<O}}),j=g-1;j>=0;j--){var V=w[j].char;if(V!==f){var S=j>=x&&y===C;V===p[S?j-k:j]&&w.splice(j,1)}}var _=a,E=!1;e:for(var N=0;N<b;N++){var q=p[N];if(q===f){if(w.length>0)for(;w.length>0;){var $=w.shift(),A=$.char,I=$.isNew;if(A===f&&m!==!0){_+=f;continue e}if(t[N].test(A)){if(v===!0&&I!==!1&&l!==a&&u!==!1&&P){for(var B=w.length,F=null,R=0;R<B;R++){var J=w[R];if(J.char!==f&&J.isNew===!1)break;if(J.char===f){F=R;break}}null!==F?(_+=A,w.splice(F,1)):N--}else _+=A;continue e}E=!0}m===!1&&(_+=p.substr(N,b));break}_+=q}if(m&&P===!1){for(var L=null,W=0;W<_.length;W++)p[W]===f&&(L=W);_=null!==L?_.substr(0,L+1):a}return{conformedValue:_,meta:{someCharsRejected:E}}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=n;var i=r(3),o=r(1),a=""},function(e,t,r){"use strict";function n(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:s,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:u.placeholderChar;if(e.indexOf(t)!==-1)throw new Error("Placeholder character must not be used as part of the mask. Please specify a character that is not present in your mask as your placeholder character.\n\n"+("The placeholder character that was received is: "+JSON.stringify(t)+"\n\n")+("The mask that was received is: "+JSON.stringify(e)));return e.map(function(e){return e instanceof RegExp?t:e}).join("")}function i(e){return"string"==typeof e||e instanceof String}function o(e){return"number"==typeof e&&void 0===e.length&&!isNaN(e)}function a(e){for(var t=[],r=void 0;r=e.indexOf(l),r!==-1;)t.push(r),e.splice(r,1);return{maskWithoutCaretTraps:e,indexes:t}}Object.defineProperty(t,"__esModule",{value:!0}),t.convertMaskToPlaceholder=n,t.isString=i,t.isNumber=o,t.processCaretTraps=a;var u=r(1),s=[],l="[]"},function(e,t){"use strict";function r(e){var t=e.previousConformedValue,r=void 0===t?i:t,o=e.previousPlaceholder,a=void 0===o?i:o,u=e.currentCaretPosition,s=void 0===u?0:u,l=e.conformedValue,d=e.rawValue,f=e.placeholderChar,c=e.placeholder,p=e.indexesOfPipedChars,h=void 0===p?n:p,v=e.caretTrapIndexes,m=void 0===v?n:v;if(0===s)return 0;var g=d.length,y=r.length,b=c.length,C=l.length,k=g-y,P=k>0,x=0===y,O=k>1&&!P&&!x;if(O)return s;var M=P&&(r===l||l===c),T=0,w=void 0,j=void 0;if(M)T=s-k;else{var V=l.toLowerCase(),S=d.toLowerCase(),_=S.substr(0,s).split(i),E=_.filter(function(e){return V.indexOf(e)!==-1});j=E[E.length-1];var N=a.substr(0,E.length).split(i).filter(function(e){return e!==f}).length,q=c.substr(0,E.length).split(i).filter(function(e){return e!==f}).length,$=q!==N,A=void 0!==a[E.length-1]&&void 0!==c[E.length-2]&&a[E.length-1]!==f&&a[E.length-1]!==c[E.length-1]&&a[E.length-1]===c[E.length-2];!P&&($||A)&&N>0&&c.indexOf(j)>-1&&void 0!==d[s]&&(w=!0,j=d[s]);for(var I=h.map(function(e){return V[e]}),B=I.filter(function(e){return e===j}).length,F=E.filter(function(e){return e===j}).length,R=c.substr(0,c.indexOf(f)).split(i).filter(function(e,t){return e===j&&d[t]!==e}).length,J=R+F+B+(w?1:0),L=0,W=0;W<C;W++){var D=V[W];if(T=W+1,D===j&&L++,L>=J)break}}if(P){for(var z=T,G=T;G<=b;G++)if(c[G]===f&&(z=G),c[G]===f||m.indexOf(G)!==-1||G===b)return z}else if(w){for(var H=T-1;H>=0;H--)if(l[H]===j||m.indexOf(H)!==-1||0===H)return H}else for(var K=T;K>=0;K--)if(c[K-1]===f||m.indexOf(K)!==-1||0===K)return K}Object.defineProperty(t,"__esModule",{value:!0}),t.default=r;var n=[],i=""},function(e,t,r){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function i(e){var t={previousConformedValue:void 0,previousPlaceholder:void 0};return{state:t,update:function(r){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:e,i=n.inputElement,l=n.mask,f=n.guide,g=n.pipe,b=n.placeholderChar,C=void 0===b?h.placeholderChar:b,k=n.keepCharPositions,P=void 0!==k&&k,x=n.showMask,O=void 0!==x&&x;if("undefined"==typeof r&&(r=i.value),r!==t.previousConformedValue){("undefined"==typeof l?"undefined":s(l))===y&&void 0!==l.pipe&&void 0!==l.mask&&(g=l.pipe,l=l.mask);var M=void 0,T=void 0;if(l instanceof Array&&(M=(0,p.convertMaskToPlaceholder)(l,C)),l!==!1){var w=a(r),j=i.selectionEnd,V=t.previousConformedValue,S=t.previousPlaceholder,_=void 0;if(("undefined"==typeof l?"undefined":s(l))===v){if(T=l(w,{currentCaretPosition:j,previousConformedValue:V,placeholderChar:C}),T===!1)return;var E=(0,p.processCaretTraps)(T),N=E.maskWithoutCaretTraps,q=E.indexes;T=N,_=q,M=(0,p.convertMaskToPlaceholder)(T,C)}else T=l;var $={previousConformedValue:V,guide:f,placeholderChar:C,pipe:g,placeholder:M,currentCaretPosition:j,keepCharPositions:P},A=(0,c.default)(w,T,$),I=A.conformedValue,B=("undefined"==typeof g?"undefined":s(g))===v,F={};B&&(F=g(I,u({rawValue:w},$)),F===!1?F={value:V,rejected:!0}:(0,p.isString)(F)&&(F={value:F}));var R=B?F.value:I,J=(0,d.default)({previousConformedValue:V,previousPlaceholder:S,conformedValue:R,placeholder:M,rawValue:w,currentCaretPosition:j,placeholderChar:C,indexesOfPipedChars:F.indexesOfPipedChars,caretTrapIndexes:_}),L=R===M&&0===J,W=O?M:m,D=L?W:R;t.previousConformedValue=D,t.previousPlaceholder=M,i.value!==D&&(i.value=D,o(i,J))}}}}}function o(e,t){document.activeElement===e&&(b?C(function(){return e.setSelectionRange(t,t,g)},0):e.setSelectionRange(t,t,g))}function a(e){if((0,p.isString)(e))return e;if((0,p.isNumber)(e))return String(e);if(void 0===e||null===e)return m;throw new Error("The 'value' provided to Text Mask needs to be a string or a number. The value received was:\n\n "+JSON.stringify(e))}Object.defineProperty(t,"__esModule",{value:!0});var u=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};t.default=i;var l=r(4),d=n(l),f=r(2),c=n(f),p=r(3),h=r(1),v="function",m="",g="none",y="object",b="undefined"!=typeof navigator&&/Android/i.test(navigator.userAgent),C="undefined"!=typeof requestAnimationFrame?requestAnimationFrame:setTimeout}])});
},{}],25:[function(require,module,exports){
;(function () {

  var vueTruncate = {};

  vueTruncate.install = function (Vue) {
    
    /**
     * 
     * @param {String} text
     * @param {Number} length
     * @param {String} clamp
     * 
     */

    Vue.filter('truncate', function (text, length, clamp) {
      clamp = clamp || '...';
      length = length || 30;
      
      if (text.length <= length) return text;

      var tcText = text.slice(0, length - clamp.length);
      var last = tcText.length - 1;
      

      while (last > 0 && tcText[last] !== ' ' && tcText[last] !== clamp[0]) last -= 1;

      // Fix for case when text dont have any `space`
      last = last || length - clamp.length;

      tcText =  tcText.slice(0, last);

      return tcText + clamp;
    });
  }

  if (typeof exports == "object") {
    module.exports = vueTruncate;
  } else if (typeof define == "function" && define.amd) {
    define([], function(){ return vueTruncate });
  } else if (window.Vue) {
    window.VueTruncate = vueTruncate;
    Vue.use(VueTruncate);
  }

})()

},{}],26:[function(require,module,exports){
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.Vue2BootstrapModal=t():e.Vue2BootstrapModal=t()}(this,function(){return function(e){function t(o){if(n[o])return n[o].exports;var r=n[o]={exports:{},id:o,loaded:!1};return e[o].call(r.exports,r,r.exports,t),r.loaded=!0,r.exports}var n={};return t.m=e,t.c=n,t.p="/dist/",t(0)}([function(e,t,n){"use strict";e.exports=n(4)},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={props:{opened:{type:Function,default:function(){}},closed:{type:Function,default:function(){}},needHeader:{type:Boolean,default:!0},needFooter:{type:Boolean,default:!0},size:{type:String,default:""}},data:function(){return{sizeClasses:{large:"modal-lg",small:"modal-sm",medium:"modal-md",full:"modal-full"},isOpen:!1,isShow:!1,lastKnownBodyStyle:{overflow:"auto"}}},methods:{open:function(){var e=this;this.isShow||(this.isShow=!0,this.$nextTick(function(){e.isOpen=!0,e.$refs.modal.focus(),e.lastKnownBodyStyle.overflow=document.body.style.overflow,document.body.style.overflow="hidden",e.opened()}))},close:function(){var e=this;this.isOpen=!1,this.$nextTick(function(){setTimeout(function(){e.isShow=!1,document.body.style.overflow=e.lastKnownBodyStyle.overflow,e.closed()},500)})}},computed:{modalSize:function(){return this.sizeClasses[this.size]||""}}}},function(e,t,n){t=e.exports=n(3)(),t.push([e.id,".background-darken[data-v-220d4c12]{background:rgba(0,0,0,.3)}.modal[data-v-220d4c12]{overflow-x:hidden;overflow-y:auto}.modal-full[data-v-220d4c12]{margin-left:16px;margin-right:16px;width:auto}",""])},function(e,t){e.exports=function(){var e=[];return e.toString=function(){for(var e=[],t=0;t<this.length;t++){var n=this[t];n[2]?e.push("@media "+n[2]+"{"+n[1]+"}"):e.push(n[1])}return e.join("")},e.i=function(t,n){"string"==typeof t&&(t=[[null,t,""]]);for(var o={},r=0;r<this.length;r++){var s=this[r][0];"number"==typeof s&&(o[s]=!0)}for(r=0;r<t.length;r++){var i=t[r];"number"==typeof i[0]&&o[i[0]]||(n&&!i[2]?i[2]=n:n&&(i[2]="("+i[2]+") and ("+n+")"),e.push(i))}},e}},function(e,t,n){var o,r;n(7),o=n(1);var s=n(5);r=o=o||{},"object"!=typeof o.default&&"function"!=typeof o.default||(r=o=o.default),"function"==typeof r&&(r=r.options),r.render=s.render,r.staticRenderFns=s.staticRenderFns,r._scopeId="data-v-220d4c12",e.exports=o},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{ref:"modal",staticClass:"modal fade background-darken",class:{in:e.isOpen,show:e.isShow},attrs:{tabindex:"-1",role:"dialog"},on:{click:function(t){t.target===t.currentTarget&&e.close()},keyup:function(t){e._k(t.keyCode,"esc",27)||e.close()}}},[n("div",{staticClass:"modal-dialog",class:e.modalSize,attrs:{role:"document"}},[n("div",{staticClass:"modal-content"},[e.needHeader?n("div",{staticClass:"modal-header"},[n("button",{staticClass:"close",attrs:{type:"button","data-dismiss":"modal","aria-label":"Close"},on:{click:function(t){e.close()}}},[n("span",{attrs:{"aria-hidden":"true"}},[e._v("×")])]),e._v(" "),n("h4",{staticClass:"modal-title"},[e._t("title",[e._v("\n                        Modal\n                    ")])],2)]):e._e(),e._v(" "),n("div",{staticClass:"modal-body"},[e._t("body",[e._v("\n                    Body\n                ")])],2),e._v(" "),e.needFooter?n("div",{staticClass:"modal-footer"},[e._t("footer")],2):e._e()])])])},staticRenderFns:[]}},function(e,t,n){function o(e,t){for(var n=0;n<e.length;n++){var o=e[n],r=c[o.id];if(r){r.refs++;for(var s=0;s<r.parts.length;s++)r.parts[s](o.parts[s]);for(;s<o.parts.length;s++)r.parts.push(d(o.parts[s],t))}else{for(var i=[],s=0;s<o.parts.length;s++)i.push(d(o.parts[s],t));c[o.id]={id:o.id,refs:1,parts:i}}}}function r(e){for(var t=[],n={},o=0;o<e.length;o++){var r=e[o],s=r[0],i=r[1],a=r[2],d=r[3],l={css:i,media:a,sourceMap:d};n[s]?n[s].parts.push(l):t.push(n[s]={id:s,parts:[l]})}return t}function s(e,t){var n=h(),o=y[y.length-1];if("top"===e.insertAt)o?o.nextSibling?n.insertBefore(t,o.nextSibling):n.appendChild(t):n.insertBefore(t,n.firstChild),y.push(t);else{if("bottom"!==e.insertAt)throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");n.appendChild(t)}}function i(e){e.parentNode.removeChild(e);var t=y.indexOf(e);t>=0&&y.splice(t,1)}function a(e){var t=document.createElement("style");return t.type="text/css",s(e,t),t}function d(e,t){var n,o,r;if(t.singleton){var s=m++;n=v||(v=a(t)),o=l.bind(null,n,s,!1),r=l.bind(null,n,s,!0)}else n=a(t),o=u.bind(null,n),r=function(){i(n)};return o(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;o(e=t)}else r()}}function l(e,t,n,o){var r=n?"":o.css;if(e.styleSheet)e.styleSheet.cssText=g(t,r);else{var s=document.createTextNode(r),i=e.childNodes;i[t]&&e.removeChild(i[t]),i.length?e.insertBefore(s,i[t]):e.appendChild(s)}}function u(e,t){var n=t.css,o=t.media,r=t.sourceMap;if(o&&e.setAttribute("media",o),r&&(n+="\n/*# sourceURL="+r.sources[0]+" */",n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(r))))+" */"),e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}var c={},f=function(e){var t;return function(){return"undefined"==typeof t&&(t=e.apply(this,arguments)),t}},p=f(function(){return/msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase())}),h=f(function(){return document.head||document.getElementsByTagName("head")[0]}),v=null,m=0,y=[];e.exports=function(e,t){t=t||{},"undefined"==typeof t.singleton&&(t.singleton=p()),"undefined"==typeof t.insertAt&&(t.insertAt="bottom");var n=r(e);return o(n,t),function(e){for(var s=[],i=0;i<n.length;i++){var a=n[i],d=c[a.id];d.refs--,s.push(d)}if(e){var l=r(e);o(l,t)}for(var i=0;i<s.length;i++){var d=s[i];if(0===d.refs){for(var u=0;u<d.parts.length;u++)d.parts[u]();delete c[d.id]}}}};var g=function(){var e=[];return function(t,n){return e[t]=n,e.filter(Boolean).join("\n")}}()},function(e,t,n){var o=n(2);"string"==typeof o&&(o=[[e.id,o,""]]);n(6)(o,{});o.locals&&(e.exports=o.locals)}])});

},{}],27:[function(require,module,exports){
module.exports=function(e){function t(i){if(n[i])return n[i].exports;var o=n[i]={exports:{},id:i,loaded:!1};return e[i].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){var i,o;n(7),i=n(2);var r=n(5);o=i=i||{},"object"!=typeof i.default&&"function"!=typeof i.default||(o=i=i.default),"function"==typeof o&&(o=o.options),o.render=r.render,o.staticRenderFns=r.staticRenderFns,e.exports=i},function(e,t){e.exports=function(){var e=[];return e.toString=function(){for(var e=[],t=0;t<this.length;t++){var n=this[t];n[2]?e.push("@media "+n[2]+"{"+n[1]+"}"):e.push(n[1])}return e.join("")},e.i=function(t,n){"string"==typeof t&&(t=[[null,t,""]]);for(var i={},o=0;o<this.length;o++){var r=this[o][0];"number"==typeof r&&(i[r]=!0)}for(o=0;o<t.length;o++){var s=t[o];"number"==typeof s[0]&&i[s[0]]||(n&&!s[2]?s[2]=n:n&&(s[2]="("+s[2]+") and ("+n+")"),e.push(s))}},e}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n={HOUR_TOKENS:["HH","H","hh","h","kk","k"],MINUTE_TOKENS:["mm","m"],SECOND_TOKENS:["ss","s"],APM_TOKENS:["A","a"]};t.default={name:"VueTimepicker",props:{value:{type:Object,required:!0},hideClearButton:{type:Boolean},format:{type:String,default:"HH:mm"},minuteInterval:{type:Number,default:1,validator:function(e){if(e<0)throw new Error("minute-interval must be greater than 0");return!0}},secondInterval:{type:Number,default:1,validator:function(e){if(e<0)throw new Error("second-interval must be greater than 0");return!0}},disabled:{type:Boolean},disabledValues:{type:Object,default:function(){return{hour:[],minute:[],second:[],apm:[]}}}},data:function(){return{showDropdown:!1}},computed:{displayTime:function(){var e=this.format;return this.value[this.hourType]&&(e=e.replace(new RegExp(this.hourType,"g"),this.value[this.hourType])),this.value[this.minuteType]&&(e=e.replace(new RegExp(this.minuteType,"g"),this.value[this.minuteType])),this.value[this.secondType]&&this.secondType&&(e=e.replace(new RegExp(this.secondType,"g"),this.value[this.secondType])),this.value[this.apmType]&&this.apmType&&(e=e.replace(new RegExp(this.apmType,"g"),this.value[this.apmType])),e},showClearBtn:function(){return!!this.value[this.hourType]||!!this.value[this.minuteType]},hourType:function(){return this.checkAcceptingType(n.HOUR_TOKENS,this.format,"HH")},minuteType:function(){return this.checkAcceptingType(n.MINUTE_TOKENS,this.format,"mm")},secondType:function(){return this.checkAcceptingType(n.SECOND_TOKENS,this.format)},apmType:function(){return this.checkAcceptingType(n.APM_TOKENS,this.format)},hours:function e(){for(var t="h"===this.hourType||"hh"===this.hourType?12:24,e=[],n=0;n<t;n++)e.push(this.formatValue(this.hourType,n));return e},minutes:function e(){for(var e=[],t=0;t<60;t+=this.minuteInterval)e.push(this.formatValue(this.minuteType,t));return e},seconds:function e(){for(var e=[],t=0;t<60;t+=this.secondInterval)e.push(this.formatValue(this.secondType,t));return e},apms:function(){switch(this.apmType){case"A":return["AM","PM"];case"a":return["am","pm"];default:return[]}}},methods:{formatValue:function(e,t){switch(e){case"H":case"m":case"s":return String(t);case"HH":case"mm":case"ss":return t<10?"0"+t:String(t);case"h":case"k":return String(t+1);case"hh":case"kk":return t+1<10?"0"+(t+1):String(t+1);default:return""}},checkAcceptingType:function(e,t,n){if(!e||!t||!t.length)return"";for(var i=e.length,o=0;o<i;o++)if(t.indexOf(e[o])>-1)return e[o];return n||""},toggleDropdown:function(){this.showDropdown=!this.showDropdown&&!this.disabled},onHourSelect:function(e){var t=this.value;t[this.hourType]=e,this.$emit("input",t)},onMinuteSelect:function(e){var t=this.value;t[this.minuteType]=e,this.$emit("input",t)},onSecondSelect:function(e){var t=this.value;t[this.secondType]=e,this.$emit("input",t)},onApmSelect:function(e){var t=this.value;t[this.apmType]=e,this.$emit("input",t)},clearTime:function(){var e={};e[this.hourType]="",e[this.minuteType]="",e[this.secondType]="","a"!==this.apmType&&"A"!==this.apmType||(e[this.apmType]=""),this.$emit("input",e)}}}},function(e,t,n){t=e.exports=n(1)(),t.i(n(4),""),t.push([e.id,"",""])},function(e,t,n){t=e.exports=n(1)(),t.push([e.id,".time-picker{display:inline-block;position:relative;font-size:1em;width:10em;font-family:sans-serif;vertical-align:middle}.time-picker *{box-sizing:border-box}.time-picker input.display-time{border:1px solid #d2d2d2;width:10em;height:2.2em;padding:.3em .5em;font-size:1em}.time-picker .clear-btn{position:absolute;display:flex;flex-flow:column nowrap;justify-content:center;align-items:center;top:0;right:0;bottom:0;margin-top:-.15em;z-index:3;font-size:1.1em;line-height:1em;vertical-align:middle;width:1.3em;color:#d2d2d2;background:hsla(0,0%,100%,0);text-align:center;font-style:normal;transition:color .2s}.time-picker .clear-btn:hover{color:#797979;cursor:pointer}.time-picker .time-picker-overlay{z-index:2;position:fixed;top:0;left:0;right:0;bottom:0}.time-picker .dropdown{position:absolute;z-index:5;top:calc(2.2em + 2px);left:0;background:#fff;box-shadow:0 1px 6px rgba(0,0,0,.15);width:10em;height:10em;font-weight:400}.time-picker .dropdown .select-list{width:10em;height:10em;overflow:hidden;display:flex;flex-flow:row nowrap;align-items:stretch;justify-content:space-between}.time-picker .dropdown ul{padding:0;margin:0;list-style:none;flex:1;overflow-x:hidden;overflow-y:auto}.time-picker .dropdown ul.apms,.time-picker .dropdown ul.minutes,.time-picker .dropdown ul.seconds{border-left:1px solid #fff}.time-picker .dropdown ul li{text-align:center;padding:.3em 0;color:#161616}.time-picker .dropdown ul li:not(.hint):hover{background:rgba(0,0,0,.08);color:#161616;cursor:pointer}.time-picker .dropdown ul li.active,.time-picker .dropdown ul li.active:hover{background:#41b883;color:#fff}.time-picker .dropdown .hint{color:#a5a5a5;cursor:default;font-size:.8em}",""])},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"time-picker"},[n("input",{staticClass:"display-time",attrs:{readonly:!e.disabled,disabled:e.disabled,type:"text",title:""},domProps:{value:e.displayTime},on:{click:function(t){t.stopPropagation(),e.toggleDropdown(t)}}}),e._v(" "),e.hideClearButton?e._e():n("span",{directives:[{name:"show",rawName:"v-show",value:!e.showDropdown&&e.showClearBtn,expression:"!showDropdown && showClearBtn"}],staticClass:"clear-btn",on:{click:function(t){t.stopPropagation(),e.clearTime(t)}}},[e._v("×")]),e._v(" "),e.showDropdown?n("div",{staticClass:"time-picker-overlay",on:{click:function(t){t.stopPropagation(),e.toggleDropdown(t)}}}):e._e(),e._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:e.showDropdown,expression:"showDropdown"}],staticClass:"dropdown"},[n("div",{staticClass:"select-list"},[n("ul",{staticClass:"hours"},[n("li",{staticClass:"hint",domProps:{textContent:e._s(e.hourType)}}),e._v(" "),e._l(e.hours,function(t){return n("li",{directives:[{name:"show",rawName:"v-show",value:e.disabledValues.hour.indexOf(t)===-1,expression:"disabledValues.hour.indexOf(hr) === -1"}],class:{active:e.value[e.hourType]===t},domProps:{textContent:e._s(t)},on:{click:function(n){n.stopPropagation(),e.onHourSelect(t)}}})})],2),e._v(" "),n("ul",{staticClass:"minutes"},[n("li",{staticClass:"hint",domProps:{textContent:e._s(e.minuteType)}}),e._v(" "),e._l(e.minutes,function(t){return n("li",{directives:[{name:"show",rawName:"v-show",value:e.disabledValues.minute.indexOf(t)===-1,expression:"disabledValues.minute.indexOf(m) === -1"}],class:{active:e.value[e.minuteType]===t},domProps:{textContent:e._s(t)},on:{click:function(n){n.stopPropagation(),e.onMinuteSelect(t)}}})})],2),e._v(" "),e.secondType?n("ul",{staticClass:"seconds"},[n("li",{staticClass:"hint",domProps:{textContent:e._s(e.secondType)}}),e._v(" "),e._l(e.seconds,function(t){return n("li",{directives:[{name:"show",rawName:"v-show",value:e.disabledValues.second.indexOf(t)===-1,expression:"disabledValues.second.indexOf(s) === -1"}],class:{active:e.value[e.secondType]===t},domProps:{textContent:e._s(t)},on:{click:function(n){n.stopPropagation(),e.onSecondSelect(t)}}})})],2):e._e(),e._v(" "),e.apmType?n("ul",{staticClass:"apms"},[n("li",{staticClass:"hint",domProps:{textContent:e._s(e.apmType)}}),e._v(" "),e._l(e.apms,function(t){return n("li",{directives:[{name:"show",rawName:"v-show",value:e.disabledValues.apm.indexOf(t)===-1,expression:"disabledValues.apm.indexOf(a) === -1"}],class:{active:e.value[e.apmType]===t},domProps:{textContent:e._s(t)},on:{click:function(n){n.stopPropagation(),e.onApmSelect(t)}}})})],2):e._e()])])])},staticRenderFns:[]}},function(e,t,n){function i(e,t){for(var n=0;n<e.length;n++){var i=e[n],o=c[i.id];if(o){o.refs++;for(var r=0;r<o.parts.length;r++)o.parts[r](i.parts[r]);for(;r<i.parts.length;r++)o.parts.push(u(i.parts[r],t))}else{for(var s=[],r=0;r<i.parts.length;r++)s.push(u(i.parts[r],t));c[i.id]={id:i.id,refs:1,parts:s}}}}function o(e){for(var t=[],n={},i=0;i<e.length;i++){var o=e[i],r=o[0],s=o[1],a=o[2],u=o[3],l={css:s,media:a,sourceMap:u};n[r]?n[r].parts.push(l):t.push(n[r]={id:r,parts:[l]})}return t}function r(e,t){var n=f(),i=y[y.length-1];if("top"===e.insertAt)i?i.nextSibling?n.insertBefore(t,i.nextSibling):n.appendChild(t):n.insertBefore(t,n.firstChild),y.push(t);else{if("bottom"!==e.insertAt)throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");n.appendChild(t)}}function s(e){e.parentNode.removeChild(e);var t=y.indexOf(e);t>=0&&y.splice(t,1)}function a(e){var t=document.createElement("style");return t.type="text/css",r(e,t),t}function u(e,t){var n,i,o;if(t.singleton){var r=v++;n=m||(m=a(t)),i=l.bind(null,n,r,!1),o=l.bind(null,n,r,!0)}else n=a(t),i=p.bind(null,n),o=function(){s(n)};return i(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;i(e=t)}else o()}}function l(e,t,n,i){var o=n?"":i.css;if(e.styleSheet)e.styleSheet.cssText=g(t,o);else{var r=document.createTextNode(o),s=e.childNodes;s[t]&&e.removeChild(s[t]),s.length?e.insertBefore(r,s[t]):e.appendChild(r)}}function p(e,t){var n=t.css,i=t.media,o=t.sourceMap;if(i&&e.setAttribute("media",i),o&&(n+="\n/*# sourceURL="+o.sources[0]+" */",n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */"),e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}var c={},d=function(e){var t;return function(){return"undefined"==typeof t&&(t=e.apply(this,arguments)),t}},h=d(function(){return/msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase())}),f=d(function(){return document.head||document.getElementsByTagName("head")[0]}),m=null,v=0,y=[];e.exports=function(e,t){t=t||{},"undefined"==typeof t.singleton&&(t.singleton=h()),"undefined"==typeof t.insertAt&&(t.insertAt="bottom");var n=o(e);return i(n,t),function(e){for(var r=[],s=0;s<n.length;s++){var a=n[s],u=c[a.id];u.refs--,r.push(u)}if(e){var l=o(e);i(l,t)}for(var s=0;s<r.length;s++){var u=r[s];if(0===u.refs){for(var p=0;p<u.parts.length;p++)u.parts[p]();delete c[u.id]}}}};var g=function(){var e=[];return function(t,n){return e[t]=n,e.filter(Boolean).join("\n")}}()},function(e,t,n){var i=n(3);"string"==typeof i&&(i=[[e.id,i,""]]);n(6)(i,{});i.locals&&(e.exports=i.locals)}]);

},{}],28:[function(require,module,exports){
var inserted = exports.cache = {}

function noop () {}

exports.insert = function (css) {
  if (inserted[css]) return noop
  inserted[css] = true

  var elem = document.createElement('style')
  elem.setAttribute('type', 'text/css')

  if ('textContent' in elem) {
    elem.textContent = css
  } else {
    elem.styleSheet.cssText = css
  }

  document.getElementsByTagName('head')[0].appendChild(elem)
  return function () {
    document.getElementsByTagName('head')[0].removeChild(elem)
    inserted[css] = false
  }
}

},{}],29:[function(require,module,exports){
!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.VuejsPaginate=t():e.VuejsPaginate=t()}(this,function(){return function(e){function t(s){if(n[s])return n[s].exports;var a=n[s]={exports:{},id:s,loaded:!1};return e[s].call(a.exports,a,a.exports,t),a.loaded=!0,a.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){"use strict";function s(e){return e&&e.__esModule?e:{default:e}}var a=n(1),i=s(a);e.exports=i.default},function(e,t,n){n(2);var s=n(6)(n(7),n(8),"data-v-82963a40",null);e.exports=s.exports},function(e,t,n){var s=n(3);"string"==typeof s&&(s=[[e.id,s,""]]);n(5)(s,{});s.locals&&(e.exports=s.locals)},function(e,t,n){t=e.exports=n(4)(),t.push([e.id,"a[data-v-82963a40]{cursor:pointer}",""])},function(e,t){e.exports=function(){var e=[];return e.toString=function(){for(var e=[],t=0;t<this.length;t++){var n=this[t];n[2]?e.push("@media "+n[2]+"{"+n[1]+"}"):e.push(n[1])}return e.join("")},e.i=function(t,n){"string"==typeof t&&(t=[[null,t,""]]);for(var s={},a=0;a<this.length;a++){var i=this[a][0];"number"==typeof i&&(s[i]=!0)}for(a=0;a<t.length;a++){var r=t[a];"number"==typeof r[0]&&s[r[0]]||(n&&!r[2]?r[2]=n:n&&(r[2]="("+r[2]+") and ("+n+")"),e.push(r))}},e}},function(e,t,n){function s(e,t){for(var n=0;n<e.length;n++){var s=e[n],a=u[s.id];if(a){a.refs++;for(var i=0;i<a.parts.length;i++)a.parts[i](s.parts[i]);for(;i<s.parts.length;i++)a.parts.push(o(s.parts[i],t))}else{for(var r=[],i=0;i<s.parts.length;i++)r.push(o(s.parts[i],t));u[s.id]={id:s.id,refs:1,parts:r}}}}function a(e){for(var t=[],n={},s=0;s<e.length;s++){var a=e[s],i=a[0],r=a[1],l=a[2],o=a[3],d={css:r,media:l,sourceMap:o};n[i]?n[i].parts.push(d):t.push(n[i]={id:i,parts:[d]})}return t}function i(e,t){var n=g(),s=C[C.length-1];if("top"===e.insertAt)s?s.nextSibling?n.insertBefore(t,s.nextSibling):n.appendChild(t):n.insertBefore(t,n.firstChild),C.push(t);else{if("bottom"!==e.insertAt)throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");n.appendChild(t)}}function r(e){e.parentNode.removeChild(e);var t=C.indexOf(e);t>=0&&C.splice(t,1)}function l(e){var t=document.createElement("style");return t.type="text/css",i(e,t),t}function o(e,t){var n,s,a;if(t.singleton){var i=v++;n=h||(h=l(t)),s=d.bind(null,n,i,!1),a=d.bind(null,n,i,!0)}else n=l(t),s=c.bind(null,n),a=function(){r(n)};return s(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;s(e=t)}else a()}}function d(e,t,n,s){var a=n?"":s.css;if(e.styleSheet)e.styleSheet.cssText=b(t,a);else{var i=document.createTextNode(a),r=e.childNodes;r[t]&&e.removeChild(r[t]),r.length?e.insertBefore(i,r[t]):e.appendChild(i)}}function c(e,t){var n=t.css,s=t.media,a=t.sourceMap;if(s&&e.setAttribute("media",s),a&&(n+="\n/*# sourceURL="+a.sources[0]+" */",n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(a))))+" */"),e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}var u={},p=function(e){var t;return function(){return"undefined"==typeof t&&(t=e.apply(this,arguments)),t}},f=p(function(){return/msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase())}),g=p(function(){return document.head||document.getElementsByTagName("head")[0]}),h=null,v=0,C=[];e.exports=function(e,t){t=t||{},"undefined"==typeof t.singleton&&(t.singleton=f()),"undefined"==typeof t.insertAt&&(t.insertAt="bottom");var n=a(e);return s(n,t),function(e){for(var i=[],r=0;r<n.length;r++){var l=n[r],o=u[l.id];o.refs--,i.push(o)}if(e){var d=a(e);s(d,t)}for(var r=0;r<i.length;r++){var o=i[r];if(0===o.refs){for(var c=0;c<o.parts.length;c++)o.parts[c]();delete u[o.id]}}}};var b=function(){var e=[];return function(t,n){return e[t]=n,e.filter(Boolean).join("\n")}}()},function(e,t){e.exports=function(e,t,n,s){var a,i=e=e||{},r=typeof e.default;"object"!==r&&"function"!==r||(a=e,i=e.default);var l="function"==typeof i?i.options:i;if(t&&(l.render=t.render,l.staticRenderFns=t.staticRenderFns),n&&(l._scopeId=n),s){var o=l.computed||(l.computed={});Object.keys(s).forEach(function(e){var t=s[e];o[e]=function(){return t}})}return{esModule:a,exports:i,options:l}}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={props:{pageCount:{type:Number,required:!0},initialPage:{type:Number,default:0},forcePage:{type:Number},clickHandler:{type:Function,default:function(){}},pageRange:{type:Number,default:3},marginPages:{type:Number,default:1},prevText:{type:String,default:"Prev"},nextText:{type:String,default:"Next"},breakViewText:{type:String,default:"…"},containerClass:{type:String},pageClass:{type:String},pageLinkClass:{type:String},prevClass:{type:String},prevLinkClass:{type:String},nextClass:{type:String},nextLinkClass:{type:String},breakViewClass:{type:String},breakViewLinkClass:{type:String},activeClass:{type:String,default:"active"},disabledClass:{type:String,default:"disabled"},noLiSurround:{type:Boolean,default:!1},firstLastButton:{type:Boolean,default:!1},firstButtonText:{type:String,default:"First"},lastButtonText:{type:String,default:"Last"},hidePrevNext:{type:Boolean,default:!1}},data:function(){return{selected:this.initialPage}},beforeUpdate:function(){void 0!==this.forcePage&&this.forcePage!==this.selected&&(this.selected=this.forcePage)},computed:{pages:function(){var e=this,t={};if(this.pageCount<=this.pageRange)for(var n=0;n<this.pageCount;n++){var s={index:n,content:n+1,selected:n===this.selected};t[n]=s}else{for(var a=Math.floor(this.pageRange/2),i=function(n){var s={index:n,content:n+1,selected:n===e.selected};t[n]=s},r=function(e){var n={disabled:!0,breakView:!0};t[e]=n},l=0;l<this.marginPages;l++)i(l);var o=0;this.selected-a>0&&(o=this.selected-a);var d=o+this.pageRange-1;d>=this.pageCount&&(d=this.pageCount-1,o=d-this.pageRange+1);for(var c=o;c<=d&&c<=this.pageCount-1;c++)i(c);o>this.marginPages&&r(o-1),d+1<this.pageCount-this.marginPages&&r(d+1);for(var u=this.pageCount-1;u>=this.pageCount-this.marginPages;u--)i(u)}return t}},methods:{handlePageSelected:function(e){this.selected!==e&&(this.selected=e,this.clickHandler(this.selected+1))},prevPage:function(){this.selected<=0||(this.selected--,this.clickHandler(this.selected+1))},nextPage:function(){this.selected>=this.pageCount-1||(this.selected++,this.clickHandler(this.selected+1))},firstPageSelected:function(){return 0===this.selected},lastPageSelected:function(){return this.selected===this.pageCount-1||0===this.pageCount},selectFirstPage:function(){this.selected<=0||(this.selected=0,this.clickHandler(this.selected+1))},selectLastPage:function(){this.selected>=this.pageCount-1||(this.selected=this.pageCount-1,this.clickHandler(this.selected+1))}}}},function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.noLiSurround?n("div",{class:e.containerClass},[e.firstLastButton?n("a",{class:[e.pageLinkClass,e.firstPageSelected()?e.disabledClass:""],attrs:{tabindex:"0"},domProps:{innerHTML:e._s(e.firstButtonText)},on:{click:function(t){e.selectFirstPage()},keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13)?void e.selectFirstPage():null}}}):e._e(),e._v(" "),e.firstPageSelected()&&e.hidePrevNext?e._e():n("a",{class:[e.prevLinkClass,e.firstPageSelected()?e.disabledClass:""],attrs:{tabindex:"0"},domProps:{innerHTML:e._s(e.prevText)},on:{click:function(t){e.prevPage()},keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13)?void e.prevPage():null}}}),e._v(" "),e._l(e.pages,function(t){return[t.breakView?n("a",{class:[e.pageLinkClass,e.breakViewLinkClass,t.disabled?e.disabledClass:""],attrs:{tabindex:"0"}},[e._t("breakViewContent",[e._v(e._s(e.breakViewText))])],2):t.disabled?n("a",{class:[e.pageLinkClass,t.selected?e.activeClass:"",e.disabledClass],attrs:{tabindex:"0"}},[e._v(e._s(t.content))]):n("a",{class:[e.pageLinkClass,t.selected?e.activeClass:""],attrs:{tabindex:"0"},on:{click:function(n){e.handlePageSelected(t.index)},keyup:function(n){return"button"in n||!e._k(n.keyCode,"enter",13)?void e.handlePageSelected(t.index):null}}},[e._v(e._s(t.content))])]}),e._v(" "),e.lastPageSelected()&&e.hidePrevNext?e._e():n("a",{class:[e.nextLinkClass,e.lastPageSelected()?e.disabledClass:""],attrs:{tabindex:"0"},domProps:{innerHTML:e._s(e.nextText)},on:{click:function(t){e.nextPage()},keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13)?void e.nextPage():null}}}),e._v(" "),e.firstLastButton?n("a",{class:[e.pageLinkClass,e.lastPageSelected()?e.disabledClass:""],attrs:{tabindex:"0"},domProps:{innerHTML:e._s(e.lastButtonText)},on:{click:function(t){e.selectLastPage()},keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13)?void e.selectLastPage():null}}}):e._e()],2):n("ul",{class:e.containerClass},[e.firstLastButton?n("li",{class:[e.pageClass,e.firstPageSelected()?e.disabledClass:""]},[n("a",{class:e.pageLinkClass,attrs:{tabindex:e.firstPageSelected()?-1:0},domProps:{innerHTML:e._s(e.firstButtonText)},on:{click:function(t){e.selectFirstPage()},keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13)?void e.selectFirstPage():null}}})]):e._e(),e._v(" "),e.firstPageSelected()&&e.hidePrevNext?e._e():n("li",{class:[e.prevClass,e.firstPageSelected()?e.disabledClass:""]},[n("a",{class:e.prevLinkClass,attrs:{tabindex:e.firstPageSelected()?-1:0},domProps:{innerHTML:e._s(e.prevText)},on:{click:function(t){e.prevPage()},keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13)?void e.prevPage():null}}})]),e._v(" "),e._l(e.pages,function(t){return n("li",{class:[e.pageClass,t.selected?e.activeClass:"",t.disabled?e.disabledClass:"",t.breakView?e.breakViewClass:""]},[t.breakView?n("a",{class:[e.pageLinkClass,e.breakViewLinkClass],attrs:{tabindex:"0"}},[e._t("breakViewContent",[e._v(e._s(e.breakViewText))])],2):t.disabled?n("a",{class:e.pageLinkClass,attrs:{tabindex:"0"}},[e._v(e._s(t.content))]):n("a",{class:e.pageLinkClass,attrs:{tabindex:"0"},on:{click:function(n){e.handlePageSelected(t.index)},keyup:function(n){return"button"in n||!e._k(n.keyCode,"enter",13)?void e.handlePageSelected(t.index):null}}},[e._v(e._s(t.content))])])}),e._v(" "),e.lastPageSelected()&&e.hidePrevNext?e._e():n("li",{class:[e.nextClass,e.lastPageSelected()?e.disabledClass:""]},[n("a",{class:e.nextLinkClass,attrs:{tabindex:e.lastPageSelected()?-1:0},domProps:{innerHTML:e._s(e.nextText)},on:{click:function(t){e.nextPage()},keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13)?void e.nextPage():null}}})]),e._v(" "),e.firstLastButton?n("li",{class:[e.pageClass,e.lastPageSelected()?e.disabledClass:""]},[n("a",{class:e.pageLinkClass,attrs:{tabindex:e.lastPageSelected()?-1:0},domProps:{innerHTML:e._s(e.lastButtonText)},on:{click:function(t){e.selectLastPage()},keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13)?void e.selectLastPage():null}}})]):e._e()],2)},staticRenderFns:[]}}])});
},{}]},{},[2])

//# sourceMappingURL=maps/index.js.map
