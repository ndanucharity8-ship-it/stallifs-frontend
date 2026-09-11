import Modal from "../components/Modal";

import Button from "./Button";

export default function ConfirmDialog({
  open = false,

  title = "Confirm Action",

  message = "Are you sure you want to continue?",

  confirmText = "Confirm",

  cancelText = "Cancel",

  confirmVariant = "danger",

  loading = false,

  onConfirm,

  onCancel,
}) {
  return (
    <Modal
      open={open}
      title={title}
      onClose={onCancel}
      size="sm"
      footer={
        <div className="confirm-dialog-actions">
          <Button
            variant="outline"
            onClick={onCancel}
            disabled={loading}
          >
            {cancelText}
          </Button>

          <Button
            variant={confirmVariant}
            loading={loading}
            onClick={onConfirm}
          >
            {confirmText}
          </Button>
        </div>
      }
    >
      <p className="confirm-dialog-message">
        {message}
      </p>
    </Modal>
  );
}