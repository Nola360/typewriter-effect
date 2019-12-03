

// constructor function
const TypeWriter = function (txtElement, words, wait = 1500) {
  // this is set to the words thats passed in
  //assign properties using the this function
  this.txtElement = txtElement;
  //set property
  this.words = words;
  //txt represents nothing
  this.txt = '';
  //Need to know which word im on
  this.wordIndex = 0;
  //Change to integer using parseInt
  this.wait = parseInt(wait, 10);
  //Main method of type
  this.type();
  //represents the state if its deleting or not
  this.isDeleting = false;
}

//Type Method

TypeWriter.prototype.type = function () {
  //current index of word
  const current = this.wordIndex % this.words.length;
  console.log(current);
  //Get full text of current word
  const fullText = this.words[current];
  console.log(fullText);
  //check if word is deleting
  if (this.isDeleting) {
    //remove a character
    this.txt = fullText.substring(0, this.txt.length - 1);
  } else {
    //add a character
    this.txt = fullText.substring(0, this.txt.length + 1);
  }

  //Insert Text into element
  this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

  //Initial dynamic Type Speed
  let typeSpeed = 300;

  if (this.isDeleting) {
    typeSpeed = typeSpeed / 3;
  }

  //if word is complete
  if (!this.isDeleting && this.txt === fullText) {
    //Sets a pause at end of typing
    typeSpeed = this.wait;
    //Set delete to true
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    //move to the next word
    this.wordIndex++;
    //pause before start typing
    typeSpeed = 500;

  }

  //run type at a desired pace and how often
  setTimeout(() => this.type(), typeSpeed);
}

//Init on DOM load
document.addEventListener('DOMContentLoaded', init);

//Init App

function init() {
  const txtElement = document.querySelector('.txt-type');
  //this needs to be parsed to be used in JS use JSON.parse
  const words = JSON.parse(txtElement.getAttribute('data-words'));
  const wait = txtElement.getAttribute('data-wait');
  //Init Typewriter
  new TypeWriter(txtElement, words, wait);
}

//ES6 Class

// class TypeWriter {
//   //a constructor is a method that runs when the object is instanciated from the class
//   constructor(txtElement, words, wait = 1500) {
//     this.txtElement = txtElement;
//     this.words = words;
//     this.txt = '';
//     this.wordIndex = 0;
//     this.wait = parseInt(wait, 10);
//     this.type();
//     this.isDeleting = false;
//   }

//   type() {

//     const current = this.wordIndex % this.words.length;
//     const fullText = this.words[current];
//     if (this.isDeleting) {
//       this.txt = fullText.substring(0, this.txt.length - 1);
//     } else {
//       this.txt = fullText.substring(0, this.txt.length + 1);
//     }
//     this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;
//     let typeSpeed = 300;
//     if (this.isDeleting) {
//       typeSpeed = typeSpeed / 3;
//     }
//     if (!this.isDeleting && this.txt === fullText) {
//       typeSpeed = this.wait;
//       this.isDeleting = true;
//     } else if (this.isDeleting && this.txt === '') {
//       this.isDeleting = false;
//       this.wordIndex++;
//       typeSpeed = 500;

//     }

//     //run type at a desired pace and how often
//     setTimeout(() => this.type(), typeSpeed);
//   }
// }