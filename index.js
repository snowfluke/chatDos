const $ = (el) => document.querySelector(el);

const generateText = ({ nama, kelas, semester, salam, sapa, tipe, keperluan }) => `Assalamu'alaikum wr. wb.%0ASelamat ${salam}, ${sapa}.%0A%0AMohon maaf mengganggu waktunya, saya ${nama} dari kelas ${kelas} semester ${semester}, ingin ${tipe} terkait ${keperluan}.%0A%0ATerima kasih banyak atas waktunya, ${sapa}.%0A
Wassalamu'alaikum wr. wb.`

const textCase = ({ str, eachWord = false }) =>
	(eachWord ? str.split(" ") : str.split("."))
		.map(
			(el) =>
				el.trim().substring(0, 1).toUpperCase() +
				(eachWord
					? el.trim().substring(1).toLowerCase()
					: el.trim().substring(1))
		)
		.join(eachWord ? " " : ". ")
		.trim();

const closeTooltip = () => {
	$(".tooltip").style.opacity = "0";
	$(".tooltip").style.display = "none";
	$(".tooltipContent").innerHTML = "";
};

const showTooltip = (text) => {
	$(".tooltip").style.display = "grid";
	$(".tooltip").style.opacity = "0.9";
	$(".tooltipContent").innerHTML = text;
	setTimeout(closeTooltip, 2000);
};


const updateData = () => {
	let prev = JSON.parse(localStorage.getItem('chatdosPrev'))
	if(prev == null) return
	console.log(prev)
	
	$('.nama').value = prev.nama
	$('.kelas').value = prev.kelas
	$('.semester').value = prev.semester
	$('.salam').value = prev.salam
	$('.sapa').value = prev.sapa
	$('.tipe').value = prev.tipe
	$('.nomer').value = prev.nomer
	$('.keperluan').value = prev.keperluan
};

const s = url => {
	let a = document.createElement('a');
	a.setAttribute('href', url);

	a.style.display = 'none';
	document.body.appendChild(a);

	a.click();
	document.body.removeChild(a);
	
	return;
}

const reset = () => {
	$('.nama').value = ''
	$('.kelas').value = ''
	$('.semester').value = ''
	$('.salam').value = ''
	$('.sapa').value = ''
	$('.tipe').value = ''
	$('.nomer').value = ''
	$('.keperluan').value = ''
}

const kirim = () => {
	if(
	$('.nama').value.length == 0 ||
	$('.kelas').value.length == 0 ||
	$('.semester').value.length == 0 ||
	$('.salam').value.length == 0 ||
	$('.sapa').value.length == 0 ||
	$('.tipe').value.length == 0 ||
	$('.nomer').value.length == 0 ||
	$('.keperluan').value.length == 0
	) return showTooltip('Masih ada input yang kosong')
	
	let msg = {
		nama: textCase({ str: $('.nama').value, eachWord: true}),
		kelas: $('.kelas').value,
		semester: $('.semester').value,
		salam: $('.salam').value,
		sapa: $('.sapa').value,
		tipe: $('.tipe').value,
		nomer: $('.nomer').value,
		keperluan: $('.keperluan').value
	}

	let text = generateText(msg)
	let contact = msg.nomer
	showTooltip('Generated!')
	localStorage.setItem('chatdosPrev', JSON.stringify(msg))
	
	let api = `https://api.whatsapp.com/send?phone=${contact}&text=${text}`;
	s(api)
}

updateData();
