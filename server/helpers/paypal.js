import paypal from "@paypal/checkout-server-sdk";
import dotenv from "dotenv";
dotenv.config();

// Configure the PayPal environment
const clientId = process.env.PAYPAL_CLIENT_ID;
const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

// Initialize the PayPal SDK
const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
const client = new paypal.core.PayPalHttpClient(environment);

/**
 * Only `client` is exported. There used to be a `createOrder` here as well,
 * with the item name, price and quantity hardcoded to "Item Name", $10.00 and
 * 1 — placeholder scaffolding from setting the SDK up. Nothing ever imported
 * it: the real checkout is createOrder in
 * controllers/student-controller/order-controller.js, which prices from the
 * course. It was removed because a reader opening this file would reasonably
 * conclude the checkout charges everyone ten dollars.
 */
export { client };
