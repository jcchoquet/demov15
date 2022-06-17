from odoo import fields, models


class ProductAttribute(models.Model):
    _inherit = 'product.attribute'

    display_type = fields.Selection(
        selection_add=[('thumbnail', 'Thumbnail')],
        ondelete={'thumbnail': lambda recs: recs.write({'display_type': 'radio'})})


class ProductAttributeValue(models.Model):
    _name = 'product.attribute.value'

    _inherit = ['product.attribute.value', 'image.mixin']

    legend = fields.Text(translate=True)


class ProductTemplateAttributeValue(models.Model):
    _inherit = 'product.template.attribute.value'

    def get_linked_product_name(self):
        self.ensure_one()
        if self.ptav_product_variant_ids and len(self.ptav_product_variant_ids) == 1:
            return self.ptav_product_variant_ids.default_code or self.ptav_product_variant_ids.name
        return ''
