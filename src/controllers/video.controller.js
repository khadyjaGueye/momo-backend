const videoService = require('../services/video.service');
const supabase = require("../config/supabase");
const fs = require('fs');

async function uploadVideoFile(file) {
    const fileBuffer = fs.readFileSync(file.path);
    const { error } = await supabase.storage
        .from("videos")
        .upload(file.filename, fileBuffer, {
            contentType: file.mimetype,
        });
    if (error) throw error;

    const { data } = supabase.storage.from("videos").getPublicUrl(file.filename);
    return data.publicUrl;
}

// Création
exports.create = async (req, res) => {
    try {
        let videoUrl = null;
        if (req.file) {
            videoUrl = await uploadVideoFile(req.file);
        }
        const video = await videoService.createVideo({
            title: req.body.title,
            description: req.body.description,
            url: videoUrl,
        });
        res.status(201).json({ data: { video } });
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: "Erreur lors de la création de la vidéo" });
    }
};

//  Mise à jour
exports.updateVideo = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const video = await videoService.getVideoById(id);
        if (!video) {
            return res.status(404).json({ message: "Video not found" });
        }
        // Sécuriser req.body
        const body = req.body || {};
        let videoUrl = video.url;
        if (req.file) {
            const oldFileName = video.url?.split("/").pop();
            if (oldFileName) {
                await supabase.storage.from("videos").remove([oldFileName]);
            }
            videoUrl = await uploadVideoFile(req.file);
        }
        const updatedVideo = await videoService.update(id, {
            title: body.title ?? video.title,
            description: body.description ?? video.description,
            url: videoUrl,
        });
        res.json({
            success: true,
            data: updatedVideo,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: error.message,
        });
    }
};

//  Suppression
exports.deleteVideo = async (req, res) => {
    try {
        const video = await videoService.getVideoById(req.params.id);
        if (!video) return res.status(404).json({ message: 'Video not found' });
        const fileName = video.url.split('/').pop();
        const { error } = await supabase.storage.from("videos").remove([fileName]);
        if (error) throw error;
        await videoService.remove(req.params.id);
        res.json({ message: 'Video deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

exports.getVideos = async (req, res) => {
    try {
        const videos = await videoService.getAllVideos();
        res.json({
            data: {
                "videos": videos
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getVideo = async (req, res) => {
    try {
        const video = await videoService.getVideoById(req.params.id);
        if (!video) return res.status(404).json({ message: 'Video not found' });
        res.json(video);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


