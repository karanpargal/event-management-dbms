const Category = require('./category.schema');

async function createCategory(name, description) {
    try {
        const newCategory = await Category.create({ name, description });
        return newCategory;
    } catch (error) {
        throw error;
    }
}

async function getAllCategories() {
    try {
        const categories = await Category.find();
        return categories;
    } catch (error) {
        throw error;
    }
}

async function getCategoryById(id) {
    try {
        const category = await Category.findById(id);
        return category;
    } catch (error) {
        throw error;
    }
}

async function updateCategoryById(id, data) {
    try {
        const category = await Category.findByIdAndUpdate(id, data, { new: true });
        return category;
    } catch (error) {
        throw error;
    }
}

async function deleteCategoryById(id) {
    try {
        const category = await Category.findByIdAndDelete(id);
        return category;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategoryById,
    deleteCategoryById,
};
