import { Injectable } from '@angular/core';

import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MensagemService {

  constructor(private matSnackBar: MatSnackBar) { }

  mensagem(mensagem: string) {
    this.matSnackBar.open(`${mensagem}`, 'OK', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000
    })
  }
}
