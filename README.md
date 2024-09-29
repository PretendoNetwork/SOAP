# SOAP

<p align="center">
    <a href="https://discord.gg/DThgbba" target="_blank">
        <img src="https://discordapp.com/api/guilds/408718485913468928/widget.png?style=banner3">
    </a>
</p>

# Overview
The SOAP server contains several key services for the WiiU and 3DS, including NUS (NetUpdateSOAP, aka Nintendo Update Server) and ECS which serves title tickets and other data for the eShop

# How to use
This repo does not come with any titles or tickets by default. To serve titles and tickets, create a `titles` folder in the root of the repo. In the `titles` folder create 2 sub-folders, `wup` and `ctr`, for the WiiU and 3DS respectively. Inside each of these folders create 3 more sub-folders, `aoc`, `patch` and `title`, for DLC, updates, and base titles respectively. Create a folder named the title ID for the title you wish to serve in its correct folder, and place the `title.tmd`, `title.tik` and encrypted contents inside.

Your directory structure should look something like:

```
/
├── src/
│   └── ....
├── titles/
│   ├── wup/
│   │   ├── aoc/
│   │   ├── patch/
│   │   └── title/
│   │       └── 0005000b10151a00/
│   │           ├── title.tmd
│   │           ├── title.tik
│   │           ├── 00000000.app
│   │           ├── 00000000.h3
│   │           └── ....
│   └── ctr/
│       ├── aoc/
│       ├── patch/
│       └── title/
│           └── 00040000001D7E00/
│               ├── title.tmd
│               ├── title.tik
│               └── 00000000.app
```

## Disclaimer
This can theoretically serve titles for the 3DS. However it is difficult to test this functionality without fully working Samurai and Ninja servers. The Hokage repo, https://github.com/PretendoNetwork/Hokage, is being developed for this purpose but it is not yet usable

# NOTE FOR SERVING TICKETS
### At the moment tickets use a hard-coded path! This is because the WiiU and 3DS request tickets from ECS using a TIV (ticket ID), not the title ID. These TIVs are unique per-ticket per-owner and are generated randomly when a title is purchased by a user, whom the ticket is then assigned. Because of this, there is no standard for converting a TIV->title ID without already knowing which title a TIV is for. In the future this repo will support a JSON config or a database to get this data dynamically, however at the moment you must edit each `ecs.js` file to manually check the requested TIV and serve the correct ticket!

# :warning: WARNING FOR 3DS USERS
## USING THIS SERVER WITH A 3DS MAY APPEAR TO HAVE DELETED YOUR ALREADY INSTALLED TITLES. YOUR TITLES ARE NOT DELETED, THEIR CONTENT IS STILL ON YOUR CONSOLE/SD CARD. THEY ARE SIMPLY HIDDEN FROM THE HOME SCREEN. TO GET THE TITLES TO APPEAR AGAIN, USE `faketik` BY `ihaveamac` (https://github.com/ihaveamac/faketik, SEE THE FAKETIK NOTICE BELOW)

## THIS IS  DUE TO A SIDE EFFECT OF HOW THE 3DS HANDLES THE TIV LIST FROM THE SOAP SERVER. WHEN THE 3DS GETS A TIV LIST FROM THE SOAP SERVER, IT WILL CHECK IF THE LIST CONTAINS ANY TICKETS IT DOES NO HAVE INSTALLED. IF IT FINDS SEES A TICKET IS MISSING, IT WILL TRY TO DOWNLOAD IT. HOWEVER THE OPPOSITE IS ALSO TRUE. IF THE 3DS HAS A TICKET INSTALLED THAT WAS NOT SENT IN THE TIV LIST, IT WILL DELETE IT FROM THE TICKET DATABASE, WHICH HIDES THE TITLE FROM THE HOME SCREEN. THE ONLY WAY AROUND THIS IS FOR THIS SERVER TO HAVE KNOWLEDGE OF EVERY USERS TIV LIST, WHICH IS NOT CURRENTLY POSSIBLE. AGAIN, YOUR TITLE IS NOT DELETED. ONLY THE TICKET WAS. YOUR TITLE CONTENTS IS STILL ON YOUR CONSOLE

## THIS DOES NOT AFFECT THE WIIU, THIS IS ONLY AN ISSUE ON THE 3DS

# :warning: FAKETIK WARNING
## FAKETIK WORKS BY INSTALLING FAKE TICKETS TO YOUR CONSOLE TO MAKE HIDDEN TITLES REAPPEAR. HOWEVER IT DOES NOT CREATE _VALID_ TICKETS. THIS MEANS THAT TICKETS MADE BY FAKETIK CAN **NOT** BE USED TO DECRYPT CDN CONTENTS. IF YOU USE FAKETIK AND THEN DELETE A TITLE FROM YOUR CONSOLE/SD CARD, YOU WILL NEED TO ALSO USE HOMEBREW TO REMOVE THE FAKE TICKET AND CONNECT BACK TO NINTENDO'S SERVERS TO RE-DOWNLOAD THE LEGIT TICKET. OTHERWISE YOUR 3DS WILL THINK IT STILL HAS A TICKET FOR THE TITLE, AND TRYING TO RE-INSTALL A TITLE FROM THE ESHOP WILL FAIL AS IT CANNOT BE DECRYPTED WITH THE FAKE TICKET. PLEASE BE MINDFUL OF THIS