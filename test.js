const paypal = require('@paypal/checkout-server-sdk');
  
// Creating an environment
let clientId = "<<PAYPAL-CLIENT-ID>>";
let clientSecret = "<<PAYPAL-CLIENT-SECRET>>";
// This sample uses SandboxEnvironment. In production, use LiveEnvironment
let environment = new paypal.core.SandboxEnvironment('AQGJdOFFXz5p34GQbeyUUTjfyjzl0uFmpIu4pR4xY0tFun_eM09sdtcXEmjDr3_DLa8qyGSB5ASKvOgT', 'EBp674Bz9Yh8P2XC-314Gc9Z1CldCatR3If180NuMLbAagFB3ZXJ5ht2KZgdP4LL9vYaPkJEDQkGaIeY');
let client = new paypal.core.PayPalHttpClient(environment);

// Construct a request object and set desired parameters
// Here, OrdersCreateRequest() creates a POST request to /v2/checkout/orders
let request = new paypal.orders.OrdersCreateRequest();
request.requestBody({
                          "intent": "CAPTURE",
                          "purchase_units": [
                              {
                                  "amount": {
                                      "currency_code": "USD",
                                      "value": "100.00"
                                  }
                              }
                           ]
                    });

// Call API with your client and get a response for your call
let createOrder  = async function(){
        let response = await client.execute(request);
        console.log(`Response: ${JSON.stringify(response)}`);
        // If call returns body in response, you can get the deserialized version from the result attribute of the response.
       console.log(`Order: ${JSON.stringify(response.result)}`);
}
createOrder();