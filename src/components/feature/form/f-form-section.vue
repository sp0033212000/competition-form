<template>
  <div class="w-full md:pt-4">
    <el-form-item :label="$t('form.data.name')">
      <el-col :span="11">
        <el-form-item :error="errorMessage_first_name">
          <el-input
            v-model="first_name"
            :placeholder="$t('form.data.firstName')"
            class="w-full"
            type="text"
          />
        </el-form-item>
      </el-col>
      <el-col :span="2" class="text-center">
        <span class="text-gray-500"></span>
      </el-col>
      <el-col :span="11">
        <el-form-item :error="errorMessage_last_name">
          <el-input
            v-model="last_name"
            :placeholder="$t('form.data.lastName')"
            class="w-full"
            type="text"
          />
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item
      :error="errorMessage_nickname"
      :label="$t('form.data.nickname')"
    >
      <el-input
        v-model="nickname"
        :placeholder="$t('form.data.nickname')"
        class="w-full"
        type="text"
      />
    </el-form-item>
    <el-form-item
      :error="errorMessage_id_number"
      :label="$t('form.data.idNumber')"
    >
      <el-input
        v-model="id_number"
        :placeholder="$t('form.data.idNumber')"
        class="w-full"
        type="text"
      />
    </el-form-item>
    <el-form-item
      :error="errorMessage_birthday"
      :label="$t('form.data.birthday')"
    >
      <el-date-picker
        v-model="birthday"
        :placeholder="$t('form.data.birthday')"
        class="w-full"
        type="date"
      />
    </el-form-item>
    <el-form-item :error="errorMessage_gender" :label="$t('form.data.gender')">
      <el-select
        v-model="gender"
        :placeholder="$t('form.data.gender')"
        class="w-full"
        type="text"
      >
        <el-option
          v-for="option in $data.genderOption"
          :key="option"
          :label="$t(`form.data.genderOption.${option}`)"
          :value="option"
        />
      </el-select>
    </el-form-item>
    <el-form-item
      :error="errorMessage_skill_level"
      :label="$t('form.data.skillLevel')"
    >
      <el-input
        v-model="skill_level"
        :placeholder="$t('form.data.skillLevel')"
        class="w-full"
        type="text"
      />
    </el-form-item>
    <el-form-item :label="$t('form.data.emergencyContact')">
      <el-row class="w-full mb-[1.125rem]">
        <el-col :span="11">
          <el-form-item :error="errorMessage_emergency_contact_first_name">
            <el-input
              v-model="emergency_contact_first_name"
              :placeholder="$t('form.data.emergencyContactFirstName')"
              class="w-full"
              type="text"
            />
          </el-form-item>
        </el-col>
        <el-col :span="2" class="text-center">
          <span class="text-gray-500"></span>
        </el-col>
        <el-col :span="11">
          <el-form-item :error="errorMessage_emergency_contact_last_name">
            <el-input
              v-model="emergency_contact_last_name"
              :placeholder="$t('form.data.emergencyContactLastName')"
              class="w-full"
              type="text"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="w-full">
        <el-col :span="6">
          <el-form-item :error="errorMessage_emergency_contact_country_code">
            <el-input
              v-model="emergency_contact_country_code"
              :placeholder="$t('form.data.emergencyContactCountryCode')"
              class="w-full"
              type="text"
            />
          </el-form-item>
        </el-col>
        <el-col :span="2" class="text-center">
          <span class="text-gray-500"></span>
        </el-col>
        <el-col :span="16">
          <el-form-item :error="errorMessage_emergency_contact_phone">
            <el-input
              v-model="emergency_contact_phone"
              :placeholder="$t('form.data.emergencyContactPhone')"
              class="w-full"
              type="text"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form-item>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive, toRef, watch } from "vue";
import { useField } from "vee-validate";

import { isCountryCode, isPhone, isRequired } from "@utils/formRules";
import { isNotSet } from "@/utils";

