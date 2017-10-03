const r = 600/25.4; //ratio: 600 dpi / 25.4mm per inch
const rs = 72/25.4 *2; //ratio on the screen: 72 dpi / 24.4mm per inch ()*2 because it looks nicer...)

var printService;
var labels;

$(function(){
	loadConfig()
});

function getUrlParameter(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  var results = regex.exec(location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

function loadConfig() {
	var configFile = getUrlParameter("config")
	var jqxhr = $.getJSON( "conf/"+configFile, function(config) {
		printService = config.printService;
		labels = config.labels;

		//Each label
		for (var i = 0; i < labels.length; i++) {
			initLabel(i, labels[i])
			var labelConfig = labels[i];
			//each element within the label
			drawBorder(i);
			for (var j = 0; j < labelConfig.elements.length; j++) {
				var element = labelConfig.elements[j];
				var paramName = element.content
				var value  = getParameterByName(paramName)
				if ( element.type =="text") {
					addText(i, value, element.x, element.y, element.w, element.fontSize)
				}
				if ( element.type =="qrcode") {
					addQrCode(i, value, element.x, element.y, element.h, element.w)
				}
			}
		}
  })
  .fail(function( jqxhr, textStatus, error ) {
    var err = textStatus + ", " + error;
    console.log( "Request Failed: " + err );
  })
}

function getParameterByName(name, url) {
	if (!url) {
		url = window.location.href;
	}
	name = name.replace(/[\[\]]/g, "\\$&");
	var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
		results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function splitText(ctx,text,maxPxLength) {
	var textLines = text.split("\n");
	var data = [];
	for (var j = 0; j < textLines.length; j++) {
		var wa=textLines[j].split(" "),
        lastPhrase=wa[0],
        measure=0,
        splitChar=" ";
    if (wa.length <= 1) {
			data.push(lastPhrase);
    }
    for (var i=1;i<wa.length;i++) {
        var w=wa[i];
        measure=ctx.measureText(lastPhrase+splitChar+w).width;
        if (measure<maxPxLength) {
            lastPhrase+=(splitChar+w);
        } else {
					data.push(lastPhrase);

            lastPhrase=w;
        }
        if (i===wa.length-1) {
						data.push(lastPhrase);
            break;
        }
    }
	}
  return data
}

function getQRCodeImage(id ,text) {
	//draw QR Code
	qrId = "qr_"+id
	jQuery('#'+qrId).qrcode({
		text	: text,
		width : 256,
		height: 256,
		type: "qrcode",
		correctLevel: QRErrorCorrectLevel.H
	});
	var barcodeCanvas = document.getElementById(qrId).childNodes[0];
	var barcode = barcodeCanvas.toDataURL();
	document.getElementById(qrId).style.display = 'none'; // Hide
	return barcode;
}

function initLabel(id, config) {
	//create row
	var rowId = "row"+id
	var row = document.createElement('div');
	row.id = rowId;
	row.className = "row margin well";
	document.getElementById("main").appendChild(row);

	//create Desc
	var descColId = "descCol_"+rowId
	var descCol = document.createElement('div');
	descCol.id = descColId;
	descCol.className = 'col-sm-3 vcenter';
	descCol.innerHTML = "<blockquote>"+config.name+"</blockquote>";
	document.getElementById(rowId).appendChild(descCol);

	//create col2
	var col1Id = "col1_"+rowId
	var col1 = document.createElement('div');
	col1.id = col1Id;
	col1.className = 'col-sm-7';
	document.getElementById(rowId).appendChild(col1);

	//create label
	var labelId = "label_"+id
	var label = document.createElement('div');
	label.id = labelId;
	label.className = 'img-thumbnail';
	document.getElementById(col1Id).appendChild(label);

	//create canvas
	var canvasId = "canvas_"+labelId
	var canvas = document.createElement('canvas');
	canvas.id = canvasId;
	canvas.width = config.width * r;
	canvas.height = config.height * r;

	canvas.style.width = config.width * rs + 'px';
	canvas.style.height = config.height * rs + 'px';

	canvas.style.backgroundColor = "white"
	document.getElementById(labelId).appendChild(canvas);

	//create col2
	var col2Id = "col2_"+rowId
	var col2 = document.createElement('div');
	col2.id = col2Id;
	col2.className = 'col-sm-2 vcenter';
	document.getElementById(rowId).appendChild(col2);

	//Print Button
	var printId = "print_"+col2Id
	var print = document.createElement('button');
	print.id = printId;
	print.className = 'btn btn-primary btn-lg';
	print.innerHTML = 'Print';
	print.onclick = function(){
		printLabel(canvasId, config);
	};
	document.getElementById(col2Id).appendChild(print);

	var qrId = "qr_"+id
	var qr = document.createElement('div');
	qr.id = qrId;
	document.getElementById("main").appendChild(qr);
}

function addQrCode(id, text, x, y, h, w) {
	divId = "label_"+id
	canvasId = "canvas_"+divId

	var cnvs = document.getElementById(canvasId);
	var ctx = cnvs.getContext("2d");

	var qrImage = new Image();
	qrImage.src = getQRCodeImage(id, text);

	qrImage.onload = function() {
		ctx.drawImage(qrImage, x*r, y*r, h*r,w*r);
	};
}

function drawBorder(id) {
	if (labels[id].border != null && labels[id].border)
	{
		divId = "label_"+id
		canvasId = "canvas_"+divId

		var c = document.getElementById(canvasId);
		var ctx = c.getContext("2d");
		ctx.lineWidth=3;
		ctx.rect(3, 3, c.width-6, c.height-6);
		ctx.stroke();
	}
}

function addText(id, text, x, y, w, fontsize) {
	divId = "label_"+id
	canvasId = "canvas_"+divId

	var c = document.getElementById(canvasId);
	var ctx = c.getContext("2d");
	ctx.font = (fontsize*r)+"px Arial"
	textLines = splitText(ctx,text,w*r)

	for (var i = 0; i < textLines.length; i++) {
		ctx.fillText(textLines[i], x*r, (y + (fontsize*1.1)*(i+1))*r);
	}
}

function printLabel(canvasId, config) {
	var c = document.getElementById(canvasId);
	var ctx = c.getContext("2d");
	//Rotate 90° because the printer needs vertical orientation
	ctx.rotate(-Math.PI/2);
	var image = c.toDataURL();
	var url = printService+config.label;
	console.log(url);

	$.ajax({
    type: "POST",
    url: url,
    data: {
        base64data : image
    }
	});
}
