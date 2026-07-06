# CritMon Servers Inc

### Monitor Lifecycle
![alt text](<Architecture/PC API Diagram.png>)


The diagram shows the four states of a monitor and every transition between them:

1.**Register** - `POST /monitors` creates the monitor and starts its countdown (state: Running).
2.**Running** - a countdown ticks towards zero. Each `POST /monitors/:id/heartbeat` cancels the old timer and start a fresh one.
3.**Down** - if the countdown reaches zero, the system fires an Alert and marks the monitor as down. No request triggers this.
4.**Paused** - `POST /monitors/:id/pause` freezes the timer so no alert fire, the next heartbeat automatically un-pause it

**Developer's Choice:**  the *Down->Running* transition (ie "Hearbeat revives") is my added feature.
The original requirements leaves a monitor down permanently. Here, a heartbeat from recovred device restores monitoring and logs a Recovery event with the measured down time

A heartbeat endpoint is the single reset point for all three state. It reset running, un-pauses Paused and revives Down

# API Documentation

## Pulse-check-API
A dead man's switch for remote devices. Built for CritMon Servers Inc., which monitors solar farms and unmanned weather stations in areas with poor connectivity.  

Most monitoring waits for something to report a failure but a device that loses power can't report anything. Pulse Check inverts the model, every device must send a heartbeat before its countdown expires, and silence itself triggers the alarm. If a registered device stops pinging, the API fires an alert the moment its timer hits zero, with no human watching logs.

### POST http://localhost:4002/monitors/

Registers a monitor-related action by sending the required request data to the API. This request is used for setting up or triggering monitor registration so the system can track, manage, or automate health checks or status monitoring.

Body raw (JSON)

{
    "id": "Device-123",
    "timeout": 60,
    "alert_email": "amalitech@gmail.com"
}

### POST http://localhost:4002/monitors/Device-123/heartbeat

Signals the device is alive. Cancels the running countdown and starts a fresh one.
Also un-pauses a paused monitor, and revives a down monitor (logs a `RECOVERY`
event with measured downtime , see Developer's Choice).


Body raw (JSON)
{
    "id": "Device-123",
    "timeout": 60,
    "alert_email": "amalitech@gmail.com"
}

### POST http://localhost:4002/monitors/Device-123/pause

Freezes the countdown completely, e.g. during maintenance. No alerts fire while paused.



