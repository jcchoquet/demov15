odoo.define('website_thumbnail_product_attribute.OptionalProductsModal', function (require) {
'use strict';

    var OptionalProductsModal = require('sale_product_configurator.OptionalProductsModal');

    OptionalProductsModal.include({
        events: _.extend(OptionalProductsModal.events || {}, {
            'click .thumbnail-item': 'onChangeVariant',
        }),
    });

});