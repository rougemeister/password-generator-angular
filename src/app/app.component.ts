import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PasswordService } from './services/password.service'
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {



  title = 'password-generator-angular';

  length = 12;
  includeLower = false;
  includeUpper = false;
  includeNumbers = false;
  includeSpecial = false;
  password!: string;
  strength!: string;
block: any;
none: any;



  constructor(public passwordService: PasswordService) { }

  updateValue(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.length = Number(inputElement.value);
  }
  generatePassword() {
    this.password = this.passwordService.generatePassword(this.length, this.includeUpper, this.includeNumbers, this.includeSpecial);
    this.strength = this.passwordService.getPasswordStrength(this.password);
    this.isCopied = false;
  }

 isCopied = false;
  copyToClipboard() {
    navigator.clipboard.writeText(this.password).then(() => {
      this.isCopied = !this.isCopied;
    }, () => {
      alert('Failed to copy password to clipboard.');
    });
  }


  
}
