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
  emotionVideo.style.display = "block";
  loadTxt.style.display = "none";
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
});

stopBtn.addEventListener("click", () => {
  dropImg.classList.remove("dropAni");
  btnGroup.style.display = "none";
  loadTxt.style.display = "block";
});

againExp.addEventListener("click", () => {
  window.location.reload();
});
