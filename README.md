Fork of https://github.com/mahsu/MariOCaml, converted to [Reason](http://reasonml.github.io/) and compiled using [BuckleScript](https://github.com/bucklescript/bucklescript).

[Play it live!](https://reasonml-community.github.io/Mareo/)

## Goal of the Project

See the accompanying blog post [here](https://medium.com/@chenglou/mareo-reason-bucklescript-mario-205ce4c1cbe5)

## Run It Yourself

```
git clone https://github.com/reasonml-community/Mareo.git
cd Mareo
npm install
npm start
```

Then, if you're using Safari or Firefox, simply open `docs/index_dev.html`. **No bundling needed! Safari supports native es6 modules, which we can compile to**. If not, run `npm run pack-for-es6-less-browsers` then open that html page. For Chrome, since there are security restrictions concerning loading local scripts, you'd have to start a small server. Try `python -m SimpleHTTPServer` or something.

(There's also an `index.html` file in that directory. Ignore that; it's just for the github demo.)
