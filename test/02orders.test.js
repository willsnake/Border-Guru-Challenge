require('dotenv').config();
const faker = require('faker');
const Order = require('../models/order-model')();
const Customer = require('../models/customer-model')();
const Address = require('../models/address-model')();
const Item = require('../models/item-model')();
const request = require('supertest');
const app = require('../server');

describe('Orders', () => {

  beforeAll(async () => {
    orders = await Order.find();
    customers = await Customer.find();
    addresses = await Address.find();
    items = await Item.find();
  });

  it('should get the orders from a customer', async done => {
    const res = await request(app)
      .get(`/orders/user/${customers[0]._id}`)
      .expect('Content-Type', /json/)
      .expect(200);
    const {
      orders
    } = res.body;
    expect(orders).not.toBe([]);
    done();
  });

  it('should get the address from an order', async done => {
    const res = await request(app)
      .get(`/orders/address/${addresses[0]._id}`)
      .expect('Content-Type', /json/)
      .expect(200);
    const {
      orders
    } = res.body;
    expect(orders).not.toBe([]);
    done();
  });

  it('should create a new order', async done => {
    const res = await request(app)
      .post(`/orders`)
      .send({
        customer: customers[1]._id,
        customerAddress: addresses[1]._id,
        item: items[1]._id,
        price: faker.commerce.price(),
        currency: "EUR",
      })
      .expect('Content-Type', /json/)
      .expect(200);
    const {
      order
    } = res.body;
    const orderDatabase = await Order.findById(order._id).lean();
    expect(JSON.stringify(order)).toEqual(JSON.stringify(orderDatabase));
    done();
  });

  it('should update an order', async done => {
    const res = await request(app)
      .put(`/orders/${orders[0]._id}`)
      .send({
        customer: customers[0]._id,
        customerAddress: addresses[0]._id,
        item: items[0]._id,
        price: faker.commerce.price(),
        currency: "EUR",
      })
      .expect('Content-Type', /json/)
      .expect(200);
    const {
      order
    } = res.body;
    const orderDatabase = await Order.findById(order._id).lean();
    expect(JSON.stringify(order)).not.toEqual(JSON.stringify(orderDatabase));
    done();
  });

  it('should delete an order', async done => {
    const res = await request(app)
      .delete(`/orders/${orders[0]._id}`)
      .expect('Content-Type', /json/)
      .expect(200);
    const orderDatabase = await Order.findById(orders[0]._id).lean();
    expect(orderDatabase).toBeNull();
    done();
  });

  it('should get amount from specific order', async done => {
    const res = await request(app)
      .get(`/orders/${orders[1]._id}/amount`)
      .expect('Content-Type', /json/)
      .expect(200);
    const {
      amount
    } = res.body;
    expect(amount).not.toBeNull();
    expect(amount).toBeGreaterThan(0);
    done();
  });


});