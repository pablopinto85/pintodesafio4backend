document.getElementById('file-form').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const fileInputElement = document.getElementById('file');
    const file = fileInputElement.files[0];
  
    try {
      const formData = new FormData();
      formData.append('file', file);
  
      const response = await fetch('/upload', {
        method: 'POST',
        body: formData,
      });
  
      const data = await response.json();
  
      if (data.status === "success") {
        Swal.fire({
          icon: 'success',
          title: 'Envío Exitoso',
          text: 'Imagen Guardada Correctamente',
          confirmButtonText: 'Aceptar'
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: data.error,
          confirmButtonText: 'Aceptar'
        });
      }
    } catch (error) {
      console.error('Error de red:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error de Red',
        text: 'Ocurrió un error al enviar la solicitud.',
        confirmButtonText: 'Aceptar'
      });
    }
  });
  