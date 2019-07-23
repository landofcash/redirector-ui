<style>
    .strength-bar {
        height: 4px;
        margin-top: -2px;
    }
    .strength-bar-transition {
        height: 4px;
        margin-top: -2px;
        transition: all .3s ease;
    }

    .strength-bar.poor {
        background-color: #d9534f;
    }

    .strength-bar.weak {
        background-color: #f0ad4e;
    }

    .strength-bar.acceptable {
        background-color: #5bc0de;
    }

    .strength-bar.good {
        background-color: #5cb85c;
    }
</style>
<template>
    <div>
        <div class="form-group" v-bind:class="{'has-error': errors.has('input'+_uid, dataVvScope) }">
            <label :for="'input'+_uid" :class="styleLabel">{{name}}</label>
            <div :class="styleInput">
                <input v-validate="'required|zxcvbn'" :data-vv-as="name"  :data-vv-scope="dataVvScope" class="form-control" type="password" ref="'input'+_uid" :id="'input'+_uid" :name="'input'+_uid" :placeholder="name" :value="value" v-on:input="updateValue($event.target.value)" @keyup="check">
                <div :class="status" :style="{width: strength + '%'}" transition="strength-bar"></div>
                <span id="helpBlock" class="help-block" v-for="err in errors.items.filter(function(err){return err.field===pwdInputName;})">{{err.msg}}</span>                
            </div>
        </div>
        <div class="form-group" v-bind:class="{'has-error': errors.has('pwd_confirm'+_uid, dataVvScope) }">
            <label :for="'input'+_uid" :class="styleLabel">Confirm {{name}}</label>
            <div :class="styleInput">
                <input v-validate="{required:true, confirmed:value}" :data-vv-as="'Confirm '+name"  :data-vv-scope="dataVvScope" :id="pwdInputConfirmName" :name="pwdInputConfirmName" type="password" class="form-control" placeholder="Password, Again" data-vv-validate-on="blur" v-model="confirmPassword">
                <span id="helpBlock" class="help-block" v-for="err in errors.items.filter(function(err){return err.field===pwdInputConfirmName;})">{{err.msg}}</span>
            </div>
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
</script>