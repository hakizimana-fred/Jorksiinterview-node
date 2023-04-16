import { Router } from "express";
import Post from "../models/Post.js";
import passport from 'passport'

const router = Router();


router.post(
  "/save/post",
  passport.authenticate("jwt", { session: false }),
  async function (req, res) {


    const userId = req.user._id


    const {
      title,
      body,
      status,
      geolocation: {latitude, longitude}
    } = req.body;

    try {


      const newPost = new Post({
        title,
        body,
        createdBy: userId,
        status: status ?? status,
        geolocation: {
          latitude,
          longitude,
        },
      });

      await newPost.save();
      return res
        .status(200)
        .json({
          success: true,
          message: "Successfully posted a post",
          post: newPost,
        });

    } catch (e) {
        return res.status(400).json({
            success: false,
            message: "Something went wrong while saving post",
            errors: e.message
        })
    }
  }
);


export default router