const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "trihuynhnhut0107",
  database: "is201",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Get all current products
app.get("/currentproducts", (req, res) => {
  db.query("SELECT * FROM SanPhamDangBan;", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Get a product by ID
app.get("/currentproducts/:id", (req, res) => {
  const { id } = req.params;
  db.query(
    "SELECT * FROM SanPhamDangBan Where SanPhamDangBan.MaSanPham = ?;",
    [id],
    (err, results) => {
      if (err) throw err;
      res.json(results[0]);
    }
  );
});

// Get review by product ID
app.get("/currentproducts/:id/reviews", (req, res) => {
  const { id } = req.params;
  db.query(
    "SELECT * FROM DanhGiaSanPham RIGHT JOIN KhachHang ON DanhGiaSanPham.MaNguoiDanhGia = KhachHang.MaKhachHang WHERE DanhGiaSanPham.MaSanPham = ? ORDER BY DanhGiaSanPham.NgayDanhGia ASC;",
    [id],
    (err, results) => {
      if (err) throw err;
      res.json(results);
    }
  );
});

// Get all users
app.get("/users", (req, res) => {
  db.query("SELECT * FROM KhachHang;", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Get a user by ID
app.get("/user/:id", (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM KhachHang WHERE id = ?", [id], (err, results) => {
    if (err) throw err;
    res.json(results[0]);
  });
});

// Get cart info by user ID
app.get("/user/:id/cart", (req, res) => {
  const { id } = req.params;
  db.query(
    "SELECT * FROM ChiTietGioHang WHERE MaKhachHang = ?",
    [id],
    (err, results) => {
      if (err) throw err;
      res.json(results);
    }
  );
});

// Update a product
app.put("/products/:id", (req, res) => {
  const { id } = req.params;
  const { TenSanPham, LoaiSanPham, MoTaSanPham, GiaNiemYet } = req.body;
  console.log(id, TenSanPham, LoaiSanPham, MoTaSanPham, GiaNiemYet);
  db.query(
    "UPDATE SanPhamDangBan SET TenSanPham = ?, LoaiSanPham = ?, MoTaSanPham = ?, GiaNiemYet = ? WHERE MaSanPham = ?",
    [TenSanPham, LoaiSanPham, MoTaSanPham, GiaNiemYet, id],
    (err) => {
      if (err) throw err;
      res.json({ message: "Product updated successfully" });
    }
  );
});

// Delete a user
app.delete("/products/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM SanPhamDangBan WHERE MaSanPham = ?", [id], (err) => {
    if (err) {
      res.json({ message: "Không thể xóa sản phẩm" });
    }
    res.json({ message: "Xóa sản phẩm thành công" });
  });
});

// Create a new user
// app.post("/user", (req, res) => {
//   const { name, description } = req.body;
//   db.query(
//     "INSERT INTO KhachHang (name, description) VALUES (?, ?)",
//     [name, description],
//     (err, result) => {
//       if (err) throw err;
//       res.json({ message: "User added successfully", id: result.insertId });
//     }
//   );
// });

// Update a user
// app.put("/products/:id", (req, res) => {
//   const { id } = req.params;
//   const { name, email } = req.body;
//   db.query(
//     "UPDATE products SET name = ?, description = ? WHERE id = ?",
//     [name, description, id],
//     (err) => {
//       if (err) throw err;
//       res.json({ message: "User updated successfully" });
//     }
//   );
// });

// Delete a user
// app.delete("/products/:id", (req, res) => {
//   const { id } = req.params;
//   db.query("DELETE FROM products WHERE id = ?", [id], (err) => {
//     if (err) throw err;
//     res.json({ message: "User deleted successfully" });
//   });
// });
