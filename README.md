Fork of https://github.com/mahsu/MariOCaml, converted to [Reason](http://reasonml.github.io/) and compiled using [BuckleScript](https://github.com/bucklescript/bucklescript).

[Play it live!](http://chenglou.github.io/Mareo/)

## Goal of the Project

See the accompanying blog post [here](https://medium.com/@chenglou/mareo-reason-bucklescript-mario-205ce4c1cbe5)

## Run It Yourself

```
git clone https://github.com/chenglou/Mareo.git
cd Mareo
npm install
npm start
```

Then, if you're using Safari, simply open `docs/index.html`. **No bundling needed! Safari supports native es6 modules, which we can compile to**. If not, run `npm run pack-for-non-safari` then open that html page.
