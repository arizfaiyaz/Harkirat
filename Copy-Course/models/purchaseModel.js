const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Objectid = mongoose.Types.ObjectId;

const PurchaseSchema = new Schema({
    userId: Objectid,
    createrId: Objectid,
});

const purchaseModel = mongoose.model('purchase', PurchaseSchema);

module.exports = {
    purchaseModel,
}