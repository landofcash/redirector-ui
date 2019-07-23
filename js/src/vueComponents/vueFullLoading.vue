<template>
    <transition
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut"
    >
        <div v-if="showing" :class="{'white-overlay': overlay}">
            <div class="loader-wrapper">
                <div class="pulled-left" style="padding: 10px 20px">{{label}}</div>
                <div class="wrapper">
                    <div class="spinner-container">
                        <i class="fa fa-spinner fa-spin fa-3x fa-fw" style="font-size: 30px;"></i>
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    module.exports = {
        props: {
            label: {
                default: 'Loading...'
            },
            show: {
                default: false
            },
            overlay: {
                default: true
            },
            // central event bus
            eventBus: {
                default: null
            },
            eventShow: {
                default: 'show-full-loading'
            },
            eventHide: {
                default: 'hide-full-loading'
            }
        },
        data:function() {
            return {
                showing: false
            }
        },
        watch: {
            show:function(val){
                this.showing = val;
            }
        },
        methods: {
            showMe: function() {
                this.showing = true
            },
            hideMe: function() {
                this.showing = false
            },
            // Register eventBus methods.
            registerBusMethods: function()
            {
                this.eventBus.$on(this.eventShow, this.showMe);
                this.eventBus.$on(this.eventHide, this.hideMe);
            }
        },
        mounted: function () {
            // If event bus, register methods.
            if (this.eventBus) {
                this.registerBusMethods();
            }
        }
    }
</script>
<style scoped>
    .white-overlay {
        background-color: rgba(255, 255, 255, 0.75);
        z-index: 9999;
        top: 0;
        left: 0;
        height: 100vh;
        width: 100vw;
        position: fixed;
        margin: 0;
    }

    .loader-wrapper {
        position: absolute;
        display: inline-block;
        right: 50vw;
        bottom: 50vh;
    }

    .pulled-left {
        float: left;
    }

    *, *:before, *:after {
        box-sizing: border-box;
    }

    .wrapper {
        position: relative;
        display: inline-block;
        width: 40px;
        height: 40px;
        font-size: 0;
    }

    .spinner-container {
        width: 100%;
        height: 100%;
        animation: container-rotate 1568ms linear infinite;
        -webkit-animation: container-rotate 1568ms linear infinite;
    }
</style>