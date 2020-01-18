use image::GenericImageView;
// use std::time::{Duration, SystemTime, UNIX_EPOCH};
use wasm_bindgen::prelude::*;

#[macro_use]
pub mod log;

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
  console_log!("{:?}", fib_res)
}

#[wasm_bindgen]
pub fn image_stuff(im: &[u8]) {
  let uimg = image::load_from_memory(im).unwrap();

  console_log!("{:?}", uimg.dimensions());
}

#[wasm_bindgen]
pub fn handle_effect(image_buffer: &[u8], effect: &str) -> Option<Box<[u8]>> {
  match effect {
    "monochrome" => Some(monochrome(image_buffer)),
    "half-monochrome" => {
      console_log!("Oops! This isnt supported yet");
      None
    }
    "sepia" => {
      let eff = sepia(image_buffer);
      console_log!("This is a work in progress!!");
      Some(eff)
    }
    _ => {
      console_log!("Oops! Unknowm format");
      None
    }
  }
}

#[wasm_bindgen]
pub fn monochrome(image_buff: &[u8]) -> Box<[u8]> {
  // TODO: remove rayon jpeg feature to support wasm jpeg decode
  let img = image::load_from_memory(image_buff).unwrap().grayscale();
  let mut wr = Vec::new();
  img
    .write_to(&mut wr, image::ImageOutputFormat::PNG)
    .unwrap();

  wr.into_boxed_slice()
}

#[wasm_bindgen]
pub fn sepia(image_buff: &[u8]) -> Box<[u8]> {
  let img = image::load_from_memory(image_buff).unwrap().to_rgba();
  let (width, height) = img.dimensions();

  let mut output_img = img.clone();
  for x in 0..width {
    for y in 0..height {
      // this is a rather naive implementation. but works now
      // 💡 an idea would be to use ```map_with_alpha so the effect is applied to all channels on image
      // without necessarily doing most of below. BUT THIS WORKS NOW!!!🎊🎉
      let pixel = img.get_pixel(x, y);
      let mut pixel_cp = *pixel;
      let r = (0.393 * pixel[0] as f64) + (0.769 * pixel[1] as f64) + (0.189 * pixel[0] as f64);
      let g = (0.349 * pixel[0] as f64) + (0.686 * pixel[1] as f64) + (0.168 * pixel[0] as f64);
      let b = (0.272 * pixel[0] as f64) + (0.53 * pixel[1] as f64) + (0.131 * pixel[0] as f64);

      if r > 255.0 {
        pixel_cp[0] = 255;
      } else {
        pixel_cp[0] = r as u8;
      }

      if g > 255.0 {
        pixel_cp[1] = 255
      } else {
        pixel_cp[1] = g as u8;
      }

      if b > 255.0 {
        pixel_cp[2] = 255
      } else {
        pixel_cp[2] = b as u8;
      }

      pixel_cp[3] = pixel[3];
      output_img.put_pixel(x, y, pixel_cp);
    }
  }

  let mut out_writer: Vec<u8> = Vec::new();
  let md = image::DynamicImage::ImageRgba8(output_img);
  md.write_to(&mut out_writer, image::ImageOutputFormat::PNG)
    .unwrap();
  out_writer.into_boxed_slice()
}

// #[wasm_bindgen(start)]
// pub fn run_perf() {
//   let window = web_sys::window().expect("should have a window in this context");
//   let performance = window
//     .performance()
//     .expect("performance should be available");

//   console_log!("the current time (in ms) is {}", performance.now());

//   // let start = perf_to_system(performance.timing().request_start());
//   // let end = perf_to_system(performance.timing().response_end());

//   // console_log!("request started at {}", humantime::format_rfc3339(start));
//   // console_log!("request ended at {}", humantime::format_rfc3339(end));
// }

// fn perf_to_system(amt: f64) -> SystemTime {
//   let secs = (amt as u64) / 1_000;
//   let nanos = ((amt as u32) % 1_000) * 1_000_000;
//   UNIX_EPOCH + Duration::new(secs, nanos)
// }
// #[wasm_bindgen]
// pub fn get_time_taken(start: f64, end: f64) -> (f64, f64) {
//   let window = web_sys::window().expect("ERROR. WINDOW CONTEXT NOT FOUND");
//   let performance = window
//     .performance()
//     .expect("ERROR. PERFORMANCE NOT IN SCOPE");

//   let start = perf_to_sys(performance.timing().request_start());
//   let end = perf_to_sys(performance.timing().response_end());
//   console_log!("STARTED AT: {:?}", humantime::format_rfc3339(start));
//   console_log!("ENDED AT {:?}", humantime::format_rfc3339(end));
// }

// #[wasm_bindgen]
// pub fn program_start() -> Option<f64> {
//   let window = web_sys::window().expect("Cannot Find window in context");
//   let performance = window
//     .performance()
//     .expect("ERROR. PERFORMANCE NOT FOUND IN CONTEXT");
//   let start = perf_to_sys(performance.timing().request_start());
//   let to_mili = start
//     .duration_since(UNIX_EPOCH)
//     .expect("Time is in the past.")
//     .as_secs_f64();

//   return Some(to_mili);
// }

// #[wasm_bindgen]
// pub fn program_end() -> Option<f64> {
//   let window = web_sys::window().expect("Cannot Find window in context");
//   let performance = window
//     .performance()
//     .expect("Error. Could not find performance in context");
//   let end = perf_to_sys(performance.timing().response_end());
//   let to_mili = end
//     .duration_since(UNIX_EPOCH)
//     .expect("TIME IS IN THE PAST")
//     .as_secs_f64();

//   return Some(to_mili);
// }

// fn perf_to_sys(tm: f64) -> SystemTime {
//   let sec = (tm as u64) / 1_000;
//   let nano = ((tm as u32) % 1_000) * 1_000_000;
//   UNIX_EPOCH + Duration::new(sec, nano)
// }
