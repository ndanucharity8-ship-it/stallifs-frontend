import { Button, ConfirmDialog } from "../ui";

export default function ConfirmDelete({
  open = false,
  title = "Delete item?",
  message = "Are you sure you want to delete this item? This action cannot be undone.",
  onConfirm,
  onCancel,
  loading = false,
}) {
  return (
    <ConfirmDialog
      open={open}
      title={title}
      message={message}
      onClose={onCancel}
    >
      <div className="confirm-delete-actions">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </Button>

        <Button
          type="button"
          variant="danger"
          onClick={onConfirm}
          loading={loading}
        >
          Delete
        </Button>
      </div>
    </ConfirmDialog>
  );
}