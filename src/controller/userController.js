import User from "../models/userModel.js";

export async function handleAllusers(req, res) {
  try {
    const allUsers = await User.find({});
    res.status(200).json({
      Message: "Users retrieved successfully",
      data: allUsers,
      results: "Success",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function handleSingleUser(req, res) {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.status(200).json({
      Message: "User found successfully",
      data: user,
      results: "Success",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function handleNewUser(req, res) {
  try {
    const { name, email, age, history } = req.body || {};
    if (!name || !email || !age) {
      return res
        .status(400)
        .json({ error: "Missing required fields: name, email, age" });
    }
    const initialHistory =
      Array.isArray(history) && history.length > 0
        ? history
        : [{ timestamps: Date.now() }];
    const newUser = new User({ name, email, age, history: initialHistory });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    if (err.code === 11000) {
      return res
        .status(409)
        .json({ error: "Duplicate key", details: err.keyValue });
    }
    res.status(500).json({ error: err.message });
  }
}

export async function handleUpdateUser(req, res) {
  try {
    const { id } = req.params;
    const { name, email, age, history } = req.body || {};
    const updateOps = {};
    if (name !== undefined) updateOps.name = name;
    if (email !== undefined) updateOps.email = email;
    if (age !== undefined) updateOps.age = age;

    // If history array provided in request, replace it; otherwise push a new timestamp
    if (Array.isArray(history)) {
      updateOps.history = history;
    }

    // Always push a new timestamp entry to history on update
    const updatedUser = await User.findByIdAndUpdate(
      id,
      Object.keys(updateOps).length
        ? { $set: updateOps, $push: { history: { timestamps: Date.now() } } }
        : { $push: { history: { timestamps: Date.now() } } },
      { new: true }
    );

    if (!updatedUser) return res.status(404).json({ error: "User not found" });
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function handleDeleteUser(req, res) {
  try {
    const { id } = req.params;
    const deleted = await User.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: "User not found" });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
