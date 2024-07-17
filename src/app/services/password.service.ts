import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  
  private lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
  private upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  private numberChars = '0123456789';
  private specialChars = '!@#$%^&*()_+[]{}|;:,.<>?';

  generatePassword(length: number, includeUpper: boolean, includeNumbers: boolean, includeSpecial: boolean): string {
    let charSet  = this.lowerCaseChars;
    if (includeUpper) charSet += this.upperCaseChars;
    if (includeNumbers) charSet += this.numberChars;
    if (includeSpecial) charSet += this.specialChars;

  
    let password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charSet.length);
      password += charSet[randomIndex];
    }

    
    return password;
  }

  getPasswordStrength(password: string): string {
    const length = password.length;
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const strength = [hasUpper, hasLower, hasNumber, hasSpecial].filter(Boolean).length;

    if (length < 8 ) return 'Too Weak!';
    if (length >= 8 && strength < 2) return 'Weak';
    if (length > 8 && strength <= 2) return 'Medium'
    return 'Strong';
  }
}
