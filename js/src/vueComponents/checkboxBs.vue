<template>
    <div class="form-group">
        <div :class="styleLabel">
            <label><input type="checkbox" :id="'input'+_uid" :name="'input'+_uid" :checked="value" v-on:change="updateValue($event.target.checked)"><span>{{name}}</span></label>
        </div>
    </div>
</template>

<script>
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
</script>