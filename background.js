/*chrome.runtime.onInstalled.addListener(() => {
    console.log("onInstalled...");
  
    // create alarm after extension is installed / upgraded
    chrome.alarms.create("startRequest", { periodInMinutes: 4 });
    startRequest();
  });
  
  chrome.alarms.onAlarm.addListener((alarm) => {
    startRequest();
  });
 
  async function startRequest() {
    const response = await fetch("https://api.quotable.io/random");
    const newData = await response.json();
    const data = `${newData.content} —${newData.author}`;
    console.log(data);
  
    var options = {
      title: "Random Quotes",
      message: data,
      iconUrl: "/images/favicon.png",
      type: "basic",
      isClickable: true,
    };
    chrome.notifications.create("", options);
  }
 */
  var flagShortsAccessed=false;
  var startTime;
  var counter=0;
  chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.clear(function() {
        var error = chrome.runtime.lastError;
        if (error) {
            console.error(error);
        }
    });

  });
/*
  chrome.storage.onChanged.addListener((changes, namespace) => {
    for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
      console.log(
        `Storage key "${key}" in namespace "${namespace}" changed.`,
        `Old value was "${oldValue}", new value is "${newValue}".`
      );
    }
  });
  */
  chrome.storage.onChanged.addListener((changes, namespace) => {
    for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
        if (newValue>=10){
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                var activeTab = tabs[0];
                var activeTabId = activeTab.id; 
                sendMessage(activeTabId,'hideShorts');

             });
        }
    }
  });
  chrome.runtime.onMessage.addListener(data => {
    if (data.type === 'notification') {
      chrome.notifications.create('', data.options);
    }
  });

  chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){

    if(counter==30){
        sendMessage(tab.id,"stopScrolling");
        counter=0;
    }
    if(changeInfo.url != null && tab.url.startsWith('https://www.youtube.com/shorts/')){
        /*chrome.scripting.executeScript({
            target: {tabId: tabId, allFrames: true},
            files:['timer.js']
        });
        */
        if (!flagShortsAccessed){
            startTime=new Date();
            showNotification();
            counter=0;
        } else {
        counter=counter+1;
        startTime=saveTime(tabId,startTime);
        }
  
    }

    else if (!tab.url.startsWith('https://www.youtube.com/shorts/')){
        flagShortsAccessed=false;
        if(startTime){
            saveTime(tab.id,startTime);
            startTime=false;
        }     
    }
  
  });
  
  function saveTime(tabID,startTime){
    endTime=new Date();
    var timeDiff = endTime - startTime; //in ms
    timeDiff /= 1000;
    var seconds = Math.round(timeDiff);
    sendMessage(tabID, 'time',seconds);
    return endTime;
  }
  function showNotification() {
    var options = {
        title: "Digital Wellbeing Reminder",
        message: "YouTube is amazing. Remeber to use Shorts properly!",
        iconUrl: "/images/tree.png",
        type: "basic",
        isClickable: true,
      };
      chrome.notifications.create("", options);
      flagShortsAccessed=true;
  
  }
  function sendMessage(tabID,action,message){
    chrome.tabs.sendMessage(tabID, { action: action,message: message });

  }

  function getCurrentTimestamp () {
    return Date.now()
  }
  