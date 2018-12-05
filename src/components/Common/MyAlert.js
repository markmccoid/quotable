import PropTypes from 'prop-types';
import swal from 'sweetalert2';

const MyAlert = (props) => {
  const confirmAlert = (confirmFunction) => swal({
    title: props.title ? props.title : 'Are you sure?',
    text: props.text ? props.text : null,
    type: props.type ? props.type : null,
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    confirmButtonText: props.confirmButtonText,
    cancelButtonColor: '#d33',
    cancelButtonText: props.cancelButtonText
  }).then((result) => {
    if (result.value) {
      confirmFunction()
    } else {
      props.onCancel()
    }
  })

  const onConfirm = () => confirmAlert(props.onConfirm)
  return (
    props.children(onConfirm)
  );
};

MyAlert.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  type: PropTypes.string,
  confirmButtonText: PropTypes.string,
  cancelButtonText: PropTypes.string,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
}

MyAlert.defaultProps = {
  title: 'Are you sure?',
  text: null,
  type: null,
  confirmButtonText: 'Ok',
  cancelButtonText: 'Cancel',
  onCancel: () => null,
}


export default MyAlert;