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
    const { name, email, age } = req.body || {};
    if (!name || !email || !age) {
      return res
        .status(400)
        .json({ error: "Missing required fields: name, email, age" });
    }
    const newUser = new User({ name, email, age });
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
    const { name, email, age } = req.body || {};
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, age },
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
