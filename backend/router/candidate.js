const express = require("express");
const router = express.Router();
const authenticateUserByToken = require("../middleware/authenticate");
const candidateController = require("../controllers/candidateController");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const cloudinaryStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "images",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

const upload = multer({ storage: cloudinaryStorage });
const {
  getAppliedCandidatesController,
  getVotesCastedToCandidateController,
  getCandidatesByConstituencyController,
  approveCandidateController,
} = require("../controllers/candidateController");
router.put(
  "/approve-candidate/:candidateId",
  authenticateUserByToken,
  approveCandidateController
);
router.get("/applied", getAppliedCandidatesController);
router.get(
  "/votes",
  authenticateUserByToken,
  getVotesCastedToCandidateController
);

router.get(
  "/constituency",
  authenticateUserByToken,
  getCandidatesByConstituencyController
);

router.post(
  "/apply",
  authenticateUserByToken,
  upload.single("partySymbol"),
  candidateController.applyCandidate
);
router.get(
  "/voters",
  authenticateUserByToken,
  candidateController.getVotersByCandidate
);

module.exports = router;
