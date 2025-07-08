// Universal validation functions for all forms in the PWA
// Usage: import { FormValidator } from './validation';

export const FormValidator = {
  sanitize: (value: string) => value.replace(/[<>]/g, ''),

  validateName: (value: string, required = true) => {
    if (required && !value.trim()) return 'Name is required';
    if (!/^[\p{L}\s'-]+$/u.test(value)) return 'Name can only contain letters, spaces, hyphens, and apostrophes';
    if (value.length < 2) return 'Name must be at least 2 characters';
    if (value.length > 50) return 'Name cannot exceed 50 characters';
    return null;
  },

  validateText: (value: string, { required = true, minLength = 2, maxLength = 200 } = {}) => {
    if (required && !value.trim()) return 'This field is required';
    if (value.length < minLength) return `Must be at least ${minLength} characters`;
    if (value.length > maxLength) return `Cannot exceed ${maxLength} characters`;
    return null;
  },

  validateEmail: (value: string, required = true) => {
    if (required && !value.trim()) return 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email address';
    return null;
  },

  validateNumber: (value: any, { required = true, min = 0, max = 999999, integer = true } = {}) => {
    if (required && (value === '' || value === undefined || value === null)) return 'This field is required';
    const num = Number(value);
    if (isNaN(num)) return 'Please enter a valid number';
    if (integer && !Number.isInteger(num)) return 'Please enter a whole number';
    if (num < min) return `Number must be at least ${min}`;
    if (num > max) return `Number cannot exceed ${max}`;
    return null;
  },

  validatePhone: (value: string, required = true) => {
    if (required && !value.trim()) return 'Phone number is required';
    if (!/^[+]?\d{10,16}$/.test(value.replace(/\s/g, ''))) return 'Please enter a valid phone number';
    return null;
  },

  validateDropdown: (value: string, required = true) => {
    if (required && (!value || value === '')) return 'Please select an option';
    return null;
  },

  validateMultiSelect: (value: string[], required = true) => {
    if (required && (!Array.isArray(value) || value.length === 0)) return 'Please select at least one option';
    return null;
  },

  validateBoolean: (value: any, required = true) => {
    if (required && typeof value !== 'boolean') return 'This field is required';
    return null;
  },

  validateTextarea: (value: string, { required = false, minLength = 0, maxLength = 500 } = {}) => {
    if (required && !value.trim()) return 'This field is required';
    if (value.length < minLength) return `Must be at least ${minLength} characters`;
    if (value.length > maxLength) return `Cannot exceed ${maxLength} characters`;
    return null;
  },
}; 