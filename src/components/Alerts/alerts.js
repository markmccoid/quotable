import swal from 'sweetalert2';

// Returns a promise that resolve to either true or false
export const alertOnDelete = () => {
  return swal({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => result.value);
}