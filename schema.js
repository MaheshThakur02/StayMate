const joi = require("joi");
module.exports.listingschema = joi.object({
listing : joi.object({
    tittle:joi.string().required(),
    description:joi.string().required(),
    location:joi.string().required(),
    country:joi.string().required(),
    price:joi.number().required().min(0),
    image:joi.string().allow("",null)
}).required()

});