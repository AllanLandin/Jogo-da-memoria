document.addEventListener('DOMContentLoaded', () => {
    const HANKUL = 'hank-list'
    let data = JSON.stringify(localStorage)
    let dataParsed = JSON.parse(data)

    dataParsed =  Object.entries(dataParsed).sort((a, b) => a[1]-b[1])
    let hankUl = document.getElementsByClassName(HANKUL)[0]
    dataParsed.slice(10)
    
    for (let i = 0; i < dataParsed.length; i++){
        let li = document.createElement('li');
        li.innerHTML = `<span>${i + 1} - </span> ${dataParsed[i][0]} - ${dataParsed[i][1]} moves`
        hankUl.appendChild(li);        
    }
})