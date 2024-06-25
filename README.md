<p>
  <a href="https://github.com/no4h-d3v/formruler/blob/master/README-ja.md">日本語版READMEはこちら</a>
</p>

<h1>FormRuler</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-2.0.1-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
</p>

> Form validation library

## Table of Contents

1. [Installation](#installation)
2. [Basic Usage](#basic-usage)
3. [Available Settings](#available-settings)
4. [Available Rules](#available-rules)
5. [Validation Timing](#validation-timing)
6. [CSS Classes](#css-classes)
7. [License](#license)

## Installation

Install with npm:

```
npm install formruler
```

Or include it directly in HTML:

```
<script src="path/to/formruler.js"></script>
```

## Basic Usage

To use this library, follow these steps:

1. Include jQuery and the FormRuler plugin in your HTML file.
2. Add the appropriate `name` attributes and `invalid-feedback` class elements to each input element in the form.
3. Call the `formruler()` method in JavaScript, setting validation rules and messages.

Here is a specific example:

```
<form id="myForm">
    <div class="form-group">
        <label for="username">Username</label>
        <input type="text" name="username" class="form-control">
        <div class="invalid-feedback">Error message goes here.</div>
    </div>
    <div class="form-group">
        <label for="email">Email</label>
        <input type="email" name="email" class="form-control">
        <div class="invalid-feedback">Error message goes here.</div>
    </div>
    <button type="submit" id="submitBtn">Submit</button>
</form>

<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
<script src="path/to/formruler.js"></script>
<script>
$(document).ready(function() {
    $('#myForm').formruler({
        rules: {
            username: {
                required: true,
                minLength: 3,
                maxLength: 20
            },
            email: {
                required: true,
                email: true
            }
        },
        messages: {
            username: {
                required: "Username is required",
                minLength: "Username must be at least 3 characters",
                maxLength: "Username must be no more than 20 characters"
            },
            email: {
                required: "Email is required",
                email: "Please enter a valid email address"
            }
        },
        triggerButtonId: "submitBtn",
        onValid: function() {
            console.log("Form is valid");
            // Handle form submission here
        },
        onInvalid: function() {
            console.log("Form is invalid");
            // Handle errors here
        }
    });
});
</script>
```

In this example:

- Each input element in the form has a `name` attribute (e.g., `username` and `email`).
- The `rules` object defines the validation rules for each `name` attribute.
- The `messages` object defines the error messages for each rule.
- The `triggerButtonId` specifies the ID of the button that triggers form submission.
- The `onValid` and `onInvalid` callbacks define the actions to take based on validation results.

## Available Settings

### 1. rules

#### Purpose
Defines the validation rules to apply to each field in the form. This ensures that the data entered by users meets the expected format or conditions.

#### Description
The `rules` option specifies an object that defines the validation rules for each field in the form. Each field's name is the key, and the rules for that field are defined as an object.

#### Example

```
$('#myForm').formruler({
    rules: {
        username: {
            required: true,
            minLength: 3,
            maxLength: 20
        },
        email: {
            required: true,
            email: true
        },
        age: {
            numeric: true,
            min: 18,
            max: 100
        }
    }
});
```

#### Available Rules

| Rule               | Example                      | Description                                           |
|--------------------|------------------------------|-------------------------------------------------------|
| required           | required: true               | The field cannot be empty. Triggered if the value is empty or whitespace only. |
| minLength          | minLength: 3                 | Minimum length. Specifies the minimum number of characters. |
| maxLength          | maxLength: 10                | Maximum length. Specifies the maximum number of characters. |
| rangeLength        | rangeLength: [3, 10]         | Length must be within the range. Defined as an array `[min, max]`. |
| email              | email: true                  | Must be a valid email address. Uses standard email format. |
| url                | url: true                    | Must be a valid URL. Checks standard URL formats (e.g., `http`, `https`, `ftp`). |
| numeric            | numeric: true                | Must be a number (integer or decimal). Allows numbers and decimal points. |
| integer            | integer: true                | Must be an integer. Allows only positive or negative integers. |
| min                | min: 18                      | Minimum value. Specifies the minimum allowable value. |
| max                | max: 65                      | Maximum value. Specifies the maximum allowable value. |
| range              | range: [18, 65]              | Value must be within the range. Defined as an array `[min, max]`. |
| pattern            | pattern: "^[a-zA-Z0-9]+$"    | Must match the regular expression pattern. Defines the regex pattern to match. |
| alphaNum           | alphaNum: true               | Must contain only alphanumeric characters. Special characters and spaces are not allowed. |
| fullWidthChars     | fullWidthChars: true         | Must contain only full-width characters. Checks for full-width Unicode characters. |
| noNumbers          | noNumbers: true              | Must not contain numbers. Prohibits any numeric characters in the input. |
| phone              | phone: true                  | Must be a valid phone number. Checks for standard phone number formats. |
| postalCode         | postalCode: true             | Must be a valid postal code. Checks for standard postal code formats (e.g., `123-4567`). |
| date               | date: true                   | Must be a valid date in `YYYY-MM-DD` format. Checks for standard date formats. |
| dateRange          | dateRange: ["#startDate", "#endDate"] | Must be a date within the specified range. Defined as an array of selectors `[startDateSelector, endDateSelector]`. |
| timeRange          | timeRange: ["#startTime", "#endTime"] | Must be a time within the specified range. Defined as an array of selectors `[startTimeSelector, endTimeSelector]`. |
| validOption        | validOption: ["option1", "option2"] | Must be one of the specified options. Defined as an array of allowed values. |
| checkbox           | checkbox: true               | The checkbox must be checked. Checks if the checkbox input is checked. |
| blockFullWidth     | blockFullWidth: true         | Prevents the input of full-width characters. Prohibits full-width Unicode characters. |
| blockHalfWidth     | blockHalfWidth: true         | Prevents the input of half-width characters. Prohibits standard ASCII characters. |
| eitherOrBothRequired | eitherOrBothRequired: "#otherField" | Both fields must be empty or either one or both must be filled. Apply this rule to both fields. |
| bothOrNoneRequired | bothOrNoneRequired: "#otherField" | Both fields must be empty or both must be filled. Apply this rule to both fields. |

### 2. messages

#### Purpose
Defines custom error messages to display when validation errors occur. This makes it easier to convey errors to users in a clear and understandable way.

#### Description
The `messages` option specifies an object that defines custom error messages for each rule for each field. It has the same structure as the `rules` option but sets the error message strings as the values.

#### Example

```
$('#myForm').formruler({
    messages: {
        username: {
            required: "Please enter a username",
            minLength: "Username must be at least {minLength} characters",
            maxLength: "Username must be no more than {maxLength} characters"
        },
        email: {
            required: "Please enter an email address",
            email: "Please enter a valid email address"
        },
        age: {
            numeric: "Age must be a number",
            min: "You must be at least {min} years old",
            max: "You must be no more than {max} years old"
        }
    }
});
```

#### Notes
- Placeholders such as `{minLength}`, `{maxLength}`, `{min}`, and `{max}` are automatically replaced with the corresponding rule values in the message.
- Default error messages are used if custom messages are not set.

### 3. customValidators

#### Purpose
Defines custom validation functions to meet specific validation requirements that are not covered by standard validation rules.

#### Description
The `customValidators` option specifies an object that defines custom validation functions. Each validator's name is the key, and the corresponding function is the value.

#### Example

```
$('#myForm').formruler({
    customValidators: {
        evenNumber: function(value, input) {
            return {
                isValid: parseInt(value) % 2 === 0,
                message: "Please enter an even number"
            };
        },
        passwordStrength: function(value, input) {
            const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
            return {
                isValid: strongRegex.test(value),
                message: "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character"
            };
        }
    },
    rules: {
        evenField: {
            evenNumber: true
        },
        password: {
            passwordStrength: true
        }
    }
});
```

#### Notes
- Custom validator functions receive the input value (`value`) and the input element (`input`) as arguments.
- Functions must return an object with `isValid` (boolean) and `message` (error message) properties.

### 4. feedbackSelectors

#### Purpose
Customizes the elements that display error messages. This allows error messages to be displayed in locations other than the default.

#### Description
The `feedbackSelectors` option specifies an object that defines the selectors for elements to display error messages for each field. Each field's name is the key, and the selector string is the value.

#### Example

```
$('#myForm').formruler({
    feedbackSelectors: {
        username: "#username-error",
        email: "#email-error-container .message",
        password: ".password-feedback"
    }
});
```

#### Notes
- Fields without specified selectors will display error messages in the default `.invalid-feedback` sibling element.
- Error messages will not be displayed if the specified selector element does not exist.

### 5. skipRulesIf

#### Purpose
Skips certain validation rules under specific conditions. This is especially useful for dynamic form behavior.

#### Description
The `skipRulesIf` option specifies an object that defines conditions for skipping validation rules for specific fields. Each field's name is the key, and the condition is specified as an object.

#### Example

```
$('#myForm').formruler({
    skipRulesIf: {
        address: {
            dependentId: "sameAsBilling",
            condition: "notEmpty",
            rulesToSkip: ["required", "minLength"]
        }
    }
});
```

#### Notes
- `dependentId`: The ID of another field to use for checking the skip condition.
- `condition`: The condition to check ("notEmpty" or "empty").
- `rulesToSkip`: An array of rules to skip. Use "all" to skip all rules.

### 6. triggerButtonId

#### Purpose
Specifies the ID of the button that triggers form submission. This allows `type="button"` elements to start form submission and validation.

#### Description
The `triggerButtonId` option specifies the ID of the button that triggers form submission as a string.

#### Example

```
$('#myForm').formruler({
    triggerButtonId: "submitButton"
});
```

#### Notes
- Clicking the button with the specified ID will trigger the form submission event.
- The default value is "submitBtn".

### 7. onValid, onInvalid

#### Purpose
Defines custom functions to execute based on the validation results. This allows customization of post-validation processing.

#### Description
- `onValid`: The function called when the form is valid (all fields are correctly validated).
- `onInvalid`: The function called when the form is invalid (one or more fields have errors).

#### Example

```
$('#myForm').formruler({
    onValid: function() {
        console.log("Form is valid. Proceeding with submission.");
        // Handle form data submission, etc.
    },
    onInvalid: function() {
        console.log("Form has errors. Please correct them.");
        // Handle displaying errors, scrolling to error fields, etc.
    }
});
```

#### Notes
- These functions are executed during the form's submit event.
- By default, these functions are empty (do nothing).

## Submission Behavior

### 1. Triggering Submission

Form submission is triggered by any of the following methods:

- Clicking a button with `type="submit"`
- Clicking the button specified by `triggerButtonId`
- Calling the `submit()` method on the form element

### 2. Preventing Default Submission

FormRuler performs the following actions when the submit event occurs:

- Calls `event.preventDefault()` to prevent the browser's default form submission behavior.
- This means form data is not automatically sent to the server.

### 3. Performing Validation

When the submit event occurs, FormRuler performs validation as follows:

- Validates all fields in the form based on the defined rules.
- Displays error messages for fields with errors.

### 4. Handling Validation Results

Based on the validation results, one of the following actions is performed:

- If validation succeeds:
   - Calls the `onValid` callback function.
   - Form data is not automatically submitted.

- If validation fails:
   - Calls the `onInvalid` callback function.
   - Form data is not submitted.

### 5. Custom Submission Handling

The actual form data submission must be implemented by the developer:

- Typically, handle submission in the `onValid` callback.
- Commonly use Ajax or `FormData` for asynchronous submission.
- For traditional synchronous submission, use `$('#myForm')[0].submit()` (avoid `$('#myForm').submit()` to prevent an infinite loop).

### Example

```
$('#myForm').formruler({
    // Validation rules, etc.
    onValid: function() {
        console.log("Validation successful. Submitting form.");
        // Example of form submission using Ajax
        $.ajax({
            url: $('#myForm').attr('action'),
            method: 'POST',
            data: $('#myForm').serialize(),
        }).done(function(response) {
            console.log('Submission successful:', response);
        }).fail(function(error) {
            console.error('Submission failed:', error);
        }).always(function() {
            console.log('Request completed');
        });
    },
    onInvalid: function() {
        console.log("Validation failed. Check the errors.");
    }
});
```

## Process Flow

1. **Initialization**: When the `formruler()` method is called, the plugin performs the following actions:
   - Targets elements matching `.form-control:not(:disabled), .form-check-input:not(:disabled)` within the specified form.
   - Sets "input" and "change" event listeners on these elements.
   - Sets a "click" event listener on the button specified by `triggerButtonId`.
   - Sets a "submit" event listener on the entire form.

2. **Input Validation**: 
   - Each time the user enters input (the `input` event) or the value changes (the `change` event), the plugin validates the field based on the rules corresponding to the `name` attribute.

3. **Error Display**: 
   - If the input is invalid, the "is-invalid" class is added to the input element, and the `.invalid-feedback` element displays the error message.
   - If a custom feedback selector is specified, the error message is displayed in the specified element.
   - If the input is valid, the error display is cleared.

4. **Form Submission**: When the submit button is clicked:
   - The plugin prevents the default form submission (`event.preventDefault()`).
   - The plugin calls the `validateField` function on all input fields matching `.form-control:not(:disabled), .form-check-input:not(:disabled)` in the form to perform validation.
   - If all fields are valid, the `onValid` callback is called.
   - If any field is invalid, the `onInvalid` callback is called.

## Validation Timing

FormRuler performs validation at the following times:

1. **Form Submission**:
   - When the form is submitted, all fields are validated.

2. **Field Value Change**:
   - Each field is validated in real-time whenever its value changes (`input` event) or is modified (`change` event).

3. **Dependent Field Change**:
   - If dependencies are set using the `skipRulesIf` option, related fields are revalidated when the dependent field's value changes.

## Css Classes

### Applying CSS Classes

Based on validation results, the following CSS classes are applied:

1. **is-invalid**:
   - Applied to fields that fail validation.
   - Example: `<input class="form-control is-invalid" ...>`

2. **is-valid**:
   - Applied to fields that pass validation.
   - Example: `<input class="form-control is-valid" ...>`

3. **invalid-feedback**:
   - Used for elements displaying error messages.
   - This class must be pre-defined in the HTML.

   - Example: `<div class="invalid-feedback">Error message goes here.</div>`

### CSS Class Behavior

1. **Initial State**:
   - No special CSS classes are applied when the form is initialized.

2. **After Validation**:
   - `is-invalid` or `is-valid` classes are applied based on validation results.
   - Error messages are displayed in corresponding `invalid-feedback` elements.

3. **Value Change**:
   - Validation is re-executed, and CSS classes are updated each time the field value changes.

4. **Class Toggle**:
   - `is-invalid` and `is-valid` classes are toggled based on validation status.

### CSS Customization

FormRuler uses Bootstrap 4/5 compatible CSS classes. Customization is possible as follows:

```
/* Error state styling */
.is-invalid {
    border-color: #dc3545;
}

/* Success state styling */
.is-valid {
    border-color: #28a745;
}

/* Error message styling */
.invalid-feedback {
    display: none;
    width: 100%;
    margin-top: .25rem;
    font-size: 80%;
    color: #dc3545;
}

/* Display error message when field is invalid */
.is-invalid ~ .invalid-feedback {
    display: block;
}
```

## License

This project is licensed under the MIT License. See the LICENSE file for details.

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
