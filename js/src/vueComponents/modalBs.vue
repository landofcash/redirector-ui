<template>
    <div class="modal fade" tabindex="-1" role="dialog" :id="'modal'+_uid">
        <div class="modal-dialog" :style="'width:'+width" role="document">
            <div class="modal-content"  >
                <div :class="'modal-header modal-header-'+headerClass">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title">{{header}}</h4>
                </div>
                <div class="modal-body">                    
                    <div v-html="message"></div>
                </div>
                <div class="modal-footer">
                    <slot name="footer">
                        <button type="button" class="btn btn-info" v-on:click="hide()">Close</button>
                    </slot>                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    module.exports = {
        data: function () {
            return {
                message: '',
                header: '',                
                width: '50%',
                headerClass: 'info'
            }            
        },
        methods: {
            show: function (message, header, width, headerClass) {
                this.message = message;
                this.header = header || 'Message';                
                this.width = width || '50%';
                this.headerClass = headerClass || 'info';
                $('#modal' + this._uid).modal('show');
            },
            hide: function () {
                $('#modal' + this._uid).modal('hide');
            }
        }
    }
</script>