import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AutenticacaoService } from '../servicos/autenticacao.service';
import { MensagemService } from '../servicos/mensagem.service';

@Component({
  selector: 'app-cadastro',
  imports: [ReactiveFormsModule],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {

  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private autenticacaoService: AutenticacaoService,
    private mensagemservice: MensagemService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      re_password: ['', Validators.required]
    }, {
      validator: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const re_password = group.get('re_password')?.value;
    return password === re_password ? null : { mismatch: true };
  }

  onSubmit() {
    console.log('Formulário enviado');
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;
      console.log(formData);
      this.autenticacaoService.register(formData).subscribe({
        next: (response) => {
          this.mensagemservice.mensagem('Registro realizado com sucesso!');
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Erro ao cadastrar usuário', err);
        }
      });
    }
  }  

  click() {
    this.router.navigate(['/']); // Navegar para a página de login
  }
}
