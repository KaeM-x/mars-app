import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WeatherNoteService } from '../../services/weather-note.service';
import { Observable } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger
} from '@angular/animations';

@Component({
  standalone: true,
  selector: 'app-note-dialog',
  templateUrl: './note-dialog.component.html',
  styleUrls: ['./note-dialog.component.scss'],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateY(10px)' }),
            stagger(100, [
              animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
            ])
          ],
          { optional: true }
        )
      ])
    ])
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
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

  confirmDelete(noteId: string): void {
  const confirm = window.confirm('Are you sure you want to delete this note?');

  if (confirm) {
    this.noteService.deleteNote(noteId)
      .then(() => console.log('Note deleted:', noteId))
      .catch(err => console.error('Error deleting note:', err));
  }
  }

  trackById(index: number, note: any): string {
  return note.id;
}
}
