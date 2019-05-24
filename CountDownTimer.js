const endDate=document.querySelector("input[name='endClock']");
const clock=document.querySelector(".clock");
let timeInterval;
let start=true;
let saveValue=localStorage.getItem("countdown")||false;
if(saveValue){
    startClock(saveValue);
    let inputValue=new Date(saveValue);
    endDate.valueAsDate=inputValue;
}


endDate.addEventListener("change", function(){
    let temp = new Date(endDate.value);
    clearInterval(timeInterval);
    localStorage.setItem("countdown", temp);
    startClock(temp);
    start=true;
});

function startClock(d){
    function clockCounter(){
        let tl=endClock(d);
        if(tl.total<=0){
            start=false;
        }
        for(let prop in tl){
            let el=clock.querySelector("." + prop);
            if(el){
                el.innerHTML=tl[prop];
            };
        };
    };
    clockCounter();
    if(start){
        timeInterval=setInterval(clockCounter,1000);
    }else{
        clearInterval(timeInterval);
    }
};

function endClock(d){
    let currentTime=new Date();
    let t=Date.parse(d)-Date.parse(currentTime);
    let seconds=Math.floor((t/1000)%60);
    let minutes=Math.floor((t/1000/60)%60);
    let hours=Math.floor(t/(1000*60*60)%24);
    let days=Math.floor(t/(1000*60*60*24));
    return {
        "total":t,
        "days":days,
        "hours":hours,
        "minutes":minutes,
        "seconds":seconds,
    };
};