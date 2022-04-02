<template>
  <div class="flex justify-end mb-4">
    <el-button type="primary" @click="append">
      <span class="block mr-1 w-3 h-3 font-bold">
        <i-plus />
      </span>
      {{ $t("form.append") }}
    </el-button>
  </div>
  <form>
    <el-collapse v-model="$data.activeSection">
      <template v-for="(data, index) in formValues">
        <el-collapse-item :name="data.id">
          <template>
            <el-button
              :disabled="$data.formValues.length === 1"
              :icon="Delete"
              circle
              class="mr-2"
              size="small"
              type="danger"
              @click.stop="remove(index)"
            />
            {{ getTitle(index) }}
          </template>
        </el-collapse-item>
      </template>
    </el-collapse>
  </form>
</template>

<script lang="ts" setup>
import { Delete, Plus as IPlus } from "@element-plus/icons-vue";
</script>
<script lang="ts">
import { defineComponent } from "vue";
import { v4 as uuidV4 } from "uuid";

import { ChildrenData } from "@/api";
import { isEmptyString, isNotEmptyString } from "@/utils";

interface FormValue extends ChildrenData {
  id: string;
}

const defaultFormValue: FormValue = {
  id: uuidV4(),
  first_name: "",
  last_name: "",
  nickname: "",
  id_number: "",
  birthday: "",
  gender: "",
  skill_level: "",
  emergency_contact_first_name: "",
  emergency_contact_last_name: "",
  emergency_contact_country_code: "",
  emergency_contact_phone: "",
};

export default defineComponent({
  name: "f-form-container",
  data() {
    return {
      formValues: [{ ...defaultFormValue }] as Array<FormValue>,
      activeSection: [defaultFormValue.id] as Array<string>,
    };
  },
  methods: {
    append() {
      const id = uuidV4();
      this.formValues.push({ ...defaultFormValue, id });
      this.activeSection.push(id);
    },
    remove(index: number) {
      this.$data.formValues = [
        ...this.$data.formValues.slice(0, index),
        ...this.$data.formValues.slice(index + 1),
      ];
    },
    getTitle(index: number) {
      const data = this.$data.formValues[index];
      const title = `${data.first_name}${data.last_name}${
        isNotEmptyString(data.nickname) ? `(${data.nickname})` : ""
      }`;
      return isEmptyString(title)
        ? `${this.$t("form.title")}-${index + 1}`
        : title;
    },
  },
});
</script>

<style scoped></style>
