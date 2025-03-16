const {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} = require("firebase/firestore");
const { db } = require("../utilities/firebase");
const catchAsync = require("../utilities/catchError");

// 🔥 Summary Table:
// Firestore Method	Purpose
// collection(db, "products")	Reference to the products collection
// doc(db, "products", id)	Reference to a single document by id
// addDoc(collection(db, "products"), data)	Adds a new document with auto-generated ID
// getDocs(collection(db, "products"))	Fetches all documents in a collection
// getDoc(doc(db, "products", id))	Fetches a single document by ID
// updateDoc(doc(db, "products", id), data)	Updates an existing document
// deleteDoc(doc(db, "products", id))	Deletes a document

// Create a new product
const createProduct = catchAsync(async (req, res, next) => {
  const ref = await addDoc(collection(db, "products"), req.body)
  res.status(201).json({ message: "Product created successfully", id: ref.id });
});

// Get all products
const getAllProducts = catchAsync(async (req, res, next) => {
 const snap = await  getDocs(collection(db, "products"))
 const products = snap.docs.map((doc) => ({ id: doc.id, ...doc.data()}));
 res.status(200).json({
  products,
 });
});

// Get a single product by ID
const getProductById = catchAsync(async (req, res, next) => {
  const ref = await getDoc(doc(db, "products", req.params.id))	;
  const product = { id: ref.id, ...ref.data() };
  res.status(200).json(product);

});

// Update a product by ID
const updateProduct = catchAsync(async (req, res, next) => {
  const ref = await updateDoc(doc(db, "products", req.params.id), req.body);
  res.status(200).json({ message: "Product updated successfully" });

  
});

// Delete a product by ID
const deleteProduct = catchAsync(async (req, res, next) => {
    const ref = await deleteDoc(doc(db, "products", req.params.id));
    res.status(200).json({ message: "Product deleted successfully" });

});

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
