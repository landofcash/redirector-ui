<template>
    <div>
        <span v-if="value && !icons">Yes</span>
        <span v-if="!value && !icons">No</span>
        <span v-if="value && icons" class="glyphicon glyphicon-ok" style="color:forestgreen"></span>
        <span v-if="!value && icons" class="glyphicon glyphicon-remove" style="color:firebrick"></span>
    </div>
</template>

<script>
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
</script>