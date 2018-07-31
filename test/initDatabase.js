const faker = require('faker');
const Address = require('../models/address-model')();
const Customer = require('../models/customer-model')();
const Item = require('../models/item-model')();
const Order = require('../models/order-model')();

module.exports = async () => {
  // Clean Database
  await Address.find({}, {
    multi: true,
  }, ).remove();
  await Customer.find({}, {
    multi: true,
  }, ).remove();
  await Item.find({}, {
    multi: true,
  }, ).remove();
  await Order.find({}, {
    multi: true,
  }, ).remove();

  for (let i = 0; i < 5; i++) {
    // Address
    let address = await Address.create({
      streetName: faker.address.streetName(),
      streetAddress: faker.address.streetAddress(),
    });

    // Item
    let item = await Item.create({
      productName: faker.commerce.productName(),
      price: faker.commerce.price(),
    });

    // Customer
    let customer = await Customer.create({
      email: faker.internet.email(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      addressId: address._id,
    });

    //Order
    await Order.create({
      customer: customer._id,
      customerAddress: address._id,
      lastName: faker.address.streetAddress(),
      addressId: address._id,
      item: item._id,
      price: item.price,
      currency: 'EUR'
    });
  }
};