<template>
    <div class="form-group" v-bind:class="{'has-error': errors.has('input'+_uid, dataVvScope) || errors.has('input2'+_uid, dataVvScope) }">
        <label :for="'input'+_uid" :class="styleLabel">{{name}}</label>
        <div :class="styleInput">
            <div class="input-group" v-if="required">
                <masked-input v-validate="validateRules"
                              data-vv-delay="500"
                              :mask="[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]"
                              :guide="true"
                              placeholderChar="#"
                              :keepCharPositions="true"
                              :data-vv-as="name"
                              :data-vv-scope="dataVvScope"
                              class="form-control"
                              type="text"
                              ref="input"
                              :id="'input'+_uid"
                              :name="'input'+_uid"
                              :placeholder="'From'"
                              :value="value"
                              v-on:input="updateFrom($event)">
                </masked-input>
                <span class="input-group-addon" id="basic-addon1"><span class="glyphicon glyphicon-asterisk" title="Required Field" aria-hidden="true"></span></span>                
            </div>
            <masked-input v-validate="validateRules"
                          data-vv-delay="500"
                          :mask="[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]"
                          :guide="true"
                          placeholderChar="#"
                          :keepCharPositions="true"
                          :data-vv-as="name"
                          :data-vv-scope="dataVvScope"
                          class="form-control"
                          type="text"
                          ref="input"
                          :id="'input'+_uid"
                          :name="'input'+_uid"
                          :placeholder="'From'"
                          :value="value"
                          v-on:input="updateFrom($event)"
                          v-if="!required">
            </masked-input>            
            <span id="helpBlock" class="help-block" v-for="err in errors.items.filter(function(err){return err.field==='input'+_uid;})">{{err.msg}}</span>
        </div>
        <div :class="styleInput">
            <div class="input-group" v-if="required">                
                <masked-input v-validate="validateRules"
                              data-vv-delay="500"
                              :mask="[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]"
                              :guide="true"
                              placeholderChar="#"
                              :keepCharPositions="true"
                              :data-vv-as="name"
                              :data-vv-scope="dataVvScope"
                              class="form-control"
                              type="text"
                              ref="input2"
                              :id="'input2'+_uid"
                              :name="'input2'+_uid"
                              :placeholder="'To'"
                              :value="valueTo"
                              v-on:input="updateTo($event)">
                </masked-input>
                <span class="input-group-addon" id="basic-addon1"><span class="glyphicon glyphicon-asterisk" title="Required Field" aria-hidden="true"></span></span>
            </div>            
            <masked-input v-validate="validateRules"
                          data-vv-delay="500"
                          :mask="[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]"
                          :guide="true"
                          placeholderChar="#"
                          :keepCharPositions="true"
                          :data-vv-as="name"
                          :data-vv-scope="dataVvScope"
                          class="form-control"
                          type="text"
                          ref="input2"
                          :id="'input2'+_uid"
                          :name="'input2'+_uid"
                          :placeholder="'To'"
                          :value="valueTo"
                          v-on:input="updateTo($event)"
                          v-if="!required">
            </masked-input>
            <span id="helpBlock" class="help-block" v-for="err in errors.items.filter(function(err){return err.field==='input2'+_uid;})">{{err.msg}}</span>
        </div>
    </div>
</template>

<script>
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
</script>