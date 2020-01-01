use image::GenericImageView;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
  fn alert(s: &str);
  #[wasm_bindgen(js_namespace = console)]
  fn log(s: &str);
}

#[wasm_bindgen]
pub fn greet() {
  alert("Hello WASM! From 🦀 to ⚛️ with ❤️")
}

#[wasm_bindgen]
pub fn fib(num: u8) -> u8 {
  if num <= 1 {
    return 1;
  }

  return fib(num - 1) + fib(num - 2);
}

#[wasm_bindgen]
pub fn run_fib(num: u8) {
  let fib_res = fib(num);
  log(&format!("{}", fib_res))
}

#[wasm_bindgen]
pub fn image_stuff() {
  let uimg = image::open("./gitstats2.png").unwrap();

  log(&format!("{:?}", uimg.dimensions()))
}
