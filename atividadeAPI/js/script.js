async function estados() {
    const resp = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados`)
    const dados = await resp.json()
    const select = document.querySelector("#estados")
    select.innerHTML = ""
    dados.map(
        function (obj) {
            select.innerHTML += `<option value="${obj.sigla}">${obj.nome}</option>`
        }
    )
};

async function cidades() {
    const estado = document.querySelector("#estados").value
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estado}/municipios`
    const resp = await fetch(url)
    const dados = await resp.json()
    const select = document.querySelector("#cidades")
    select.innerHTML = ""

    dados.map(
        function (obj) {
            select.innerHTML += `<option value="${obj.nome}">${obj.nome}</option>`
        }
    )

};

async function data() {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;
    const date = `${formattedDay}/${formattedMonth}/${year}`;
    document.getElementById('data').value = date;

};
async function hour() {
    const agr = new Date();
    const hora = agr.getHours();
    const minuto = agr.getMinutes();
    const data = document.getElementById('data').value
    document.getElementById("msg").innerHTML = `No dia ${data}  às ${hora}:${minuto} foram coletados os daods climaticos de ${document.getElementById("cidades").value}-${document.getElementById("estados").value} presentes no quadro abaixo:`

}

async function weather() {
    const cidade = document.getElementById('cidades').value;
    const url = `https://api.weatherapi.com/v1/forecast.json?key=768eef924ee140888a200615240511&q=${cidade}&days=1&aqi=yes&alerts=yes&lang=pt`;
    const resp = await fetch(url);
    const dados = await resp.json();
    console.log(dados);
    const qualidadeAR = dados.forecast.forecastday[0].day.air_quality;
    console.log(qualidadeAR);


    const epaIndex = qualidadeAR['us-epa-index'];
    const statusElement = document.querySelector(".status p");

    if (epaIndex == 1) {
        statusElement.innerHTML = "Bom";
    } else if (epaIndex == 2) {
        statusElement.innerHTML = "Moderado";
    } else if (epaIndex == 3) {
        statusElement.innerHTML = "Insalubre para grupos de risco";
    } else if (epaIndex == 4) {
        statusElement.innerHTML = "Insalubre";
    } else {
        statusElement.innerHTML = "Perigoso";
    }


    document.getElementById("co").innerHTML = "co: " + qualidadeAR.co;
    document.getElementById("no2").innerHTML = "no2: " + qualidadeAR.no2;
    document.getElementById("o3").innerHTML = "o3: " + qualidadeAR.o3;
    document.getElementById("pm2_5").innerHTML = "pm2.5: " + qualidadeAR.pm2_5;
    document.getElementById("pm10").innerHTML = "pm10: " + qualidadeAR.pm10;
    document.getElementById("so2").innerHTML = "so2: " + qualidadeAR.so2;


    const horas = dados.forecast.forecastday[0].hour;
    for (let i = 0; i < 25; i++) {
        document.getElementById('previsao').innerHTML += `
        <tr>
            <td>${(horas[i].time).split(" ")[1]}</td>
            <td><img src="${horas[i].condition.icon}" alt="icones"/> <br>${horas[i].condition.text}</td>
            <td>${horas[i].chance_of_rain}%</td>
            <td>${horas[i].temp_c} ºC</td>
            <td>${horas[i].feelslike_c} ºC</td>
            <td>${horas[i].humidity}%</td>
            <td>${horas[i].wind_kph} Kph</td>
        </tr>
        `;
    }
}
























async function salvarPDF(element, filename) {
    //const element = document.getElementById("pdf")
    const opt = {
        margin: [10, 10, 10, 10],
        filename: filename + ".pdf",
        image: { type: 'png', quality: 1 },
        html2canvas: { scale: 1 },
        jsPDF: {
            unit: 'mm',
            format: 'a4',
            orientation: 'landscape',
        }
    }
    html2pdf().set(opt).from(document.getElementById('pdf')).save()
}

