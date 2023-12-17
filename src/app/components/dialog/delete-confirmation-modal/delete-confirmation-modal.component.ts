import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-confirmation-modal',
  templateUrl: './delete-confirmation-modal.component.html',
  styleUrls: ['./delete-confirmation-modal.component.css']
})
export class DeleteConfirmationModalComponent {

  constructor(private dialogRef: MatDialogRef<DeleteConfirmationModalComponent>) {}

  confirm(): void {
    this.dialogRef.close(true); // Fecha o modal e envia um valor 'true'
  }

  cancel(): void {
    this.dialogRef.close(false); // Fecha o modal e envia um valor 'false'
  }
}
