import * as wasm from './wasm_bg.wasm';

const heap = new Array(32).fill(undefined);

heap.push(undefined, null, true, false);

function getObject(idx) { return heap[idx]; }

let WASM_VECTOR_LEN = 0;

let cachegetUint8Memory0 = null;
function getUint8Memory0() {
    if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== wasm.memory.buffer) {
        cachegetUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory0;
}

const lTextEncoder = typeof TextEncoder === 'undefined' ? require('util').TextEncoder : TextEncoder;

let cachedTextEncoder = new lTextEncoder('utf-8');

const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
}
    : function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
        read: arg.length,
        written: buf.length
    };
});

function passStringToWasm0(arg, malloc, realloc) {

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length);
        getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len);

    const mem = getUint8Memory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3);
        const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);

        offset += ret.written;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

let cachegetInt32Memory0 = null;
function getInt32Memory0() {
    if (cachegetInt32Memory0 === null || cachegetInt32Memory0.buffer !== wasm.memory.buffer) {
        cachegetInt32Memory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachegetInt32Memory0;
}

const lTextDecoder = typeof TextDecoder === 'undefined' ? require('util').TextDecoder : TextDecoder;

let cachedTextDecoder = new lTextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

function getStringFromWasm0(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

let heap_next = heap.length;

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

function dropObject(idx) {
    if (idx < 36) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}
/**
*/
export function greet() {
    wasm.greet();
}

/**
* @param {number} num
* @returns {number}
*/
export function fib(num) {
    var ret = wasm.fib(num);
    return ret;
}

/**
* @param {number} num
*/
export function run_fib(num) {
    wasm.run_fib(num);
}

function passArray8ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 1);
    getUint8Memory0().set(arg, ptr / 1);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}
/**
* @param {Uint8Array} im
*/
export function image_stuff(im) {
    var ptr0 = passArray8ToWasm0(im, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.image_stuff(ptr0, len0);
}

function getArrayU8FromWasm0(ptr, len) {
    return getUint8Memory0().subarray(ptr / 1, ptr / 1 + len);
}
/**
* @param {Uint8Array} image_buffer
* @param {string} effect
* @returns {Uint8Array | undefined}
*/
export function handle_effect(image_buffer, effect) {
    var ptr0 = passArray8ToWasm0(image_buffer, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    var ptr1 = passStringToWasm0(effect, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len1 = WASM_VECTOR_LEN;
    wasm.handle_effect(8, ptr0, len0, ptr1, len1);
    var r0 = getInt32Memory0()[8 / 4 + 0];
    var r1 = getInt32Memory0()[8 / 4 + 1];
    let v2;
    if (r0 !== 0) {
        v2 = getArrayU8FromWasm0(r0, r1).slice();
        wasm.__wbindgen_free(r0, r1 * 1);
    }
    return v2;
}

/**
* @param {Uint8Array} image_buff
* @returns {Uint8Array}
*/
export function monochrome(image_buff) {
    var ptr0 = passArray8ToWasm0(image_buff, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.monochrome(8, ptr0, len0);
    var r0 = getInt32Memory0()[8 / 4 + 0];
    var r1 = getInt32Memory0()[8 / 4 + 1];
    var v1 = getArrayU8FromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 1);
    return v1;
}

/**
* @param {Uint8Array} image_buff
* @returns {Uint8Array}
*/
export function sepia(image_buff) {
    var ptr0 = passArray8ToWasm0(image_buff, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.sepia(8, ptr0, len0);
    var r0 = getInt32Memory0()[8 / 4 + 0];
    var r1 = getInt32Memory0()[8 / 4 + 1];
    var v1 = getArrayU8FromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 1);
    return v1;
}

/**
* @param {Uint8Array} image_buffer
* @returns {Uint8Array}
*/
export function half_monochrome(image_buffer) {
    var ptr0 = passArray8ToWasm0(image_buffer, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.half_monochrome(8, ptr0, len0);
    var r0 = getInt32Memory0()[8 / 4 + 0];
    var r1 = getInt32Memory0()[8 / 4 + 1];
    var v1 = getArrayU8FromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 1);
    return v1;
}

/**
* @param {Uint8Array} image_buffer
* @returns {Uint8Array}
*/
export function crop_image(image_buffer) {
    var ptr0 = passArray8ToWasm0(image_buffer, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.crop_image(8, ptr0, len0);
    var r0 = getInt32Memory0()[8 / 4 + 0];
    var r1 = getInt32Memory0()[8 / 4 + 1];
    var v1 = getArrayU8FromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 1);
    return v1;
}

/**
* @param {Uint8Array} image_buffer
* @param {number} degree
* @returns {Uint8Array | undefined}
*/
export function rotate(image_buffer, degree) {
    var ptr0 = passArray8ToWasm0(image_buffer, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.rotate(8, ptr0, len0, degree);
    var r0 = getInt32Memory0()[8 / 4 + 0];
    var r1 = getInt32Memory0()[8 / 4 + 1];
    let v1;
    if (r0 !== 0) {
        v1 = getArrayU8FromWasm0(r0, r1).slice();
        wasm.__wbindgen_free(r0, r1 * 1);
    }
    return v1;
}

let stack_pointer = 32;

function addBorrowedObject(obj) {
    if (stack_pointer == 1) throw new Error('out of js stack');
    heap[--stack_pointer] = obj;
    return stack_pointer;
}
/**
* @param {Uint8Array} image_buffer
* @param {any} compression_options
* @returns {Uint8Array | undefined}
*/
export function compress_image(image_buffer, compression_options) {
    try {
        var ptr0 = passArray8ToWasm0(image_buffer, wasm.__wbindgen_malloc);
        var len0 = WASM_VECTOR_LEN;
        wasm.compress_image(8, ptr0, len0, addBorrowedObject(compression_options));
        var r0 = getInt32Memory0()[8 / 4 + 0];
        var r1 = getInt32Memory0()[8 / 4 + 1];
        let v1;
        if (r0 !== 0) {
            v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1);
        }
        return v1;
    } finally {
        heap[stack_pointer++] = undefined;
    }
}

export const __wbindgen_json_serialize = function(arg0, arg1) {
    const obj = getObject(arg1);
    var ret = JSON.stringify(obj === undefined ? null : obj);
    var ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len0;
    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
};

export const __wbindgen_string_new = function(arg0, arg1) {
    var ret = getStringFromWasm0(arg0, arg1);
    return addHeapObject(ret);
};

export const __wbg_alert_f5393de24ed74e50 = function(arg0, arg1) {
    alert(getStringFromWasm0(arg0, arg1));
};

export const __wbindgen_object_drop_ref = function(arg0) {
    takeObject(arg0);
};

export const __wbg_log_6a5797c4bb0f636c = function(arg0) {
    console.log(getObject(arg0));
};

export const __wbindgen_throw = function(arg0, arg1) {
    throw new Error(getStringFromWasm0(arg0, arg1));
};

