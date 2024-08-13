const validate = (Schema) => async (req, res, next) => {
  console.log(res.body);
  try {
    
    const parseBody = await Schema.parseAsync(req.body);
    req.body = parseBody;
    next();
  } catch (err) {
    if (err.errors && err.errors.length > 0) {
      const errorMessage = err.errors[0].message;
      res.status(400).json({ message: errorMessage });
    } else {
      res.status(400).json({ message: "Validation error" });
    }

    console.log("error from middleware zodvalidatemilddle", err);
  }
};

export default validate;
