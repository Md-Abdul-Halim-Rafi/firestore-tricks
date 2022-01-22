## Getting Started

- Clone this repository by the command
    `git clone https://github.com/Md-Abdul-Halim-Rafi/firestore-tricks.git`.
- Install all the necessary packages by running the command `npm i`.

## Firebase Credentials
- Goto your [Firebase Console](https://console.firebase.google.com).
- Navigate to the **Project Setting** and the to the **Service Accounts** tab.
- Since we are doing it on NodeJs app, make sure you choose *Node.js*. Then, click on the **Generate new private key** button

It'll download the service account for your nodejs project.

## Setting up the environment
- Copy data from your downloaded *\<service-account>.json* file.
- Replace it with the variable `serviceJson` inside the *index.js* file.

We will use a fancy view on our CLI. For this, we will use **ora** npm package. To use this, we need to set our nodejs environment type as *module*. To ensure this, make sure in your *package.json* file, you have:
```
{
    ...,
    "type": "module",
    ...
}
```

## Run the project
`node index.js` or `node index`

### Thanks