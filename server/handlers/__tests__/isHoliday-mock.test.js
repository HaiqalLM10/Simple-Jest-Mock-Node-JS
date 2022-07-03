const httpMocks = require("node-mocks-http");
const mathHandler = require("../math.js");

test("isHoliday false", async () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2022-07-01'));
    const request = httpMocks.createRequest({
        method: "GET", 
        url: "/holiday"
    });
    const response = httpMocks.createResponse();
    await mathHandler.isHoliday(request, response);
    expect(response.statusCode).toEqual(200);
    expect(response._getJSONData()).toEqual({
        data: false, 
        error: null
    });
});

test("isHoliday true", async () => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2022-07-03'));
    const request = httpMocks.createRequest({
        method: "GET", 
        url: "/holiday"
    });
    const response = httpMocks.createResponse();
    await mathHandler.isHoliday(request, response);
    expect(response.statusCode).toEqual(200);
    expect(response._getJSONData()).toEqual({
        data: true, 
        error: null
    });
});