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

//LOGIN (AUTHENTICATE USER)
app.post("/userlogin", (req, res) => {
  const { username, password } = req.body;

  db.query(
    "Select * from KhachHang where TenTaiKhoan = ?",
    [username],
    (err, result) => {
      if (err) {
        throw err;
      }
      if (result.length == 0) {
        console.log("User not found");
        res.json({ message: "User not found", access: false });
      } else {
        if (password === result[0].MatKhau) {
          console.log("Login successful");
          res.json({
            message: "Login successful",
            id: result[0].MaKhachHang,
            access: true,
          });
        } else {
          console.log("Wrong password");
          res.json({ message: "Wrong password", access: false });
        }
      }
    }
  );
});

// Signup user
app.post("/usersignup", (req, res) => {
  const { username, password } = req.body;
  db.query(
    "INSERT INTO KhachHang (TenTaiKhoan, MatKhau) VALUES (?, ?)",
    [username, password],
    (err, result) => {
      if (err) {
        res.json({ message: "Tên tài khoản đã tồn tại", access: false });
      } else {
        db.query(
          "Select MaKhachHang from KhachHang where TenTaiKhoan = ?",
          [username],
          (err, result) => {
            if (err) {
              throw err;
            }
            res.json({
              message: "Đăng ký thành công",
              id: result[0],
            });
          }
        );
      }
    }
  );
});

// Staff signin
app.post("/stafflogin", (req, res) => {
  const { username, password } = req.body;

  db.query(
    "Select * from NhanVien where TenTaiKhoan = ?",
    [username],
    (err, result) => {
      if (err) {
        throw err;
      }
      if (result.length == 0) {
        console.log("User not found");
        res.json({ message: "User not found", access: false });
      } else {
        if (password === result[0].MatKhau) {
          console.log("Login successful");
          res.json({
            message: "Login successful",
            id: result[0].MaNhanVien,
            access: true,
          });
        } else {
          console.log("Wrong password");
          res.json({ message: "Wrong password", access: false });
        }
      }
    }
  );
});

