const service = require("../../service/contactDb");
const { HttpError } = require("../../helpers/HTTPError");
const { updateFavoriteSchema } = require("../../schemas/updateFavoriteSchema");

const changeContactFavorite = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { favorite } = req.body;

    const { error } = updateFavoriteSchema.validate({ favorite });

    if (error) {
      throw HttpError(404, error.message);
    }

    const contact = await service.updateStatusContact(contactId, req.body);

    if (!contact) {
      throw HttpError(404, "Not found.");
    }

    res.status(200).json(contact);
  } catch (error) {
    res.status(404).json({ message: "Missing field 'favorite'." });
    next(error);
  }
};

module.exports = changeContactFavorite;
