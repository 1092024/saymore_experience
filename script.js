var recordBtn = document.getElementById("recordBtn");
var stopBtn = document.getElementById("stopBtn");
var dropImg = document.getElementById("dropImg");
var btnGroup = document.getElementById("btnGroup");
var loadTxt = document.getElementById("loadTxt");
var emotionVideo = document.getElementById("emotionVideo");
var afterVideo = document.getElementById("afterVideo");
var againExp = document.getElementById("againExp");

var loadElements = document.querySelectorAll("#loadTxt span");
var currentIndex = 0; // 當前正在移動的元素索引
var originalTop = 0; // 上一個元素的原始top值
var lastTop = 0; // 最後一個元素的原始top值

var que = "，請幫我分析這段話的情緒是「喜、怒、哀、懼」這四種情緒中的哪一種，回復一個字"


// 创建语音辨識对象
const recognition = new webkitSpeechRecognition() || new SpeechRecognition();


// 设置一些辨識选项
recognition.lang = 'zh-TW'; // 设置识别语言
recognition.continuous = true; // 设置连续识别

recognition.onstart = function () {
  console.log("start");
}

recognition.onend = function () {
  console.log("end");
}

recognition.onresult = (event) => {
  recognition.stop();
  dropImg.classList.remove("dropAni");
  btnGroup.style.display = "none";
  loadTxt.style.display = "block";
  result = event.results[event.results.length - 1][0].transcript;
  console.log(result);
  emotion_analyze(result);
};



recognition.onerror = (event) => {
  console.error('語音辨識錯誤', event.error);
};

function moveElements() {
  // 將當前正在移動的元素往上移動1像素
  var currentElement = loadElements[currentIndex];
  var currentTop = parseInt(window.getComputedStyle(currentElement).top);
  currentElement.style.position = "relative";
  currentElement.style.top = currentTop - 10 + "px";

  // 恢復上一個元素的位置
  if (currentIndex > 0) {
    var previousElement = loadElements[currentIndex - 1];
    previousElement.style.top = originalTop + "px";
  } else {
    // 如果是第一個元素，則恢復最後一個元素的位置
    var lastElement = loadElements[loadElements.length - 1];
    lastElement.style.top = lastTop + "px";
  }

  // 更新當前正在移動的元素索引，如果到達最後一個元素，則重置索引
  currentIndex++;
  if (currentIndex >= loadElements.length) {
    currentIndex = 0;
  }

  // 保存上一個元素的原始top值
  originalTop = currentTop;

  // 如果當前元素是最後一個元素，則保存最後一個元素的原始top值
  if (currentIndex === loadElements.length - 1) {
    lastTop = parseInt(
      window.getComputedStyle(loadElements[loadElements.length - 1]).top
    );
  }
}

loadTxt.addEventListener("click", () => {

});
emotionVideo.addEventListener("ended", () => {
  emotionVideo.style.display = "none";
  afterVideo.style.display = "block";
});

// 每隔一段時間調用moveElements函數
var intervalId = setInterval(moveElements, 100); // 這裡的1000表示每隔1秒執行一次，你可以根據需要調整間隔時間

recordBtn.addEventListener("click", () => {
  recordBtn.style.display = "none";
  stopBtn.style.display = "block";
  dropImg.classList.add("dropAni");
  recognition.start();
});

againExp.addEventListener("click", () => {
  window.location.reload();
});

function emotion_analyze(text) {
  fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer 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' // 替換成你的 API Key
    },
    body: JSON.stringify({
      "model": "gpt-4", // ChatGPT 模型版本
      "messages": [{ "role": "user", "content": "「" + text + "」" + que }]
    })
  })
    .then(response => response.json())
    .then(data => {
      // 在對話框中顯示 ChatGPT 返回的回應
      var emo = data.choices[0].message.content;
      if (emo != '') {
        emotionVideo.style.display = "block";
        loadTxt.style.display = "none";
      }
      if (emo == "喜") {
        let r = Math.floor(Math.random() * 2);
        emotionVideo.src = "video/happy" + r + ".mp4";
        console.log(emo);
      }
      else if (emo == "怒") {
        let r = Math.floor(Math.random() * 2);
        emotionVideo.src = "video/angry" + r + ".mp4";
        console.log(emo);
      }
      else if (emo == "哀") {
        let r = Math.floor(Math.random() * 2);
        emotionVideo.src = "video/sad" + r + ".mp4";
        console.log(emo);
      }
      else if (emo == "懼") {
        let r = Math.floor(Math.random() * 2);
        emotionVideo.src = "video/fear" + r + ".mp4";
        console.log(emo);
      }
      else {
        let r = Math.floor(Math.random() * 2);
        emotionVideo.src = "video/happy" + r + ".mp4";
        console.log(emo);
      }
    })
    .catch(error => console.error('Error:', error));
}