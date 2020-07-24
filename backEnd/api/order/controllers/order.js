"use strict";

/**
 * Order.js controller
 *
 * @description: A set of functions called "actions" for managing `Order`.
 */


module.exports = {
  /**
   * Create a/an order record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    const { address, amount, dishes, city, state } = JSON.parse(
      ctx.request.body
      );
    const stripeAmount = Math.floor(amount * 100);

    // Register the order in the database
    const order = await strapi.services.order.create({
      user: ctx.state.user.id,
      amount: stripeAmount,
      address,
      dishes,
      city,
      state,
    });
    console.log("order", order)

    return order;
  },
};