function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}
// [ধাপ ১]: শব্দের সমার্থক শব্দগুলোর (Synonyms) অ্যারে থেকে ছোট ছোট বাটন (HTML) তৈরি করার জন্য সাহায্যকারী ফাংশন
const createElement = (array)=>{
    const htmlElement = array.map((el)=>`<span class="btn">${el}</span>`);
   return (htmlElement.join(' '));
}

// [ধাপ ২]: ডাটা লোড হওয়ার সময় স্পিনার দেখানো বা লুকানোর ফাংশন
const manageSping = (status) => {
    if (status == true) {
        // যদি status true হয়, তারমানে ডাটা লোড হচ্ছে: স্পিনার দেখাবে, কার্ড কন্টেইনার লুকাবে
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("word_container").classList.add("hidden");
    } else {
        // যদি status false হয়, তারমানে লোডিং শেষ: কার্ড কন্টেইনার দেখাবে, স্পিনার লুকাবে
        document.getElementById("word_container").classList.remove("hidden");
        document.getElementById("spinner").classList.add("hidden");
    }
}



// [ধাপ ৩]: ওয়েবসাইট রান হওয়া মাত্রই API থেকে সব লেসন (Levels) এর ডাটা লোড করার মেইন ফাংশন
const lessoneDataLode = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then(res => res.json())
        .then(data => displayLesson(data.data)); // ডাটা সফলভাবে আসলে displayLesson ফাংশনে পাঠানো হচ্ছে
};

// [ধাপ ৪]: আগে থেকে একটি বাটনে active কালার থাকলে, নতুন বাটনে ক্লিকের সময় আগের বাটনগুলোর active ক্লাস রিমুভ করার ফাংশন
const removeActive=()=>{
    const lessoneBtn = document.querySelectorAll(".lessoneBtn");
    lessoneBtn.forEach((btn)=>btn.classList.remove("btn-active"))
};

// [ধাপ ৫]: কোনো নির্দিষ্ট লেসন বাটনে (যেমন: Lesson - 1) ক্লিক করলে সেই লেসনের শব্দগুলো API থেকে আনার ফাংশন
const loadLabelWords = (id) => {
    manageSping(true) // ডাটা খোঁজা শুরু হয়েছে, তাই স্পিনার চালু করা হলো
        const url = `https://openapi.programming-hero.com/api/level/${id}`;
        console.log(url);
        fetch(url)
            .then(res => res.json())
            .then(data =>{

            removeActive(); // আগের সব বাটনের অ্যাক্টিভ ক্লাস মুছে ফেলা হলো
            const clickBtn = document.getElementById(`lessonBtn-${id}`); // বর্তমানে যে বাটনে ক্লিক করা হয়েছে তাকে ধরা হলো
            clickBtn.classList.add("btn-active"); // বর্তমান ক্লিক করা বাটনকে হাইলাইট (Active) করা হলো
            displayLabelwords(data.data) // লেসনের শব্দগুলো দেখানোর জন্য displayLabelwords ফাংশনে পাঠানো হলো
        });
};

// [ধাপ ৬]: শব্দের ইনফো (i) বাটনে ক্লিক করলে ঐ নির্দিষ্ট শব্দের আইডি দিয়ে তার সম্পূর্ণ ডিটেইলস API থেকে নিয়ে আসার ফাংশন
const lodeWordDetils= async(id)=>{
    const url=`https://openapi.programming-hero.com/api/word/${id}`;
    const res = await fetch(url)
    const deteles = await res.json()
     displayWordDetls(deteles.data); // শব্দের বিস্তারিত মডালে দেখানোর জন্য পাঠানো হলো
};

// [ধাপ ৭]: শব্দের বিস্তারিত তথ্যগুলো মডালের (Modal) ভেতর সুন্দর করে সাজিয়ে মডালটি ওপেন করার ফাংশন
const displayWordDetls = (word)=>{
    console.log(word)
    const detealsBox = document.getElementById("deteals_container")
    // মডালের ভেতরের HTML তৈরি করা হচ্ছে
    detealsBox.innerHTML=`
     <div>
        <h2 class="text-2xl font-bold">${word.word}(<i class="fa-solid fa-microphone-lines"></i>:${word.pronunciation})</h2>
    </div>
    <div>
        <h2 class="font-bold">Meaning</h2>
        <p>${word.meaning}</p>
    </div>
    <div>
        <h2 class="font-bold">Example</h2>
        <p>${word.sentence}</p>
    </div>
    
    <div>
        <h2 class="font-bold">সমার্থক শব্দ গুলো</h2>
        <div>${createElement(word.synonyms)}</div> </div>
    `;
    // DaisyUI মডালটি স্ক্রিনে দেখানোর কমান্ড
    document.getElementById("my_words_modal").showModal();
}

