// unit.test.js

import {
  isPhoneNumber,
  isEmail,
  isStrongPassword,
  isDate,
  isHexColor,
} from '../code-to-unit-test/unit-test-me';

// TODO - Part 2
test('valid phone number: (123) 456-7890', () => {
  expect(isPhoneNumber('(123) 456-7890')).toBe(true);
});

test('valid phone number: 123-456-7890', () => {
  expect(isPhoneNumber('123-456-7890')).toBe(true);
});

test('invalid phone number: abc-def-ghij', () => {
  expect(isPhoneNumber('abc-def-ghij')).toBe(false);
});

test('invalid phone number: 123456', () => {
  expect(isPhoneNumber('123456')).toBe(false);
});



test('valid email: test@example.com', () => {
  expect(isEmail('test@example.com')).toBe(true);
});

test('valid email: name.lastname@domain.org', () => {
  expect(isEmail('name.lastname@domain.org')).toBe(true);
});

test('invalid email: test@@example.com', () => {
  expect(isEmail('test@@example.com')).toBe(false);
});

test('invalid email: test.com', () => {
  expect(isEmail('test.com')).toBe(false);
});


test('valid strong password: Abc12345', () => {
  expect(isStrongPassword('Abc12345')).toBe(true);
});

test('valid strong password: MyPass_123', () => {
  expect(isStrongPassword('MyPass_123')).toBe(true);
});

test('invalid strong password: 123', () => {
  expect(isStrongPassword('123')).toBe(false);
});

test('invalid strong password: abc', () => {
  expect(isStrongPassword('abc')).toBe(false);
});


test('valid date: 12/31/2022', () => {
  expect(isDate('12/31/2022')).toBe(true);
});

test('valid date: 01/01/2000', () => {
  expect(isDate('01/01/2000')).toBe(true);
});

test('invalid date: 2022/12/31', () => {
  expect(isDate('2022/12/31')).toBe(false);
});

test('invalid date: 13/01/2022', () => {
  expect(isDate('13/01/2022')).toBe(false);
});


test('valid hex color: #fff', () => {
  expect(isHexColor('#fff')).toBe(true);
});

test('valid hex color: #1a2b3c', () => {
  expect(isHexColor('#1a2b3c')).toBe(true);
});

test('invalid hex color: #12345', () => {
  expect(isHexColor('#12345')).toBe(false);
});

test('invalid hex color: 123456', () => {
  expect(isHexColor('123456')).toBe(false);
});