import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WeatherNoteService } from '../../services/weather-note.service';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-note-dialog',
  templateUrl: './note-dialog.component.html',
  styleUrls: ['./note-dialog.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class NoteDialogComponent {
  noteContent = '';
  notes$: Observable<any[]>;

  constructor(
    public dialogRef: MatDialogRef<NoteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { sol: string; mode: 'form' | 'list' },
    private noteService: WeatherNoteService
  ) {
    this.notes$ = this.noteService.getNotesForSol(data.sol);
  }

  submitNote(): void {
    if (!this.noteContent.trim()) return;

    this.noteService.addNote(this.data.sol, this.noteContent)
      .then(() => {
        this.dialogRef.close({ success: true, sol: this.data.sol });
      });
  }

  close(): void {
    this.dialogRef.close();
  }
}
