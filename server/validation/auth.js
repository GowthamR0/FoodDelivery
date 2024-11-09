import joi from 'joi';

export const validateSignUp = (userData) => {
    const Schema = joi.object({
        fullName: joi.string().min(4),
        email:joi.string().email(),
        password:joi.string().min(8),
        address:joi.array().items(joi.object( {detail: joi.string(),for: joi.string()})),
        phoneNumber: joi.number()
    });

    return Schema.validateAsync(userData);
};

export const validateSignIn = (userData) => {
    const Schema = joi.object({
        email:joi.string().required().min(4),
        password:joi.string().required().min(8)
    });
    return Schema.validateAsync(userData); 
}