

let Buttons = [];
let Pictures = [];
let Pic;


let c;
let pixelation_level = 20;
let PixelColors = [];

let Pics_Dom = [];
let Pic_Dom;


let Similars = [];


// We will hold the totals for our color values here
let avgRed = 0;
let avgGreen = 0;
let avgBlue = 0;




function preload() {
  Pic = loadImage('data/R100.jpg');
  for (let i = 1; i < 100; i++) {
    Pictures.push(loadImage('data/R' + i + '.jpg'));
  }
}

function setup() {

  //createCanvas(displayWidth, displayHeight);
  createCanvas(500, 500);
  slider = createSlider(1, 255, 200);
  slider.position(10, 10);
  slider.style('width', '820px');

  Pic_Dom = findDominance(Pic);
  findDoms();
  Pixelate();
  findMostSimilar();


  //c = get(0,0,Pic.width, Pic.height);

}




function draw() {
  //background(220);

  //fill(c);
  //noStroke();
  //rect(25, 25, 50, 50);

  //  image(c,0,0,width,height);
  //Tester();


}


class Button {
  x;
  y;

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }


  show() {

    noStroke();
    fill(color(random(255), random(255), random(255)));
    circle(this.x, this.y, 55);
  }

}

function mousePressed() {

  // pixelation_level = slider.value();

  Pixelate();
}



function Pixelate() {

  //pixelation_level = 5;
  image(Pic, 0, 0, width, height);
  loadPixels();
  for (let x = 0; x < width; x += pixelation_level) {
    for (let y = 0; y < height; y += pixelation_level) {

      let i = (x + y * width) * 4;

      let r = Pic.pixels[i + 0];
      let g = Pic.pixels[i + 1];
      let b = Pic.pixels[i + 2];
      let a = Pic.pixels[i + 3];
      PixelColors.push(color(r, g, b, a));

      fill(color(r, g, b, a));
      //fill('red');
      square(x, y, pixelation_level);
    }

  }

}




function findMostSimilar() {


  Similars = [];
  for (let j = 0; j < PixelColors.length; j++) {

    let ind = 0;
    let d = 0;
    let Best =100;

    let r1 = red(PixelColors[j]);
    let g1 = green(PixelColors[j]);
    let b1 = blue(PixelColors[j]);

    for (let i = 0; i < Pics_Dom.length; i++) {

      let r2 = red(Pics_Dom[i]);
      let g2 = green(Pics_Dom[i]);
      let b2 = blue(Pics_Dom[i]);

      d = sqrt(((r2 - r1) * 0.3) ^ 2 + ((g2 - g1) * 0.59) ^ 2 + ((b2 - b1) * 0.11) ^ 2);

      if (d < Best) {
        ind = i;
        Best = d;
      }
    }
    Similars.push(ind);
  }

  return Similars;
}


function findDominance(img) {


  img.resize(width, height);

  let avg_Red = 0;
  let avg_Green = 0;
  let avg_Blue = 0;

  image(img, 0, 0, width, height);
  img.loadPixels();
  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {

      // Calculate the pixel index
      let index = (y * img.width + x) * 4;

      // Sum the red, green, and blue values
      avg_Red += img.pixels[index + 0];
      avg_Green += img.pixels[index + 1];
      avg_Blue += img.pixels[index + 2];

    }
  }


  // We're finished working with pixels so update them
  //Pic.updatePixels();

  // Get the total number of pixels
  // Divide by 4 because the total number of pixels = pixels * numColorChannels 
  let numPixels = img.pixels.length / 4;

  // divide the totals by the number of pixels to find the average.
  avg_Red /= numPixels;
  avg_Green /= numPixels;
  avg_Blue /= numPixels;

  fill(avg_Blue, avg_Green, avg_Red);
  noStroke();
  imageMode(CORNER);
  square(width / 2, height / 2, 50);
  return color(avg_Blue, avg_Green, avg_Red);

}


function findDoms() {
  Pics_Dom = [];
  for (let i = 0; i < Pictures.length; i++) {
    print(i);
    if (Pictures[i] != "undefined")
      Pics_Dom.push(findDominance(Pictures[i]));

  }
}


function ShowNew()
{

  let counter = 0;
  for (let x = 0; x < width; x += pixelation_level) {
    for (let y = 0; y < height; y += pixelation_level) {

      let i = (x + y * width) * 4;

      fill(Pics_Dom[Similars[counter]]);
      image(Pictures[Similars[counter]],x,y,pixelation_level,pixelation_level)
      //square(x, y, pixelation_level);
      counter++;
    }

  }


}