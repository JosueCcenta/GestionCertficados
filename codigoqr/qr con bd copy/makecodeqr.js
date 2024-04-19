let codigosqr =[];
var form = document.getElementById("text") 
var qrcode = new QRCode(document.getElementById("qrcode"), {
    width : 100,
    height : 100
});

function makeCode () {		
    var elText = document.getElementById("text");
    qrcode.makeCode(elText.value);

}

function addArray(array,elemento){
    array.push({ qr: elemento })
    var json_content = JSON.stringify(codigosqr,null,2);
    console.log(json_content)
}

form.oninput = function() {
    makeCode();
    var imagenurl =document.getElementById('qrcoding').src;
    addArray(codigosqr,imagenurl);
};
