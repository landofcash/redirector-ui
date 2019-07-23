<template>
    <div class="form-group" v-bind:class="{'has-error': errors.has('input'+_uid, dataVvScope) }">
        <label :for="'input'+_uid" :class="styleLabel">{{name}}</label>
        <div :class="styleInput">
            <div class="input-group" v-if="required">
                <input v-validate="validateRules" :data-vv-as="name" :data-vv-scope="dataVvScope" class="form-control" type="number" ref="input" :id="'input'+_uid" :name="'input'+_uid" :placeholder="name" :value="value" @input="updateValue($event.target.value)">
                <span class="input-group-addon" id="basic-addon1"><span class="glyphicon glyphicon-asterisk" title="Required Field" aria-hidden="true"></span></span>
            </div>
            <input v-validate="validateRules" :data-vv-as="name" :data-vv-scope="dataVvScope" class="form-control" type="number" ref="input" :id="'input'+_uid" :name="'input'+_uid" :placeholder="name" :value="value" @input="updateValue($event.target.value)" v-if="!required">
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
</script>