<template>
    <div class="form-group" v-bind:class="{'has-error': errors.has('input'+_uid, dataVvScope) }">
        <label :for="'input'+_uid" :class="styleLabel">{{name}}</label>
        <div  :class="styleInput">
            <div class="input-group" v-if="required">
                <input :tabindex="tabindex" v-validate="validateRules"  :data-vv-as="name" :data-vv-scope="dataVvScope"  class="form-control" :type="inputType" ref="input" :id="'input'+_uid" :name="'input'+_uid" :placeholder="name" :value="value" v-on:input="updateValue($event.target.value)">
                <span class="input-group-addon" id="basic-addon1"><span class="glyphicon glyphicon-asterisk" title="Required Field" aria-hidden="true"></span></span>
            </div>
            <input :tabindex="tabindex" v-validate="validateRules" :data-vv-as="name" :data-vv-scope="dataVvScope"  class="form-control" :type="inputType" ref="input" :id="'input'+_uid" :name="'input'+_uid" :placeholder="name" :value="value" v-on:input="updateValue($event.target.value)" v-if="!required">
            <span id="helpBlock" class="help-block" v-for="err in errors.items.filter(function(err){return err.field==='input'+_uid;})">{{err.msg}}</span>
        </div>
    </div>
</template>

<script>
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
</script>