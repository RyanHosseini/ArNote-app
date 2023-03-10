import axios from "axios";
// All requests goes here

const SERVER_URL = "https://notesapi.arianh.ir";

// @desc Get All Notes
// @route GET http://localhost:9000/notes
export const getAllNotes = () => {
	const URL = `${SERVER_URL}/notes`;
	return axios.get(URL);
};

// @desc Get Note with note ID
// @route GET http://localhost:9000/notes/:noteId
export const getNote = (noteId) => {
	const URL = `${SERVER_URL}/notes/${noteId}`;
	return axios.get(URL);
};

// @desc Get All Categories
// @route GET http://localhost:9000/categories
export const getAllCategories = () => {
	const URL = `${SERVER_URL}/categories`;
	return axios.get(URL);
};

// @desc Get Note with note ID
// @route GET http://localhost:9000/categories/:categoryId
export const getCategory = (categoryId) => {
	const URL = `${SERVER_URL}/categories/${categoryId}`;
	return axios.get(URL);
};

// @desc Add a new category
// @route POST http://localhost:9000/categories
export const addCategory = (category) => {
	const URL = `${SERVER_URL}/categories`;
	return axios.post(URL, category);
};

// @desc Edit a category
// @route PUT http://localhost:9000/categories
export const editCategory = (category, categoryId) => {
	const URL = `${SERVER_URL}/categories/${categoryId}`;
	return axios.put(URL, category);
};

// @desc Delete a category
// @route DELETE http://localhost:9000/categories/:categoryId
export const deleteCategory = (categoryId) => {
	const URL = `${SERVER_URL}/categories/${categoryId}`;
	return axios.delete(URL);
};

// @desc Add a new note
// @route POST http://localhost:9000/notes
export const addNote = (note) => {
	const URL = `${SERVER_URL}/notes`;
	return axios.post(URL, note);
};

// @desc Edit a note
// @route PUT http://localhost:9000/notes
export const editNote = (note, noteId) => {
	const URL = `${SERVER_URL}/notes/${noteId}`;
	return axios.put(URL, note);
};

// @desc Delete a note
// @route DELETE http://localhost:9000/notes/:noteId
export const deleteNote = (noteId) => {
	const URL = `${SERVER_URL}/notes/${noteId}`;
	return axios.delete(URL);
};
