
const monitors = {};

function startTimer(id){
    const monitor = monitors[id];
    monitor.timer = setTimeout(()=>{
        monitor.status = "down";
        monitor.downsince = Date.now();

        console.log(JSON.stringify({
            Alert: `Device ${id} is down`,
            time: new Date().toISOString()
        }));

    }, monitor.timeout * 1000)
}

const registerMonitor = (res, req) =>{
    const {id, timeout, alert_email} = req.body

    if(!id || !timeout || !alert_email)
        res.status(400).json({message: "Must input id, timeout and alert email to start monitoring the device"})

    monitor[id] = {
        id,
        timeout,
        alert_email,
        status: "running",
        timer: null
    }

    startTimer(id)
    res.status(201).json({message: `Now watching ${id}. Timer: ${timeout}s`})

}

module.exports = {registerMonitor}