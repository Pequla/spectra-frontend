import Swal from "sweetalert2"

export const customSwalStyling = {
    popup: "rounded bg-dark shadow p-4",
    title: "h5 fw-bold text-light",
    htmlContainer: "text-secondary",
    confirmButton: "btn btn-primary",
    cancelButton: "btn btn-secondary",
}

export function showLoading() {
    Swal.fire({
        title: "Please wait",
        text: "We are processing your request!",
        customClass: customSwalStyling,
        didOpen: () => {
            Swal.showLoading()
        }
    })
}