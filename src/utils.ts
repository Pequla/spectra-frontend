import Swal from "sweetalert2"

export const customSwalStyling = {
    popup: "rounded bg-dark shadow p-4",
    title: "h5 fw-bold text-light",
    htmlContainer: "text-secondary",
    confirmButton: "btn btn-primary",
    cancelButton: "btn btn-secondary",
}

export function showLoading(msg = "We are processing your request!") {
    Swal.fire({
        title: "Please wait",
        text: msg,
        customClass: customSwalStyling,
        didOpen: () => {
            Swal.showLoading()
        }
    })
}

export function showConfirm(message: string, callback: Function) {
    Swal.fire({
        title: message,
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        icon: "question",
        customClass: customSwalStyling
    }).then(result => {
        if (result.isConfirmed) {
            callback()
            Swal.fire({
                title: "Success",
                confirmButtonText: 'OK',
                icon: "success",
                customClass: customSwalStyling
            })
        }
    })
}

export function generateLastReport(iso: string | null) {
    if (iso == null)
        return 'Never reported'

    return new Date(iso).toLocaleString('sr-RS')
}