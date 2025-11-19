// Cart.jsx
import React, { useState } from 'react';
import { X, Trash2 } from 'lucide-react';

const Cart = ({ items, onClose, onClearCart, onRemoveFromCart }) => {
    // State untuk mengelola alur pemesanan
    const [step, setStep] = useState(1);
    const [userName, setUserName] = useState('');
    const [userNotes, setUserNotes] = useState('');
    const [orderType, setOrderType] = useState(null);

    // State untuk pilihan pesanan
    const [selectedTable, setSelectedTable] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState(null);

    // Menghitung total harga dari semua item di keranjang
    const totalHargaKeseluruhan = items.reduce((total, item) => total + item.totalPrice, 0);
    const mejaList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    // Fungsi untuk melanjutkan ke langkah form
    const handleNextStep = (type) => {
        setOrderType(type);
        setStep(2);
    };

    // Fungsi untuk melanjutkan dari form
    const handleFormSubmit = () => {
        if (orderType === 'DineIn') {
            setStep(3); // Pindah ke pemilihan meja
        } else if (orderType === 'TakeAway') {
            setStep(4); // Pindah ke pemilihan pembayaran
        }
    };
    
    // Fungsi untuk memilih meja
    const handleSelectTable = (tableNumber) => {
        setSelectedTable(tableNumber);
        setStep(5); // Pindah ke konfirmasi akhir
    };

    // Fungsi untuk memilih metode pembayaran
    const handleSelectPayment = (method) => {
        setPaymentMethod(method);
        setStep(5); // Pindah ke konfirmasi akhir
    };

    // Fungsi untuk menutup keranjang dan mengosongkan belanjaan
    const handleCloseAndClear = () => {
        onClearCart();
        onClose();
    };

    // Fungsi untuk memformat mata uang Rupiah
    const formatRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(number);
    };

    // Fungsi untuk menampilkan konten berdasarkan langkah (step)
    const renderContent = () => {
        // --- Langkah 1: Ringkasan Belanjaan & Pilihan Tipe Pesanan ---
        if (step === 1) {
            return (
                <div className='flex flex-col h-full'>
                    <h2 className='text-2xl font-bold mb-4'>Ringkasan Belanjaan</h2>
                    {items.length === 0 ? (
                        <p className='text-gray-500'>Keranjang Anda kosong.</p>
                    ) : (
                        <ul className='space-y-4 flex-grow overflow-y-auto pr-2'>
                            {items.map((item) => (
                                <li key={item.id} className='flex items-center gap-4 border-b pb-2'>
                                    <img src={item.pizza} alt={item.name} className='w-16 h-16 object-cover rounded-md' />
                                    <div className='flex-grow'>
                                        <h3 className='font-semibold'>{item.name} x {item.quantity}</h3>
                                        <p className='text-sm text-gray-600'>{formatRupiah(item.totalPrice)}</p>
                                    </div>
                                    <button onClick={() => onRemoveFromCart(item.id)} className='text-red-500 hover:text-red-700 transition-colors'>
                                        <Trash2 size={20} />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                    {items.length > 0 && (
                        <div className='mt-4 pt-4 border-t'>
                            <h3 className='text-xl font-bold'>Total: {formatRupiah(totalHargaKeseluruhan)}</h3>
                            <div className='mt-4 flex gap-2'>
                                <button onClick={() => handleNextStep('DineIn')} className='w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition-colors'>
                                    Makan Disini
                                </button>
                                <button onClick={() => handleNextStep('TakeAway')} className='w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition-colors'>
                                    Take Away
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            );
        }

        // --- Langkah 2: Mengisi Nama & Catatan ---
        if (step === 2) {
            return (
                <div>
                    <h2 className='text-2xl font-bold mb-4'>Detail Pesanan</h2>
                    <form onSubmit={(e) => { e.preventDefault(); handleFormSubmit(); }} className='flex flex-col gap-4'>
                        <div>
                            <label htmlFor="name" className='block text-sm font-medium text-gray-700'>Nama</label>
                            <input
                                type="text"
                                id="name"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500'
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="notes" className='block text-sm font-medium text-gray-700'>Catatan (Opsional)</label>
                            <textarea
                                id="notes"
                                value={userNotes}
                                onChange={(e) => setUserNotes(e.target.value)}
                                rows="3"
                                className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500'
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            disabled={!userName} // Tombol dinonaktifkan jika nama kosong
                            className={`w-full py-2 rounded-md transition-colors 
                                ${userName ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}
                            `}
                        >
                            Lanjut
                        </button>
                    </form>
                </div>
            );
        }

        // --- Langkah 3: Memilih Meja (hanya jika orderType = DineIn) ---
        if (step === 3) {
            return (
                <div>
                    <h2 className='text-2xl font-bold mb-4'>Pilih Meja Anda</h2>
                    <div className='grid grid-cols-4 gap-4'>
                        {mejaList.map((table) => (
                            <button 
                                key={table} 
                                onClick={() => handleSelectTable(table)}
                                className='bg-gray-200 text-gray-800 p-4 rounded-md hover:bg-red-500 hover:text-white transition-colors'
                            >
                                Meja {table}
                            </button>
                        ))}
                    </div>
                </div>
            );
        }

        // --- Langkah 4: Memilih Metode Pembayaran (hanya jika orderType = TakeAway) ---
        if (step === 4) {
            return (
                <div>
                    <h2 className='text-2xl font-bold mb-4'>Metode Pembayaran</h2>
                    <div className='flex flex-col gap-4'>
                        <button 
                            onClick={() => handleSelectPayment('Cash')} 
                            className='bg-green-500 text-white py-4 rounded-md hover:bg-green-600 transition-colors'
                        >
                            Cash
                        </button>
                        <button 
                            onClick={() => handleSelectPayment('Online')} 
                            className='bg-blue-500 text-white py-4 rounded-md hover:bg-blue-600 transition-colors'
                        >
                            Pembayaran Online
                        </button>
                    </div>
                </div>
            );
        }

        // --- Langkah 5: Konfirmasi Akhir ---
        if (step === 5) {
            return (
                <div className='text-center space-y-4'>
                    <h2 className='text-2xl font-bold'>Pesanan Berhasil!</h2>
                    <p className='text-lg'>Terima kasih, {userName}!</p>
                    {userNotes && <p className='text-gray-500 text-sm'>Catatan: {userNotes}</p>}
                    
                    {orderType === 'DineIn' ? (
                        <>
                            <p className='text-lg'>Anda memilih makan di Meja {selectedTable}.</p>
                            <p className='text-lg text-red-500'>Silahkan menunggu pesanan Anda.</p>
                        </>
                    ) : (
                        paymentMethod === 'Cash' ? (
                            <p className='text-lg text-red-500'>Silahkan ke kasir untuk melakukan pembayaran.</p>
                        ) : (
                            <p className='text-lg'>Silahkan bayar {formatRupiah(totalHargaKeseluruhan)} melalui metode pembayaran online Anda.</p>
                        )
                    )}

                    <button onClick={handleCloseAndClear} className='mt-8 bg-gray-500 text-white py-2 px-4 rounded-md'>Tutup</button>
                </div>
            );
        }
    };

    return (
        <div className='fixed inset-0 bg-gray-900 bg-opacity-50 z-50 flex justify-end'>
            <div className='bg-white w-full max-w-sm h-full shadow-lg p-6 relative'>
                <button onClick={onClose} className='absolute top-4 right-4 text-gray-500 hover:text-gray-800'>
                    <X size={24} />
                </button>
                {renderContent()}
            </div>
        </div>
    );
};

export default Cart;