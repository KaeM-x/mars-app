import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { WeatherNoteService } from '../../services/weather-note.service';
import { Observable } from 'rxjs';
import { Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NoteDialogComponent } from '../note-dialog/note-dialog.component';

@Component({
  selector: 'app-mars-weather-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './mars-weather-card.component.html',
  styleUrls: ['./mars-weather-card.component.scss']
})
export class MarsWeatherCardComponent implements OnInit {
  @Input() solData: any;
  @Output() noteAdded = new EventEmitter<string>(); // string = sol number
  noteContent: string = '';
  notes$: Observable<any[]> | undefined;
  showForm = false;
  showNotes = false;

  constructor(private noteService: WeatherNoteService, private dialog: MatDialog) {}

  ngOnInit(): void {
    if (this.solData?.sol) {
      this.notes$ = this.noteService.getNotesForSol(this.solData.sol);
    }
  }

openNoteDialog(mode: 'form' | 'list') {
  const dialogRef = this.dialog.open(NoteDialogComponent, {
    width: '400px',
    data: { sol: this.solData.sol, mode }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result?.success) {
      this.noteAdded.emit(result.sol);
    }
  });
}

submitNote(): void {
  if (!this.noteContent.trim()) return;

  this.noteService.addNote(this.solData.sol, this.noteContent)
    .then(() => {
      this.noteContent = '';
      this.showForm = false;

      this.noteAdded.emit(this.solData.sol);
    })
    .catch(err => {
      console.error('Error saving note:', err);
      alert('Failed to save note.');
    });
}
}
