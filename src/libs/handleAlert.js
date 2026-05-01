
import Swal from 'sweetalert2';

export const handleActionAlert = (success, message) => {
  Swal.fire({
    icon: success ? 'success' : 'error',
    title: success ? 'Success' : 'Error',
    text: message,
    confirmButtonText: success ? 'Ok' : 'Try Again',
    confirmButtonColor: success ? '#00A645' : '#ef4444',
  });
};
