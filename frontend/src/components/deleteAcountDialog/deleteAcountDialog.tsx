import { useDeleteUser } from "../../hooks/user/useDeleteUser";
import { Button } from "../ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"

interface ICancelAcountModal {
  shouldOpen: boolean;
  setShouldOpenModal: (value: boolean) => void;
}

export const DeleteAcountDialog = ({ shouldOpen, setShouldOpenModal }: ICancelAcountModal) => {
  const { mutate, isPending } = useDeleteUser();

  return (
    <Dialog open={shouldOpen} onOpenChange={setShouldOpenModal}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Deseja Cancelar a sua conta?</DialogTitle>
          <DialogDescription>
            Essa ação não poderá ser desfeita
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-2 justify-center items-center">

          <Button className="bg-red-800 hover:bg-red-700 cursor-pointer"
            onClick={() => mutate()}
            disabled={isPending}
          >
            Sim
          </Button>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                disabled={isPending}
                type="button"
                variant="secondary"
                className="text-white cursor-pointer">
                Não
              </Button>
            </DialogClose>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}
