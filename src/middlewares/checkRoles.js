import createHttpError from "http-errors";
import { ROLES } from "../constants/constans.js";
import { Contacts } from "../db/models/contacts.js";

export const checkRoles = (...roles) => async (req, res, next) => {
    const { user } = req;
    if (!user) {
        next(createHttpError(401));
        return;
    }

    const { role } = user;
    if (roles.includes(ROLES.TEACHER) && role === ROLES.TEACHER) {
        next();
        return;
    }

    if (roles.includes(ROLES.PARENT) && role === ROLES.PARENT) {
        const { contactId } = req.params;
        if (!contactId) {
            next(createHttpError(403));
            return;
        }

        const contact = await Contacts.findOne({
            _id: contactId,
            parentId: user._id,
        });

        if (contact) {
            next();
            return;
        }

    }
};
