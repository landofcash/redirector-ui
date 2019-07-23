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
IMSVueComponents.maskedInput = maskedInput.default;
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