import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, Timestamp, query, where, orderBy } from '@angular/fire/firestore';
import { collectionData } from 'rxfire/firestore';
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class WeatherNoteService {
  constructor(private firestore: Firestore) {}

  addNote(sol: string, content: string): Promise<void> {
    const notesRef = collection(this.firestore, 'weather-notes');
    return addDoc(notesRef, {
      sol,
      content,
      createdAt: Timestamp.now()
    }).then(() => {});
  }

  getNotesForSol(sol: string): Observable<any[]> {
    const notesRef = collection(this.firestore, 'weather-notes');
    const q = query(notesRef, where('sol', '==', sol), orderBy('createdAt', 'desc'));
    return collectionData(q, { idField: 'id' });
  }
}
