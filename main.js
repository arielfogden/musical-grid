window.addEventListener("DOMContentLoaded", function () {
  //maps each color to a pitch
  let colorsAndSounds = [
    { color: "pink", sound: "C4" },
    { color: "blue", sound: "A4" },
    { color: "lightblue", sound: "G4" },
    { color: "yellow", sound: "E4" },
    { color: "orange", sound: "G3" },
  ];
  //create a synth and connect it to the main output (your speakers)
  const synth = new Tone.Synth().toDestination();

  //an array of the index for the color and sound mappings for each grid item
  let gridItems = [];

  function activateGridItem(gridItemIndex) {
    //finding in the list of grid items the index for the associated color and sound
    let activeGridItem = gridItems[gridItemIndex];
    //determining what the sound is based on the colors and sounds index for the grid item
    let activeSound = colorsAndSounds[activeGridItem].sound; 
    synth.triggerAttackRelease(activeSound, "8n");
    let gridElements = document.querySelectorAll(".grid-item")
    let activeGridElement = gridElements.item(gridItemIndex)
    console.log(gridElements)
    gridElements.forEach(function(element){
      element.classList.remove("active")
    })
    activeGridElement.classList.add("active")


  }

  let position = { x: 0, y: 0 };
  function handlePositionChange() {
    let gridItemIndex = position.y * 5 + position.x;
    activateGridItem(gridItemIndex)

  }

  window.addEventListener("keyup", function (event) {
    if (event.key == "ArrowUp" && position.y > 0) {
      position.y = position.y - 1;
      handlePositionChange();
    } else if (event.key == "ArrowDown" && position.y < 4) {
      position.y = position.y + 1;
      handlePositionChange();
    } else if (event.key == "ArrowLeft" && position.x > 0) {
      position.x = position.x - 1;
      handlePositionChange();
    } else if (event.key == "ArrowRight" && position.x < 4) {
      position.x = position.x + 1;
      handlePositionChange();
    }
  });

  //looping through every grid item one at a time and choosing a random color and associated sound
  document.querySelectorAll(".grid-item").forEach(function (element, index) {
    //picking a random index based on available colors and sounds
    let colorIndex = Math.floor(Math.random() * colorsAndSounds.length);
    //use the index to determine the color and sound for the grid item
    let objectToUse = colorsAndSounds[colorIndex];
    //changing the grid item color to the ^
    element.style.background = objectToUse.color;
    //adding the chosen index for the grid item to our array
    gridItems.push(colorIndex);

    element.addEventListener("click", function () {
      //activateGridItem(index);
      position.y = Math.floor(index / 5)
      position.x = index % 5
      handlePositionChange()
    });
  });
});
