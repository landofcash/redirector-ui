<template>
    <div class="form-group" v-bind:class="{'has-error': errors.has('input'+_uid, dataVvScope) }">
        <label :for="'input'+_uid" :class="styleLabel">{{name}}</label>
        <div :class="styleInput">
            <div class="input-group" v-if="required">
                <input v-validate="validateRules" :data-vv-as="name" :data-vv-scope="dataVvScope"  class="form-control" type="text" ref="input" :id="'input'+_uid" :name="'input'+_uid" :placeholder="name" :value="value" v-on:input="updateValue($event.target.value)">
                <span class="input-group-addon" id="basic-addon1"><span class="glyphicon glyphicon-asterisk" title="Required Field" aria-hidden="true"></span></span>
            </div>
            <input v-validate="validateRules" :data-vv-as="name"  :data-vv-scope="dataVvScope"  class="form-control" type="text" ref="input" :id="'input'+_uid" :name="'input'+_uid" :placeholder="name" :value="value" v-on:input="updateValue($event.target.value)" v-if="!required">
            <span id="helpBlock" class="help-block" v-for="err in errors.items.filter(function(err){return err.field==='input'+_uid;})">{{err.msg}}</span>
        </div>
    </div>
</template>

<script>    
    module.exports = 
            {
                inject: ['$validator'],
                template: '#addressSuggestBs',
                data: function () {
                    return {
                        googleAddress: {
                            street_number: null,
                            street_name: null,
                            city: null,
                            state: null,
                            zipcode: null,
                            country: null,
                            url: null,
                            autocomplete: null,
                            resetAddress: function () {
                                this.street_number = null;
                                this.street_name = null;
                                this.city = null;
                                this.state = null;
                                this.zipcode = null;
                                this.country = null;
                                this.url = null;
                            }

                        }
                    }
                },
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
                    //get DOM input element where users will start typing addresses
                    var inputElement = document.getElementById('input' + this._uid);

                    //create new google maps object
                    this.googleAddress.autocomplete = new google.maps.places.Autocomplete(inputElement, { types: ['geocode'] });

                    //add event listener to trigger method getAddressComponents when user select an address
                    this.googleAddress.autocomplete.addListener('place_changed', this.getAddressComponents);
                },
                methods: {
                    updateValue: function (value) {
                        this.$emit('input', value);
                    },
                    getAddressComponents: function () {
                        var me = this;
                        this.googleAddress.resetAddress();
                        // Get the place details from the autocomplete object.
                        var place = this.googleAddress.autocomplete.getPlace();
                        console.log(place);
                        // Get each component of the address from the place details
                        for (var i = 0; i < place.address_components.length; i++) {
                            var addressType = place.address_components[i].types[0];
                            switch (addressType) {
                                case 'street_number':
                                    this.googleAddress.street_number = place.address_components[i]['short_name'];
                                    break;
                                case 'route':
                                    this.googleAddress.street_name = place.address_components[i]['short_name'];
                                    break;
                                case 'locality':
                                    this.googleAddress.city = place.address_components[i]['long_name'];
                                    break;
                                case 'administrative_area_level_1':
                                    this.googleAddress.state = place.address_components[i]['short_name'];
                                    break;
                                case 'postal_code':
                                    this.googleAddress.zipcode = place.address_components[i]['short_name'];
                                    break;
                                case 'country':
                                    this.googleAddress.country = place.address_components[i]['short_name'];
                                    break;
                            }
                        }
                        // Result MUST have a street_number
                        var street_number = this.googleAddress.street_number;
                        if (!street_number || street_number === '') {
                            // HERE'S THE HACK:
                            // Sometimes Google doesn't return street_number field, but address is correct in the auto-completer
                            // Use the value from autocomplete to get the street address
                            street_number = me.value.split(' ')[0];
                        }
                        else {
                            // has street number, append route for full street address
                            //street_number += this.googleAddress.street_number; //' ' + find('route');
                        }

                        // Trim street address
                        street_number = $.trim(street_number);

                        this.googleAddress.street = ((street_number || '') + ' ' + (this.googleAddress.street_name || '')).trim();

                        this.googleAddress.url = place.url;
                        this.$emit('update', this.googleAddress);
                    }
                }
            }
</script>