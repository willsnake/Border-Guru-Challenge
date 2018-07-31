require('dotenv').config();
const faker = require('faker');
const Order = require('../models/order-model')();
const Customer = require('../models/customer-model')();
const Address = require('../models/address-model')();
const Item = require('../models/item-model')();
const request = require('supertest');
const app = require('../server');

describe('Items', () => {

    beforeAll(async () => {
        orders = await Order.find();
        customers = await Customer.find();
        addresses = await Address.find();
        items = await Item.find();
    });

    it('should return all the customers who bought a specific item', async done => {
        const res = await request(app)
            .get(`/items/${items[0]._id}/customers`)
            .expect('Content-Type', /json/)
            .expect(200);
        const {
            customers
        } = res.body;
        expect(customers).not.toBeNull();
        expect(customers).not.toBe([]);
        done();
    });
});