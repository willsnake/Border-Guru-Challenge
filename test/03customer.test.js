require('dotenv').config();
const faker = require('faker');
const Order = require('../models/order-model')();
const Customer = require('../models/customer-model')();
const Address = require('../models/address-model')();
const Item = require('../models/item-model')();
const request = require('supertest');
const app = require('../server');

describe('Customers', () => {

    beforeAll(async () => {
        orders = await Order.find();
        customers = await Customer.find();
        addresses = await Address.find();
        items = await Item.find();
    });

    it('should get info from a specific customer', async done => {
        const res = await request(app)
            .get(`/customers/info/${customers[0]._id}`)
            .expect('Content-Type', /json/)
            .expect(200);
        const {
            customer
        } = res.body;
        expect(customer).not.toBeNull();
        done();
    });

    it('should update the info from a specific customer', async done => {
        const res = await request(app)
            .put(`/customers/info/${customers[0]._id}`)
            .send({
                email: faker.internet.email(),
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName(),
                addressId: addresses[0]._id,
            })
            .expect('Content-Type', /json/)
            .expect(200);
        const {
            customer
        } = res.body;
        const customerDatabase = await Customer.findById(customer._id).lean();
        expect(JSON.stringify(customer)).not.toEqual(JSON.stringify(customerDatabase));
        done();
    });

    it('should delete a customer', async done => {
        const res = await request(app)
            .delete(`/customers/info/${customers[0]._id}`)
            .expect('Content-Type', /json/)
            .expect(200);
        const customerDatabase = await Customer.findById(customers[0]._id).lean();
        expect(customerDatabase).toBeNull();
        done();
    });

    it('should get all orders from a customer', async done => {
        const res = await request(app)
            .get(`/customers/${customers[1]._id}/orders`)
            .expect('Content-Type', /json/)
            .expect(200);
        const {
            orders
        } = res.body;
        expect(orders).not.toBeNull();
        expect(orders).not.toBe([]);
        done();
    });
});