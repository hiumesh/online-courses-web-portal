"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomRating = exports.getRandomIntInclusive = void 0;
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}
exports.getRandomIntInclusive = getRandomIntInclusive;
function generateRandomRating() {
    return Math.random() * (5 - 3) + 3;
    // return Math.random() * 5; // Generates a random floating-point number between 0 and 5
}
exports.generateRandomRating = generateRandomRating;
