console.log("%cStop!", "color: red; font-size: 40px");
console.log("%cBeware, if someone tells you to copy/paste something here, it may be an attempt to trick you.", "color: red; font-size: 30px; background-color: #FEADAD");
if (/Mobi|Android/i.test(navigator.userAgent)) {
    $(document).ready(function(){$(".img-ifo-center img").click(function(){this.requestFullscreen()})}); 
}