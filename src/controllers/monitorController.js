
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

const welcomeMessage = (req, res) =>{
    return res.status(200).json({message: "Welcome to Pulse Check API"})
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

module.exports = {welcomeMessage, registerMonitor}