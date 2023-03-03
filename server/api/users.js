const router = require("express").Router();
const {
  models: { User, Product, Order, OrderItems },
} = require("../db");

// GET /api/users
router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      order: ["id"],
      attributes: ["id", "username", "email", "address", "imgUrl"],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

// GET /api/users/:id
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, {
      attributes: ["id", "username", "email", "address", "imgUrl"],
    });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

// PUT /api/users/:id/edit
router.put("/:id/edit", async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, {
      attributes: ["id", "username", "email", "address", "imgUrl"],
    });
    user.set(req.body);
    await user.save();
    res.json(user);
  } catch (err) {
    console.error(err.message);
    next(err);
  }
});

// DELETE /api/users/:id
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, {
      attributes: ["id", "username", "email", "address", "imgUrl"],
    });
    await user.destroy();
    res.json(user);
  } catch (err) {
    console.error(err.message);
    next(err);
  }
});

// GET /api/users/:id/cart
router.get("/:id/cart", async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, {
      attributes: ["id", "username", "email", "address", "imgUrl"],
    });
    const order = await Order.findOne({
      where: {
        userId: user.id,
      },
      include: [OrderItems],
    });
    res.json(order);
  } catch (error) {
    next(error);
  }
});

// POST /api/users/:id/cart
router.post("/:id/cart", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { productId, quantity } = req.body;
    const user = await User.findByPk(id);
    const order = await Order.findOrCreate({
      where: { userId: user.id, isFulfilled: false },
      defaults: { total: 0 },
    });
    const [orderItem] = await OrderItems.findOrCreate({
      where: { orderId: order.id, productId },
      defaults: { price: 0, quantity },
    });
    if (!orderItem.isNewRecord) {
      orderItem.quantity += quantity;
      await orderItem.save();
    }
    const updatedOrder = await Order.findByPk(order.id, {
      include: [{ model: OrderItems, include: [{ model: Product }] }],
    });
    updatedOrder.total = updatedOrder.orderItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
    await updatedOrder.save();
    const orderData = {
      id: updatedOrder.id,
      total: updatedOrder.total,
      orderItems: updatedOrder.orderItems.map((item) => {
        const product = item.product;
        return {
          id: item.id,
          quantity: item.quantity,
          price: item.price,
          product: {
            id: product.id,
            name: product.name,
            description: product.description,
            imgUrl: product.imgUrl,
          },
        };
      }),
    };
    console.log(orderData)
    res.json(orderData);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
