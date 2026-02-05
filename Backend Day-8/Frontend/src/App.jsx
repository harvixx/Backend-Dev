import React, { useEffect, useState } from "react";
import { createProduct, deleteProduct, getProducts } from "./api/productApi";
import { motion, AnimatePresence } from "framer-motion";

const App = () => {
  /* ---------------- PRODUCTS ---------------- */
  const [Products, setProducts] = useState([]);

  useEffect(() => {
    getProducts()
      .then((res) => setProducts(res.data.Products))
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = async (id) => {
    await deleteProduct(id);
    setProducts((prev) => prev.filter((p) => p._id !== id));
  };

  /* ---------------- MODAL ---------------- */
  const [isVisible, setIsVisible] = useState(false);

  /* ---------------- IMAGE STATES ---------------- */
  const [imageType, setImageType] = useState("file"); // file | url
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };

  /* ---------------- CREATE PRODUCT ---------------- */
  async function createPro(e) {
    e.preventDefault();
    setIsVisible(false);

    const formData = new FormData();
    formData.append("productName", e.target.productName.value);
    formData.append("productDesc", e.target.productDesc.value);

    if (imageType === "file" && selectedFile) {
      formData.append("productImg", selectedFile);
    }

    if (imageType === "url" && imageUrl) {
      formData.append("productImgUrl", imageUrl);
    }

    const res = await createProduct(formData);
    setProducts((prev) => [...prev, res.data.product]);

    // reset
    setSelectedFile(null);
    setPreview(null);
    setImageUrl("");
    setImageType("file");
  }

  return (
    <div className="min-h-screen bg-neutral-900 text-white">
      {/* HEADER */}
      <div className="p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-yellow-600">Smyth Store</h1>
        <button
          onClick={() => setIsVisible(true)}
          className="bg-yellow-600 text-black px-4 py-1 rounded-xl shadow hover:brightness-110 active:scale-95 transition"
        >
          Add Item
        </button>
      </div>

      {/* PRODUCTS */}
      <section className="bg-white p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Products.map((pro) => (
          <div
            key={pro._id}
            className="bg-neutral-900 rounded-2xl p-4 border border-white/10
                       shadow-lg hover:-translate-y-1 hover:shadow-2xl
                       transition-all duration-300"
          >
            <div className="overflow-hidden rounded-xl bg-black">
              <img
                src={pro.productImg}
                alt=""
                className="w-full h-40 object-contain transition-transform duration-300 hover:scale-105"
              />
            </div>

            <h2 className="mt-3 font-semibold">{pro.productName}</h2>
            <p className="text-sm text-neutral-400">{pro.productDesc}</p>

            <button
              onClick={() => handleDelete(pro._id)}
              className="mt-3 w-full bg-yellow-600 text-black rounded py-1 active:scale-95 transition"
            >
              Remove
            </button>
          </div>
        ))}
      </section>

      {/* MODAL */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
              initial={{ scale: 0.9, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 30, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              <div className="bg-yellow-50 p-6 border-b">
                <h2 className="text-xl font-bold text-yellow-800 text-center">
                  Add New Product
                </h2>
              </div>

              <form onSubmit={createPro} className="p-6 flex flex-col gap-4">
                <input
                  name="productName"
                  placeholder="Product Name"
                  required
                  className="border p-3 rounded text-black"
                />

                <textarea
                  name="productDesc"
                  placeholder="Description"
                  required
                  className="border p-3 rounded text-black"
                />

                {/* IMAGE TYPE */}
                <div className="flex gap-2 bg-gray-100 p-1 rounded-full">
                  {["file", "url"].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setImageType(t)}
                      className={`px-4 py-1 rounded-full text-sm transition ${
                        imageType === t
                          ? "bg-yellow-600 text-black shadow"
                          : "text-black hover:bg-white"
                      }`}
                    >
                      {t === "file" ? "Upload Image" : "Image URL"}
                    </button>
                  ))}
                </div>

                {/* FILE UPLOAD */}
                {imageType === "file" && (
                  <div className="flex flex-col items-center gap-2">
                    <input
                      type="file"
                      accept="image/*"
                      id="fileInput"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <label
                      htmlFor="fileInput"
                      className="cursor-pointer w-full h-32 border-2 border-dashed
                                 border-yellow-300 rounded-xl flex flex-col
                                 items-center justify-center bg-yellow-50
                                 hover:bg-yellow-100 transition"
                    >
                      <span className="text-yellow-700 font-medium">
                        Click to upload image
                      </span>
                    </label>

                    {selectedFile && (
                      <span className="text-green-600 text-sm">✅ Uploaded</span>
                    )}

                    {preview && (
                      <img
                        src={preview}
                        alt="preview"
                        className="w-32 h-32 object-cover rounded-xl"
                      />
                    )}
                  </div>
                )}

                {/* IMAGE URL */}
                {imageType === "url" && (
                  <input
                    type="text"
                    placeholder="Paste image URL"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="border p-3 rounded text-black"
                  />
                )}

                <div className="flex gap-3 mt-2">
                  <button
                    type="button"
                    onClick={() => setIsVisible(false)}
                    className="flex-1 bg-gray-300 text-black rounded py-2"
                  >
                    Cancel
                  </button>
                  <button
                    className="flex-1 bg-yellow-600 text-black rounded py-2 active:scale-95 transition"
                  >
                    Add Product
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
