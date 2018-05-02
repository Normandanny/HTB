var textName = prompt("Please enter your replacement text", "Harry Potter");

if (textName != null) {
    var newElement = document.createElement('div');
    newElement.value = textName;
    console.log(newElement.value);
}