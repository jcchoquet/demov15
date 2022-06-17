odoo.define('website_thumbnail_product_attribute.website_sale', function (require) {
'use strict';


    require('website_sale.website_sale');
    var publicWidget = require('web.public.widget');
    var VariantMixin = require('website_thumbnail_product_attribute.VariantMixin');
    publicWidget.registry.WebsiteSale.include({

        onChangeVariant: function (ev) {
            var result = VariantMixin.onChangeVariant.apply(this, arguments);
            var $component = $(ev.currentTarget).closest('.js_product');
            $component.find('input:not(.thumbnail-radio)').each(function () {
                var $el = $(this);
                $el.attr('checked', $el.is(':checked'));
            });
            $component.find('select option').each(function () {
                var $el = $(this);
                $el.attr('selected', $el.is(':selected'));
            });

            this._setUrlHash($component);
            return result;
        },

        _updateProductImage: function ($productContainer, displayImage, productId, productTemplateId, newCarousel, isCombinationPossible) {
            this._super(...arguments);
            const $component = $('.js_product');
            const $productId = $component.find('input[name="product_id"]');
            const $connectionBloc = this.$el.find('.connect-for-prices-bloc');
            if ($productId && $productId[0].value && $connectionBloc.length) {
                const $chosenThumbnail = $component.find('input.thumbnail-radio:checked');
                $connectionBloc.find('.label1')[0].innerHTML = $chosenThumbnail.attr('data-value_name');
                $connectionBloc.find('.label2')[0].innerHTML = $chosenThumbnail.attr('product-name');
                var href = '#';
                if ($component.find('.css_not_available_msg').is(":hidden")) {
                    href = '/web/login?redirect=' + location;
                }
                $connectionBloc.find('a').attr('href', href);
            }
        },

        _applyHash: function () {
            this._super(...arguments);
            var hash = window.location.hash.substring(1);
            if (hash) {
                var params = $.deparam(hash);
                if (params['attr']) {
                    var attributeIds = params['attr'].split(',');
                    var $inputs = this.$('input.js_variant_change, select.js_variant_change option');
                    _.each(attributeIds, function (id) {
                        var $toSelect = $inputs.filter('[data-value_id="' + id + '"]');
                        if ($toSelect.is('input[type="radio"]')) {
                            $toSelect.prop('checked', true);
                            if ($toSelect.hasClass('thumbnail-radio')) {
                                $toSelect
                                    .closest('.js_product')
                                    .find('.thumbnail-item')
                                    .removeClass('active')
                                    .end();
                                $toSelect.closest('.thumbnail-item').addClass('active')
                            }
                        }
                    });
                }
            }
        },
    });

});