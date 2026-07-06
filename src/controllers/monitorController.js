
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


const registerMonitor = (req, res) =>{
    const {id, timeout, alert_email} = req.body

    if(!id || !timeout || !alert_email)
        return res.status(400).json({message: "Must input id, timeout and alert email to start monitoring the device"})

    monitors[id] = {
        id,
        timeout,
        alert_email,
        status: "running",
        timer: null
    }

    startTimer(id)
    return res.status(201).json({message: `Now watching ${id}. Timer: ${timeout}s`})

}

const heartbeat = (req, res) => {
    const monitor = monitors[req.params.id];

    if (!monitor)
        return res.status(404).json({message: "Monitor not found"});

    // My Developer's choice - To revive a device that is down automatically
    const wasDown = monitor.status === "down";

    if (wasDown){
        console.log(JSON.stringify({
            Recovery : `Device ${req.params.id} is back online!`,
            time: new Date().toISOString(),
            downtime: Math.round((Date.now() - monitor.downsince) / 1000)
        }));
        delete monitor.downsince;
    }

    clearTimeout(monitor.timer);
    monitor.status = "running";
    startTimer(req.params.id);

    return res.status(200).json({message: wasDown ? "Welcome back! Monitoring resumed.": "Timer reset"});

}

const pauseMonitor = (req, res) =>{
    const monitor = monitors[req.params.id]

    if(!monitor)
        return res.status(404).json({message: "Monitor not found"})

    clearTimeout(monitor.timer)
    monitor.status = "Paused"
    return res.status(200).json({message: "Monitor paused. No alert will fire"})
}

module.exports = {registerMonitor, heartbeat, pauseMonitor}