export default defineComponent({
  name: "f-form-section",
  setup(props) {
    const name = toRef(props, "name");
    const id = toRef(props, "id");

    const { value: first_name, errorMessage: errorMessage_first_name } =
      useField(`${name.value}.first_name`, isRequired, {
        validateOnValueUpdate: true,
        initialValue: "",
      });
    const { value: last_name, errorMessage: errorMessage_last_name } = useField(
      `${name.value}.last_name`,
      isRequired,
      { validateOnValueUpdate: true, initialValue: "" }
    );
    const { value: nickname, errorMessage: errorMessage_nickname } = useField(
      `${name.value}.nickname`,
      isRequired,
      { validateOnValueUpdate: true, initialValue: "" }
    );
    const { value: id_number, errorMessage: errorMessage_id_number } = useField(
      `${name.value}.id_number`,
      isRequired,
      { validateOnValueUpdate: true, initialValue: "" }
    );
    const { value: birthday, errorMessage: errorMessage_birthday } = useField(
      `${name.value}.birthday`,
      isRequired,
      { validateOnValueUpdate: true, initialValue: new Date() }
    );
    const { value: gender, errorMessage: errorMessage_gender } = useField(
      `${name.value}.gender`,
      isRequired,
      { validateOnValueUpdate: true, initialValue: "" }
    );
    const { value: skill_level, errorMessage: errorMessage_skill_level } =
      useField(`${name.value}.skill_level`, isRequired, {
        validateOnValueUpdate: true,
        initialValue: "",
      });
    const {
      value: emergency_contact_first_name,
      errorMessage: errorMessage_emergency_contact_first_name,
    } = useField(`${name.value}.emergency_contact_first_name`, isRequired, {
      validateOnValueUpdate: true,
      initialValue: "",
    });
    const {
      value: emergency_contact_last_name,
      errorMessage: errorMessage_emergency_contact_last_name,
    } = useField(`${name.value}.emergency_contact_last_name`, isRequired, {
      validateOnValueUpdate: true,
      initialValue: "",
    });
    const {
      value: emergency_contact_country_code,
      errorMessage: errorMessage_emergency_contact_country_code,
    } = useField(
      `${name.value}.emergency_contact_country_code`,
      isCountryCode,
      { validateOnValueUpdate: true, initialValue: "" }
    );
    const {
      value: emergency_contact_phone,
      errorMessage: errorMessage_emergency_contact_phone,
    } = useField(`${name.value}.emergency_contact_phone`, isPhone, {
      validateOnValueUpdate: true,
      initialValue: "",
    });

    watch(
      reactive({
        errorMessage_first_name,
        errorMessage_last_name,
        errorMessage_nickname,
        errorMessage_id_number,
        errorMessage_birthday,
        errorMessage_gender,
        errorMessage_skill_level,
        errorMessage_emergency_contact_first_name,
        errorMessage_emergency_contact_last_name,
        errorMessage_emergency_contact_country_code,
        errorMessage_emergency_contact_phone,
      }),
      (values) => {
        if (!props.isInValid) return;

        let isAllValid = true;

        for (let key in values) {
          isAllValid = isNotSet(values[key as keyof typeof values]);
          if (!isAllValid) break;
        }
        if (isAllValid) return props.onAllValid(id.value);
      }
    );

    return {
      first_name,
      errorMessage_first_name,
      last_name,
      errorMessage_last_name,
      nickname,
      errorMessage_nickname,
      id_number,
      errorMessage_id_number,
      birthday,
      errorMessage_birthday,
      gender,
      errorMessage_gender,
      skill_level,
      errorMessage_skill_level,
      emergency_contact_first_name,
      errorMessage_emergency_contact_first_name,
      emergency_contact_last_name,
      errorMessage_emergency_contact_last_name,
      emergency_contact_country_code,
      errorMessage_emergency_contact_country_code,
      emergency_contact_phone,
      errorMessage_emergency_contact_phone,
    };
  },
  data() {
    return {
      genderOption: ["male", "female", "other"],
    };
  },
  props: {
    id: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    onAllValid: {
      type: Function as PropType<(id: string) => void>,
      default: () => null,
    },
    isInValid: {
      type: Boolean,
      default: false,
    },
  },
  methods: {},
});
</script>

<style scoped></style>
