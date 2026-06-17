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
