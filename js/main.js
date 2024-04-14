(function(){
	"use strict";	
	console.log("fired");

	let button = document.querySelector("#button");
	let burgerCon = document.querySelector("#burger-con");
	const closeIcon = document.getElementById('close-menu-id');

	function hamburgerMenu() {
		burgerCon.classList.toggle("slide-toggle");
		button.classList.toggle("expanded");
	};

	if(closeIcon){
		closeIcon.addEventListener('click', () =>{
			burgerCon.classList.remove('slide-toggle');
			button.classList.remove('expanded');
		})
	}

	// let hamburgerMenu = () => {
	// 	burgerCon.classList.toggle("slide-toggle");
	// 	button.classList.toggle("expanded");
	// };

	button.addEventListener("click", hamburgerMenu, false);		
})();

//Can also be written like this:
//(() => {  })();   


//video 
let video = document.getElementById('main-video');

video.addEventListener('play', function() {
		video.play();
});


//Music mixer 

const dropZones = document.querySelectorAll('.drop-zone');
const disk = document.querySelectorAll('.disk img');
const selectedDisk = [];
let draggedTool;
let diskAudio;
let audioElements = []; 
let volSlider = document.querySelector('#volumeControl');

function dragStart() {
    console.log('started dragging this piece:', this);
    draggedTool = this;
    setTimeout(() => {
        this.classList.add('hide');
    }, 0);
}

function dragOver(e) {
    e.preventDefault();
    console.log('dragged over me');
}

function drop(e) {
    e.preventDefault();
    console.log('dropped something on me');
    const initialParent = draggedTool.parentNode;
    const initialPosition = Array.from(initialParent.children).indexOf(draggedTool);

    if (this.classList.contains('drop-zone')) { 
        if (this.childElementCount === 0) {
            this.appendChild(draggedTool);
            playAudio(draggedTool.id, this);
            draggedTool.classList.remove('hide'); 
        } else {
            console.log('Oops! There is already one musical tool!');
            initialParent.appendChild(draggedTool);
        }
    } else {
        
        const dragZone = document.getElementById('drag-zone');
        dragZone.appendChild(draggedTool);
    }

    return false; 
}



function playAudio(selectedDisk, selectedDropzone) {
    console.log(selectedDisk);
    let diskAudio = document.createElement("audio");    
    diskAudio.src = `audio/${selectedDisk}.wav`;
    diskAudio.load();
    
    const pausedAudio = audioElements.find(audio => audio.src === diskAudio.src);
    if (pausedAudio) {
        diskAudio.currentTime = pausedAudio.currentTime;
        const index = audioElements.indexOf(pausedAudio);
        audioElements.splice(index, 1);
    }
    
    selectedDropzone.appendChild(diskAudio); 
    diskAudio.loop = true;
    diskAudio.play();
    audioElements.push(diskAudio);
}

document.getElementById('pauseButton').addEventListener('click', function() {
    audioElements.forEach(audio => {
        audio.pause(); 
    });
});

document.getElementById('playButton').addEventListener('click', function() {
    audioElements.forEach(audio => {
        audio.play(); 
    });
});

document.getElementById('resetButton').addEventListener('click', function() {
    console.log('this page has been refreshed');
    location.reload();
});

volSlider.addEventListener('input', function() {
    const volume = this.value / 100;
    audioElements.forEach(audio => {
        audio.volume = volume; 
    });
});



disk.forEach(disk => disk.addEventListener("dragstart", dragStart));

dropZones.forEach(zone => {
    zone.addEventListener("dragover", dragOver);
    zone.addEventListener("drop", drop);
});



window.addEventListener("scroll", function() {
    const distance = window.scrollY
    document.querySelector("header").style.transform = `translateY(${distance *
      1}px)`
    document.querySelector(
      ".container"
    ).style.transform = `translateY(${distance * 0.3}px)`
    setTimeout(() => {
      document.querySelector("section h3").classList.add("animate-me")
    }, 400)
  })