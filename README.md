<p>
  <a href="https://github.com/no4h-d3v/formruler/blob/master/README-ja.md">日本語版READMEはこちら</a>
</p>

<h1>FormRuler</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

> A form validation library

## Table of Contents

1. [Installation](#installation)
2. [Basic Usage](#basic-usage)
3. [Available Settings](#available-settings)
4. [Available Rules](#available-rules)
5. [Validation Timing](#validation-timing)
6. [CSS Classes](#css-classes)
7. [License](#license)

## Installation

Install via npm:

```bash
npm install formruler
```

Or include it directly in your HTML:

```html
<script src="path/to/formruler.js"></script>
```

## Usage

```javascript
$('#myForm').formruler({
    rules: {
        username: {
            required: true,
            minLength: 3
        },
        email: {
            required: true,
            email: true
        }
    },
    messages: {
        username: {
            required: "Username is required",
            minLength: "Username must be at least 3 characters long"
        },
        email: {
            required: "Email is required",
            email: "Please enter a valid email address"
        }
    },
    onValid: function() {
        console.log("Form is valid");
    },
    onInvalid: function() {
        console.log("Form has errors");
    }
});
```

## Available Settings

| Setting            | Example                                                | Description                                           |
|--------------------|--------------------------------------------------------|-------------------------------------------------------|
| rules              | rules: {<br>&nbsp;&nbsp;&nbsp;&nbsp;username: { required: true }<br>}                     | Defines validation rules for each field. Specify validation criteria like `required`, `minLength`, `email`, etc. |
| messages           | messages: {<br>&nbsp;&nbsp;&nbsp;&nbsp;username: { required: "Username is required" }<br>}   | Custom error messages for validations. Use placeholders for dynamic values like `{minLength}`, `{maxLength}`, etc. |
| customValidators   | customValidators: {<br>&nbsp;&nbsp;&nbsp;&nbsp;myCustomRule: function(value, input) {<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return { isValid: value.startsWith("prefix_"),<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;message: "Field must start with 'prefix_'" };<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>} | Custom validation functions. Should return an object with `isValid` (boolean) and `message` (string) properties. |
| feedbackSelectors  | feedbackSelectors: {<br>&nbsp;&nbsp;&nbsp;&nbsp;username: "#username-error"<br>}                      | Custom selectors for error message display. By default, uses elements with the class `.invalid-feedback`. |
| triggerButtonId    | triggerButtonId: "submitBtn"                                          | ID of the button that triggers form validation. Can be an external button with `type="button"`. |
| skipRulesIf        | skipRulesIf: {<br>&nbsp;&nbsp;&nbsp;&nbsp;additionalInfo: {<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;dependentId: "needsAdditionalInfo",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;condition: "empty",<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;rulesToSkip: ["required", "minLength"]<br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>} | Conditions to skip certain validation rules. Define dependent fields and conditions to dynamically enable/disable rules. The available conditions are: <br> - "notEmpty": Skips the specified rules if the dependent field is not empty. <br> - "empty": Skips the specified rules if the dependent field is empty. <br> Additionally, you can specify "all" in `rulesToSkip` to skip all validation rules for the field under the given condition. |
| onValid            | onValid: function() {<br>&nbsp;&nbsp;&nbsp;&nbsp;console.log("Form is valid");<br>}          | Callback function executed when the form is valid. Use this to handle form submission or further processing. |
| onInvalid          | onInvalid: function() {<br>&nbsp;&nbsp;&nbsp;&nbsp;console.log("Form has errors");<br>}        | Callback function executed when the form is invalid. Use this to display error messages or prevent submission. |


## Available Rules

| Rule               | Example                      | Description                                           |
|--------------------|------------------------------|-------------------------------------------------------|
| required           | required: true               | Field must not be empty. Triggers if the input value is empty or only whitespace. |
| minLength          | minLength: 3                 | Minimum character length. Specify the minimum number of characters required. |
| maxLength          | maxLength: 10                | Maximum character length. Specify the maximum number of characters allowed. |
| rangeLength        | rangeLength: [3, 10]         | Character length within a range. Define as an array `[min, max]`. |
| email              | email: true                  | Must be a valid email address. Uses a standard email format. |
| url                | url: true                    | Must be a valid URL. Checks for standard URL formats (`http`, `https`, `ftp`). |
| numeric            | numeric: true                | Must be a number (integer or decimal). Allows digits and decimal points. |
| integer            | integer: true                | Must be an integer. Allows only whole numbers, positive or negative. |
| min                | min: 18                      | Minimum numeric value. Specify the minimum value allowed. |
| max                | max: 65                      | Maximum numeric value. Specify the maximum value allowed. |
| range              | range: [18, 65]              | Numeric value within a range. Define as an array `[min, max]`. |
| pattern            | pattern: "^[a-zA-Z0-9]+$"    | Must match a regular expression pattern. Define the regex pattern to match the input value. |
| alphaNum           | alphaNum: true               | Must contain only alphanumeric characters. No special characters or spaces allowed. |
| fullWidthChars     | fullWidthChars: true         | Must contain only full-width characters. Validates against full-width Unicode characters. |
| noNumbers          | noNumbers: true              | Must not contain any numbers. Disallows any digit in the input. |
| phone              | phone: true                  | Must be a valid phone number. Checks for standard phone number formats. |
| postalCode         | postalCode: true             | Must be a valid postal code. Checks for standard postal code formats, such as `123-4567`. |
| date               | date: true                   | Must be a valid date in `YYYY-MM-DD` format. Validates against the standard date format. |
| dateRange          | dateRange: ["#startDate", "#endDate"] | Date must be within a specified range. Define as an array of selectors `[startDateSelector, endDateSelector]`. |
| validOption        | validOption: ["option1", "option2"] | Value must be one of the specified options. Define as an array of valid values. |
| checkbox           | checkbox: true               | Checkbox must be checked. Validates if a checkbox input is checked. |
| bothRequired       | bothRequired: "#confirmPassword" | Two fields are both required. Define as a selector for the other field that must also be filled. |
| blockFullWidth     | blockFullWidth: true         | Prevents input of full-width characters. Blocks the entry of full-width Unicode characters. |
| blockHalfWidth     | blockHalfWidth: true         | Prevents input of half-width characters. Blocks the entry of standard ASCII characters. |

## Validation Timing

Validation occurs on the following events:

- input: As the user types
- change: When the field value changes
- submit: When the form is submitted

## CSS Classes

FormRuler uses the following CSS classes:

- is-valid: Applied to fields that pass validation
- is-invalid: Applied to fields that fail validation

## License

This project is licensed under the MIT License - see the LICENSE file for details.

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_

