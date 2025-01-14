import Swal from "sweetalert2";

export const SwalSuccess = (success_title, success_message) => {
  Swal.fire({
    title: success_title ? success_title : "Success",
    text: success_message ? success_message : "Operation successfully executed",
    icon: "success",
    confirmButtonText: "Cool",
  });
};

export const SwalError = (error) => {
  let message = error.message || "Internal server error";
  console.log(error)
  console.log(error.message)

  switch (error.name) {
    case "noTitle":
      message = "Title is required";
      break;

    case "noContent":
      message = "Content is required";
      break;
  }
  Swal.fire({
    title: "Error!",
    text: message,
    icon: "error",
    confirmButtonText: "Cool",
  });
};
