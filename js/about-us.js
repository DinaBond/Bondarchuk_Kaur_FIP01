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