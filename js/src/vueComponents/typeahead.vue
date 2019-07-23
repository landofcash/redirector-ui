<template>
    <div class="form-group" v-bind:class="{'has-error': errors.has('typeahead'+_uid, dataVvScope)||errors.has('typeahead-validate-'+_uid, dataVvScope) }">
        <label :for="'typeahead'+_uid" :class="styleLabel">{{name}}</label>
        <div :class="styleInput">
            <div class="input-group" v-if="required">
                <input v-validate="validateRules" :data-vv-as="name" :data-vv-scope="dataVvScope"  class="form-control" type="text" ref="input" :id="'typeahead'+_uid" :name="'typeahead'+_uid" :placeholder="name" :value="value.Name" v-on:input="onInput($event.target.value)" v-on:blur="onBlur()">
                <span class="input-group-addon" id="basic-addon1"><span class="glyphicon glyphicon-asterisk" title="Required Field" aria-hidden="true"></span></span>
            </div>
            <input v-validate="validateRules" :data-vv-as="name" :data-vv-scope="dataVvScope"  class="form-control" type="text" ref="input" :id="'typeahead'+_uid" :name="'typeahead'+_uid" :placeholder="name" :value="value.Name" v-on:input="onInput($event.target.value)" v-if="!required"  v-on:blur="onBlur()">
            <input type="hidden" v-validate="validateRules" :value="value.Id" :id="'typeahead-validate-'+_uid" :name="'typeahead-validate-'+_uid" />            
            <span id="helpBlock" class="help-block" :data-vv-as="name+' Id '" v-for="err in errors.items.filter(function(err){return err.field==='typeahead-validate-'+_uid;})">Select an item from the list.</span>
            <span id="helpBlock" class="help-block" v-for="err in errors.items.filter(function(err){return err.field==='typeahead'+_uid;})">{{err.msg}}</span>
            <span v-show="isLoading" style="position:absolute; background-color:white; border:solid 1px #cccccc; padding:5px; z-index:1000;">...loading...</span>
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
</script>