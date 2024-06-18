const { Client } = require("../../models/models");

const storeCilents =  async (req, res)=> {
    try {
        const { name, url } = req.body;
        const image = req.cloudinaryUrl;
        const client = new Client({
            name,
            image,
            url,
        });
        await client.save();
        res.status(201).json({
            status: "Sucessfully Cilent Created",
            data: {
                client,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err.message,
        });
    }
}

module.exports = storeCilents;