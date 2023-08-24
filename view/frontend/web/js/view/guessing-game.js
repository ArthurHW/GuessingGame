/**
 * @author    Arthur Henrique Wiebusch <arturh07@gmail.com>
 * @copyright 2023 Arthur Henrique Wiebusch
 */
define([
    'uiComponent',
    'jquery',
    'ko',
    'mage/translate',
    'mage/validation'
], function (Component, $, ko, $t) {
    'use strict';

    return Component.extend({
        guessedNumbers: [],
        correctNumber: 1,
        number: ko.observable(null),
        message: ko.observable(''),
        playing: ko.observable(true),

        /**
         * Initializes the component.
         *
         * @return {void}
         */
        initialize: function() {
            this._super();

            this.correctNumber = this.generateRandomNumber();
        },

        /**
         * Generates a random number between 1 and 50.
         *
         * @return {number} The generated random number.
         */
        generateRandomNumber: function() {
            return Math.floor((Math.random() * 50) + 1);
        },

        /**
         * Guesses the number entered in the form and provides feedback based on whether it is the correct number or not.
         *
         * @param {HTMLElement} form - The HTML form element containing the number input.
         */
        guess: function(form) {
            let message = '';
            if ($(form).validation() && $(form).validation('isValid')) {
                if (parseInt(this.number()) == this.correctNumber) {
                    message = $t('Congratulations you guessed it!');
                    message += "<br>";
                    message += $t("You entered the numbers: ");
                    if (this.guessedNumbers.length) {
                        message += this.guessedNumbers.join(', ') + ' ,';
                    }
                    message += `<strong>${this.number()}</strong>`;
                    this.playing(false)
                } else if (parseInt(this.number()) > this.correctNumber) {
                    message = $t("The number entered was above the random number");
                    this.guessedNumbers.push(this.number());
                } else {
                    message = $t("The number entered was below the random number");
                    this.guessedNumbers.push(this.number());
                }
            }
            this.message(message);
        },
        
        /**
         * Restarts the game by resetting all the necessary variables and properties.
         *
         * @return {void}
         */
        restart: function() {
            this.guessedNumbers = [];
            this.correctNumber = this.generateRandomNumber();
            this.number(null);
            this.message('');
            this.playing(true);
        }
    });
});