// Update user info by user ID
app.put("/user/:id", (req, res) => {
  const { id } = req.params;
  const { TenKhachHang, NgaySinh, SoDienThoai, DiaChi } = req.body;
  db.query(
    "UPDATE KhachHang SET TenKhachHang = ?, NgaySinh = ?, DiaChi = ?, SoDienThoai = ? WHERE MaKhachHang = ?",
    [TenKhachHang, NgaySinh, SoDienThoai, DiaChi, id],
    (err) => {
      if (err) throw err;
      res.json({ message: "Cập nhật thông tin thành công" });
    }
  );
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

// Get current max product ID
app.get("/currentproducts/currentmaxid", (req, res) => {
  db.query("SELECT MAX(MaSanPham) FROM SanPhamDangBan;", (err, results) => {
    if (err) throw err;
    res.json(results[0]);
  });
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
  db.query(
    "SELECT MaKhachHang, TenKhachHang, CAST( NgaySinh AS Date ) as NgaySinh, SoDienThoai FROM KhachHang;",
    (err, results) => {
      if (err) throw err;
      res.json(results);
    }
  );
});

// Get a user by ID
app.get("/user/:id", (req, res) => {
  const { id } = req.params;
  db.query(
    "SELECT * FROM KhachHang WHERE MaKhachHang = ?",
    [id],
    (err, results) => {
      if (err) throw err;
      res.json(results[0]);
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

// Get cart info by user ID
app.get("/user/cart/:id", (req, res) => {
  const { id } = req.params;
  db.query(
    "SELECT * FROM GioHang INNER JOIN ChiTietGioHang ON GioHang.MaGioHang = ChiTietGioHang.MaGioHang INNER JOIN SanPhamDangBan ON ChiTietGioHang.MaSanPham = SanPhamDangBan.MaSanPham WHERE GioHang.MaKhachHang = ? ",
    [id],
    (err, results) => {
      if (err) throw err;
      res.json(results);
    }
  );
});

// Update cart info by user ID
app.post("/user/cart/:id", (req, res) => {
  const { id } = req.params;
  const { MaSanPham, SoLuong } = req.body;
  db.query(
    "INSERT INTO ChiTietGioHang (MaGioHang, MaSanPham, SoLuong) VALUES (?, ?, ?)",
    [id, MaSanPham, SoLuong],
    (err, result) => {
      if (err) throw err;
      res.json({ message: "Thêm vào giỏ hàng thành công" });
    }
  );
});

// Create a new bill
app.post("/newbill", (req, res) => {
  const { MaKhachHang, TongGiaTriHoaDon, MaNhanVien } = req.body;
  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  // This arrangement can be altered based on how we want the date's format to appear.
  let currentDate = `${month}-${day}-${year}`;
  db.query(
    "INSERT INTO HoaDon (MaKhachHang, TongGiaTriHoaDon, NgayXuat, MaNhanVien) VALUES (?, ?, str_to_date(?,'%m-%d-%Y'), ?)",
    [MaKhachHang, TongGiaTriHoaDon, currentDate, MaNhanVien],
    (err, result) => {
      if (err) throw err;
      db.query(
        "SELECT MAX(MaHoaDon) as MaHoaDonMoiNhat FROM HoaDon;",
        (err, results) => {
          if (err) throw err;
          res.json(results[0]);
        }
      );
    }
  );
});

// Insert products detail into bill
app.post("/billdetail/:id", (req, res) => {
  const { id } = req.params;
  const items = req.body;
  db.query(
    "INSERT INTO ChiTietHoaDon (MaHoaDon, MaSanPham, SoLuong, TongGia) VALUES ?",
    [
      items.map((item) => [
        id,
        item.MaSanPham,
        item.SoLuong,
        item.SoLuong * item.GiaNiemYet,
      ]),
    ],
    (error, results) => {
      if (error) throw error;
      res.json({ message: "Tạo chi tiết hóa đơn thành công", access: true });
    }
  );
});

// Get checkout info
app.get("/checkout/:id", (req, res) => {
  const { id } = req.params;
  db.query(
    "SELECT * FROM HoaDon INNER JOIN ChiTietHoaDon ON HoaDon.MaHoaDon = ChiTietHoaDon.MaHoaDon INNER JOIN SanPhamDangBan ON ChiTietHoaDon.MaSanPham = SanPhamDangBan.MaSanPham WHERE HoaDon.MaHoaDon = ?",
    [id],
    (err, results) => {
      if (err) throw err;
      res.json(results);
    }
  );
});

// Confirm checkout
app.post("/confirmcheckout/:id", (req, res) => {
  const { id } = req.params;
  const { MaKhachHang, SDTKhachHang, DiaChiKhachHang } = req.body;
  const TinhTrang = "Đang xử lý";
  db.query(
    "INSERT INTO DonHang (MaHoaDon, MaKhachHang,SDTKhachHang,DiaChiKhachHang,TinhTrang) VALUES (?, ?, ?, ?, ?)",
    [id, MaKhachHang, SDTKhachHang, DiaChiKhachHang, TinhTrang],
    (err) => {
      if (err) throw err;
      res.json({ message: "Xác nhận đơn hàng thành công", access: true });
    }
  );
});

// Search for products
app.get("/search/:query", (req, res) => {
  const { query } = req.params;
  db.query(
    "SELECT * FROM SanPhamDangBan WHERE TenSanPham LIKE ?",
    [`%${query}%`],
    (err, results) => {
      if (err) throw err;
      res.json(results);
    }
  );
});

// Get all orders
app.get("/orders", (req, res) => {
  db.query(
    "SELECT * FROM DonHang INNER JOIN HoaDon ON DonHang.MaHoaDon = HoaDon.MaHoaDon INNER JOIN KhachHang ON DonHang.MaKhachHang = KhachHang.MaKhachHang;",
    (err, results) => {
      if (err) throw err;
      res.json(results);
    }
  );
});

// Get orders by bill ID
app.get("/order/:id", (req, res) => {
  const { id } = req.params;
  db.query(
    "SELECT * FROM ChiTietHoaDon INNER JOIN SanPhamDangBan ON ChiTietHoaDon.MaSanPham = SanPhamDangBan.MaSanPham INNER JOIN DonHang on ChiTietHoaDon.MaHoaDon = DonHang.MaHoaDon INNER JOIN KhachHang on DonHang.MaKhachHang = KhachHang.MaKhachHang WHERE ChiTietHoaDon.MaHoaDon = ?;",
    [id],
    (err, results) => {
      if (err) throw err;
      res.json(results);
    }
  );
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
