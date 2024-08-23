// Function to loop over inputs and get the values
function fcnGetValues(class_name) {
    let data = {};    

    document.querySelectorAll(`.${class_name}`).forEach(function(item) {
        data[item.name] = item.value;
    });

    return data;
}



// Exports
export {
    fcnGetValues
}