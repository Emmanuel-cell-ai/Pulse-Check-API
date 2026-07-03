### CritMon Servers Inc

# Monitor Lifecycle
(Pulse-Check-API/Architecture/PC-API Diagram.png)

The diagram shows the four states of a monitor and every transition between them:

1.**Register** - `POST /monitors` creates the monitor and starts its countdown (state: Running).
2.**Running** - a countdown ticks towards zero. Each `POST /monitors/:id/heartbeeat` cancels the old timer and start a fresh one.
3.**Down** - if the countdown reaches zero, the system fires an Alert and marks the monitor as down. No request triggers this.
4.**Paused** - `POST /monitors/:id/pause` freezes the timer so no alert fire, the next heartbeat automatically un-pause it

**Developer's Choice:**  the *Down->Running* transition (ie "Hearbeat revives") is my added feature.
The original spec leaves a monitor down permanently. Here, a heeartbeat from recovred device restores monitoring and logs a Recovery event with the measured down time

A heartbeat endpoint is the single reset point for all three state. It reset running, un-pauses Paused and revives Down