const service = require("../../service/contactDb");
const { HttpError } = require("../../helpers/HTTPError");
const { updateFavoriteSchema } = require("../../schemas/updateFavoriteSchema");
const ctrlWrapper = require("../../helpers/ctrlWrapper");

const changeContactFavorite = async (req, res, next) => {
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
};

module.exports = ctrlWrapper(changeContactFavorite);
