# Part of Odoo. See LICENSE file for full copyright and licensing details.
{
    'name': 'Website thumbnail product attribute',
    'category': 'Website/Website',
    'sequence': 50,
    'summary': 'Adding a new type of product attributes, that allows thumbnail display',
    'website': 'https://www.odoo.com/app/ecommerce',
    'version': '1.1',
    'description': "",
    'depends': ['website_sale'],
    'data': [
        'views/product_attribute_views.xml',
        'views/shop_templates.xml',
    ],
    'license': 'LGPL-3',
    'assets': {
        'web.assets_common': [
            'website_thumbnail_product_attribute/static/src/scss/thumbnail_ptav.scss',
            'website_thumbnail_product_attribute/static/js/variant_mixin.js',
        ],
        'web.assets_backend': [
            'website_thumbnail_product_attribute/static/js/product_configurator_widget.js',
        ],
        'web.assets_frontend': [
            'website_thumbnail_product_attribute/static/js/website_sale.js',
        ],
    },
    'installable': True,
    'application': True,
    'auto_install': False,
}
