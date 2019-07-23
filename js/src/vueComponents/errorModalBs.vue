<template>
    <div class="modal fade" tabindex="-1" role="dialog" :id="'errorModal'+_uid">
        <div class="modal-dialog" style="width:80%;" role="document">
            <div class="modal-content"  >
                <div class="modal-header modal-header-danger">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title">{{header}}</h4>
                </div>
                <div class="modal-body">
                    <iframe  v-show="isHtml" :id="'errorIframe'+_uid" style="width:100%; height:500px;"></iframe>
                    <div  v-show="!isHtml">{{message}}</div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-info" v-on:click="hide()">Close</button>
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
                isHtml:false
            }            
        },
        methods: {
            show: function (message, header, isHtml) {
                this.message = message;
                this.header = header || 'Error Message';
                this.isHtml = isHtml==true;
                if (isHtml) { //set iframe
                    var iframe = $('#errorIframe' + this._uid);
                    var iFrameDoc = iframe[0].contentDocument || iframe[0].contentWindow.document;
                    iFrameDoc.write(message);
                    iFrameDoc.close();
                }

                $('#errorModal' + this._uid).modal('show');
            },
            hide: function () {
                $('#errorModal' + this._uid).modal('hide');
            }
        }
    }
</script>