const createElement = (array)=>{
    const htmlElement = array.map((el)=>`<span class="btn">${el}</span>`);
    console.log(htmlElement.join(" || "));
}


const synonim =["hallo","hi","ali"]
createElement(synonim);