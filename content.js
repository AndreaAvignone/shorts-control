/*let url=window.location.toString();
if (url.startsWith('https://www.youtube.com/shorts/')){
chrome.runtime.sendMessage('', {
    type: 'notification',
     options :{
      title: "Digital Wellbeing Reminder",
      message: "YouTube is amazing. Remeber to use is properly!",
      iconUrl: "/images/tree.png",
      type: "basic",
      isClickable: true,
    }
  });
}
*/
chrome.runtime.onMessage.addListener(function (msg) {
    /* We received a message, let's do as instructed */
    if (msg.action === 'stopScrolling') {
        alert('It looks like you are compulsively scrolling. Think about taking a break!');
    }
    else if (msg.action==='time'){
        setTime(msg.message);
    }
    else if (msg.action==='hideShorts'){
        hideShorts();
        chrome.storage.local.set({ hideShortsFlag: true});
        alert("Your time on Shorts is over for today!");
        window.location = 'https://www.youtube.com';
    }
});
async function setTime(new_time) {
    let { time = Object.keys(['time']) } = await chrome.storage.local.get('time');
    chrome.storage.local.set({ time: parseInt(time)+new_time });
}
function hideShorts(){
    try{
    document.querySelector('[title="Shorts"]').remove();
    removeElementsByClass('ytd-rich-section-renderer');
    }
    catch{
        console.log("No Shorts");
    }
}

function removeElementsByClass(className){
    const elements = document.getElementsByClassName(className);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}
async function getHiddenFlag() {
    let { hideShortsFlag = Object.keys(['hideShortsFlag']) } = await chrome.storage.local.get('hideShortsFlag');
    if (hideShortsFlag){
        hideShorts();
    }
}
getHiddenFlag();
function blockRequest(details) {
    return {cancel: true};
 }
