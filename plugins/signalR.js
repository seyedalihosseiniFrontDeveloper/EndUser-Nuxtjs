import {HubConnectionBuilder} from "@microsoft/signalr"
export default () => {
/*    console.log('signalr')
    let ministry_server = "http://185.208.181.243:8085/notifHub";
    let connection = new HubConnectionBuilder().withUrl(ministry_server, {
        accessTokenFactory: () => "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjQiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYWRtaW4gdGVzdGkiLCJPZmZpY2VJZCI6IjEiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiI2IiwibmJmIjoxNjY4MzI2MTA5LCJleHAiOjE2NzA5MTgxMDksImlzcyI6InRlc3QuY29tIiwiYXVkIjoidGVzdC5jb20ifQ.xO9OOAjJVWkffWgJrvnmQVoiYbMzpeNvi9YMDmM0ZZ8"
    }).withAutomaticReconnect([0, 1000, 5000, null]).build();

    connection.start();

    connection.on("get", function (res) {
        Notification.requestPermission((result) => {
            if (result === 'granted') {
                console.log(res)
                navigator.serviceWorker.ready.then((registration) => {
                    registration.showNotification('Vibration Sample', {
                        body: res,
                    });
                });
            }
        });
    });*/
}
