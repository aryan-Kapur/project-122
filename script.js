let x = 0;
let y = 0;
let screenWidth = 0;
let screenHeight = 0;
let apple = "";
let speak_data = "";
let to_number = "";
let draw_apple = "";


function preload() {
    apple = loadImage('apple.png');
    // console.log(apple);
    // const apple = new Image(40, 40);
    // apple.src = 'apple.png';
}


let SpeechRecognition = window.webkitSpeechRecognition;
let recognition = new SpeechRecognition();

    function start() {
        recognition.start();
        document.querySelector('#status').innerHTML = "Recognition has started. Try speaking in the microphone.";
    }

        recognition.onresult = function(event) {
            let content = event.results[0][0].transcript;
            console.log(content);
            // let confidence = event.results[0][0].confidence;
            // console.log(confidence);

        to_number = Number(content);
            if(Number.isInteger(to_number)) {
                document.querySelector('#status').innerHTML = `Started drawing ${to_number} apples.`;
                draw_apple = "set";
            }
                else {
                    document.querySelector('#status').innerHTML = "Your speech has not been recognised as a number";
                }
        }


        function setup() {
            screenWidth = window.innerWidth;
            screenHeight = window.innerHeight;
            console.log(screenWidth);
            console.log(screenHeight);
            canvas = createCanvas(screenWidth - 100, screenHeight - 150);
            canvas.position(50,140);
        }

            function draw() {
                if(draw_apple == "set") {
                    for(i = 1; i <= to_number; i++) {
                        x = Math.floor(Math.random() * 1180);
                        y = Math.floor(Math.random() * 400);
                        image(apple,x,y,50,50);
                    }
                    document.querySelector('#status').innerHTML = to_number + " apple's drawn"
                    draw_apple = "";

                    var synth = window.speechSynthesis;
                    speak_data = `${to_number} apple's drawn.`;
                    var UtterThis = new SpeechSynthesisUtterance(speak_data);
                    synth.speak(UtterThis);
                }
            }
