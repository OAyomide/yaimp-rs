/* tslint:disable */
/* eslint-disable */
/**
*/
export function greet(): void;
/**
* @param {number} num 
* @returns {number} 
*/
export function fib(num: number): number;
/**
* @param {number} num 
*/
export function run_fib(num: number): void;
/**
* @param {Uint8Array} im 
*/
export function image_stuff(im: Uint8Array): void;
/**
* @param {Uint8Array} image_buffer 
* @param {string} effect 
* @returns {Uint8Array | undefined} 
*/
export function handle_effect(image_buffer: Uint8Array, effect: string): Uint8Array | undefined;
/**
* @param {Uint8Array} image_buff 
* @returns {Uint8Array} 
*/
export function monochrome(image_buff: Uint8Array): Uint8Array;
/**
* @param {Uint8Array} image_buff 
* @returns {Uint8Array} 
*/
export function sepia(image_buff: Uint8Array): Uint8Array;
/**
* @param {Uint8Array} image_buffer 
* @returns {Uint8Array} 
*/
export function half_monochrome(image_buffer: Uint8Array): Uint8Array;
/**
* @param {Uint8Array} image_buffer 
* @returns {Uint8Array} 
*/
export function crop_image(image_buffer: Uint8Array): Uint8Array;
/**
* @param {Uint8Array} image_buffer 
* @param {number} degree 
* @returns {Uint8Array | undefined} 
*/
export function rotate(image_buffer: Uint8Array, degree: number): Uint8Array | undefined;
/**
* @param {Uint8Array} image_buffer 
* @param {any} compression_options 
* @returns {Uint8Array | undefined} 
*/
export function compress_image(image_buffer: Uint8Array, compression_options: any): Uint8Array | undefined;
