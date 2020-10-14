# Maybe I can start!
## Who, me? Yes, **you**!

It is early morning, the sun is rising, and everybody is gathered around a table in the meeting room. And then it happens. The daily meeting begins. But who will go first? Nobody knows. Silence. And then, from a far corner in the room, you hear a voice of a desperate developer. "Maybe... I can start?"

Have you ever found yourself in this situation?

Well, we did. It was always the same routine. Nobody could ever decide on who will be the one to start until one person always started with "Maybe I can start..." to the point it became an insider joke. This gave me the idea for this little app, that lets you decide more quickly on who should start and end this never-ending cycle of despair once and for all.

## How does it look, then?

Here you go, have some screenshots!

<img src="https://drive.slawagurevich.com/mics/mics1.png" alt="Title Screen" width="800">
<img src="https://drive.slawagurevich.com/mics/mics2.png" alt="Spinning" width="800">
<img src="https://drive.slawagurevich.com/mics/mics3.png" alt="Spinned" width="800">
<img src="https://drive.slawagurevich.com/mics/mics4.png" alt="Data Creation" width="800">
<img src="https://drive.slawagurevich.com/mics/mics5.png" alt="Settings" width="800">

## Running the app

As always, get all the dependencies.

```
npm install
```

Then start the app in dev mode.

```
npm run electron-dev
```

When the app is run in dev mode, it saves the databases directly into the browser's local storage. However, uploaded images will be stored under you user's data folder.

## Building the App

If you want to build the app yourself (for whatever reason) just run.

```
npm run electron-pack -w -l -m
```

for Windows, Linux and Mac respectively.

## Why no release?

For now all my electron apps turn out really *huge* after building and ai don't know why. I think it's better for the moment to just build it yourself instead of downloading a simple app with over 500MB(?!). As soon as I get around to making it smaller, I will provide a release.
