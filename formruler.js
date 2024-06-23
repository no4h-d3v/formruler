(function ($) {
    $.fn.formruler = function (options) {
        const settings = $.extend({
            rules: {},
            messages: {},
            customValidators: {},
            feedbackSelectors: {},
            triggerButtonId: "submitBtn",
            skipRulesIf: {},
            onValid: () => { },
            onInvalid: () => { }
        }, options);

        const defaultFeedbackSelector = ".invalid-feedback";

        const isFullWidthChar = char => /[^\u0020-\u007E]/.test(char);
        const isHalfWidthChar = char => /[\u0020-\u007E]/.test(char);

        const validateField = (input, rules, messages, customValidators, feedbackSelector, skipRulesIf) => {
            let value = input.val();
            let isValid = true;
            const errorMessages = [];

            // Handle full-width and half-width character blocking
            ['blockFullWidth', 'blockHalfWidth'].forEach(rule => {
                if (rules[rule]) {
                    const newValue = value.split('').filter(char =>
                        rule === 'blockFullWidth' ? !isFullWidthChar(char) : !isHalfWidthChar(char)
                    ).join('');
                    if (value !== newValue) {
                        input.val(newValue);
                        value = newValue;
                    }
                }
            });

            rules = { ...rules };  // Create a shallow copy of rules

            // Handle rule skipping
            if (skipRulesIf?.dependentId) {
                const dependentInput = $(`#${skipRulesIf.dependentId}`);
                const skipCondition = skipRulesIf.condition || "notEmpty";

                if ((skipCondition === "notEmpty" && dependentInput.val()) ||
                    (skipCondition === "empty" && !dependentInput.val())) {
                    if (skipRulesIf.rulesToSkip === "all") {
                        rules = {};
                    } else {
                        skipRulesIf.rulesToSkip.forEach(rule => delete rules[rule]);
                    }
                }
            }

            // Execute custom validations
            Object.entries(customValidators).forEach(([validatorName, validatorFunc]) => {
                if (rules[validatorName]) {
                    const customResult = validatorFunc(value, input);
                    if (!customResult.isValid) {
                        isValid = false;
                        errorMessages.push(customResult.message);
                    }
                }
            });

            // Skip further validation if empty fields are allowed and no required rules failed
            if (!rules.required && !rules.bothRequired && !value) {
                if (errorMessages.length === 0) {
                    clearErrors(input, feedbackSelector);
                    return isValid;
                }
            }

            // Standard validations
            const validations = {
                required: () => !value && messages.required,
                bothRequired: () => {
                    const otherField = $(rules.bothRequired);
                    const otherValue = otherField.val();
                    if (!value && !otherValue) {
                        input.removeClass("is-invalid");
                        otherField.removeClass("is-invalid");
                    } else if (!value || !otherValue) {
                        return messages.bothRequired;
                    } else {
                        input.removeClass("is-invalid");
                        otherField.removeClass("is-invalid");
                    }
                },
                checkbox: () => !input.is(":checked") && messages.checkbox,
                alphaNum: () => !/^[\x20-\x7E]*$/.test(value) && messages.alphaNum,
                fullWidthChars: () => !/^[^\u0020-\u007E]+$/.test(value) && messages.fullWidthChars,
                noNumbers: () => /\d/.test(value) && messages.noNumbers,
                minLength: () => value.length < rules.minLength && messages.minLength.replace("{minLength}", rules.minLength),
                maxLength: () => value.length > rules.maxLength && messages.maxLength.replace("{maxLength}", rules.maxLength),
                rangeLength: () => (value.length < rules.rangeLength[0] || value.length > rules.rangeLength[1]) &&
                    messages.rangeLength.replace("{min}", rules.rangeLength[0]).replace("{max}", rules.rangeLength[1]),
                pattern: () => !new RegExp(rules.pattern).test(value) && messages.pattern,
                numeric: () => !/^\d*\.?\d+$/.test(value) && messages.numeric,
                integer: () => !/^-?\d+$/.test(value) && messages.integer,
                min: () => value < rules.min && messages.min.replace("{min}", rules.min),
                max: () => value > rules.max && messages.max.replace("{max}", rules.max),
                range: () => (value < rules.range[0] || value > rules.range[1]) &&
                    messages.range.replace("{min}", rules.range[0]).replace("{max}", rules.range[1]),
                email: () => !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && messages.email,
                url: () => !/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(value) && messages.url,
                phone: () => !/^\d{10,11}$/.test(value) && messages.phone,
                postalCode: () => !/^\d{3}-\d{4}$/.test(value) && messages.postalCode,
                date: () => value !== "" && !/^\d{4}-\d{2}-\d{2}$/.test(value) && messages.date,
                dateRange: () => {
                    const [startSelector, endSelector] = rules.dateRange;
                    const startDate = $(startSelector).val();
                    const endDate = $(endSelector).val();
                    return startDate && endDate && new Date(startDate) > new Date(endDate) && messages.dateRange;
                },
                validOption: () => !rules.validOption.includes(value) && messages.validOption
            };

            Object.entries(validations).forEach(([rule, validation]) => {
                if (rules[rule]) {
                    const errorMessage = validation();
                    if (errorMessage) {
                        isValid = false;
                        errorMessages.push(errorMessage);
                    }
                }
            });

            displayErrors(input, isValid, errorMessages, feedbackSelector);
            return isValid;
        };

        const clearErrors = (input, feedbackSelector) => {
            input.removeClass("is-invalid").addClass("is-valid");
            const targetSelector = feedbackSelector === defaultFeedbackSelector ?
                input.siblings(feedbackSelector) : $(feedbackSelector);
            targetSelector.html("").hide();
        };

        const displayErrors = (input, isValid, errorMessages, feedbackSelector) => {
            const rules = settings.rules[input.attr('name')];

            if (!isValid) {
                input.removeClass("is-valid").addClass("is-invalid");
                const targetSelector = feedbackSelector === defaultFeedbackSelector ?
                    input.siblings(feedbackSelector) : $(feedbackSelector);
                targetSelector.html(errorMessages.join("<br>")).show();
            } else {
                clearErrors(input, feedbackSelector);
                if (rules.bothRequired) {
                    const otherField = $(rules.bothRequired);
                    otherField.removeClass("is-invalid").addClass("is-valid");
                }
            }
        };

        return this.each(function () {
            const form = $(this);
            const inputs = form.find(".form-control:not(:disabled), .form-check-input:not(:disabled)");

            inputs.each(function () {
                const input = $(this);
                const inputName = input.attr("name");
                const rules = settings.rules[inputName];
                const messages = settings.messages[inputName];
                const feedbackSelector = settings.feedbackSelectors[inputName] || defaultFeedbackSelector;
                const skipRulesIf = settings.skipRulesIf[inputName];

                const validateThisField = () => validateField(input, rules, messages, settings.customValidators, feedbackSelector, skipRulesIf);

                input.on("input change", validateThisField);

                if (skipRulesIf?.dependentId) {
                    $(`#${skipRulesIf.dependentId}`).on("input change", validateThisField);
                }
            });

            const submitBtn = $(`#${settings.triggerButtonId}`);
            submitBtn.on("click", () => {
                if (submitBtn.attr('type') === 'button') {
                    form.trigger("submit");
                }
            });

            form.on("submit", function (event) {
                event.preventDefault();
                let isFormValid = true;

                inputs.each(function () {
                    const input = $(this);
                    const isValid = validateField(
                        input,
                        settings.rules[input.attr("name")],
                        settings.messages[input.attr("name")],
                        settings.customValidators,
                        settings.feedbackSelectors[input.attr("name")] || defaultFeedbackSelector,
                        settings.skipRulesIf[input.attr("name")]
                    );
                    if (!isValid) {
                        isFormValid = false;
                    }
                });

                if (isFormValid) {
                    settings.onValid();
                } else {
                    settings.onInvalid();
                }
            });
        });
    };
}(jQuery));