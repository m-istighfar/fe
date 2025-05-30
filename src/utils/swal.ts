import Swal from "sweetalert2";

export const Toast = Swal.mixin({
  toast: true,
  position: "top",
  showConfirmButton: false,
  showCloseButton: true,
  timer: 3000,
  timerProgressBar: true,
  background: "#FFFFFF",
  iconColor: "#4C87AB",
  customClass: {
    popup: "!rounded-[20px]",
    closeButton: "!text-line-600",
  },
});

export const showSuccessToast = (message: string) => {
  Toast.fire({
    icon: "success",
    title: message,
    iconColor: "#69D26E",
  });
};

export const showErrorToast = (message: string) => {
  Toast.fire({
    icon: "error",
    title: message,
    iconColor: "#D32F2F",
  });
};

export const showConfirmDialog = (
  title: string,
  text: string,
  confirmButtonText = "Ya"
) => {
  return Swal.fire({
    icon: "warning",
    title,
    text,
    showCancelButton: true,
    confirmButtonColor: "#4C87AB",
    cancelButtonColor: "#D32F2F",
    confirmButtonText,
    cancelButtonText: "Batal",
    position: "center",
    background: "#FFFFFF",
    padding: "2em",
    allowOutsideClick: true,
    allowEscapeKey: true,
    customClass: {
      popup: "!rounded-[20px]",
      confirmButton: "!rounded-[20px]",
      cancelButton: "!rounded-[20px]",
    },
  }).then((result) => {
    return result.isConfirmed;
  });
};

export const showLoadingDialog = (title: string, text: string) => {
  return Swal.fire({
    title,
    text,
    allowOutsideClick: false,
    showConfirmButton: false,
    position: "center",
    background: "#FFFFFF",
    customClass: {
      popup: "!rounded-[20px]",
    },
    willOpen: () => {
      Swal.showLoading();
    },
  });
};

export const showSuccessDialog = (title: string, text: string) => {
  return Swal.fire({
    icon: "success",
    title,
    text,
    position: "center",
    background: "#FFFFFF",
    confirmButtonColor: "#4C87AB",
    customClass: {
      popup: "!rounded-[20px]",
    },
  });
};

export const showErrorDialog = (title: string, text: string) => {
  return Swal.fire({
    icon: "error",
    title,
    text,
    position: "center",
    confirmButtonColor: "#4C87AB",
    background: "#FFFFFF",
    customClass: {
      popup: "!rounded-[20px]",
    },
  });
};
