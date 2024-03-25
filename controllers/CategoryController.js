const Categories = require('../models/Categories');

async function createCategory(data) {
    try {
        const category = new Categories(data);
        await category.save();
        return category;
    }
    catch (error) {
        console.log(error);
    }
    return null;
}

async function updateCategory(id, data) {
    try {
        const category = await Categories.findOne({ _id: id });
        if (!category) {
            throw new Error('Category not found');
        }
        category.set(data);
        await category.save();
        return category;
    } catch (error) {
        console.log(error);
    }
    return null;
}

async function deleteCategory(id) {
    try {
        const category = await Categories.findOne({ _id: id });
        if (!category) {
            return null;
        }
        await category.deleteOne();
        return true;
    } catch (error) {
        console.log(error);
    }
    return null;
}

async function getAllCategory() {
    try {
        const categories = await Categories.find({ parrent_id: null });
        return categories;
    } catch (error) {
        console.log(error);
    }
    return null;
}

module.exports = {
    createCategory,
    updateCategory,
    deleteCategory,
    getAllCategory
}