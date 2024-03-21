import { RequestHandler } from "express";
import { body, validationResult } from "express-validator";

const handleValidationErrors:RequestHandler = async (
  req,
  res, 
  next 
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export const validateMyUserRequest = [
  body("name").isString().notEmpty().withMessage("Name must be a String"),
  body("adressLine1")
    .isString()
    .notEmpty()
    .withMessage("adressLine1 must be a String"),
  body("city").isString().notEmpty().withMessage("city must be a String"),
  body("country").isString().notEmpty().withMessage("country must be a String"),
  handleValidationErrors,
];
