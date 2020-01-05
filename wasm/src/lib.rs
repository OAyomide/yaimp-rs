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
pub fn image_stuff(im: &[u8]) {
  let uimg = image::load_from_memory(im).unwrap();

  log(&format!("{:?}", uimg.dimensions()));
}

#[wasm_bindgen]
pub fn monochrome(image_buff: &[u8]) -> Box<[u8]> {
  log(&format!(
    "IMAGE BUFF PASSED TO WASM BEFORE PROCESSING IS: {:?}",
    image_buff
  ));
  // TODO: remove rayon jpeg feature to support wasm jpeg decode
  let img = image::load_from_memory(image_buff).unwrap().grayscale();
  let mut wr = Vec::new();
  img
    .write_to(&mut wr, image::ImageOutputFormat::PNG)
    .unwrap();

  wr.into_boxed_slice()
}
