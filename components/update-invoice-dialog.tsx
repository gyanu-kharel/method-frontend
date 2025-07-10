import { useState } from "react";
import { IInvoice } from "./invoices-content";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

type UpdateInvoiceDialogProps = {
  invoice: IInvoice,
  onSubmitSuccess: () => void
  updateInvoiceDialogOpen: boolean
  setUpdateInvoiceDialogOpen: (open: boolean) => void
}

export const UpdateInvoiceDialog = ({invoice, onSubmitSuccess, updateInvoiceDialogOpen, setUpdateInvoiceDialogOpen}: UpdateInvoiceDialogProps) => {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const confirmAsPaid = async (invoiceId: string) => {
  if (!invoiceId) return;
  
  setIsLoading(true);
  try {
    const resp = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/invoices/${invoiceId}`, {
      method: "PATCH",
    });

    if (!resp.ok) throw new Error("Failed to mark invoice as paid");
    onSubmitSuccess();

  } catch (err) {
    console.error(err);
  } finally {
    setUpdateInvoiceDialogOpen(false);
    setIsLoading(false);
  }
};

  return (
    <Dialog open={updateInvoiceDialogOpen} onOpenChange={setUpdateInvoiceDialogOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Mark Invoice as Paid</DialogTitle>
          <DialogDescription>
            Are you sure you want to mark{" "}
            <strong>{invoice?.invoiceNumber}</strong> as paid?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setUpdateInvoiceDialogOpen(false)}
          >
            Cancel
          </Button>
          <Button type="submit" onClick={() => confirmAsPaid(invoice.id)} disabled={isLoading}>
              {isLoading ? "Marking..." : "Mark as Paid"}
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
