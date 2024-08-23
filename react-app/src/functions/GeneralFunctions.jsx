function fcnSetTimeOut(originalMessage, newMessage, setState, style){
    setState(newMessage);
    style({color:'red'})

    setTimeout(() => {
        setState(originalMessage);
        style({});
    }, 3000);
}


export {
    fcnSetTimeOut
}


