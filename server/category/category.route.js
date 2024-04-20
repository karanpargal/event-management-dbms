const express = require("express");
const categoryRouter = express.Router();
const categoryService = require("./category.service");

categoryRouter.post("/", async (req, res) => {
  const { name, description } = req.body;
  try {
    const category = await categoryService.createCategory(name, description);
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

categoryRouter.get("/", async (req, res) => {
  try {
    const categories = await categoryService.getAllCategories();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

categoryRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    console.log("ID:", id);
    const category = await categoryService.getCategoryById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

categoryRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const categoryData = req.body;
  try {
    const category = await categoryService.updateCategoryById(id, categoryData);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

categoryRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const category = await categoryService.deleteCategoryById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = categoryRouter;
