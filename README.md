# react-native-fullstack-moviedb-app
<p float="left">
    <img style="margin: 20px" src="/screenshots/1.jpg" width="400px"></img> 
    <img style="margin: 20px" src="/screenshots/2.jpg" width="400px"></img> 
    <img style="margin: 20px" src="/screenshots/3.jpg" width="400px"></img> 
</p>

# Running Server
- cd into movieServer and run <code>yarn</code>
- then run <code>yarn start</code> to start the server
- to connect to app we need to use [Ngrok](https://github.com/bubenshchykov/ngrok#readme) download ngrok and run <code>ngrok http 300</code> and copy the following url to the <code>NGROK_URL</code> in <code>movieApp/config.js</code> file
    
<img style="margin: 20px" src="/screenshots/4.png" width="400px"></img> 


# Running Application
- cd into movieApp and run <code>yarn</code>
- then run <code>react-native run-android</code> to run the app on your connected device or emulator
