import { useState, useEffect } from 'react';
import './App.css';
import Swal from 'sweetalert2';
import AppAPI from './connectApi/AppAPI';

type FormData = {
  name: string;
  description: string;
  price: number;
  rankvalo: string;
};

function App() {

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await AppAPI.get('/showvalo');  // สมมติ API path /api/products
        setProducts(response.data.data || response.data); // ปรับตาม response โครงสร้างจริง
      } catch (err: any) {
        setError(err.response?.data?.message || err.message || "เกิดข้อผิดพลาด");
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const [form, setForm] = useState<FormData>({
    name: '',
    description: '',
    price: 0,
    rankvalo: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'price' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (
        form.name === "non" ||
        form.description === "nonn" ||
        form.price === 50 ||
        form.rankvalo === "dai"
      ) {
        Swal.fire({
          title: "Add Field",
          icon: "warning"
        });
      } else {
        await AppAPI.post(`/submitcreate`, form);
        Swal.fire({
          title: "ส่งข้อมูลสำเร็จ",
          icon: "success"
        });
      }
    } catch (error: any) {
      console.error('เกิดข้อผิดพลาด:', error.response?.data || error.message);
      Swal.fire({
        title: 'เกิดข้อผิดพลาด',
        icon: "error"
      });
    }
  };

  return (
    <div>

      <form onSubmit={handleSubmit} style={{ maxWidth: 300 }}>
        <div>
          <label>name:</label>
          <input type="text" name="name" value={form.name} onChange={handleChange} />
        </div>
        <div>
          <label>description:</label>
          <input type="text" name="description" value={form.description} onChange={handleChange} />
        </div>
        <div>
          <label>price:</label>
          <input type="number" name="price" value={form.price} onChange={handleChange} />
        </div>
        <div>
          <label>rankvalo:</label>
          <input type="text" name="rankvalo" value={form.rankvalo} onChange={handleChange} />
        </div>
        <button type="submit">ส่งข้อมูล</button>
      </form>
      <div>
      <h2>รายการสินค้า</h2>
      {products.length === 0 ? (
        <p>ไม่มีข้อมูลสินค้า</p>
      ) : (
        <ul>
          {products.map(product => (
            <li key={product.id}>
              <strong>{product.name}</strong> - {product.description} - ราคา: {product.price} - Rank: {product.rankvalo}
            </li>
          ))}
        </ul>
      )}
    </div>
    </div>
  );
}

export default App;
