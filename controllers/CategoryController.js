const Categories = require('../models/Categories');

async function createCategory(data) {
    try {
        const category = new Categories(data);
        const saveCate = await category.save()
        const returnCate = await saveCate.populate({ path: 'parent_id', select: 'name' });
        console.log(returnCate);
        return returnCate;
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
        const result = await category.set(data).populate({ path: 'parent_id', select: 'name' });
        console.log(result);
        return result;
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
        const categories = await Categories.find().populate({ path: 'parent_id', select: 'name' });
        // console.log(categories);
        return categories;
    } catch (error) {
        console.log(error);
    }
    return null;
}

async function getCategoryNoneParent() {
    try {
        const categories = await Categories.find({ parent_id: null });
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
    getAllCategory,
    getCategoryNoneParent
}