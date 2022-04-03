import { isSet, isString } from "@/utils";
import { isNotEmptyString } from "@utils/formatChecker";
import { i18n } from "@/main";

const phoneRegex = /^\d{7,10}$/;
const countryCodeRegex = /^\+?\d{1,3}$/;

export const isRequired = (value: any) => {
  if (isSet(value)) {
    if (typeof value === "string") {
      if (isNotEmptyString(value)) return true;
    } else {
      return true;
    }
  }
  return i18n.global.t("form.messages.isRequired");
};

export const isPhone = (value: any) => {
  let messages = isRequired(value);

  if (isString(messages)) return messages;

  return phoneRegex.test(value) ? true : i18n.global.t("form.messages.isPhone");
};

export const isCountryCode = (value: any) => {
  let messages = isRequired(value);

  if (isString(messages)) return messages;

  return countryCodeRegex.test(value)
    ? true
    : i18n.global.t("form.messages.isCountryCode");
};
