<template>
    <div class="form-group" v-bind:class="{'has-error': errors.has('input'+_uid, dataVvScope) }">
        <label :for="'input'+_uid" :class="styleLabel">{{name}}</label>
        <div :class="styleInput">
            <div v-if="required" class="input-group">
                <select :value="value" :data-vv-as="name" :data-vv-scope="dataVvScope" @change="updateValue($event.target.value)"  v-validate="'required'" class="form-control" ref="input" :id="'input'+_uid" :name="'input'+_uid">
                    <option v-for="option in options" :value="option.Value">
                        {{ option.Text }}
                    </option>
                </select>
                <span class="input-group-addon" id="basic-addon1"><span class="glyphicon glyphicon-asterisk" title="Required Field" aria-hidden="true"></span></span>
            </div>
            <select v-if="!required" :value="value" :data-vv-as="name" :data-vv-scope="dataVvScope" @change="updateValue($event.target.value)"  class="form-control" ref="input" :id="'input'+_uid" :name="'input'+_uid">
                <option value="" v-if="!emptyTitle">--- Select {{name}} ---</option>
                <option value="" v-else>{{emptyTitle}}</option>
                <option v-for="option in options" :value="option.Value" :selected="isSelected(option.Value)">{{ option.Text }}</option>
            </select>
            <span id="helpBlock" class="help-block" v-show="isValid">{{name}} is required.</span>
        </div>
    </div>
</template>

<script>    
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
</script>