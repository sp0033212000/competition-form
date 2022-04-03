<template>
  <el-form
    label-position="top"
    @submit.prevent="(event) => handleSubmit(onSubmit, onSubmitError)(event)"
  >
    <div class="flex justify-end mb-4">
      <el-button native-type="button" type="primary" @click="append">
        <span class="block mr-1 w-3 h-3 font-bold">
          <i-plus />
        </span>
        {{ $t("form.append") }}
      </el-button>
      <el-button native-type="submit" type="success">
        {{ $t("form.submit") }}
      </el-button>
    </div>
    <el-collapse v-model="$data.activeSection" accordion>
      <template v-for="(entry, index) in fields" :key="entry.key">
        <el-collapse-item :name="entry.value.id">
          <template #title>
            <el-button
              :disabled="fields.length === 1"
              :icon="Delete"
              circle
              class="mr-2"
              size="small"
              type="danger"
              @click.stop="remove(index)"
            />
            <span :class="{ 'text-red-400': fieldErrorCheck(entry.value.id) }">
              {{ getTitle(entry, index) }}
            </span>
            <span
              v-if="fieldErrorCheck(entry.value.id)"
              class="block ml-1 w-4 h-4 font-bold text-red-400"
            >
              <i-warning-filled />
            </span>
          </template>
          <f-form-section
            :id="entry.value.id"
            :is-in-valid="fieldErrorCheck(entry.value.id)"
            :name="`formValues[${index}]`"
            :on-all-valid="onFormSectionAllValid"
          />
        </el-collapse-item>
      </template>
    </el-collapse>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, markRaw } from "vue";
import {
  Delete,
  Plus as IPlus,
  WarningFilled as IWarningFilled,
} from "@element-plus/icons-vue";
import {
  FieldEntry,
  InvalidSubmissionContext,
  useFieldArray,
  useForm,
} from "vee-validate";
import { v4 as uuidV4 } from "uuid";

import { ChildrenData } from "@/api";
import { isEmptyString, isNotEmptyString, isNotSet, isSet } from "@/utils";
import FFormSection from "@/components/feature/form/f-form-section.vue";

export interface FormValue extends Omit<ChildrenData, "birthday"> {
  id: string;
  birthday: Date;
}

const defaultFormValue: FormValue = {
  id: uuidV4(),
  first_name: "",
  last_name: "",
  nickname: "",
  id_number: "",
  birthday: new Date(),
  gender: "",
  skill_level: "",
  emergency_contact_first_name: "",
  emergency_contact_last_name: "",
  emergency_contact_country_code: "",
  emergency_contact_phone: "",
};

export default defineComponent({
  name: "f-form-container",
  components: {
    FFormSection,
    IPlus,
    IWarningFilled,
  },
  setup() {
    const { handleSubmit } = useForm<{ formValues: Array<FormValue> }>({
      initialValues: {
        formValues: [{ ...defaultFormValue }],
      },
    });
    const { remove, push, fields } = useFieldArray<FormValue>("formValues");

    return {
      fields,
      push,
      remove,
      handleSubmit,
      // schema,
    };
  },
  data() {
    return {
      Delete: markRaw(Delete),
      activeSection: [defaultFormValue.id],
      errorSection: [] as Array<String>,
    };
  },
  methods: {
    fieldErrorCheck(id: string) {
      return this.errorSection.some((errorSectionId) => errorSectionId === id);
    },
    getTitle(entry: FieldEntry<FormValue>, index: number) {
      const data = entry.value;
      let title = `${this.$t("form.title")}-${index + 1}`;
      if (isNotSet(data)) return `${this.$t("form.title")}-${index + 1}`;

      title = `${data.first_name}${data.last_name}${
        isNotEmptyString(data.nickname) ? `(${data.nickname})` : ""
      }`;
      return isEmptyString(title)
        ? `${this.$t("form.title")}-${index + 1}`
        : title;
    },
    append() {
      const id = uuidV4();
      this.push({ ...defaultFormValue, id });
      this.$data.activeSection = [...this.$data.activeSection, id];
    },
    async onSubmit({ formValues }: { formValues: Array<FormValue> }) {
      const { action, t: mailToken } = this.$route.query as {
        action: "MAIL_SIGNUP";
        t: string;
      };
      if (action == "MAIL_SIGNUP") {
        await this.$api.childrenData.saveChildrenData({
          mailToken,
          childrenDataList: formValues.map(({ id: _, birthday, ...data }) => ({
            ...data,
            birthday: birthday.toISOString(),
          })),
        });
      }
    },
    onFormSectionAllValid(id: string) {
      if (this.fieldErrorCheck(id)) {
        this.errorSection = this.errorSection.filter(
          (errorSectionId) => errorSectionId !== id
        );
      }
    },
    onSubmitError: function (
      ctx: InvalidSubmissionContext<{ formValues: Array<FormValue> }>
    ) {
      const regex = /formValues\[(\d)]\.+/;
      const errorIds = new Map<number, string>();
      Object.keys(ctx.results).forEach((key) => {
        const [, index] = regex.exec(key) || [null, null];
        if (isSet(index)) {
          const indexNumber = parseInt(index, 10);
          if (errorIds.has(indexNumber)) return;
          const id = ctx.values.formValues[indexNumber].id;
          errorIds.set(indexNumber, id);
        }
      });
      this.activeSection = [...errorIds.values()];
      this.errorSection = [...errorIds.values()];
    },
  },
});
</script>

<style scoped></style>
