const responseUtils = require('../utils/responseUtils');
const productModel = require('../models/productModel');

const addProduct = async (req, res) => {
  try {
    const userId = req.user.id;
    const { product_name, product_desc, price } = req.body;

    await productModel.addProduct(userId, product_name, product_desc, price);

    return responseUtils.sendSuccess(res, 'Produk berhasil ditambahkan');
  } catch (error) {
    console.error(error);
    return responseUtils.sendError(res, 500, 'Gagal menambahkan produk');
  }
};

module.exports = {
  addProduct,
};