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
