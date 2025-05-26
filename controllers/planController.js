const Plan = require('../models/Plan');

exports.createPlan = async (req, res) => {
  try {
    const { productId, name, price, features } = req.body;
    const plan = new Plan({ productId, name, price, features });
    await plan.save();
    res.status(201).json({ message: 'Plan created successfully', plan });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getPlanByProduct = async (req, res) => {
  try {
    const plans = await Plan.find({ productId: req.params.productId });
    res.json(plans);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
