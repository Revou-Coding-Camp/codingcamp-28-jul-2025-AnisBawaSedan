// Script untuk menampilkan pesan selamat datang
function welcomeMessage() {
    const popup = prompt('Please enter your name:');
    if (popup) {
        const welcomeElement = document.getElementById('welcome-speech');
        if (welcomeElement) {
            welcomeElement.textContent = popup;
        }
    }
}

// Jalankan welcomeMessage setelah DOM loaded
document.addEventListener('DOMContentLoaded', function() {
    welcomeMessage();
});

// Script untuk menangani form pesan
document.addEventListener('DOMContentLoaded', function() {
    const submitForm = document.getElementById('form-pesan');
    const successMessage = document.getElementById('success-message');
    
    if (submitForm) {
        submitForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Hapus semua error messages sebelum validasi
            clearErrorMessages();
            
            try {
                // Ambil nilai dari form
                const nama = document.getElementById('name').value.trim();
                const tanggal_lahir = document.getElementById('birthdate').value;
                const jenis_kelamin = document.querySelector('input[name="gender"]:checked');
                const pesan = document.getElementById('pesan').value.trim();
                
                let isValid = true;
                
                // Validasi nama
                if (!nama) {
                    showError('name-error', 'Nama harus diisi');
                    isValid = false;
                }
                
                // Validasi tanggal lahir
                if (!tanggal_lahir) {
                    showError('birthdate-error', 'Tanggal lahir harus diisi');
                    isValid = false;
                }
                
                // Validasi jenis kelamin
                if (!jenis_kelamin) {
                    showError('gender-error', 'Jenis kelamin harus dipilih');
                    isValid = false;
                }
                
                // Validasi pesan
                if (!pesan) {
                    showError('pesan-error', 'Pesan harus diisi');
                    isValid = false;
                }
                
                // Jika semua valid, tampilkan pesan
                if (isValid) {
                    const now = new Date();
                    const waktu = now.toLocaleString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit'
                    });
                    
                    const output = `
                        <div class="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
                            <p><strong>Current Time:</strong> ${waktu}</p>
                            <p><strong>Name:</strong> ${nama}</p>
                            <p><strong>Birthdate:</strong> ${formatDate(tanggal_lahir)}</p>
                            <p><strong>Gender:</strong> ${jenis_kelamin.value}</p>
                            <p><strong>Message:</strong></p>
                            <div class="mt-2 p-2 bg-white rounded border">
                                ${pesan.replace(/\n/g, '<br>')}
                            </div>
                        </div>
                    `;
                    
                    const pesanMasuk = document.getElementById('pesan_masuk');
                    if (pesanMasuk) {
                        // Jika sudah ada pesan sebelumnya, tambahkan yang baru di atas
                        if (pesanMasuk.innerHTML.includes('Messages will appear here...')) {
                            pesanMasuk.innerHTML = output;
                        } else {
                            pesanMasuk.innerHTML = output + pesanMasuk.innerHTML;
                        }
                        
                        // Tampilkan pesan sukses
                        showSuccessMessage();
                        
                        // Reset form setelah submit
                        submitForm.reset();
                        
                    } else {
                        console.error('Element dengan id "pesan_masuk" tidak ditemukan');
                    }
                }
                
            } catch (error) {
                console.error('Error processing form:', error);
                alert('Terjadi kesalahan saat memproses form. Silakan coba lagi.');
            }
        });
    } else {
        console.error('Form element tidak ditemukan');
    }
});

// Fungsi untuk menampilkan error message
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
}

// Fungsi untuk menghapus semua error messages
function clearErrorMessages() {
    const errorElements = document.querySelectorAll('.error-text');
    errorElements.forEach(element => {
        element.textContent = '';
        element.style.display = 'none';
    });
}

// Fungsi untuk menampilkan success message
function showSuccessMessage() {
    const successMessage = document.getElementById('success-message');
    if (successMessage) {
        successMessage.classList.add('show');
        
        // Sembunyikan pesan sukses setelah 3 detik
        setTimeout(() => {
            successMessage.classList.remove('show');
        }, 3000);
    }
}

// Fungsi untuk format tanggal
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}
