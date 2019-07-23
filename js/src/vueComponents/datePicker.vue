<template>
    <div class="form-group" v-bind:class="{'has-error': errors.has('input'+_uid, dataVvScope) }">
        <label :for="'input'+_uid" :class="styleLabel">{{name}}</label>
        <div :class="styleInput">
            <div class="input-group" v-if="required">
                <masked-input 
                    v-validate="validateRules" 
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
                    :placeholder="name" 
                    :value="value" 
                    v-on:input="updateValue($event)"
                >
                </masked-input>
                <span class="input-group-addon" id="basic-addon1"><span class="glyphicon glyphicon-asterisk" title="Required Field" aria-hidden="true"></span></span>
            </div>
            <masked-input 
                v-validate="validateRules"
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
                :placeholder="name" 
                :value="value" 
                v-on:input="updateValue($event)"
                v-if="!required">
            </masked-input>
            <span id="helpBlock" class="help-block" v-for="err in errors.items.filter(function(err){return err.field==='input'+_uid;})">{{err.msg}}</span>            
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
</script>