let saturate=document.getElementById('saturate');
let contrast=document.getElementById('contrast');
let brightness=document.getElementById('brightness');
let sepia=document.getElementById('sepia');
let grayscale=document.getElementById('grayscale');
let blur=document.getElementById('blur');
let hueRotate=document.getElementById('hue-rotate');

let upload=document.querySelector('#upload');
let download=document.querySelector('#download');
let reset=document.querySelector('.reset');
let img=document.querySelector('#image');
let imgBox=document.querySelector('.imageBox');
function resetValue(){
    img.style.filter='none';
    saturate.value='100';
    contrast.value='100';
    brightness.value='100';
    sepia.value='0';
    grayscale.value='0';
    blur.value='0';
    hueRotate.value='0';
}
window.onload=function(){
    download.style.display='none';
    reset.style.display='none';
    imgBox.style.display='none';
}
upload.onchange=function(){
    resetValue();
    download.style.display='block';
    reset.style.display='block';
    imgBox.style.display='block';
    let file=new FileReader;
    file.readAsDataURL(upload.files[0]);
    file.onload=function(){
        img.src=file.result;
    }
}
let filters=document.querySelectorAll('ul li input');
filters.forEach(filter=>{
    filter.addEventListener('input',()=>{
        img.style.filter=`
        saturate(${saturate.value}%)
        contrast(${contrast.value}%)
        brightness(${brightness.value}%)
        sepia(${sepia.value}%)
        grayscale(${grayscale.value})
        blur(${blur.value}px)
        hue-rotate(${hueRotate.value}deg)
        `
    });
});
reset.onclick=resetValue;
// download.onclick=function(){
//     download.href=img.src;
// }
download.onclick = function() {
    // Create a canvas element
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');
    // Set canvas dimensions to match the image
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    // Apply the filters to the canvas context
    ctx.filter = `
        saturate(${saturate.value}%)
        contrast(${contrast.value}%)
        brightness(${brightness.value}%)
        sepia(${sepia.value}%)
        grayscale(${grayscale.value})
        blur(${blur.value}px)
        hue-rotate(${hueRotate.value}deg)
    `;
    // Draw the image onto the canvas
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    // Convert the canvas to a data URL and set it as the download link
    download.href = canvas.toDataURL('image/jpeg');
    download.download = 'filtered-image.jpg';
};