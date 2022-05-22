require("gh-pages")
  .publish("dist")
  .then(() => {
    console.log("Deployment Complete!");
  })
  .catch(console.error);
