import Ajv from "ajv";

export const AjvValidator = new Ajv({allErrors: true, format: 'full'});