import { useState, useEffect } from 'react';
import './App.css';
import Swal from 'sweetalert2';
import AppAPI from './connectApi/AppAPI';
import Insertvaloapi from './connectApi/inservalo/insertvalo';


type FormData = {
  name: string;
  description: string;
  price: number;
  rankvalo: string;
};

function App() {

  const [products, setProducts] = useState<any[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    const response = await Insertvaloapi.getall();
    if (response.status === 200) {
      setProducts(response.data.data);
    } else {
      setError('Failed to fetch products');
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  console.log(products);

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
        return;
      }

      if (editId !== null) {
        // update
        await Insertvaloapi.put(editId.toString(), form);
        Swal.fire({
          title: "แก้ไขข้อมูลสำเร็จ",
          icon: "success"
        });
      } else {
        // create
        await Insertvaloapi.post(form);
        Swal.fire({
          title: "ส่งข้อมูลสำเร็จ",
          icon: "success"
        });
      }

      setEditId(null);
      setForm({ name: '', description: '', price: 0, rankvalo: '' });
      fetchProducts();
    } catch (error: any) {
      console.error('เกิดข้อผิดพลาด:', error.response?.data || error.message);
      Swal.fire({
        title: 'เกิดข้อผิดพลาด',
        icon: "error"
      });
    }
  };


  const handleEdit = (product: any) => {
    setEditId(product.id);
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      rankvalo: product.rankvalo,
    });
  };

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `Do you want to delete product with ID: ${id}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!'
    });

    if (result.isConfirmed) {
      try {
        await Insertvaloapi.delete(id.toString());
        Swal.fire('Deleted!', `Product with ID: ${id} has been deleted.`, 'success');
        fetchProducts();
      } catch (error) {
        Swal.fire('Error', 'ลบข้อมูลไม่สำเร็จ', 'error');
      }
    }
  };

  return (
    <div className='flex items-center justify-center bg-slate-300 min-h-screen w-auto'>
      <div className='bg-slate-100 rounded-2xl p-10 shadow-md flex flex-col items-center w-1/2'>
        <form onSubmit={handleSubmit} style={{ maxWidth: 300 }}>
          <div className='flex items-center justify-between'>
            <label>name:</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} className='bg-gray-100 border border-gray-300 rounded-md p-2' />
          </div>
          <div className='flex items-center justify-between mt-2'>
            <label>description:</label>
            <input type="text" name="description" value={form.description} onChange={handleChange} className='bg-gray-100 border border-gray-300 rounded-md p-2' />
          </div>
          <div className='flex items-center justify-between mt-2'>
            <label>price:</label>
            <input type="number" name="price" value={form.price} onChange={handleChange} className='bg-gray-100 border border-gray-300 rounded-md p-2' />
          </div>
          <div className='flex items-center justify-between mt-2'>
            <label>rankvalo:</label>
            <input type="text" name="rankvalo" value={form.rankvalo} onChange={handleChange} className='bg-gray-100 border border-gray-300 rounded-md p-2' />
          </div>
          <div className='flex items-center justify-end mt-4'>
          <button type="submit" className='bg-green-400 py-2 px-4 rounded-md mt-4'>ส่งข้อมูล</button>
          </div>
        </form>
          <h1>Product</h1>
        <div className='bg-white mt-10 p-5 rounded-xl shadow-md'>
          <div>
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>name</th>
                    <th>description</th>
                    <th>price</th>
                    <th>rankvalo</th>
                    <th>edit</th>
                    <th>delete</th>
                  </tr>
                </thead>
                <tbody>
                  {[...products]
                    .sort((a, b) => a.id - b.id) ////น้อยไปมาก
                    // .sort((a, b) => b.id - a.id) //มากไปน้อย
                    .map((prod) => (
                      <tr key={prod.id}>
                        <td>{prod.id}</td>
                        <td>{prod.name}</td>
                        <td>{prod.description}</td>
                        <td>{prod.price}</td>
                        <td>{prod.rankvalo}</td>
                        <td><button onClick={() => handleEdit(prod)} className='bg-yellow-400 py-2 px-4 rounded-md'>Edit</button></td>
                        <td><button onClick={() => handleDelete(prod.id)} className='bg-red-400 py-2 px-4 rounded-md'>Delete</button></td>
                      </tr>
                    ))}

                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
