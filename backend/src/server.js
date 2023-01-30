import express from "express";
import { db, connectToDb } from "./db.js";
import fs from "fs";
import admin from "firebase-admin";

const credentials = JSON.parse(fs.readFileSync("../credentials.json"));

admin.initializeApp({
    credential: admin.credential.cert(credentials),
});

const app = express();
app.use(express.json());

//authorization
app.use(async (req, res, next) => {
    const { authtoken } = req.headers;
    if (authtoken) {
        try {
            req.user = await admin.auth().verifyIdToken(authtoken);
            console.log(req.user);
        } catch (e) {
            res.sendStatus(400);
        }
    }
    next();
});

//display
app.get("/api/articles/:name", async (req, res) => {
    const { name } = req.params;
    const { uid } = req.user;

    const article = await db.collection("articles").findOne({ name });
    if (article) {
        const upvoteIds = article.upvoteIds || [];
        article.canUpvote = uid && !upvoteIds.include(uid);
        res.json(article);
    } else {
        res.sendStatus(404);
    }
});

//upvote
app.put("/api/articles/:name/upvote", async (req, res) => {
    const { name } = req.params;

    await db.collection("articles").updateOne(
        { name },
        {
            $inc: { upvotes: 1 },
        }
    );
    const article = await db.collection("articles").findOne({ name });

    if (article) {
        res.json(article);
    } else {
        res.send("That article doesn't exist");
    }
});

//downwote
app.put("/api/articles/:name/downvote", async (req, res) => {
    const { name } = req.params;

    await db.collection("articles").updateOne(
        { name },
        {
            $inc: { upvotes: -1 },
        }
    );
    const article = await db.collection("articles").findOne({ name });

    if (article) {
        res.json(article);
    } else {
        res.send("That article doesn't exist");
    }
});
//comment
app.post("/api/articles/:name/comments", async (req, res) => {
    const { name } = req.params;
    const { postedBy, text } = req.body;

    await db.collection("articles").updateOne(
        { name },
        {
            $push: { comments: { postedBy, text } },
        }
    );
    const article = await db.collection("articles").findOne({ name });

    if (article) {
        res.json(article);
    } else {
        res.send("that article doesn't exist");
    }
});
//delete comment
app.delete("/api/articles/:name/comments", async (req, res) => {
    const { name } = req.params;
    const { postedBy, text } = req.body;

    await db.collection("articles").updateOne(
        { name },
        {
            $pull: { comments: { postedBy, text } },
        }
    );
    const article = await db.collection("articles").findOne({ name });

    if (article) {
        res.json(article);
    } else {
        res.send("that article doesn't exist");
    }
});

connectToDb(() => {
    console.log("connected to db");
    app.listen(8000, () => {
        console.log("server is listening on port 8000");
    });
});