// [ধাপ ৮]: কোনো লেসনের সবগুলো শব্দ কার্ড (Card) আকারে স্ক্রিনে তৈরি করে দেখানোর ফাংশন
const displayLabelwords = (words) => {
    const wordContainer = document.getElementById("word_container");
    wordContainer.innerHTML = ""; // আগের লেসনের শব্দগুলো মুছে কন্টেইনার খালি করা হলো

    // যদি ঐ লেসনে কোনো শব্দ বা vocabulary না থাকে (ফাঁকা থাকে)
    if (words.length === 0) {
        wordContainer.innerHTML = `
            <div class="col-span-full space-y-3">
                <img src="./assets/alert-error.png" alt="No Vocabulary Found" class="mx-auto">
                <p class="font-bold text-gray-400 bangla_font">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                <h2 class="font-extrabold text-2xl bangla_font">নেক্সট Lesson এ যান</h2>
            </div> 
        `;
        manageSping(false); // স্পিনার বন্ধ করা হলো
        return; // কোড এখানেই শেষ করে দেওয়া হলো যেন নিচে আর না যায়
    }

    // যদি ডাটা থাকে, তবে লুপ চালিয়ে প্রতিটি শব্দের জন্য একটি করে কার্ড তৈরি হবে
    words.forEach(word => {
        const wordDiv = document.createElement("div");
        wordDiv.innerHTML = `
            <div class="bg-white rounded-lg shadow-md py-10 px-5 space-y-5 h-full flex flex-col justify-between">
                <h2 class="font-bold text-2xl">${word.word ? word.word:"word is not available"}</h2>
                <p class="text-gray-600 font-semibold">${word.meaning ? word.meaning:"meaning is not available"} / ${word.pronunciation ? word.pronunciation:"pronunciation is not available"}</p>
                <div class="font-medium text-2xl bangla_font">"${word.pronunciation ? word.pronunciation:"pronunciation is not available"}"</div>

                <div class="justify-between text-center flex">
                    <button onclick="lodeWordDetils('${word.id}')" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF]"><i class="fa-solid fa-circle-info"></i></button>
                    <button onclick="pronounceWord('${word.word}')" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF]"><i class="fa-solid fa-volume-high"></i></button>
                </div>
            </div>
        `; 
        wordContainer.append(wordDiv); // কন্টেইনারে কার্ডটি যোগ করা হলো
    });
   manageSping(false); // সব কার্ড বসানো শেষ হলে স্পিনার বন্ধ করা হলো
};

// [ধাপ ৯]: প্রথমবার এপিআই থেকে আসা সব লেসন বাটন (যেমন: Lesson 1, Lesson 2) স্ক্রিনের উপরে তৈরি করার ফাংশন
const displayLesson = (lessons) => { 
    console.log("lessons", lessons);

    const levelContainer = document.getElementById("lessone_container");
    levelContainer.innerHTML = ""; // কন্টেইনার খালি করা হলো

    // লুপ চালিয়ে প্রতিটি লেসনের জন্য আলাদা আলাদা বাটন তৈরি করা হচ্ছে
    for (let lesson of lessons) { 
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
            <button id="lessonBtn-${lesson.level_no}"
             onclick="loadLabelWords(${lesson.level_no})" class="btn btn-outline btn-primary lessoneBtn">
                <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}
            </button>
        `;

        levelContainer.append(btnDiv); // লেসন বাটনটি মূল কন্টেইনারে যোগ করা হলো
    }
};


// [ধাপ ১০ - শুরুর পয়েন্ট]: ওয়েবসাইটটি ব্রাউজারে ওপেন হওয়া মাত্রই এই ফাংশনটি নিজে নিজে কল হবে এবং পুরো প্রসেস চালু হবে
lessoneDataLode();

document.getElementById("serchBatton").addEventListener("click",()=>{
   const input = document.getElementById("serchInput");
    const serchValue = input.value.trim().toLowerCase();
    console.log(serchValue);

    fetch("https://openapi.programming-hero.com/api/words/all")
   .then((res) => res.json())
   .then((data) => {
  const allword = data.data;
   console.log(allword);

   const filterWord = allword.filter((word)=>
    word.word.toLowerCase().includes(serchValue)

    );
     displayLabelwords(filterWord);
   });

 

     });
