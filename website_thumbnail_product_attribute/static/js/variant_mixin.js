odoo.define('website_thumbnail_product_attribute.VariantMixin', function (require) {
'use strict';

    var VariantMixin = require('sale.VariantMixin');

    // monkey patch
    // getting old functions
    const originalDisableInput = VariantMixin._disableInput;
    const originalOnChangeVariant = VariantMixin.onChangeVariant;

    VariantMixin._disableInput = function ($parent, attributeValueId, excludedBy, attributeNames, productName) {
        originalDisableInput.apply(this, [$parent, attributeValueId, excludedBy, attributeNames, productName]);
        var $input = $parent
            .find('option[value=' + attributeValueId + '], input[value=' + attributeValueId + ']');
        $input.closest('.thumbnail-item').addClass('disabled');
    };

    VariantMixin.onChangeVariant = function (ev) {
        const $currentTarget = $(ev.currentTarget);
        var $component = $(ev.currentTarget).closest('.js_product');
        if ($currentTarget.hasClass('thumbnail-item')) {
            $component.find('.thumbnail-item').removeClass('active');
            $currentTarget.addClass('active');
            $currentTarget
                .find('input.thumbnail-radio[type="radio"]')
                .prop('checked', true)
                .end();

        }
        originalOnChangeVariant.apply(this, [ev]);
    };



    _.extend(VariantMixin, {
        events: _.extend(VariantMixin.events || {}, {
            'click .thumbnail-item': 'onChangeVariant',
        }),
    });

    return VariantMixin;
});