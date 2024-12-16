const request = require("supertest")
const app = require("../app")
const { User } = require("../models")

afterAll(function(done) {
    if (process.env.NODE_ENV === "test") {
        User.destroy({ truncate: true })
            .then((result) => {
                done()
            }).catch((err) => {
                done(err)
            });
    }
})

test('should register a new user and return 201', async () => {
    const newUser = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password123',
    };

    const response = await request(app).post('/register').send(newUser);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('message', 'User registered successfully');
    expect(response.body.user).toHaveProperty('name', newUser.name);
    expect(response.body.user).toHaveProperty('email', newUser.email);
});

test('should return 400 if password undefined', async () => {
    const invalidUser = {
      email: 'johndoe@example.com', // Missing name and password
    };

    const response = await request(app).post('/register').send(invalidUser);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'All fields are required');
});

test('should return 400 if email null', async () => {
    const invalidUser = {
      email: null, // Missing name and password
      password: "qwerty"
    };

    const response = await request(app).post('/register').send(invalidUser);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'All fields are required');
});