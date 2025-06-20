var helpers      = require("../util/helpers")
var surgeSDK     = require("../sdk")

module.exports = function(req, next){

  var sdk = surgeSDK({
    endpoint: req.endpoint.format(),
    defaults: helpers.defaults
  })

  var domain  = req.argv["_"][0]
  var rev     = req.argv["_"][1] || null

  helpers.space()
  if (!domain){
    helpers.trunc("domain required".grey)
    return next()
  } else {
    sdk.manifest(domain, { user: "token", pass: req.creds.token }, function(error, manifest){
      helpers.displayManifest(manifest, domain)
      return next()
    })
  }

}
